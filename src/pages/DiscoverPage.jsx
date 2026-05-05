import { useEffect, useState } from 'react'
import RecommendationCard from '../components/RecommendationCard'

const API_URL = 'https://ghibliapi.vercel.app/films'

function DiscoverPage({ movies, onAddFromApi }) {
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error('Не удалось загрузить фильмы')
        }

        const data = await response.json()
        const preparedMovies = data.slice(0, 8).map((film) => ({
          title: film.title,
          genre: 'Анимация',
          rating: Math.max(1, Math.min(10, Math.round(Number(film.rt_score) / 10))),
          watched: false,
          description: film.description,
          director: film.director,
          releaseYear: film.release_date,
        }))

        setRecommendations(preparedMovies)
      } catch {
        setError('Ошибка при загрузке подборки. Проверь подключение к интернету.')
      } finally {
        setLoading(false)
      }
    }

    loadRecommendations()
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <h2>Подборки из API</h2>
          <p>
            Эта страница загружает фильмы из внешнего API с помощью `fetch` и
            `useEffect`. Любой фильм можно добавить в общую коллекцию.
          </p>
        </div>
      </div>

      {loading && <p className="status-box">Загружаю рекомендации...</p>}
      {error && <p className="status-box error">{error}</p>}

      {!loading && !error && (
        <div className="recommendations-grid">
          {recommendations.map((movie) => {
            const isAdded = movies.some(
              (savedMovie) =>
                savedMovie.title.toLowerCase() === movie.title.toLowerCase()
            )

            return (
              <RecommendationCard
                key={movie.title}
                movie={movie}
                onAdd={onAddFromApi}
                isAdded={isAdded}
              />
            )
          })}
        </div>
      )}
    </section>
  )
}

export default DiscoverPage
