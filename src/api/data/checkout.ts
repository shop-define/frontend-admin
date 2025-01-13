import { paths } from '../types/api-types.ts'
import { API_URL } from '../../constants/constants.ts'
import { fetchWrapper } from '../../helpers/http-api.ts'

const apiUrl = `${API_URL}/private/checkout`

type CheckoutTypes = paths['/api/private/checkout/{id}']
export type CheckoutResponse = CheckoutTypes['get']['responses']['200']['content']['application/json']['data']

async function getCheckoutById(id: CheckoutTypes['get']['parameters']['path']['id']) {
  return fetchWrapper.get<CheckoutResponse>(`${apiUrl}/${id}`, {
    isAuth: true,
  })
}

async function updateCheckoutById(
  checkoutId: NonNullable<CheckoutTypes['patch']['parameters']>['path']['id'],
  checkout: NonNullable<CheckoutTypes['patch']['requestBody']>['content']['application/json'],
) {
  return fetchWrapper.patch<CheckoutTypes['patch']['responses']['200']['content']['application/json']['data']>(
    `${apiUrl}/${checkoutId}`,
    checkout,
    true,
  )
}

export const checkoutApi = {
  getCheckoutById,
  updateCheckoutById,
}
