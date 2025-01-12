import { API_URL } from '../../constants/constants.ts'
import { getAuthToken, handleResponse } from '../../helpers/http-api.ts'
import { paths } from '../types/api-types.ts'

type ImagesTypes = paths['/api/images/']

async function upload(image: File) {
  const formData = new FormData()
  formData.append('image', image)

  return fetch(`${API_URL}/images`, {
    method: 'POST',
    headers: {
      Authorization: getAuthToken(),
    },
    body: formData,
  }).then(handleResponse<ImagesTypes['post']['responses']['200']['content']['application/json']['data']>)
}

export const imagesApi = {
  upload,
}
