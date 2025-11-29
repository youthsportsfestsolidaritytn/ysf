// src/api/eventApi.js
import axios from "axios";

// Correct base URL (backend uses /api)
const API_URL = "http://localhost:5000/api";

// Get all events
export const getEvents = () => axios.get(`${API_URL}/events`);

// Get single event
export const getEvent = (id) => axios.get(`${API_URL}/events/${id}`);

// Create a new event
export const createEvent = (data) => axios.post(`${API_URL}/events`, data);

// Update an event
export const updateEvent = (id, data) => axios.put(`${API_URL}/events/${id}`, data);

// Delete an event
export const deleteEvent = (id) => axios.delete(`${API_URL}/events/${id}`);
