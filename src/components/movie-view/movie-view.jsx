import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((b) => b.id == movieId);

  return (
      <div>
        <div>
          <img className="px-3 pt-3 img-fluid" src={movie.image} alt={movie.title} />
        </div>
        <div>
          <span>Title:</span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.genre.Name}</span>
        </div>
        <div>
          <span>Description:</span>
          <span>{movie.description}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.director.Name}</span>
        </div>
        <div>
          <span>Bio: </span>

          <span>{movie.director.Bio}</span>
        </div>
        <div>
          <span>Birth: </span>

          <span>{movie.director.Birth}</span>
        </div>
        <div>
          <span>Death: </span>

          <span>{movie.director.Death}</span>
        </div>
        <div>
          <span>Actors: </span>
          <span>{movie.actors.Name}</span>
        </div>
        <div>
          <span>Featured: </span>
          <span>{movie.featured}</span>
        </div>
        <Link to="/">
          <button className="back-button">Back</button>
        </Link>
      </div>
  );
};
