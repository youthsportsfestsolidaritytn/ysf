import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/MatchList.css";
import { FaUsers, FaMapMarkerAlt, FaTrophy, FaClipboardList, FaMedal } from "react-icons/fa";

export default function MatchList() {
  const { sportId } = useParams();
  const [matches, setMatches] = useState([]);
  const [sport, setSport] = useState(null);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("matches");

  useEffect(() => {
    setLoading(true);

    axios.get(`${import.meta.env.VITE_API_URL}/sports/${sportId}`)
      .then((res) => {
        setSport(res.data);
        if (res.data.eventId) {
          axios.get(`${import.meta.env.VITE_API_URL}/events/${res.data.eventId}`)
            .then((resEvent) => setEvent(resEvent.data))
            .catch((err) => console.error("Event fetch error:", err));
        }
      })
      .catch((err) => console.error(err));

    axios.get(`${import.meta.env.VITE_API_URL}/matches/sport/${sportId}`)
      .then((res) => setMatches(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [sportId]);

  if (loading)
    return (
      <div className="match-loading-wrapper">
        <p className="loading-text">Loading matches...</p>
      </div>
    );

  if (!matches || matches.length === 0)
    return (
      <div className="match-loading-wrapper">
        <p className="loading-text">No matches found for this sport.</p>
      </div>
    );

  return (
    <div className="match-wrapper">
      <header className="hero-section">
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>

        <div className="hero-content">
          <h1 className="hero-title">{sport ? sport.sportName : "Loading Sport..."}</h1>
          <p className="hero-subtitle">
            {event ? event.eventName : "Loading Event..."}
          </p>
        </div>
      </header>

      <div className="tab-buttons">
        <button
          className={activeTab === "matches" ? "active" : ""}
          onClick={() => setActiveTab("matches")}
        >
          Matches
        </button>
        <button
          className={activeTab === "leaderboard" ? "active" : ""}
          onClick={() => setActiveTab("leaderboard")}
        >
          Leaderboard
        </button>
      </div>

      {activeTab === "matches" && (
        <section className="match-list-section">
          <div className="match-grid">
            {matches.map((match) => (
              <div key={match.matchId} className="match-card">
                <h2 className="match-title">{match.matchName}</h2>
                <div className="match-details">
                  <p><FaClipboardList className="icon" /> Match ID: {match.matchId}</p>
                  <p><FaMapMarkerAlt className="icon" /> Venue: {match.venue}</p>
                  <p><FaTrophy className="icon" /> Max Points: {match.maxPoints}</p>
                  <p><FaUsers className="icon" /> Teams: {match.teamA} ({match.scoreA}) vs {match.teamB} ({match.scoreB})</p>
                  <p><strong>Winner:</strong> {match.winner || "TBD"}</p>
                  <p><strong>Runner-up:</strong> {match.runner || "TBD"}</p>
                  <p><strong>Comments:</strong> {match.matchComment || "None"}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === "leaderboard" && (
        <section className="leaderboard-section">
          <h2 className="leaderboard-title">Leaderboard</h2>
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match, index) => (
                <tr key={match.matchId}>
                  <td>{index + 1}</td>
                  <td>{match.teamA}</td>
                  <td>{match.scoreA}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}