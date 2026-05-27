import { useState, useEffect, useCallback } from 'react'
import { checkCompatibility, saveBuild as saveBuildApi } from '../api/api'

const EMPTY_BUILD = {
  cpuId: null,
  motherboardId: null,
  gpuId: null,
  ramId: null,
  coolerId: null,
  storageId: null,
  psuId: null,
  caseId: null,
}

const TYPE_TO_KEY = {
  CPU: 'cpuId',
  MOTHERBOARD: 'motherboardId',
  GPU: 'gpuId',
  RAM: 'ramId',
  COOLER: 'coolerId',
  STORAGE: 'storageId',
  PSU: 'psuId',
  CASE: 'caseId',
}

export function useBuild() {
  // selected: { CPU: { id, name, type }, MOTHERBOARD: {...}, ... }
  const [selected, setSelected] = useState({})
  const [compatibility, setCompatibility] = useState({
    status: 'idle',
    message: 'Соберите основу (CPU + M/B) для проверки совместимости.',
    errors: [],
  })
  const [buildName, setBuildName] = useState('')
  const [saveStatus, setSaveStatus] = useState('idle')

  // Restore build from localStorage after login
  useEffect(() => {
    const raw = localStorage.getItem('pendingBuild')
    if (!raw) return
    try {
      const restored = JSON.parse(raw)
      setSelected(restored)
    } catch {}
    localStorage.removeItem('pendingBuild')
  }, [])

  const buildPayload = Object.entries(TYPE_TO_KEY).reduce((acc, [type, key]) => {
    acc[key] = selected[type]?.id ?? null
    return acc
  }, {})

  const runCompatibilityCheck = useCallback(async (newSelected) => {
    const payload = Object.entries(TYPE_TO_KEY).reduce((acc, [type, key]) => {
      acc[key] = newSelected[type]?.id ?? null
      return acc
    }, {})

    if (!payload.cpuId || !payload.motherboardId) {
      setCompatibility({
        status: 'idle',
        message: 'Соберите основу (CPU + M/B) для проверки совместимости.',
        errors: [],
      })
      return
    }

    setCompatibility({ status: 'loading', message: 'Анализ совместимости...', errors: [] })

    try {
      const { data } = await checkCompatibility(payload)
      if (data.valid) {
        setCompatibility({ status: 'success', message: 'Все детали идеально совместимы!', errors: [] })
      } else {
        setCompatibility({ status: 'error', message: '', errors: data.errorMessages || [] })
      }
    } catch {
      setCompatibility({ status: 'error', message: 'Ошибка сервера при проверке.', errors: [] })
    }
  }, [])

  const addComponent = useCallback(
    (component) => {
      const newSelected = { ...selected, [component.type]: component }
      setSelected(newSelected)
      runCompatibilityCheck(newSelected)
    },
    [selected, runCompatibilityCheck],
  )

  const removeComponent = useCallback(
    (type) => {
      const newSelected = { ...selected }
      delete newSelected[type]
      setSelected(newSelected)
      runCompatibilityCheck(newSelected)
    },
    [selected, runCompatibilityCheck],
  )

  const backupBuild = useCallback(() => {
    localStorage.setItem('pendingBuild', JSON.stringify(selected))
  }, [selected])

  const handleSave = useCallback(async () => {
    if (!buildName.trim()) {
      alert('Пожалуйста, введите название сборки!')
      return
    }
    setSaveStatus('loading')
    try {
      await saveBuildApi({ name: buildName, ...buildPayload })
      setBuildName('')
      setSaveStatus('idle')
      alert('Ура! Сборка успешно сохранена!')
    } catch {
      setSaveStatus('error')
      alert('Ошибка при сохранении.')
      setSaveStatus('idle')
    }
  }, [buildName, buildPayload])

  const totalPrice = Object.values(selected).reduce(
    (sum, c) => sum + Number(c?.price ?? 0),
    0,
  )

  return {
    selected,
    compatibility,
    buildName,
    setBuildName,
    saveStatus,
    totalPrice,
    addComponent,
    removeComponent,
    backupBuild,
    handleSave,
  }
}
