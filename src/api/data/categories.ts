import { paths } from '../types/api-types.ts'
import { API_URL } from '../../constants/constants.ts'
import { fetchWrapper } from '../../helpers/http-api.ts'

const apiUrl = `${API_URL}/good-categories`

type CategoryListTypes = paths['/api/good-categories/']
type CategoryTypes = paths['/api/good-categories/{id}']

export type GoodCategoriesListResponse =
  CategoryListTypes['get']['responses']['200']['content']['application/json']['data']
export type CategoryResponse = CategoryTypes['get']['responses']['200']['content']['application/json']['data']

async function getCategoryById(id: CategoryTypes['get']['parameters']['path']['id']) {
  return fetchWrapper.get<CategoryResponse>(`${apiUrl}/${id}`)
}

async function getGoodCategories(): Promise<GoodCategoriesListResponse> {
  const response = await fetch(`${API_URL}/good-categories`, { method: 'GET' })

  if (!response.ok) {
    throw new Error('err')
  }
  const prepared = await response.json()
  return prepared.data
}

async function createCategory(
  category: paths['/api/good-categories/']['post']['requestBody']['content']['application/json'],
) {
  return fetchWrapper.post<CategoryResponse>(apiUrl, category, true)
}

async function updateCategory(
  category: NonNullable<CategoryTypes['patch']['requestBody']>['content']['application/json'],
) {
  return fetchWrapper.post<CategoryTypes['patch']['responses']['200']['content']['application/json']['data']>(
    apiUrl,
    category,
    true,
  )
}

export const categoriesApi = {
  getGoodCategories,
  getCategoryById,
  createCategory,
  updateCategory,
}
