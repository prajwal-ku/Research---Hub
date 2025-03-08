import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Container, Form, Button, ListGroup, InputGroup } from "react-bootstrap";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("botReply", (botMessage) => {
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    });

    socket.on("userTyping", (data) => {
      setTypingUsers((prevTypingUsers) => {
        return data.isTyping
          ? [...new Set([...prevTypingUsers, data.username])]
          : prevTypingUsers.filter((user) => user !== data.username);
      });
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("botReply");
      socket.off("userTyping");
    };
  }, []);

  const joinChat = () => {
    if (username.trim()) {
      socket.emit("joinChat", username);
      setIsJoined(true);
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      const userMessage = { user: username, text: message };
      socket.emit("sendMessage", userMessage);
      socket.emit("botReply", message); // Request bot reply
      setMessage("");
      socket.emit("userTyping", { username, isTyping: false });
    }
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    socket.emit("userTyping", { username, isTyping: e.target.value.length > 0 });
  };

  return (
    <Container className="mt-4">
      {!isJoined ? (
        <div className="text-center">
          <h2>Enter Your Name to Join Chat</h2>
          <Form.Control
            type="text"
            placeholder="Enter your name..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-3"
          />
          <Button variant="success" onClick={joinChat}>Join Chat</Button>
        </div>
      ) : (
        <>
          <h2 className="text-center my-3">Chat Room</h2>
          <ListGroup style={{ maxHeight: "300px", overflowY: "auto" }}>
            {messages.map((msg, index) => (
              <ListGroup.Item key={index} className={msg.user === "Bot" ? "text-primary" : "text-success"}>
                <strong>{msg.user}: </strong> {msg.text}
              </ListGroup.Item>
            ))}
          </ListGroup>
          
          {typingUsers.length > 0 && (
            <p className="text-muted">
              {typingUsers.join(", ")} {typingUsers.length === 1 ? "is" : "are"} typing...
            </p>
          )}

          <Form className="mt-3">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={handleTyping}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button variant="primary" onClick={sendMessage}>Send</Button>
            </InputGroup>
          </Form>
        </>
      )}
    </Container>
  );
};

export default Chat;