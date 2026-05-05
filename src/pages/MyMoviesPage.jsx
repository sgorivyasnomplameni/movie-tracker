import { useState } from 'react'
import MovieForm from '../components/MovieForm'
import MovieList from '../components/MovieList'
import SearchBar from '../components/SearchBar'

function MyMoviesPage({ movies, onAdd, onDelete, onToggleWatched, onSaveEdit }) {
  const [searchText, setSearchText] = useState('')
  const [filterGenre, setFilterGenre] = useState('Все')
  const [showForm, setShowForm] = useState(false)
  const [editMovie, setEditMovie] = useState(null)

  const genres = ['Все', ...new Set(movies.map((movie) => movie.genre).filter(Boolean))]

  const filteredMovies = movies
    .filter((movie) => filterGenre === 'Все' || movie.genre === filterGenre)
    .filter((movie) =>
      movie.title.toLowerCase().includes(searchText.toLowerCase())
    )

  const handleStartCreate = () => {
    setEditMovie(null)
    setShowForm(true)
  }

  const handleStartEdit = (movie) => {
    setEditMovie(movie)
    setShowForm(true)
  }

  const handleCancel = () => {
    setEditMovie(null)
    setShowForm(false)
  }

  const handleSave = (movie) => {
    if (editMovie) {
      onSaveEdit(movie)
    } else {
      onAdd(movie)
    }

    setEditMovie(null)
    setShowForm(false)
  }

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <h2>Моя коллекция</h2>
          <p>
            Здесь можно хранить собственный список фильмов, искать по названию
            и отмечать просмотренные.
          </p>
        </div>

        <button className="add-btn" onClick={handleStartCreate}>
          + Добавить фильм
        </button>
      </div>

      <div className="controls">
        <SearchBar value={searchText} onChange={setSearchText} />

        <div className="genre-filter">
          {genres.map((genre) => (
            <button
              key={genre}
              className={
                filterGenre === genre ? 'filter-btn active' : 'filter-btn'
              }
              onClick={() => setFilterGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {showForm && (
        <MovieForm
          onSave={handleSave}
          onCancel={handleCancel}
          editData={editMovie}
        />
      )}

      {filteredMovies.length === 0 ? (
        <p className="empty-msg">Ничего не найдено. Попробуй другой запрос.</p>
      ) : (
        <MovieList
          movies={filteredMovies}
          onDelete={onDelete}
          onToggleWatched={onToggleWatched}
          onEdit={handleStartEdit}
        />
      )}
    </section>
  )
}

export default MyMoviesPage
