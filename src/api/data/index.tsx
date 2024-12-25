import { paths } from '../types/api-types.ts'
import { API_URL } from '../../constants/constants.ts'

export const Api = {
  public: {},
  private: {},
}

type GoodTypes = paths['/api/good/{id}']
export type GoodResponse = GoodTypes['get']['responses']['200']['content']['application/json']['data']
export const goodApi = {
  getGoodById: async function (id: GoodTypes['get']['parameters']['path']['id']) {
    const response = await fetch(`${API_URL}/good/${id}`, { method: 'GET' })

    if (!response.ok) {
      throw new Error('err')
    }
    const prepared = await response.json()
    return prepared.data as GoodResponse
  },
}

type GoodCategoriesTypes = paths['/api/good-categories/']
export type GoodCategoriesListResponse =
  GoodCategoriesTypes['get']['responses']['200']['content']['application/json']['data']
export const goodCategoryApi = {
  getGoodCategories: async function (): Promise<GoodCategoriesListResponse> {
    const response = await fetch(`${API_URL}/good-categories`, { method: 'GET' })

    if (!response.ok) {
      throw new Error('err')
    }
    const prepared = await response.json()
    return prepared.data
  },
}

export const imagesApi = {
  postImage: async function () {},
}
