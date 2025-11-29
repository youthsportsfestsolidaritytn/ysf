import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import EventList from "../pages/Events/EventList";
import SportList from "../pages/Sports/SportList";
import MatchList from "../pages/Matches/MatchList";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/events/:eventId/sports" element={<SportList />} />
        <Route path="/events/:eventId/sports/:sportId/matches" element={<MatchList />} />
      </Routes>
    </Router>
  );
}