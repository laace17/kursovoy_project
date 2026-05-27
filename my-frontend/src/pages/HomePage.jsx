import { Link } from 'react-router-dom'
import { useAuth } from '../App'

export default function HomePage() {
  const { user, loading } = useAuth()

  return (
    <>
      <nav className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold">PC Builder</span>
        </div>
      </nav>

      <div className="d-flex align-items-center justify-content-center" style={{ height: '80vh' }}>
        <div
          className="bg-white p-5 rounded-4 shadow-sm text-center"
          style={{ maxWidth: 700 }}
        >
          <h1 className="fw-bold mb-3">Собери ПК своей мечты!</h1>
          <p className="text-muted mb-4 fs-5">
            Сохраняй свои конфигурации, проверяй совместимость деталей и управляй
            сборками в личном кабинете.
          </p>

          {!loading && (
            <>
              {!user ? (
                <div className="d-flex justify-content-center gap-3">
                  <Link to="/login" className="btn btn-primary px-4 py-2 fw-medium shadow-sm">
                    Войти в аккаунт
                  </Link>
                  <Link to="/register" className="btn btn-outline-primary px-4 py-2 fw-medium shadow-sm">
                    Регистрация
                  </Link>
                  <Link to="/catalog" className="btn btn-light border text-muted px-4 py-2 fw-medium shadow-sm">
                    Перейти в каталог
                  </Link>
                </div>
              ) : (
                <div className="d-flex justify-content-center gap-3">
                  <Link to="/catalog" className="btn btn-success px-4 py-2 fw-medium shadow-sm">
                    Перейти в Конфигуратор
                  </Link>
                  <Link to="/builds" className="btn btn-outline-success px-4 py-2 fw-medium shadow-sm">
                    Мои сборки
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
