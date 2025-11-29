import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/RankBoard.css";

export default function SportRankBoard() {
  const { sportId } = useParams();
  const [sport, setSport] = useState(null);
  const [rankBoard, setRankBoard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Fetch sport details
    axios
      .get(`http://localhost:5000/api/sports/${sportId}`)
      .then((res) => setSport(res.data))
      .catch((err) => console.error(err));

    // Fetch sport rankboard
    axios
      .get(`http://localhost:5000/api/rankboard/sport/${sportId}`)
      .then((res) => setRankBoard(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [sportId]);

  if (loading)
    return (
      <div className="rank-loading-wrapper">
        <p className="loading-text">Loading sport ranks...</p>
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
          <h1 className="hero-title">{sport ? sport.sportName : "Loading Sport..."}</h1>
          <p className="hero-subtitle">Sport Rank Board</p>
        </div>
      </header>

      <section className="rank-section">
        <table className="rank-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Team</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {rankBoard.map((team, index) => (
              <tr key={team.teamName}>
                <td>{index + 1}</td>
                <td>{team.teamName}</td>
                <td>{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
