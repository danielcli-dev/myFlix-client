export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.image} alt={movie.title} />
      </div>
      <div>
        <span>Title:</span>
        <span>{movie.title}</span>
      </div>{" "}
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
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
