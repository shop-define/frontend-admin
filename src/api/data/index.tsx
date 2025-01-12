import { paths } from '../types/api-types.ts'
import { API_URL } from '../../constants/constants.ts'
export { goodsApi } from './good.ts'
export { imagesApi } from './images.ts'

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
