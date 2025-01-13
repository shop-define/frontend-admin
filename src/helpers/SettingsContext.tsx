import React, { createContext, useContext, useState, useEffect } from 'react'
import { settingsApi } from '../api/data/settings'

// Типизация настроек
interface ISettings {
  title: string
  logo: string
}

interface ISettingsContext {
  settings: ISettings
  fetchSettings: () => Promise<void>
  updateSettings: (payload: Partial<ISettings>) => Promise<void>
}

// Создаём контекст
const SettingsContext = createContext<ISettingsContext>({
  settings: { title: '', logo: '' },
  fetchSettings: async () => {},
  updateSettings: async () => {},
})

// Хук для быстрого использования
export const useSettings = () => useContext(SettingsContext)

// Провайдер
export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<ISettings>({ title: '', logo: '' })

  // Функция загрузки
  const fetchSettings = async () => {
    try {
      const res = await settingsApi.getSettings()
      // допустим, res = { title: '...', logo: '...' }
      setSettings({
        title: res.title,
        logo: res.logo,
      })
    } catch (err) {
      console.error('Ошибка при загрузке настроек', err)
    }
  }

  // Функция обновления (PATCH)
  const updateSettings = async (payload: Partial<ISettings>) => {
    try {
      // Вызываем PATCH
      const newSettings = await settingsApi.updateSettings(payload)
      // Сервер вернул {title, logo} — обновляем стейт
      setSettings((prev) => ({
        ...prev,
        ...newSettings,
      }))
    } catch (err) {
      console.error('Ошибка при обновлении настроек', err)
      throw err
    }
  }

  // При первой загрузке — подгружаем настройки
  useEffect(() => {
    fetchSettings()
  }, [])

  return (
    <SettingsContext.Provider value={{ settings, fetchSettings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}
