import { paths } from '../types/api-types.ts'
import { API_URL } from '../../constants/constants.ts'
import { fetchWrapper } from '../../helpers/http-api.ts'

const apiUrl = `${API_URL}/good`

type GoodTypes = paths['/api/good/{id}']
export type GoodResponse = GoodTypes['get']['responses']['200']['content']['application/json']['data']

async function getGoodById(id: GoodTypes['get']['parameters']['path']['id']) {
  return fetchWrapper.get<GoodResponse>(`${apiUrl}/${id}`)
}

export const goodsApi = {
  getGoodById,
}
