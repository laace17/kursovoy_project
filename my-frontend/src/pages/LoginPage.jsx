import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../api/api'
import { useAuth } from '../App'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { setUser } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await loginUser(email, password)
      setUser(data)
      navigate('/')
    } catch {
      setError('Неверный Email или пароль!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="bg-light d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div>
        <div className="mb-3">
          <Link to="/" className="btn btn-sm btn-outline-secondary text-decoration-none shadow-sm">
            &larr; Назад в каталог
          </Link>
        </div>

        <div className="card shadow p-4" style={{ width: 400 }}>
          <h3 className="text-center mb-4">Вход в систему</h3>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email адрес</label>
              <input
                type="email"
                className="form-control"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Пароль</label>
              <input
                type="password"
                className="form-control"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? 'Вход...' : 'Войти'}
            </button>
          </form>

          <div className="text-center mt-3">
            <Link to="/register" className="text-decoration-none">
              Нет аккаунта? Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
