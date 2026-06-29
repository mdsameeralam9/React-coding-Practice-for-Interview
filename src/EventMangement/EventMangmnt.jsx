import React, { useMemo, useState } from "react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
const formatDateKey = (year, month, day) =>
  `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

export default function EventManagement() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    formatDateKey(today.getFullYear(), today.getMonth(), today.getDate()),
  );
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    time: "",
    location: "",
    date: selectedDate,
  });
  const [search, setSearch] = useState("");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const calendar = useMemo(() => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const cells = [];

    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let day = 1; day <= daysInMonth; day++) cells.push(day);

    return cells;
  }, [year, month]);

  const filteredEvents = useMemo(() => {
    return events
      .filter((e) => e.date === selectedDate)
      .filter((e) =>
        `${e.title} ${e.description} ${e.location} ${e.time}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      )
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [events, selectedDate, search]);

  const openAddModal = (dateKey) => {
    setEditingId(null);
    setForm({
      title: "",
      description: "",
      time: "",
      location: "",
      date: dateKey || selectedDate,
    });
    setShowModal(true);
  };

  const openEditModal = (event) => {
    setEditingId(event.id);
    setForm({
      title: event.title,
      description: event.description,
      time: event.time,
      location: event.location,
      date: event.date,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) return;

    if (editingId) {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === editingId ? { ...event, ...form } : event,
        ),
      );
    } else {
      setEvents((prev) => [...prev, { id: Date.now().toString(), ...form }]);
    }

    setSelectedDate(form.date);
    closeModal();
  };

  const handleDelete = (id) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isToday = (day) => {
    return (
      day &&
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate()
    );
  };

  const hasEventOnDay = (day) => {
    if (!day) return false;
    const key = formatDateKey(year, month, day);
    return events.some((event) => event.date === key);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.headerRow}>
          <button
            style={styles.addBtn}
            onClick={() => openAddModal(selectedDate)}
          >
            + Add Event
          </button>

          <div style={styles.monthNav}>
            <button style={styles.navBtn} onClick={goToPreviousMonth}>
              ‹
            </button>
            <div style={styles.monthTitle}>
              {months[month]} {year}
            </div>
            <button style={styles.navBtn} onClick={goToNextMonth}>
              ›
            </button>
          </div>
        </div>

        <div style={styles.calendar}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} style={styles.weekday}>
              {d}
            </div>
          ))}

          {calendar.map((day, index) => {
            const dateKey = day ? formatDateKey(year, month, day) : null;
            const selected = selectedDate === dateKey;

            return (
              <div
                key={index}
                style={{
                  ...styles.dayCell,
                  background: selected ? "#e8f3ff" : "white",
                  cursor: day ? "pointer" : "default",
                }}
                onClick={() => day && setSelectedDate(dateKey)}
              >
                {day && (
                  <>
                    <div style={styles.dayNumber}>{day}</div>
                    {isToday(day) && <div style={styles.todayDot}>Today</div>}
                    {hasEventOnDay(day) && <div style={styles.eventDot} />}
                    <button
                      style={styles.smallAddBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        openAddModal(dateKey);
                      }}
                    >
                      +
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <div style={styles.sidebar}>
          <div style={styles.sidebarTop}>
            <h3 style={styles.sidebarTitle}>Events</h3>
            <input
              style={styles.search}
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={styles.selectedDateText}>{selectedDate}</div>

          {filteredEvents.length === 0 ? (
            <div style={styles.emptyState}>No events for this day.</div>
          ) : (
            filteredEvents.map((event) => (
              <div key={event.id} style={styles.eventCard}>
                <div style={styles.eventHeader}>
                  <div>
                    <div style={styles.eventTitle}>{event.title}</div>
                    <div style={styles.eventMeta}>
                      {event.time} {event.location ? `• ${event.location}` : ""}
                    </div>
                  </div>
                  <div style={styles.eventActions}>
                    <button
                      style={styles.actionBtn}
                      onClick={() => openEditModal(event)}
                    >
                      Edit
                    </button>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => handleDelete(event.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {event.description && (
                  <div style={styles.eventDesc}>{event.description}</div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>
              {editingId ? "Edit Event" : "Add Event"}
            </h2>

            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                style={styles.input}
                placeholder="Event title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <input
                style={styles.input}
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              <input
                style={styles.input}
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              />
              <input
                style={styles.input}
                placeholder="Location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
              <input
                style={styles.input}
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />

              <div style={styles.modalActions}>
                <button
                  type="button"
                  style={styles.cancelBtn}
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" style={styles.saveBtn}>
                  {editingId ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f8",
    padding: "24px",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 320px",
    gap: "20px",
    alignItems: "start",
  },
  headerRow: {
    gridColumn: "1 / -1",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  addBtn: {
    background: "#22c55e",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
  monthNav: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "white",
    padding: "8px 12px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
  },
  navBtn: {
    width: "34px",
    height: "34px",
    borderRadius: "8px",
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontSize: "18px",
  },
  monthTitle: {
    minWidth: "120px",
    textAlign: "center",
    fontWeight: "700",
  },
  calendar: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    background: "white",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
  },
  weekday: {
    padding: "12px",
    background: "#f8fafc",
    borderBottom: "1px solid #e5e7eb",
    borderRight: "1px solid #e5e7eb",
    textAlign: "center",
    fontWeight: "700",
  },
  dayCell: {
    minHeight: "110px",
    borderRight: "1px solid #e5e7eb",
    borderBottom: "1px solid #e5e7eb",
    padding: "8px",
    position: "relative",
  },
  dayNumber: {
    fontWeight: "700",
    fontSize: "14px",
  },
  todayDot: {
    fontSize: "11px",
    color: "#2563eb",
    marginTop: "6px",
    fontWeight: "600",
  },
  eventDot: {
    width: "8px",
    height: "8px",
    background: "#22c55e",
    borderRadius: "50%",
    position: "absolute",
    bottom: "10px",
    left: "10px",
  },
  smallAddBtn: {
    position: "absolute",
    top: "8px",
    right: "8px",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    border: "none",
    background: "#e5e7eb",
    cursor: "pointer",
  },
  sidebar: {
    background: "white",
    borderRadius: "12px",
    padding: "16px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
  },
  sidebarTop: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  sidebarTitle: {
    margin: 0,
  },
  search: {
    padding: "10px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    outline: "none",
  },
  selectedDateText: {
    marginTop: "12px",
    marginBottom: "12px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
  },
  emptyState: {
    padding: "16px",
    background: "#f9fafb",
    borderRadius: "10px",
    color: "#6b7280",
  },
  eventCard: {
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "12px",
    marginBottom: "12px",
  },
  eventHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
  },
  eventTitle: {
    fontWeight: "700",
    marginBottom: "4px",
  },
  eventMeta: {
    fontSize: "13px",
    color: "#6b7280",
  },
  eventDesc: {
    marginTop: "8px",
    fontSize: "14px",
    color: "#374151",
  },
  eventActions: {
    display: "flex",
    gap: "8px",
    alignItems: "start",
  },
  actionBtn: {
    border: "none",
    background: "#f59e0b",
    color: "white",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  deleteBtn: {
    border: "none",
    background: "#ef4444",
    color: "white",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
    zIndex: 50,
  },
  modal: {
    width: "100%",
    maxWidth: "420px",
    background: "white",
    borderRadius: "14px",
    padding: "20px",
  },
  modalTitle: {
    marginTop: 0,
    marginBottom: "16px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    outline: "none",
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "8px",
  },
  cancelBtn: {
    border: "none",
    background: "#e5e7eb",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  saveBtn: {
    border: "none",
    background: "#2563eb",
    color: "white",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
