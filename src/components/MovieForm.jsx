import { useState, useEffect } from 'react'

const emptyForm = { title: '', genre: '', rating: 5, watched: false }

function MovieForm({ onAdd, onSave, onCancel, editData }) {
  const [form, setForm] = useState(emptyForm)

  // если передали editData — заполняем форму данными фильма
  useEffect(() => {
    if (editData) {
      setForm(editData)
    } else {
      setForm(emptyForm)
    }
  }, [editData])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return

    if (editData) {
      onSave(form)
    } else {
      onAdd({ ...form, rating: Number(form.rating) })
    }
  }

  return (
    <div className="form-overlay">
      <form className="movie-form" onSubmit={handleSubmit}>
        <h2>{editData ? 'Редактировать фильм' : 'Новый фильм'}</h2>

        <label>
          Название
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Название фильма"
            required
          />
        </label>

        <label>
          Жанр
          <input
            type="text"
            name="genre"
            value={form.genre}
            onChange={handleChange}
            placeholder="Например: Драма"
          />
        </label>

        <label>
          Оценка: {form.rating}
          <input
            type="range"
            name="rating"
            min="1"
            max="10"
            value={form.rating}
            onChange={handleChange}
          />
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="watched"
            checked={form.watched}
            onChange={handleChange}
          />
          Уже просмотрен
        </label>

        <div className="form-buttons">
          <button type="submit" className="btn-save">
            {editData ? 'Сохранить' : 'Добавить'}
          </button>
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Отмена
          </button>
        </div>
      </form>
    </div>
  )
}

export default MovieForm
