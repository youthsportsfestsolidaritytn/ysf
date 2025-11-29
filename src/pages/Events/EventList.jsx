import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/EventList.css";
import { FaCalendarAlt, FaUserTie, FaClipboardList } from "react-icons/fa";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/events`)
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="event-loading-wrapper">
        <p className="loading-text">Loading events...</p>
      </div>
    );

  if (!events || events.length === 0)
    return (
      <div className="event-loading-wrapper">
        <p className="loading-text">No events found</p>
      </div>
    );

  return (
    <div className="event-wrapper">

      {/* Hero Section (same as Home) */}
      <header className="hero-section">
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>

        <div className="hero-content">
          <h1 className="hero-title">All Sports Events</h1>
          <p className="hero-subtitle">
            Browse upcoming sports events, schedules, and team details.
          </p>
        </div>
      </header>
      
      {/* Event Cards */}
      <section className="event-list-section">
        <div className="event-count">
          <p>Total Events: {events.length}</p>
        </div>

        <div className="event-grid">
          {events.map((event) => (
            <div key={event.eventId} className="event-card">
              <h2 className="event-title">{event.eventName}</h2>
              {/* <p className="event-season">Season {event.seasonNo}</p> */}

              <div className="event-details">
                <p><FaCalendarAlt className="icon" /> {new Date(event.startDate).toDateString()} - {new Date(event.endDate).toDateString()}</p>
                <p><FaUserTie className="icon" /> Incharge: {event.eventIncharge}</p>
                <p><FaClipboardList className="icon" /> Status: {event.eventStatus}</p>
                {event.eventComments && <p className="comments">"{event.eventComments}"</p>}
              </div>

              <Link to={`/events/${event.eventId}/sports`} className="view-btn">
                View Sports
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
