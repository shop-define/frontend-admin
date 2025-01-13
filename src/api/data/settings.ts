// src/api/data/settings.ts
import { API_URL } from '../../constants/constants'
import { fetchWrapper } from '../../helpers/http-api'

// Сервер отдает объект { title: string, logo: string }
// без "status" и без "data"
export type Settings = {
  title: string
  logo: string
}

// GET /api/settings/
async function getSettings() {
  // Если вернет прямо { title, logo }
  return fetchWrapper.get<Settings>(`${API_URL}/settings`, {
    isAuth: true,
  })
}

// PATCH /api/settings/
async function updateSettings(payload: Partial<Settings>) {
  // Аналогично, вернется { title, logo }
  return fetchWrapper.patch<Settings>(`${API_URL}/settings`, payload, true)
}

export const settingsApi = {
  getSettings,
  updateSettings,
}
