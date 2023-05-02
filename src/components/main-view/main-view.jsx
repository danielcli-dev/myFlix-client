import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Shawshank Redemption",
      Description:
        "Andy Dufresne (Tim Robbins) is sentenced to two consecutive life terms in prison for the murders of his wife and her lover and is sentenced to a tough prison. However, only Andy knows he didn't commit the crimes. While there, he forms a friendship with Red (Morgan Freeman), experiences brutality of prison life, adapts, helps the warden, etc., all in 19 years.",
      genre: {
        Name: "Drama",
        Description:
          "In film and television, drama is a category or genre of narrative fiction intended to be more serious than humorous in tone.",
      },
      image:
        "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg",
      director: {
        Name: "Frank Darabont",
        Bio: "Frank Árpád Darabont is a French-born American film director, screenwriter and producer. He has been nominated for three Academy Awards and a Golden Globe Award. In his early career, he was primarily a screenwriter for such horror films as A Nightmare on Elm Street 3: Dream Warriors, The Blob and The Fly II.",
        Birth: "1959",
        Death: null,
      },
    },
    {
      id: 2,
      title: "12 Angry Men",
      Description:
        "The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.",
      genre: {
        Name: "Drama",
        Description:
          "In film and television, drama is a category or genre of narrative fiction intended to be more serious than humorous in tone.",
      },
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/12_Angry_Men_%281957_film_poster%29.jpg/330px-12_Angry_Men_%281957_film_poster%29.jpg",
      director: {
        Name: "Sidney Lumet",
        Bio: "Sidney Arthur Lumet was an American film director. He was nominated five times for the Academy Award: four for Best Director for 12 Angry Men, Dog Day Afternoon, Network, and The Verdict and one for Best Adapted Screenplay for Prince of the City.",
        Birth: "1924",
        Death: "2011",
      },
    },
    {
      id: 3,
      title: "The Dark Knight",
      Description:
        "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      genre: {
        Name: "Action",
        Description:
          "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.",
      },
      image:
        "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg",
      director: {
        Name: "Christopher Nolan",
        Bio: "Christopher Edward Nolan CBE is a British-American filmmaker. Known for his Hollywood blockbusters with complex storytelling, Nolan is considered a leading filmmaker of the 21st century. His films have grossed $5 billion worldwide.",
        Birth: "1970",
        Death: null,
      },
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      <button
        onClick={() => {
          alert("Nice!");
        }}
      >
        Click me!
      </button>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        );
      })}
    </div>
  );
};

export default MainView;
