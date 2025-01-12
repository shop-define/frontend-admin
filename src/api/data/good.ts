import { paths } from '../types/api-types.ts'
import { API_URL } from '../../constants/constants.ts'
import { fetchWrapper } from '../../helpers/http-api.ts'

const apiUrl = `${API_URL}/good`

type GoodTypes = paths['/api/good/{id}']
export type GoodResponse = GoodTypes['get']['responses']['200']['content']['application/json']['data']

async function getGoodById(id: paths['/api/private/good/{id}']['get']['parameters']['path']['id']) {
  return fetchWrapper.get<GoodResponse>(`${API_URL}/private/good/${id}`, { isAuth: true })
}

export type GoodSearchResponse = paths['/api/private/good/']['get']['responses']['200']['content']['application/json']

async function getGoods({
  limit = 100,
  offset = 0,
  search,
  sort,
}: paths['/api/private/good/']['get']['parameters']['query'] = {}) {
  const params = new URLSearchParams()
  params.set('limit', limit?.toString())
  params.set('offset', offset?.toString())
  if (search) {
    params.set('search', search?.toString())
  }
  if (sort) {
    params.set('sort', sort?.toString())
  }

  return fetchWrapper.get<GoodSearchResponse>(`${API_URL}/private/good/?${params}`, {
    isFullResponse: true,
    isAuth: true,
  })
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
  getGoods,
  createGood,
  updateGoodById,
  deleteGoodById,
}
