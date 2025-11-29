import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../../styles/SportList.css";
import { FaUserTie, FaUsers, FaClipboardList, FaMedal } from "react-icons/fa";

export default function SportList() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventRes = await axios.get(`${import.meta.env.VITE_API_URL}/events/${eventId}`);
        setEvent(eventRes.data);

        const sportsRes = await axios.get(`${import.meta.env.VITE_API_URL}/sports/event/${eventId}`);
        setSports(sportsRes.data);

        // Master Leaderboard
        const teamPointsMap = {};
        for (let sport of sportsRes.data) {
          const matchesRes = await axios.get(`${import.meta.env.VITE_API_URL}/matches/sport/${sport.sportId}`);
          matchesRes.data.forEach(match => {
            // Team A points
            if (match.teamA) {
              teamPointsMap[match.teamA] = (teamPointsMap[match.teamA] || 0) + (match.scoreA || 0);
            }
            // Team B points
            if (match.teamB) {
              teamPointsMap[match.teamB] = (teamPointsMap[match.teamB] || 0) + (match.scoreB || 0);
            }
          });
        }

        // Convert to array and sort descending
        const leaderboardArr = Object.keys(teamPointsMap).map(team => ({
          team,
          points: teamPointsMap[team]
        })).sort((a, b) => b.points - a.points);

        setLeaderboard(leaderboardArr);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  if (loading)
    return (
      <div className="sport-loading-wrapper">
        <p className="loading-text">Loading sports and leaderboard...</p>
      </div>
    );

  if (!sports || sports.length === 0)
    return (
      <div className="sport-loading-wrapper">
        <p className="loading-text">No sports found for this event.</p>
      </div>
    );

  return (
    <div className="sport-wrapper">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>

        <div className="hero-content">
          <h1 className="hero-title">{event ? event.eventName : "Loading Event..."}</h1>
          <p className="hero-subtitle">
            Explore all sports for this event and check team details, matches, and overall leaderboard.
          </p>
        </div>
      </header>

      {/* Sport Cards Section */}
      <section className="sport-list-section">
        <div className="activity-count">
          <p>Total Sports: {sports.length}</p>
        </div>
        {/* Master Leaderboard */}
{/* Master Leaderboard */}
{/* {leaderboard.length > 0 && (
  <section className="leaderboard-section">
    <h2 className="leaderboard-title">Master Leaderboard</h2>
    <div className="leaderboard-grid">
      {leaderboard.map((team, idx) => (
        <div key={idx} className="leaderboard-card">
          <span className="rank">#{idx + 1}</span>
          <span className="team-name">{team.team}</span>
          <span className="points">{team.points} pts</span>
        </div>
      ))}
    </div>
  </section>
)} */}

        <div className="sport-grid">          
          {sports.map((sport) => (
            <div key={sport.sportId} className="sport-card">
              <h2 className="sport-title">{sport.sportName}</h2>
              <div className="sport-details">
                <p><FaClipboardList className="icon" /> Sport ID: {sport.sportId}</p>
                <p><FaUserTie className="icon" /> Gender Category: {sport.genderCategory}</p>
                <p><FaUsers className="icon" /> Age Category: {sport.ageCategory}</p>
                <p><strong>Top Places:</strong> {sport.topPlace}</p>
                <p><strong>Team Participants:</strong> {sport.teamParticipants}</p>
                {/* <p><strong>Captain:</strong> {sport.teamCaptain}</p> */}
                {/* <p><strong>Incharge:</strong> {sport.sportIncharge}</p> */}
                {/* <p><strong>Referee:</strong> {sport.sportReferee}</p> */}
                <p><strong>Comments:</strong> {sport.sportComments}</p>
                <p><strong>Teams:</strong> {sport.teamEntry?.length > 0 ? sport.teamEntry.join(", ") : "None"}</p>
                {/* <p><strong>Volunteers:</strong> {sport.sportVolunteers?.length > 0 ? sport.sportVolunteers.join(", ") : "None"}</p> */}
              </div>

              <Link
                to={`/events/${eventId}/sports/${sport.sportId}/matches`}
                className="view-btn"
              >
                View Matches
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
