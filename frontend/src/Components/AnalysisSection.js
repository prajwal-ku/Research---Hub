import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Search } from "lucide-react";

// Example of year-wise research data
const researchData = [
  { year: 2021, domain: "AI", papers: 320 },
  { year: 2021, domain: "Blockchain", papers: 210 },
  { year: 2021, domain: "Quantum Computing", papers: 180 },
  { year: 2021, domain: "Cybersecurity", papers: 250 },
  { year: 2021, domain: "Biotechnology", papers: 150 },
  { year: 2022, domain: "AI", papers: 350 },
  { year: 2022, domain: "Blockchain", papers: 230 },
  { year: 2022, domain: "Quantum Computing", papers: 200 },
  { year: 2022, domain: "Cybersecurity", papers: 270 },
  { year: 2022, domain: "Biotechnology", papers: 170 },
  { year: 2023, domain: "AI", papers: 400 },
  { year: 2023, domain: "Blockchain", papers: 250 },
  { year: 2023, domain: "Quantum Computing", papers: 220 },
  { year: 2023, domain: "Cybersecurity", papers: 290 },
  { year: 2023, domain: "Biotechnology", papers: 180 },
];

const AnalysisSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showContent, setShowContent] = useState(false); // State to control content visibility

  // Function to handle search button click
  const handleSearch = () => {
    const result = researchData.filter((item) =>
      item.domain.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(result);

    // Set flag to show content after search
    if (searchTerm) {
      setShowContent(true);
    }
  };

  // Function to get research paper links based on domain
  const getResearchPaperLinks = (domain) => {
    const paperLinks = {
      AI: [
        { title: "Deep Learning for AI: A Comprehensive Review", link: "https://arxiv.org/abs/1702.08432" },
        { title: "AI in Healthcare: Past, Present, and Future", link: "https://pubmed.ncbi.nlm.nih.gov/30748287/" }
      ],
      Blockchain: [
        { title: "Blockchain Technology: Beyond Bitcoin", link: "https://www.sciencedirect.com/science/article/pii/S1877050919314077" },
        { title: "Blockchain-Based Decentralized Applications", link: "https://ieeexplore.ieee.org/document/9233947" }
      ],
      "Quantum Computing": [
        { title: "Quantum Computing for Computer Architects", link: "https://ieeexplore.ieee.org/document/8970735" },
        { title: "Quantum Machine Learning: A Survey", link: "https://arxiv.org/abs/1807.03647" }
      ],
      Cybersecurity: [
        { title: "The Role of AI in Cybersecurity", link: "https://ieeexplore.ieee.org/document/9396348" },
        { title: "Cybersecurity in the Age of AI", link: "https://pubmed.ncbi.nlm.nih.gov/29211523/" }
      ],
      Biotechnology: [
        { title: "Applications of Biotechnology in Healthcare", link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5793041/" },
        { title: "Biotechnology for Sustainable Agriculture", link: "https://www.sciencedirect.com/science/article/pii/S0022103121000355" }
      ]
    };

    return paperLinks[domain] || [];
  };

  // Prepare pie chart data by year for the searched domain
  const preparePieChartData = (domain) => {
    const data = researchData
      .filter((item) => item.domain === domain)
      .map((item) => ({
        name: item.year,
        value: item.papers,
      }));

    return data;
  };

  const styles = {
    container: {
      maxWidth: '1000px',
      margin: 'auto',
      marginTop: '40px',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      textAlign: 'center',
      color: '#333',
    },
    searchWrapper: {
      marginBottom: '30px',
      display: 'flex',
      alignItems: 'center',
      border: '1px solid #d1d1d1',
      borderRadius: '10px',
      overflow: 'hidden',
      backgroundColor: '#f8f8f8',
    },
    searchInput: {
      flexGrow: 1,
      padding: '12px',
      border: 'none',
      outline: 'none',
      backgroundColor: 'transparent',
      color: '#4A4A4A',
      fontSize: '16px',
    },
    searchButton: {
      padding: '12px',
      backgroundColor: '#007BFF',
      border: 'none',
      color: '#fff',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    chartContainer: {
      width: '100%',
      height: '300px',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      padding: '15px',
      marginBottom: '30px',
    },
    noDataText: {
      textAlign: 'center',
      color: '#9E9E9E',
      marginTop: '20px',
      fontSize: '16px',
    },
    papersList: {
      marginTop: '40px',
    },
    paperItem: {
      marginBottom: '10px',
      padding: '10px',
      backgroundColor: '#f1f1f1',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
  };

  const COLORS = ['#4A90E2', '#F5A623', '#D0021B', '#7ED321', '#9013FE'];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>ResearchHub Year-wise Domain Analysis</h2>

      {/* Search Bar */}
      <div style={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Search research domain..."
          style={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          style={styles.searchButton}
          title="Search"
        >
          <Search className="w-6 h-6" />
        </button>
      </div>

      {/* Show Pie Chart and Paper Links Only Once After Search */}
      {showContent && filteredData.length > 0 && searchTerm && (
        <div>
          {/* Only show for the first matched domain */}
          <div key={filteredData[0].domain}>
            {/* Pie Chart */}
            <div style={styles.chartContainer}>
              <h3 style={{ textAlign: 'center' }}>{`Analysis for ${filteredData[0].domain}`}</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={preparePieChartData(filteredData[0].domain)}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="60%"
                    fill="#8884d8"
                  >
                    {preparePieChartData(filteredData[0].domain).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Research Paper Links */}
            <div style={styles.papersList}>
              <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>Research Papers</h3>
              {getResearchPaperLinks(filteredData[0].domain).map((link, idx) => (
                <div key={idx} style={styles.paperItem}>
                  <a href={link.link} target="_blank" rel="noopener noreferrer">
                    {link.title}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* No data message if no search term */}
      {showContent && filteredData.length === 0 && (
        <p style={styles.noDataText}>No data found for the searched domain. Please try another domain.</p>
      )}
    </div>
  );
};

export default AnalysisSection;
