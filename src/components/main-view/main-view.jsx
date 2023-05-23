import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMovies, setSearchMovies] = useState([]);
  const [favorites, setFavorites] = useState(
    storedUser ? storedUser.FavoriteMovies : null
  );
  const [favoritesList, setFavoritesList] = useState([]);

  useEffect(() => {
    setFavoritesList(movies.filter((m) => favorites.includes(m.id)));
  }, [user, favorites]);

  useEffect(() => {
    if (movies) {
      let filteredMovies = movies.filter((movie) => {
        if (movie.title.toLowerCase().includes(searchTerm.toLowerCase())) {
          return movie;
        }
      });
      setSearchMovies(filteredMovies);
    }
  }, [movies]);

  // useEffect is for updating movies time the token is updated
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://cfdb-movie-api.herokuapp.com/movies", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = movies.map((doc) => {
          return {
            id: doc._id,
            genre: doc.Genre,
            director: doc.Director,
            actors: doc.Actors,
            title: doc.Title,
            description: doc.Description,
            image: doc.ImagePath,
            featured: doc.Featured,
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const addFavoriteMovie = (movie) => {
    fetch(
      `https://cfdb-movie-api.herokuapp.com/users/${user.Username}/add/${movie}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        refreshUser();
      } else {
        alert("Failed to remove movie");
      }
    });
  };

  const removeFavorite = (movie) => {
    fetch(
      `https://cfdb-movie-api.herokuapp.com/users/${user.Username}/remove/${movie}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          refreshUser();
        } else {
          alert("Failed to remove movie");
        }
      })
      .catch((err) => {
        alert("Something went wrong");
      });
  };

  const refreshUser = () => {
    fetch(`https://cfdb-movie-api.herokuapp.com/users/${user.Username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setUser(data);
          setFavorites(data.FavoriteMovies);
        } else {
          alert("Failed to refresh user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={onLoggedOut} />
      <Row className="justify-content-md-center px-3 py-2 px-lg-5 py-lg-3 bg-light">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}{" "}
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <>
                    <Col md={12} className="mb-5" key={user.id}>
                      <ProfileView
                        user={user}
                        token={token}
                        movies={movies}
                        favorites={favorites}
                        favoritesList={favoritesList}
                        onLoggedOut={onLoggedOut}
                        removeFavorite={removeFavorite}
                      />
                    </Col>
                  </>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    <div className="d-flex mb-3 justify-content-center">
                      <Container>
                        <Row className="">
                          <Col>
                            <Form.Group>
                              <Form.Control
                                type="text"
                                placeholder="What movie are you searching for?"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Container>
                    </div>

                    {searchMovies.map((movie) => (
                      <Col
                        xs={12}
                        sm={6}
                        className="mb-5"
                        key={movie.id}
                        md={3}
                      >
                        <MovieCard
                          movie={movie}
                          addFavoriteMovie={addFavoriteMovie}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

export default MainView;
