import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import { logoutUser } from '../api/api'

export default function Navbar() {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutUser()
    } catch {}
    setUser(null)
    navigate('/')
  }

  return (
    <nav className="navbar navbar-dark bg-dark mb-4">
      <div className="container d-flex justify-content-between">
        <Link
          className="navbar-brand mb-0 h1 text-decoration-none"
          to="/"
          style={{ color: 'white' }}
        >
          PC Builder
        </Link>
        <div>
          {!user ? (
            <>
              <Link className="btn btn-outline-info me-2" to="/register">
                Регистрация
              </Link>
              <Link className="btn btn-outline-light" to="/login">
                Войти
              </Link>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-light me-2" to="/builds">
                Мои сборки
              </Link>
              <button className="btn btn-danger" onClick={handleLogout}>
                Выйти
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
