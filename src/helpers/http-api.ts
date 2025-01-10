export function getAuthToken() {
  return `Bearer ${localStorage.getItem('token-shop_define')}`
}

export async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error('err')
  }

  const prepared = await response.json()
  return prepared.data as T
}

export const fetchWrapper = {
  get: async function <T>(url: string): Promise<T> {
    return fetch(url, { method: 'GET' }).then(handleResponse<T>)
  },
}
