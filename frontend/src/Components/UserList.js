import React from "react";
import { ListGroup, Container, Badge, Image } from "react-bootstrap";

const users = [
  { id: 1, name: "Alice Johnson", status: "online", avatar: "https://i.pravatar.cc/50?img=1" },
  { id: 2, name: "Bob Smith", status: "offline", avatar: "https://i.pravatar.cc/50?img=2" },
  { id: 3, name: "Charlie Brown", status: "online", avatar: "https://i.pravatar.cc/50?img=3" },
  { id: 4, name: "David Miller", status: "offline", avatar: "https://i.pravatar.cc/50?img=4" },
  { id: 5, name: "Emily Davis", status: "online", avatar: "https://i.pravatar.cc/50?img=5" },
];

const UserList = () => {
  return (
    <Container className="mt-4">
      <h2>User List</h2>
      <ListGroup>
        {users.map((user) => (
          <ListGroup.Item key={user.id} className="d-flex align-items-center">
            <Image src={user.avatar} roundedCircle width={40} height={40} className="me-3" />
            <div className="flex-grow-1">
              <strong>{user.name}</strong>
            </div>
            <Badge bg={user.status === "online" ? "success" : "secondary"}>
              {user.status}
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default UserList;