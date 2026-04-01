import MovieCard from './MovieCard'

function MovieList({ movies, onDelete, onToggleWatched, onEdit }) {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onDelete={onDelete}
          onToggleWatched={onToggleWatched}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}

export default MovieList
