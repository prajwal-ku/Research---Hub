import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [summary, setSummary] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  // Handle file change (PDF selection)
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadMessage(`📂 Selected File: ${selectedFile.name}`);
    }
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (!file) {
      setUploadMessage("❌ Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("❌ You must be logged in.");
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setUploadMessage("✅ File uploaded successfully!");
        if (result.extractedText) {
          setExtractedText(result.extractedText); // Display extracted text from the uploaded PDF
        } else {
          setUploadMessage("✅ File uploaded successfully!");
        }
      } else {
        setUploadMessage(`❌ Upload failed: ${result.error || "Unknown error"}`);
      }
    } catch (error) {
      setUploadMessage("❌ An error occurred while uploading.");
    }
  };

  // Submit extracted text to Gemini API for summarization
  const handleSummarize = async () => {
    if (!extractedText) {
      setUploadMessage("❌ Please enter the text for summarization.");
      return;
    }

    try {
      const summaryResponse = await fetch("http://localhost:5000/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paperContent: extractedText }),
      });

      const summaryData = await summaryResponse.json();
      setSummary(summaryData.summary || "❌ Failed to generate summary.");
    } catch (error) {
      console.error("Error fetching summary:", error);
      setSummary("❌ Failed to generate summary.");
    }
  };

  // Handle search for recommendations
  const fetchRecommendations = async () => {
    if (!searchQuery) {
      setUploadMessage("❌ Please enter a topic to search.");
      return;
    }

    try {
      const recommendResponse = await fetch("http://localhost:5000/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInterest: searchQuery }),
      });

      const recommendData = await recommendResponse.json();
      setRecommendations(recommendData.recommendations.split("\n"));
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center px-4 py-2 bg-dark text-white">
        <h2>Welcome to Research-Hub Explore Your Knowledge</h2>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>

      <div className="container mt-4">
        <div className="row">
          {/* Left Section - File Upload */}
          <div className="col-md-4">
            <h3>Upload Research Paper</h3>
            <div className="card p-3 shadow">
              <input type="file" className="form-control mb-2" onChange={handleFileChange} />
              <button className="btn btn-primary" onClick={handleFileUpload}>Upload</button>
            </div>
            {uploadMessage && <p className="mt-3">{uploadMessage}</p>}
          </div>

          {/* Right Section - AI Summary & Recommendations */}
          <div className="col-md-8">
            <h3>Input Text</h3>
            <div className="card p-3 shadow mb-3">
              <textarea
                className="form-control"
                rows="8"
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                placeholder="The extracted text from your research paper will appear here."
              />
            </div>

            <h3>AI Summary</h3>
            <div className="card p-3 shadow mb-3">
              <button className="btn btn-success" onClick={handleSummarize}>Generate Summary</button>
            </div>
            {summary && (
              <div className="card p-3 shadow mb-3">
                <h4>Summary:</h4>
                <p>{summary}</p>
              </div>
            )}

            <h3>Search for Research Papers</h3>
            <div className="card p-3 shadow mb-3">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter a topic (e.g., Artificial Intelligence)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-primary" onClick={fetchRecommendations}>Search</button>
            </div>

            <h3>Recommended Research Papers</h3>
            <div className="card p-3 shadow">
              {recommendations.length > 0 ? (
                <ul>
                  {recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              ) : (
                <p>Search for research papers to get recommendations.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
