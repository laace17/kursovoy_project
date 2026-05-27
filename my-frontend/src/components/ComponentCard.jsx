const TYPE_CONFIG = {
  CPU: { color: 'primary', badge: 'CPU' },
  MOTHERBOARD: { color: 'danger', badge: 'Материнка' },
  GPU: { color: 'success', badge: 'Видеокарта' },
  RAM: { color: 'info', badge: 'ОЗУ', textDark: true },
  COOLER: { color: 'secondary', badge: 'Охлаждение' },
  STORAGE: { color: 'dark', badge: 'Накопитель' },
  PSU: { color: 'warning', badge: 'Блок питания', textDark: true },
  CASE: { color: 'danger', badge: 'Корпус' },
}

function getSpecs(comp) {
  switch (comp.type) {
    case 'CPU':
      return [
        { label: 'Сокет', value: comp.socket },
        { label: 'Ядра', value: comp.cores },
        { label: 'Тепловыделение', value: `${comp.tdp} Вт` },
        { label: 'Поддержка ОЗУ', value: comp.ramTypeSupport },
      ]
    case 'MOTHERBOARD':
      return [
        { label: 'Сокет', value: comp.socket },
        { label: 'Чипсет', value: comp.chipset },
        { label: 'Тип памяти', value: comp.ramType },
      ]
    case 'GPU':
      return [
        { label: 'Объем памяти', value: `${comp.videoMemory} ГБ` },
        { label: 'Рекомендованный БП', value: `${comp.recommendedPower} Вт` },
      ]
    case 'RAM':
      return [
        { label: 'Тип памяти', value: comp.ramType },
        { label: 'Объем', value: `${comp.capacityGb} ГБ` },
        { label: 'Частота', value: `${comp.frequencyMhz} МГц` },
      ]
    case 'COOLER':
      return [
        { label: 'Тип системы', value: comp.coolingType },
        { label: 'Рассеиваемая мощность', value: `${comp.maxTdp} Вт` },
      ]
    case 'STORAGE': {
      const cap =
        comp.capacityGb >= 1000
          ? `${comp.capacityGb / 1000} ТБ`
          : `${comp.capacityGb} ГБ`
      return [
        { label: 'Тип накопителя', value: comp.storageType },
        { label: 'Емкость', value: cap },
      ]
    }
    case 'PSU':
      return [
        { label: 'Мощность', value: `${comp.wattage} Вт` },
        { label: 'Сертификат', value: comp.certificate },
      ]
    case 'CASE':
      return [
        { label: 'Форм-фактор', value: comp.formFactor },
        { label: 'Макс. длина карты', value: `${comp.maxGpuLengthMm} мм` },
      ]
    default:
      return []
  }
}

export default function ComponentCard({ comp, onAdd }) {
  const cfg = TYPE_CONFIG[comp.type] || { color: 'secondary', badge: comp.type }
  const specs = getSpecs(comp)
  const btnClass = `btn btn-outline-${cfg.color} w-100${cfg.textDark ? ' text-dark' : ''}`

  return (
    <div className="col">
      <div className={`card h-100 shadow-sm border-${cfg.color}`}>
        <img
          src={comp.imageUrl}
          className="card-img-top border-bottom bg-white"
          style={{ objectFit: 'contain', height: 220, padding: 10, width: '100%' }}
          alt="Фото детали"
        />
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <span className={`badge bg-${cfg.color}${cfg.textDark ? ' text-dark' : ''}`}>
              {cfg.badge}
            </span>
            <span className="text-muted small">{comp.brand}</span>
          </div>
          <h5 className="card-title fw-bold">{comp.name}</h5>
          <h6 className="card-subtitle mb-3 text-success fw-bold fs-5">
            {Number(comp.price).toLocaleString('ru-RU')} ₽
          </h6>
          <ul className={`list-unstyled small mb-0 border-start border-2 border-${cfg.color} ps-2`}>
            {specs.map((s) => (
              <li key={s.label}>
                <span className="text-muted">{s.label}:</span>{' '}
                <span className="fw-medium text-dark">{s.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card-footer bg-white border-top-0">
          <button className={btnClass} onClick={() => onAdd(comp)}>
            + В сборку
          </button>
        </div>
      </div>
    </div>
  )
}
