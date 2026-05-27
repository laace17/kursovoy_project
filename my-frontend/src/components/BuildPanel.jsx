import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../App'

const SLOTS = [
  { type: 'CPU', label: 'CPU', icon: '/images/icons/cpu.png', placeholder: 'Не выбран' },
  { type: 'MOTHERBOARD', label: 'M/B', icon: '/images/icons/motherboard.png', placeholder: 'Не выбрана' },
  { type: 'GPU', label: 'GPU', icon: '/images/icons/vcard.png', placeholder: 'Не выбрана' },
  { type: 'RAM', label: 'RAM', icon: '/images/icons/ram.png', placeholder: 'Не выбрана' },
  { type: 'COOLER', label: 'Охлад', icon: '/images/icons/cooler.png', placeholder: 'Не выбрано' },
  { type: 'STORAGE', label: 'SSD', icon: '/images/icons/ssd.png', placeholder: 'Не выбран' },
  { type: 'PSU', label: 'БП', icon: '/images/icons/powre.png', placeholder: 'Не выбран' },
  { type: 'CASE', label: 'Корпус', icon: '/images/icons/case.png', placeholder: 'Не выбран' },
]

function CompatibilityAlert({ compatibility }) {
  const { status, message, errors } = compatibility

  const cls = {
    idle: 'alert alert-secondary',
    loading: 'alert alert-warning',
    success: 'alert alert-success',
    error: 'alert alert-danger',
  }[status]

  return (
    <div className={cls} role="alert">
      {errors.length > 0
        ? errors.map((e, i) => <div key={i}>{e}</div>)
        : message}
    </div>
  )
}

export default function BuildPanel({
  selected,
  compatibility,
  buildName,
  setBuildName,
  totalPrice,
  onRemove,
  onSave,
  onBackup,
}) {
  const { user } = useAuth()
  const [showAuthWarning, setShowAuthWarning] = useState(false)
  const canSave = compatibility.status === 'success'

  return (
    <div className="card shadow-sm sticky-top" style={{ top: 20 }}>
      <div className="card-header bg-dark text-white">
        <h5 className="mb-0">Текущая сборка</h5>
      </div>
      <div className="card-body">
        {SLOTS.map(({ type, label, icon, placeholder }) => {
          const comp = selected[type]
          return (
            <div key={type} className="d-flex justify-content-between align-items-center mb-2">
              <div className="d-flex align-items-center text-truncate pe-2">
                <img
                  src={icon}
                  alt={label}
                  style={{ width: 24, height: 24, objectFit: 'contain' }}
                  className="me-2 flex-shrink-0"
                />
                <span className="text-truncate">
                  <strong>{label}:</strong>{' '}
                  {comp ? (
                    <span className="text-primary fw-bold">{comp.name}</span>
                  ) : (
                    <span className="text-muted">{placeholder}</span>
                  )}
                </span>
              </div>
              {comp && (
                <button
                  className="btn btn-sm btn-outline-danger py-0 px-2 fw-bold flex-shrink-0"
                  onClick={() => onRemove(type)}
                >
                  ×
                </button>
              )}
            </div>
          )
        })}

        {totalPrice > 0 && (
          <div className="text-end text-success fw-bold mb-2">
            Итого: {totalPrice.toLocaleString('ru-RU')} ₽
          </div>
        )}

        <hr />

        <CompatibilityAlert compatibility={compatibility} />

        {canSave && (
          <div className="mt-3">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Название сборки"
              value={buildName}
              onChange={(e) => setBuildName(e.target.value)}
            />
            {user ? (
              <button className="btn btn-success w-100" onClick={onSave}>
                Сохранить в профиль
              </button>
            ) : (
              <>
                <button
                  className="btn btn-primary w-100"
                  onClick={() => setShowAuthWarning(true)}
                >
                  Сохранить сборку
                </button>
                {showAuthWarning && (
                  <div
                    className="alert alert-info mt-3 mb-0 shadow-sm"
                    style={{ borderRadius: 10 }}
                  >
                    <strong>Ой!</strong>
                    <br />
                    Чтобы сохранить сборку, нужен аккаунт.
                    <br />
                    <br />
                    <div className="d-flex gap-2">
                      <Link
                        to="/login"
                        className="btn btn-sm btn-primary w-100"
                        onClick={onBackup}
                      >
                        Войти
                      </Link>
                      <Link
                        to="/register"
                        className="btn btn-sm btn-outline-primary w-100"
                        onClick={onBackup}
                      >
                        Создать
                      </Link>
                    </div>
                    <div className="text-center mt-2">
                      <small className="text-muted">Не переживай, сборка не пропадет!</small>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

