import { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  Button,
  Card,
  Col,
  ListGroup,
  Form,
  Row,
  Container,
} from "react-bootstrap";
import { Link, Navigate, Redirect } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({
  user,
  token,
  onLoggedOut,
  favorites,
  favoritesList,
  refreshUser,
  removeFavorite,
  toggleFavoriteMovie,
}) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday.slice(0, 10));
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch(
      `https://cfdb-movie-api-59ec69f25db6.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (response.ok) {
        alert("Update successful");
        window.location.reload();
      } else {
        alert("Update failed");
      }
    });
  };

  const handleDeregister = (event) => {
    event.preventDefault();

    fetch(
      `https://cfdb-movie-api-59ec69f25db6.herokuapp.com/users/${user.Username}/deregister`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        alert("User deleted");
        window.location.reload();
      } else {
        alert("Deregister failed");
      }
    });

    onLoggedOut();
  };

  return (
    <Col lg={12}>
      <Form
        onSubmit={() => {
          var answer = window.confirm("Are you sure?");
          if (answer) {
            handleSubmit();
          } else {
            window.alert("Update cancelled");
          }
        }}
      >
        <Form.Group className="my-2" controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength="3"
            required
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="formPassword">
          <Form.Label>New Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button className="mt-2 mb-3" variant="success" type="submit">
          Update
        </Button>
      </Form>

      <Card>
        <Card.Body>
          <Card.Title>Your Profile</Card.Title>
          <Card.Text>Username: {user.Username}</Card.Text>
          <Card.Text>Email: {user.Email}</Card.Text>
          <Card.Text>Birthday: {user.Birthday}</Card.Text>
          <Card.Text>Favorite Movies: </Card.Text>
          <ListGroup as="ul">
            <Row className="justify-content-center">
              {favoritesList.map((movie) => {
                return (
                  <Col
                    xs={12}
                    sm={8}
                    md={6}
                    lg={4}
                    xl={3}
                    className="mb-4"
                    key={movie.id}
                  >
                    <MovieCard
                      movie={movie}
                      toggleFavoriteMovie={toggleFavoriteMovie}
                      favorites={favorites}
                    />
                  </Col>
                );
              })}
            </Row>
          </ListGroup>
        </Card.Body>
      </Card>

      <Button
        variant="danger"
        className="my-3"
        onClick={() => {
          var answer = window.confirm("Are you sure?");
          if (answer) {
            handleDeregister();
          } else {
            window.alert("Deregister cancelled");
          }
        }}
      >
        Deregister
      </Button>
    </Col>
  );
};
