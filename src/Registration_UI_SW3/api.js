const API_BASE_URL = "http://localhost:8000/api/v1/peopleProfile";
const REFRESH_TOKEN_URL = `${API_BASE_URL}/refresh-token`;
let refreshRequest;

async function parseResponse(response) {
  const responseText = await response.text();
  let data;

  if (responseText) {
    try {
      data = JSON.parse(responseText);
    } catch {
      if (response.ok) {
        throw new Error("The server returned an invalid response.");
      }
      data = responseText;
    }
  }

  if (!response.ok) {
    const message =
      typeof data === "string"
        ? data
        : data?.message || data?.error || `Request failed (${response.status}).`;
    throw new Error(message);
  }

  return data;
}

async function refreshSession() {
  if (!refreshRequest) {
    refreshRequest = fetch(REFRESH_TOKEN_URL, {
      method: "POST",
      credentials: "include",
    })
      .then(parseResponse)
      .finally(() => {
        refreshRequest = null;
      });
  }

  return refreshRequest;
}

async function request(path, options = {}, allowRefresh = true) {
  let response = await fetch(path, {
    credentials: "include",
    ...options,
  });

  if (response.status === 401 && allowRefresh) {
    await refreshSession();
    response = await fetch(path, {
      credentials: "include",
      ...options,
    });
  }

  return parseResponse(response);
}

export function registerUser({ name, email, password, profileImageBase64 }) {
  return request(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, profileImageBase64 }),
  }, false);
}

export function loginUser({ email, password }) {
  return request(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }, false);
}

export function logoutUser() {
  return request(`${API_BASE_URL}/logout`, { method: "POST" }, false);
}

export function getProfile() {
  return request(`${API_BASE_URL}/profile`);
}
