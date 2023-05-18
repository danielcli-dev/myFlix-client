import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie, addFavoriteMovie }) => {
  return (
    <Card className="h-100 justify-content-between">
      <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
        <Card.Img variant="top" src={movie.image} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.director.Name}</Card.Text>
        </Card.Body>
      </Link>

      <Button
        variant="primary"
        onClick={() => {
          addFavoriteMovie(movie.id);
        }}
      >
        Add to Favorites
      </Button>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
    director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string,
    }),
    actors: PropTypes.array,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    Image: PropTypes.string,
    featured: PropTypes.bool,
  }).isRequired,
};
