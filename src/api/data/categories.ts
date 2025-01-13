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
  categoryId: NonNullable<CategoryTypes['patch']['parameters']>['path']['id'],
  category: NonNullable<CategoryTypes['patch']['requestBody']>['content']['application/json'],
) {
  return fetchWrapper.patch<CategoryTypes['patch']['responses']['200']['content']['application/json']['data']>(
    `${apiUrl}/${categoryId}`,
    category,
    true,
  )
}

async function deleteCategory(categoryId: NonNullable<CategoryTypes['delete']['parameters']>['path']['id']) {
  return fetchWrapper.delete<CategoryTypes['delete']['responses']['200']['content']['application/json']['data']>(
    `${apiUrl}/${categoryId}`,
    true,
  )
}

export const categoriesApi = {
  getGoodCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
}
