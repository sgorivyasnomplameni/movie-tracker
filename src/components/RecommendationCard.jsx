function RecommendationCard({ movie, onAdd, isAdded }) {
  return (
    <article className="recommendation-card">
      <div className="recommendation-top">
        <div>
          <p className="recommendation-year">{movie.releaseYear}</p>
          <h3>{movie.title}</h3>
        </div>
        <span className="genre-tag">{movie.genre}</span>
      </div>

      <p className="recommendation-meta">
        Режиссёр: {movie.director} • Рейтинг: {movie.rating}/10
      </p>

      <p className="recommendation-text">{movie.description}</p>

      <button
        className={isAdded ? 'api-btn added' : 'api-btn'}
        onClick={() => onAdd(movie)}
        disabled={isAdded}
      >
        {isAdded ? 'Уже в коллекции' : 'Добавить в мою коллекцию'}
      </button>
    </article>
  )
}

export default RecommendationCard
