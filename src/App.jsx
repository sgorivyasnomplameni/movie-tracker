import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import DiscoverPage from './pages/DiscoverPage'
import MyMoviesPage from './pages/MyMoviesPage'
import './App.css'

const startMovies = [
  { id: 1, title: 'Интерстеллар', genre: 'Фантастика', rating: 9, watched: true },
  { id: 2, title: 'Начало', genre: 'Триллер', rating: 8, watched: true },
  { id: 3, title: 'Дюна', genre: 'Фантастика', rating: 8, watched: false },
  { id: 4, title: 'Зеленая миля', genre: 'Драма', rating: 9, watched: true },
]

const STORAGE_KEY = 'movie-tracker-movies'

function App() {
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem(STORAGE_KEY)

    if (!savedMovies) {
      return startMovies
    }

    try {
      return JSON.parse(savedMovies)
    } catch {
      return startMovies
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies))
  }, [movies])

  const handleAdd = (newMovie) => {
    const movieWithId = { ...newMovie, id: Date.now() }
    setMovies((currentMovies) => [...currentMovies, movieWithId])
  }

  const handleDelete = (id) => {
    setMovies((currentMovies) =>
      currentMovies.filter((movie) => movie.id !== id)
    )
  }

  const handleToggleWatched = (id) => {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === id ? { ...movie, watched: !movie.watched } : movie
      )
    )
  }

  const handleEdit = (movie) => {
    setMovies((currentMovies) =>
      currentMovies.map((currentMovie) =>
        currentMovie.id === movie.id ? movie : currentMovie
      )
    )
  }

  const handleAddFromApi = (movieFromApi) => {
    const alreadyExists = movies.some(
      (movie) => movie.title.toLowerCase() === movieFromApi.title.toLowerCase()
    )

    if (alreadyExists) {
      return false
    }

    setMovies((currentMovies) => [
      { ...movieFromApi, id: Date.now() },
      ...currentMovies,
    ])
    return true
  }

  const watchedCount = movies.filter((movie) => movie.watched).length

  return (
    <Layout totalMovies={movies.length} watchedCount={watchedCount}>
      <Routes>
        <Route
          path="/"
          element={
            <MyMoviesPage
              movies={movies}
              onAdd={handleAdd}
              onDelete={handleDelete}
              onToggleWatched={handleToggleWatched}
              onSaveEdit={handleEdit}
            />
          }
        />
        <Route
          path="/discover"
          element={
            <DiscoverPage movies={movies} onAddFromApi={handleAddFromApi} />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

export default App
