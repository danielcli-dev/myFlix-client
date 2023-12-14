import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { useSelector, useDispatch } from "react-redux";
import { setMovies, setSearchTerm } from "../../redux/reducers/movies";
import { setUser, setToken } from "../../redux/reducers/user";

export const MainView = () => {
  const storedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const storedToken = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const movies = useSelector((state) => state.movies.list);
  const searchTerm = useSelector((state) => state.movies.searchTerm);
  const [searchMovies, setSearchMovies] = useState([]);
  const [favorites, setFavorites] = useState(
    storedUser ? storedUser.FavoriteMovies : null
  );
  const [favoritesList, setFavoritesList] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    refreshUser();
  }, []);

  useEffect(() => {
    if (movies && favorites != null) {
      setFavoritesList(movies.filter((m) => favorites.includes(m.id)));
    }
  }, [movies, favorites]);

  useEffect(() => {
    if (movies) {
      let filteredMovies = movies.filter((movie) => {
        if (movie.title.toLowerCase().includes(searchTerm.toLowerCase())) {
          return movie;
        }
      });
      setSearchMovies(filteredMovies);
    }
  }, [movies, searchTerm]);

  // useEffect is for updating movies time the token is updated
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://cfdb-movie-api-59ec69f25db6.herokuapp.com/movies", {
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
        dispatch(setMovies(moviesFromApi));
        setHasLoaded(true);
      });
  }, [token]);

  const onLoggedIn = (user, token) => {
    setUser(user);
    setToken(token);
  };

  const onLoggedOut = () => {
    setUser("");
    setToken("");
    localStorage.clear();
  };

  const toggleFavoriteMovie = (movie) => {
    if (favorites.includes(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavoriteMovie(movie.id);
    }
  };

  const addFavoriteMovie = (movie) => {
    if (user) {
      fetch(
        `https://cfdb-movie-api-59ec69f25db6.herokuapp.com/users/${user.Username}/add/${movie}`,
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
    }
  };

  const removeFavorite = (movie) => {
    if (user) {
      fetch(
        `https://cfdb-movie-api-59ec69f25db6.herokuapp.com/users/${user.Username}/remove/${movie}`,
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
    }
  };

  const refreshUser = () => {
    if (user) {
      fetch(
        `https://cfdb-movie-api-59ec69f25db6.herokuapp.com/users/${user.Username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setFavorites(data.FavoriteMovies);
          } else {
            alert("Failed to refresh user");
          }
        })
        .catch((e) => {
          alert("Something went wrong with refreshUser");
        });
    }
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
                    <LoginView onLoggedIn={onLoggedIn} />
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
                    <MovieView
                      movies={movies}
                      favorites={favorites}
                      toggleFavoriteMovie={toggleFavoriteMovie}
                    />
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
                        favorites={favorites}
                        favoritesList={favoritesList}
                        onLoggedOut={onLoggedOut}
                        removeFavorite={removeFavorite}
                        toggleFavoriteMovie={toggleFavoriteMovie}
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
                ) : hasLoaded && movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    <div className="d-flex mb-3 justify-content-center">
                      <Container>
                        <Row>
                          <Col>
                            <Form.Group className="d-flex flex-row">
                              <Form.Control
                                type="text"
                                placeholder="What movie are you searching for?"
                                value={searchTerm}
                                onChange={(e) =>
                                  dispatch(setSearchTerm(e.target.value))
                                }
                              />
                              <Button
                                className="rounded mx-1"
                                onClick={setSearchTerm("")}
                              >
                                X
                              </Button>
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
                          toggleFavoriteMovie={toggleFavoriteMovie}
                          favorites={favorites}
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
