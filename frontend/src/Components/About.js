import React from "react";
import "./About.css";

const About = () => {
  const questions = [
    { question: "What is this project about?", answer: "An AI-powered research collaboration platform for seamless knowledge sharing" },
    { question: "Who is this platform for?", answer: "Researchers, students, and academics looking for smarter collaboration." },
    { question: "What features does it include?", answer: "AI recommendations, paper uploads, real-time chat, networking, and collaboration tools." },
    { question: "Why choose our platform?", answer: "It enhances research efficiency, connects experts, and streamlines collaboration." }
  ];

  return (
    <div className="about-container">
      <h1>Revolutionizing Research Collaboration and Discovery</h1>
      <p>Our platform empowers researchers by integrating advanced collaboration tools, 
        AI-driven insights, and seamless data sharing to accelerate innovation and discovery.
</p>
      <div className="cards-container">
        {questions.map((item, index) => (
          <div key={index} className="card1">
            <div className="card-inner">
              <div className="card-front">
                <h3>{item.question}</h3>
              </div>
              <div className="card-back">
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;