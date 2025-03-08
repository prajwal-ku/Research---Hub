import React from "react";
import { FaLinkedin, FaTwitter, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer py-3 mt-auto" style={{ backgroundColor: "#1E1E1E", color: "#FFFFFF" }}>
      <div className="container d-flex justify-content-between align-items-center flex-wrap">
        
        {/* Left Side: Copyright */}
        <div>
          <p className="mb-0 fw-bold">
            Copyright © 2025 <span className="fw-bold">Research Collaborate</span>. All rights reserved.
          </p>
        </div>

        {/* Right Side: Social Media Icons */}
        <div className="text-end">
          <p className="fw-bold mb-2 fs-5">Stay Connected</p>
          <div className="d-flex gap-3 justify-content-end">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={26} style={{ color: "#FFFFFF" }} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={26} style={{ color: "#FFFFFF" }} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={26} style={{ color: "#FFFFFF" }} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={26} style={{ color: "#FFFFFF" }} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube size={26} style={{ color: "#FFFFFF" }} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
