import React from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";

const users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    bio: "Software Engineer | Tech Enthusiast | Traveler",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    location: "New York, USA",
    joined: "January 2022",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Full Stack Developer | AI Enthusiast | Blogger",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    location: "San Francisco, USA",
    joined: "March 2021",
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    bio: "UI/UX Designer | Illustrator | Coffee Lover",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    location: "London, UK",
    joined: "July 2023",
  }
  
];

const Profile = () => {
  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">User Profiles</h2>
      <Row>
        {users.map((user) => (
          <Col key={user.id} md={6} lg={4} className="mb-4">
            <Card style={{ width: "100%", textAlign: "center", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
              <Card.Img 
                variant="top" 
                src={user.avatar} 
                style={{ 
                  width: "150px", 
                  height: "150px", 
                  borderRadius: "50%", 
                  objectFit: "cover", 
                  margin: "20px auto" 
                }} 
              />
              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
                <Card.Text>{user.bio}</Card.Text>
                <p><strong>Location:</strong> {user.location}</p>
                <p><strong>Joined:</strong> {user.joined}</p>
                <Button variant="primary">View Profile</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Profile;