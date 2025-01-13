import { paths } from '../types/api-types.ts'
import { API_URL } from '../../constants/constants.ts'
import { fetchWrapper } from '../../helpers/http-api.ts'

const apiUrl = `${API_URL}/private/checkout`

type CheckoutTypes = paths['/api/private/checkout/{id}']

// Тип одного заказа (как в getCheckoutById)
export type CheckoutResponse = {
  id: string
  userId: number
  paymentMethodId: string
  paymentMethodName: string
  deliveryMethodId: string
  deliveryMethodName: string
  track: string
  recipientName: string
  recipientAddress: string
  recipientPhone: string
  goodsIdList: string[]
  goodsPrice: number[]
  goodsCount: number[]
  goodsName: string[]
  paymentTotal: number
  status: 'created' | 'payed' | 'delivery' | 'delivered' | 'success' | 'canceled'
  createdAt: string
  updatedAt: string
}

// Тип ответа для списка заказов
export type CheckoutSearchResponse = {
  status: string
  data: CheckoutResponse[]
  total: number
}

async function getCheckoutById(id: CheckoutTypes['get']['parameters']['path']['id']) {
  return fetchWrapper.get<CheckoutResponse>(`${apiUrl}/${id}`, { isAuth: true })
}

async function updateCheckoutById(
  checkoutId: NonNullable<CheckoutTypes['patch']['parameters']>['path']['id'],
  checkout: NonNullable<CheckoutTypes['patch']['requestBody']>['content']['application/json'],
) {
  return fetchWrapper.patch<CheckoutResponse>(`${apiUrl}/${checkoutId}`, checkout, true)
}

type CheckoutItem = {
  id: string
  userId: number
  paymentMethodId: string
  paymentMethodName: string
  deliveryMethodId: string
  deliveryMethodName: string
  track: string
  recipientName: string
  recipientAddress: string
  recipientPhone: string
  goodsIdList: string[]
  goodsPrice: number[]
  goodsCount: number[]
  goodsName: string[]
  paymentTotal: number
  status: 'created' | 'payed' | 'delivery' | 'delivered' | 'success' | 'canceled'
  createdAt: string
  updatedAt: string
}

type CheckoutListResponse = {
  status: 'ok' | 'error'
  data: CheckoutItem[]
  total: number
}

// Описание запроса на список
async function getCheckouts({
  limit = 10,
  offset = 0,
  search,
  sort,
  filter,
}: {
  limit?: number
  offset?: number
  search?: string
  sort?: 'date' | 'date_ask' | 'recipientName' | 'recipientName_ask'
  filter?: 'created' | 'payed' | 'delivery' | 'delivered' | 'success' | 'canceled'
} = {}) {
  const params = new URLSearchParams()
  params.set('limit', limit.toString())
  params.set('offset', offset.toString())
  if (search) {
    params.set('search', search)
  }
  if (sort) {
    params.set('sort', sort)
  }
  if (filter) {
    params.set('filter', filter)
  }

  // "isFullResponse: false" если API возвращает "status, data, total" напрямую
  // и нам не нужно отдельно доставать "res.data"
  return fetchWrapper.get<CheckoutListResponse>(`${apiUrl}/?${params}`, {
    isAuth: true,
  })
}

export const checkoutApi = {
  getCheckoutById,
  updateCheckoutById,
  getCheckouts, // <-- Экспортируем новый метод
}


