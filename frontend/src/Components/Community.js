import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Chat from "./Chat";
import UserList from "./UserList";

function Community() {
  return (
    <Container>
      <Row>
        <Col md={4}>
          <UserList />  {/* Show the User List in the left column */}
        </Col>
        <Col md={8}>
          <Chat />  {/* Show the Chat in the right column */}
        </Col>
      </Row>
    </Container>
  );
}

export default Community;
