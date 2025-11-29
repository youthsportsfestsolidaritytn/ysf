import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/RankBoard.css";

export default function EventRankBoard() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [rankBoard, setRankBoard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Fetch event details
    axios
      .get(`http://localhost:5000/api/events/${eventId}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error(err));

    // Fetch event rankboard (aggregated across sports)
    axios
      .get(`http://localhost:5000/api/rankboard/event/${eventId}`)
      .then((res) => setRankBoard(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [eventId]);

  if (loading)
    return (
      <div className="rank-loading-wrapper">
        <p className="loading-text">Loading event ranks...</p>
      </div>
    );

  if (!rankBoard || rankBoard.length === 0)
    return (
      <div className="rank-loading-wrapper">
        <p className="loading-text">No ranking data found.</p>
      </div>
    );

  return (
    <div className="rank-wrapper">
      <header className="hero-section">
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>

        <div className="hero-content">
          <h1 className="hero-title">{event ? event.eventName : "Loading Event..."}</h1>
          <p className="hero-subtitle">Master Rank Board</p>
        </div>
      </header>

      <section className="rank-section">
        <table className="rank-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Team</th>
              <th>Total Points</th>
            </tr>
          </thead>
          <tbody>
            {rankBoard.map((team, index) => (
              <tr key={team.teamName}>
                <td>{index + 1}</td>
                <td>{team.teamName}</td>
                <td>{team.totalPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
