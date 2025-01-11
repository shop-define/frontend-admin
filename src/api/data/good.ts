import { paths } from '../types/api-types.ts'
import { API_URL } from '../../constants/constants.ts'
import { fetchWrapper } from '../../helpers/http-api.ts'

const apiUrl = `${API_URL}/good`

type GoodTypes = paths['/api/good/{id}']
export type GoodResponse = GoodTypes['get']['responses']['200']['content']['application/json']['data']

async function getGoodById(id: GoodTypes['get']['parameters']['path']['id']) {
  return fetchWrapper.get<GoodResponse>(`${apiUrl}/${id}`)
}

async function createGood(
  good: NonNullable<paths['/api/good/']['post']['requestBody']>['content']['application/json'],
) {
  return fetchWrapper.post<paths['/api/good/']['post']['responses']['200']['content']['application/json']['data']>(
    `${apiUrl}`,
    good,
    true,
  )
}

async function updateGoodById(
  id: GoodTypes['patch']['parameters']['path']['id'],
  good: NonNullable<GoodTypes['patch']['requestBody']>['content']['application/json'],
) {
  return fetchWrapper.patch<GoodTypes['patch']['responses']['200']['content']['application/json']['data']>(
    `${apiUrl}/${id}`,
    good,
    true,
  )
}

async function deleteGoodById(id: GoodTypes['delete']['parameters']['path']['id']) {
  return fetchWrapper.delete<GoodTypes['delete']['responses']['200']['content']['application/json']['data']>(
    `${apiUrl}/${id}`,
    true,
  )
}

export const goodsApi = {
  getGoodById,
  createGood,
  updateGoodById,
  deleteGoodById,
}
