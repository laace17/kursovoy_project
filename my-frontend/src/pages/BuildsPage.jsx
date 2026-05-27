import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getBuilds, deleteBuild } from '../api/api'

function calcTotal(build) {
  const parts = [
    build.cpu,
    build.motherboard,
    build.gpu,
    build.ram,
    build.cooler,
    build.storage,
    build.psu,
    build.pcCase,
  ]
  return parts.reduce((sum, p) => sum + Number(p?.price ?? 0), 0)
}

const PARTS = [
  { key: 'cpu', label: 'CPU' },
  { key: 'motherboard', label: 'M/B' },
  { key: 'gpu', label: 'GPU' },
  { key: 'ram', label: 'RAM' },
  { key: 'cooler', label: 'Охлад' },
  { key: 'storage', label: 'SSD' },
  { key: 'psu', label: 'БП' },
  { key: 'pcCase', label: 'Корпус' },
]

export default function BuildsPage() {
  const [builds, setBuilds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBuilds()
      .then((res) => setBuilds(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Вы уверены, что хотите удалить эту сборку?')) return
    try {
      await deleteBuild(id)
      setBuilds((prev) => prev.filter((b) => b.id !== id))
    } catch {
      alert('Не удалось удалить сборку.')
    }
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-dark mb-4 shadow-sm">
        <div className="container">
          <Link className="navbar-brand mb-0 h1 text-decoration-none fw-bold" to="/">
            PC Builder
          </Link>
          <Link className="btn btn-outline-light btn-sm fw-medium" to="/catalog">
            Вернуться в каталог
          </Link>
        </div>
      </nav>

      <div className="container">
        <h2 className="mb-4 fw-bold">Мои сохраненные сборки</h2>

        {loading ? (
          <div className="d-flex justify-content-center py-5">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : (
          <div className="card shadow-sm rounded-4 overflow-hidden border-0">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th className="py-3 px-4 w-25">Сборка</th>
                      <th className="py-3 w-50">Комплектующие</th>
                      <th className="py-3 w-25">Общая стоимость</th>
                      <th className="py-3 text-center">Действие</th>
                    </tr>
                  </thead>
                  <tbody>
                    {builds.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center text-muted py-5">
                          <h5 className="fw-normal">Вы еще не сохранили ни одной сборки.</h5>
                          <Link to="/catalog" className="btn btn-primary mt-3 px-4 shadow-sm">
                            Собрать свой первый ПК
                          </Link>
                        </td>
                      </tr>
                    ) : (
                      builds.map((build) => (
                        <tr key={build.id}>
                          <td className="px-4">
                            <h5 className="fw-bold text-primary mb-1">{build.name}</h5>
                            <span className="badge bg-secondary">ID: {build.id}</span>
                          </td>
                          <td>
                            <ul
                              className="list-unstyled mb-0 small"
                              style={{ columnCount: 2, columnGap: 40 }}
                            >
                              {PARTS.map(({ key, label }) =>
                                build[key] ? (
                                  <li key={key} className="mb-1">
                                    <strong>{label}:</strong>{' '}
                                    {build[key].brand} {build[key].name}
                                  </li>
                                ) : null,
                              )}
                            </ul>
                          </td>
                          <td className="text-success fw-bold fs-5 text-nowrap">
                            {calcTotal(build).toLocaleString('ru-RU')} ₽
                          </td>
                          <td className="text-center">
                            <button
                              className="btn btn-sm btn-outline-danger px-3"
                              onClick={() => handleDelete(build.id)}
                            >
                              Удалить
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
