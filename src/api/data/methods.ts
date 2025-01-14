// src/api/data/methods.ts
import { API_URL } from '../../constants/constants'
import { fetchWrapper } from '../../helpers/http-api'

// Типы
export type PaymentMethod = {
  id: string
  title: string
  description: string
  image: string
}

export type DeliveryMethod = {
  id: string
  title: string
  description: string
  image: string
}

type MethodsResponse<T> = {
  status: 'ok' | 'error'
  data: T[]
  total: number
}

// --- Payment Methods ---
async function getPaymentMethods({ limit = 10, offset = 0 }: { limit?: number; offset?: number } = {}) {
  const params = new URLSearchParams()
  params.set('limit', String(limit))
  params.set('offset', String(offset))

  return fetchWrapper.get<MethodsResponse<PaymentMethod>>(`${API_URL}/payment-methods?${params}`, {
    isAuth: true,
  })
}

async function createPaymentMethod(payload: Omit<PaymentMethod, 'id'>) {
  return fetchWrapper.post<PaymentMethod>(`${API_URL}/payment-methods`, payload, true)
}

async function deletePaymentMethod(id: string) {
  return fetchWrapper.delete<unknown>(`${API_URL}/payment-methods/${id}`, true)
}

// --- Delivery Methods ---
async function getDeliveryMethods({ limit = 10, offset = 0 }: { limit?: number; offset?: number } = {}) {
  const params = new URLSearchParams()
  params.set('limit', String(limit))
  params.set('offset', String(offset))
  return fetchWrapper.get<MethodsResponse<DeliveryMethod>>(`${API_URL}/delivery-methods?${params}`, {
    isAuth: true,
  })
}

async function createDeliveryMethod(payload: Omit<DeliveryMethod, 'id'>) {
  return fetchWrapper.post<DeliveryMethod>(`${API_URL}/delivery-methods`, payload, true)
}

async function deleteDeliveryMethod(id: string) {
  return fetchWrapper.delete<unknown>(`${API_URL}/delivery-methods/${id}`, true)
}

export const methodsApi = {
  getPaymentMethods,
  createPaymentMethod,
  deletePaymentMethod,

  getDeliveryMethods,
  createDeliveryMethod,
  deleteDeliveryMethod,
}
