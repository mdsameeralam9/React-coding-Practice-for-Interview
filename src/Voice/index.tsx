import { useEffect, useRef, useState, useCallback } from "react";

type UseSpeechToText = {
  isSupported: boolean;
  isListening: boolean;
  interimTranscript: string;
  finalTranscript: string;
  error: string | null;
  start: (lang?: string) => void;
  stop: () => void;
  abort: () => void;
};

export default function useSpeechToText(): UseSpeechToText {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const [isSupported] = useState<boolean>(() => !!SpeechRecognition);
  const [isListening, setListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!isSupported) return;
    const R = new SpeechRecognition();
    R.continuous = true; // keep receiving interim results
    R.interimResults = true;
    R.maxAlternatives = 1;

    R.onstart = () => {
      setListening(true);
      setError(null);
    };

    R.onerror = (ev: any) => {
      setError(ev.error || "speech recognition error");
    };

    R.onend = () => {
      setListening(false);
      // Leave interim transcript alone; final results handled in onresult
    };

    R.onresult = (ev: any) => {
      let interim = "";
      let finalAccum = "";
      for (let i = ev.resultIndex; i < ev.results.length; ++i) {
        const res = ev.results[i];
        if (res.isFinal) {
          finalAccum += res[0].transcript;
        } else {
          interim += res[0].transcript;
        }
      }
      if (finalAccum) {
        // append to finalTranscript
        setFinalTranscript((prev) => (prev ? prev + " " + finalAccum : finalAccum));
        setInterimTranscript("");
      } else {
        setInterimTranscript(interim);
      }
    };

    recognitionRef.current = R;

    return () => {
      try {
        R.stop();
      } catch (e) {}
      recognitionRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSupported]);

  const start = useCallback((lang = "en-US") => {
    setError(null);
    if (!recognitionRef.current) {
      setError("SpeechRecognition not initialized");
      return;
    }
    try {
      recognitionRef.current.lang = lang;
      recognitionRef.current.start();
    } catch (e: any) {
      // start can throw if already started
      setError(e.message || "start error");
    }
  }, []);

  const stop = useCallback(() => {
    try {
      recognitionRef.current?.stop();
    } catch (e: any) {
      setError(e.message || "stop error");
    }
  }, []);

  const abort = useCallback(() => {
    try {
      recognitionRef.current?.abort();
      setListening(false);
    } catch (e: any) {
      setError(e.message || "abort error");
    }
  }, []);

  return {
    isSupported,
    isListening,
    interimTranscript,
    finalTranscript,
    error,
    start,
    stop,
    abort,
  };
}


// --------------------------

import React, { useEffect, useRef, useState } from "react";
import useSpeechToText from "../hooks/useSpeechToText";

type Props = {
  onSend: (text: string) => void;
  serverSttWsUrl?: string; // optional WS endpoint for server-side STT fallback
};

export default function ChatInput({ onSend, serverSttWsUrl }: Props) {
  const { isSupported, isListening, interimTranscript, finalTranscript, start, stop, error } = useSpeechToText();
  const [value, setValue] = useState("");
  const [listeningViaFallback, setListeningViaFallback] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // When finalTranscript updates (browser API), append to input
  useEffect(() => {
    if (finalTranscript) {
      setValue((v) => (v ? v + " " + finalTranscript : finalTranscript));
    }
  }, [finalTranscript]);

  // Keep interim transcript visible (non-committed)
  const displayedValue = interimTranscript ? `${value} ${interimTranscript}` : value;

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value.trim());
    setValue("");
  };

  const handleMicClick = async () => {
    if (isSupported) {
      if (!isListening) {
        start("en-US");
      } else {
        stop();
      }
      return;
    }

    // fallback using MediaRecorder + WebSocket to server STT
    if (!listeningViaFallback) {
      if (!serverSttWsUrl) {
        alert("Speech not supported in this browser. Provide serverSttWsUrl for fallback.");
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mr = new MediaRecorder(stream, { mimeType: "audio/webm;codecs=opus" });
        mediaRecorderRef.current = mr;
        audioChunksRef.current = [];

        wsRef.current = new WebSocket(serverSttWsUrl);
        wsRef.current.binaryType = "arraybuffer";

        wsRef.current.onopen = () => {
          mr.start(250); // emit 250ms chunks
          setListeningViaFallback(true);
        };

        wsRef.current.onmessage = (ev) => {
          // Expect JSON messages { type: 'transcript', text:'...' }
          try {
            const data = typeof ev.data === "string" ? JSON.parse(ev.data) : null;
            if (data?.type === "transcript") {
              // append or show interim depending on provider contract
              setValue((v) => (v ? v + " " + data.text : data.text));
            }
          } catch (e) {}
        };

        mr.ondataavailable = (e) => {
          if (e.data && e.data.size > 0 && wsRef.current?.readyState === WebSocket.OPEN) {
            // send raw chunk as binary
            e.data.arrayBuffer().then((buf) => {
              wsRef.current?.send(buf);
            });
          } else {
            audioChunksRef.current.push(e.data);
          }
        };

        mr.onstop = () => {
          setListeningViaFallback(false);
          stream.getTracks().forEach((t) => t.stop());
          // optionally send finalize message
          wsRef.current?.send(JSON.stringify({ type: "finalize" }));
        };

        wsRef.current.onclose = () => {
          setListeningViaFallback(false);
          mediaRecorderRef.current = null;
        };

        wsRef.current.onerror = () => {
          setListeningViaFallback(false);
          mediaRecorderRef.current?.stop();
        };
      } catch (e: any) {
        console.error("fallback mic error", e);
        alert("Microphone access denied or not available");
      }
    } else {
      // stop fallback recording
      mediaRecorderRef.current?.stop();
      wsRef.current?.close();
      setListeningViaFallback(false);
    }
  };

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <input
        aria-label="Chat input"
        value={displayedValue}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        style={{ flex: 1, padding: "8px 12px" }}
        placeholder="Type or use voice..."
      />
      <button
        onClick={handleMicClick}
        aria-pressed={isListening || listeningViaFallback}
        title={isSupported ? (isListening ? "Stop listening" : "Start voice input") : "Start fallback voice input"}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          background: isListening || listeningViaFallback ? "#e53935" : "#111827",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {isListening || listeningViaFallback ? "●" : "🎤"}
      </button>
      <button onClick={handleSend} style={{ padding: "8px 12px" }}>
        Send
      </button>
      {error && <div style={{ color: "crimson" }}>{error}</div>}
    </div>
  );
}