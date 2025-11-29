import "../../styles/Home.css";
import { Link } from "react-router-dom";
import { FaRunning, FaUsers, FaMedal, FaCalendarAlt } from "react-icons/fa";
import LogoImage from "../../../assets/logo.png"; // <-- import logo image

export default function Home() {
  return (
    <div className="home-wrapper">

      {/* Hero Section */}
      <header className="hero-section">
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        
        <div className="hero-content">
          {/* Logo */}
          <img src={LogoImage} alt="SSA Logo" className="hero-logo" />
          {/* <h1 className="hero-title">Solidarity Sports Association</h1> */}
          <p className="hero-subtitle">
            Where passion meets performance. Join us for thrilling sports events and competitions.
          </p>
          
          <div className="hero-buttons">
            <Link to="/events" className="primary-btn">View Events</Link>
            {/* <Link to="/sports" className="secondary-btn">Explore Sports</Link> */}
          </div>
        </div>
      </header>

      {/* Story Section */}
      <section className="story-section">
        <h2 className="section-title">Story Line</h2>
        <p>
          In a world where competition often overshadows connection, the Solidarity Sports Association (SSA)
          was born from a simple yet powerful belief - that true victory lies in unity. Founded by a collective
          of athletes, coaches, and community leaders, SSA was created to break barriers, promote inclusion,
          and celebrate the unifying spirit of sport.
        </p>
        <p>
          From neighborhood playgrounds to international arenas, SSA champions the idea that sports are more
          than games - they are a bridge between people, cultures, and generations. Every event, every match,
          and every initiative is built on three pillars: Solidarity, Strength, and Sportsmanship.
        </p>
        <p>
          The emblem - a radiant golden flower encircled by laurels - symbolizes growth, teamwork, and achievement
          through harmony. The bold colors of blue and gold reflect trust, excellence, and passion. Together,
          they remind every participant that when we move as one, we rise as one.
        </p>
        <p>
          Today, the Solidarity Sports Association stands not only as a hub for athletes but as a movement -
          empowering youth, building communities, and inspiring global togetherness through the language of sport.
        </p>
      </section>

      {/* Highlights Section */}
      <section className="highlights-section">
        <h2 className="section-title">What You Can Do</h2>
        <div className="highlight-grid">
          <div className="highlight-card">
            <FaCalendarAlt className="highlight-icon" />
            <h3>Events</h3>
            <p>Browse all active sports events, schedules, and details in one place.</p>
          </div>
          <div className="highlight-card">
            <FaRunning className="highlight-icon" />
            <h3>Sports</h3>
            <p>View all registered sports categories, teams, and participants.</p>
          </div>
          <div className="highlight-card">
            <FaMedal className="highlight-icon" />
            <h3>Matches</h3>
            <p>Track live match scores, final results, and updated fixtures.</p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>12</h3>
            <p>Events</p>
          </div>
          <div className="stat-card">
            <h3>8</h3>
            <p>Sports</p>
          </div>
          <div className="stat-card">
            <h3>45</h3>
            <p>Matches</p>
          </div>
          <div className="stat-card">
            <h3>300+</h3>
            <p>Participants</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Us</h2>
        <div className="features-grid">
          <div className="highlight-card">
            <h3>Easy Management</h3>
            <p>Administer events and matches efficiently with a simple interface.</p>
          </div>
          <div className="highlight-card">
            <h3>Real-Time Updates</h3>
            <p>Get live scores, results, and team standings instantly.</p>
          </div>
          <div className="highlight-card">
            <h3>Team Coordination</h3>
            <p>Track participants, teams, and volunteers in one place.</p>
          </div>
          <div className="highlight-card">
            <h3>Analytics</h3>
            <p>Gain insights into performance, attendance, and sports trends.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2 className="cta-title">Get Started Today!</h2>
        <p className="cta-text">
          Join thousands of participants and make your sports events memorable.
        </p>
        <Link to="/events" className="cta-btn">Explore Events</Link>
      </section>

    </div>
  );
}
