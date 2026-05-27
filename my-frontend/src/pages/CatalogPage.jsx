import { useState, useEffect, useMemo } from 'react'
import Navbar from '../components/Navbar'
import ComponentCard from '../components/ComponentCard'
import BuildPanel from '../components/BuildPanel'
import { getComponents } from '../api/api'
import { useBuild } from '../hooks/useBuild'

const TABS = [
  { id: 'CPU', label: 'Процессор' },
  { id: 'MOTHERBOARD', label: 'Материнская плата' },
  { id: 'GPU', label: 'Видеокарта' },
  { id: 'RAM', label: 'Оперативная память' },
  { id: 'COOLER', label: 'Охлаждение' },
  { id: 'STORAGE', label: 'Накопители' },
  { id: 'PSU', label: 'Блоки питания' },
  { id: 'CASE', label: 'Корпус' },
]

const TAB_FILTERS = {
  CPU: {
    attr: 'socket',
    label: 'Все сокеты',
    options: [
      { value: 'all', label: 'Все сокеты' },
      { value: 'LGA1700', label: 'Intel LGA1700' },
      { value: 'AM4', label: 'AMD AM4' },
      { value: 'AM5', label: 'AMD AM5' },
    ],
  },
  MOTHERBOARD: {
    attr: 'socket',
    label: 'Все сокеты',
    options: [
      { value: 'all', label: 'Все сокеты' },
      { value: 'LGA1700', label: 'Intel LGA1700' },
      { value: 'AM4', label: 'AMD AM4' },
      { value: 'AM5', label: 'AMD AM5' },
    ],
  },
  RAM: {
    attr: 'ramType',
    label: 'Все типы',
    options: [
      { value: 'all', label: 'Все типы' },
      { value: 'DDR3', label: 'DDR3' },
      { value: 'DDR4', label: 'DDR4' },
      { value: 'DDR5', label: 'DDR5' },
    ],
  },
  COOLER: {
    attr: 'coolingType',
    label: 'Все типы',
    options: [
      { value: 'all', label: 'Все типы' },
      { value: 'ВОЗДУШНОЕ', label: 'Воздушное' },
      { value: 'ВОДЯНОЕ', label: 'Водяное (СЖО)' },
    ],
  },
}

export default function CatalogPage() {
  const [components, setComponents] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('CPU')
  const [sortOrder, setSortOrder] = useState('none')
  const [filters, setFilters] = useState({})

  const {
    selected,
    compatibility,
    buildName,
    setBuildName,
    totalPrice,
    addComponent,
    removeComponent,
    backupBuild,
    handleSave,
  } = useBuild()

  useEffect(() => {
    getComponents()
      .then((res) => setComponents(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const byType = useMemo(() => {
    const map = {}
    for (const c of components) {
      if (!map[c.type]) map[c.type] = []
      map[c.type].push(c)
    }
    return map
  }, [components])

  const visibleComponents = useMemo(() => {
    let list = byType[activeTab] || []

    const filterConfig = TAB_FILTERS[activeTab]
    const filterValue = filters[activeTab]
    if (filterConfig && filterValue && filterValue !== 'all') {
      list = list.filter((c) => c[filterConfig.attr] === filterValue)
    }

    if (sortOrder === 'asc') {
      list = [...list].sort((a, b) => Number(a.price) - Number(b.price))
    } else if (sortOrder === 'desc') {
      list = [...list].sort((a, b) => Number(b.price) - Number(a.price))
    }

    return list
  }, [byType, activeTab, filters, sortOrder])

  const filterConfig = TAB_FILTERS[activeTab]

  return (
    <>
      <Navbar />
      <div className="container" id="catalog-container">
        <div className="row" id="catalog-section">
          {/* Левая колонка: каталог */}
          <div className="col-md-8">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="mb-0">Комплектующие</h3>
              <select
                className="form-select w-auto shadow-sm"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="none">Без сортировки</option>
                <option value="asc">Сначала дешевле</option>
                <option value="desc">Сначала дороже</option>
              </select>
            </div>

            {/* Вкладки */}
            <ul
              className="nav nav-tabs mb-4 flex-nowrap overflow-auto"
              role="tablist"
              style={{ whiteSpace: 'nowrap' }}
            >
              {TABS.map((tab) => (
                <li key={tab.id} className="nav-item" role="presentation">
                  <button
                    className={`nav-link fw-bold${activeTab === tab.id ? ' active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                    type="button"
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Фильтр для текущей вкладки */}
            {filterConfig && (
              <div className="d-flex justify-content-end mb-3 mt-2">
                <select
                  className="form-select w-auto shadow-sm"
                  value={filters[activeTab] || 'all'}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, [activeTab]: e.target.value }))
                  }
                >
                  {filterConfig.options.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Карточки */}
            {loading ? (
              <div className="d-flex justify-content-center py-5">
                <div className="spinner-border text-primary" role="status" />
              </div>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 g-4 mt-0">
                {visibleComponents.length === 0 ? (
                  <div className="col-12 text-center text-muted py-4">
                    Нет комплектующих для отображения
                  </div>
                ) : (
                  visibleComponents.map((comp) => (
                    <ComponentCard key={comp.id} comp={comp} onAdd={addComponent} />
                  ))
                )}
              </div>
            )}
          </div>

          {/* Правая колонка: панель сборки */}
          <div className="col-md-4">
            <BuildPanel
              selected={selected}
              compatibility={compatibility}
              buildName={buildName}
              setBuildName={setBuildName}
              totalPrice={totalPrice}
              onRemove={removeComponent}
              onSave={handleSave}
              onBackup={backupBuild}
            />
          </div>
        </div>
      </div>
    </>
  )
}
