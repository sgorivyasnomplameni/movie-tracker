import { useState } from 'react'
import MovieList from './components/MovieList'
import MovieForm from './components/MovieForm'
import SearchBar from './components/SearchBar'
import './App.css'

// начальные данные чтобы не было пусто при первом запуске
const startMovies = [
  { id: 1, title: 'Интерстеллар', genre: 'Фантастика', rating: 9, watched: true },
  { id: 2, title: 'Начало', genre: 'Триллер', rating: 8, watched: true },
  { id: 3, title: 'Дюна', genre: 'Фантастика', rating: 8, watched: false },
  { id: 4, title: 'Зеленая миля', genre: 'Драма', rating: 9, watched: true },
]

function App() {
  const [movies, setMovies] = useState(startMovies)
  const [searchText, setSearchText] = useState('')
  const [filterGenre, setFilterGenre] = useState('Все')
  const [showForm, setShowForm] = useState(false)
  const [editMovie, setEditMovie] = useState(null)

  // добавление нового фильма
  const handleAdd = (newMovie) => {
    const movieWithId = { ...newMovie, id: Date.now() }
    setMovies([...movies, movieWithId])
    setShowForm(false)
  }

  const handleDelete = (id) => {
    setMovies(movies.filter((m) => m.id !== id))
  }

  // переключаем просмотрен / не просмотрен
  const handleToggleWatched = (id) => {
    setMovies(
      movies.map((m) => (m.id === id ? { ...m, watched: !m.watched } : m))
    )
  }

  const handleEdit = (movie) => {
    setEditMovie(movie)
    setShowForm(true)
  }

  const handleSaveEdit = (updated) => {
    setMovies(movies.map((m) => (m.id === updated.id ? updated : m)))
    setEditMovie(null)
    setShowForm(false)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditMovie(null)
  }

  // получаем уникальные жанры для фильтра
  const genres = ['Все', ...new Set(movies.map((m) => m.genre))]

  // фильтрация: сначала по жанру, потом по поиску
  const filtered = movies
    .filter((m) => filterGenre === 'Все' || m.genre === filterGenre)
    .filter((m) => m.title.toLowerCase().includes(searchText.toLowerCase()))

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎬 Мои фильмы</h1>
        <p className="subtitle">Всего: {movies.length} | Просмотрено: {movies.filter(m => m.watched).length}</p>
      </header>

      <div className="controls">
        <SearchBar value={searchText} onChange={setSearchText} />

        <div className="genre-filter">
          {genres.map((g) => (
            <button
              key={g}
              className={filterGenre === g ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilterGenre(g)}
            >
              {g}
            </button>
          ))}
        </div>

        <button className="add-btn" onClick={() => setShowForm(true)}>
          + Добавить фильм
        </button>
      </div>

      {/* форма показывается только если showForm = true */}
      {showForm && (
        <MovieForm
          onAdd={handleAdd}
          onSave={handleSaveEdit}
          onCancel={handleCancelForm}
          editData={editMovie}
        />
      )}

      {filtered.length === 0 ? (
        <p className="empty-msg">Ничего не найдено</p>
      ) : (
        <MovieList
          movies={filtered}
          onDelete={handleDelete}
          onToggleWatched={handleToggleWatched}
          onEdit={handleEdit}
        />
      )}
    </div>
  )
}

export default App
