import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import ContactUs from "./Components/ContactUs";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import Footer from "./Components/Footer";
import Chatbot from "./Components/Chatbot";
import ExplorePage from "./Components/ExplorePage";
import UserList from './Components/UserList';
import Profile from './Components/Profile';
import Chat from './Components/Chat';

function Layout() {
  const location = useLocation();

  // Hide Navbar only on the Dashboard page
  const hideNavbar = location.pathname === "/dashboard";

  // Hide Footer on Dashboard, Login, and Register pages
  const hideFooterOn = ["/dashboard", "/login", "/register"];
  const shouldShowFooter = !hideFooterOn.includes(location.pathname);

  return (
    <div className="d-flex flex-column min-vh-100">
      {!hideNavbar && <Navbar />} {/* Navbar visible on all pages except Dashboard */}
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/explorepage" element={<ExplorePage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/userlist" element={<UserList />} />
        </Routes>
      </div>
      {shouldShowFooter && <Footer />} {/* Footer hidden on Dashboard, Login, and Register */}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
      <div className="container mt-4">
        <Chatbot /> {/* ✅ Chatbot Integrated */}
      </div>
    </Router>
  );
}

export default App;