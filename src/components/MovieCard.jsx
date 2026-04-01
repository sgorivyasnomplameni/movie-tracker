function MovieCard({ movie, onDelete, onToggleWatched, onEdit }) {
  const stars = '★'.repeat(movie.rating) + '☆'.repeat(10 - movie.rating)

  return (
    <div className={`movie-card ${movie.watched ? 'watched' : ''}`}>
      <div className="card-top">
        <h3 className="movie-title">{movie.title}</h3>
        <span className="genre-tag">{movie.genre}</span>
      </div>

      <div className="rating">{stars}</div>

      <div className="card-bottom">
        <label className="watched-label">
          <input
            type="checkbox"
            checked={movie.watched}
            onChange={() => onToggleWatched(movie.id)}
          />
          {movie.watched ? 'Просмотрен' : 'Не просмотрен'}
        </label>

        <div className="card-actions">
          <button className="btn-edit" onClick={() => onEdit(movie)}>
            Изменить
          </button>
          <button className="btn-delete" onClick={() => onDelete(movie.id)}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
