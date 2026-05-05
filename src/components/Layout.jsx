import { NavLink } from 'react-router-dom'

function Layout({ totalMovies, watchedCount, children }) {
  return (
    <div className="app-shell">
      <div className="app-background" />

      <div className="app">
        <header className="app-header">
          <div>
            <p className="eyebrow">Movie Tracker</p>
            <h1>Мой кинотрекер</h1>
            <p className="subtitle">
              Личный список фильмов с сохранением данных и подборками из API
            </p>
          </div>

          <div className="stats-card">
            <span>Всего: {totalMovies}</span>
            <span>Просмотрено: {watchedCount}</span>
          </div>
        </header>

        <nav className="top-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Моя коллекция
          </NavLink>
          <NavLink
            to="/discover"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Подборки API
          </NavLink>
        </nav>

        <main>{children}</main>
      </div>
    </div>
  )
}

export default Layout
