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
  post: async function <T>(url: string, body?: Record<string, unknown>, isAuth?: boolean): Promise<T> {
    const additionalHeaders = isAuth
      ? {
          Authorization: getAuthToken(),
        }
      : undefined

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...additionalHeaders,
      },
      body: JSON.stringify(body),
    }).then(handleResponse<T>)
  },
  patch: async function <T>(url: string, body?: Record<string, unknown>, isAuth?: boolean): Promise<T> {
    const additionalHeaders = isAuth
      ? {
          Authorization: getAuthToken(),
        }
      : undefined

    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...additionalHeaders,
      },
      body: JSON.stringify(body),
    }).then(handleResponse<T>)
  },
  delete: async function <T>(url: string, isAuth?: boolean): Promise<T> {
    const additionalHeaders = isAuth
      ? {
          Authorization: getAuthToken(),
        }
      : undefined

    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...additionalHeaders,
      },
    }).then(handleResponse<T>)
  },
}
