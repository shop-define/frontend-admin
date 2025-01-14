import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AddNewsModal.css'

const AddNewsModal = () => {
  const navigate = useNavigate()
  const [news, setNews] = useState({
    title: '',
    description: '',
    image: null,
  })

  const handleChange = (e: unknown) => {
    const { name, value, files } = (e as { target: { name: string; value: string; files?: string[] } }).target
    setNews((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }))
  }

  const handleSubmit = () => {
    console.log('News added:', news)
    // Здесь вы можете добавить API-запрос для отправки данных на сервер
    navigate(-1) // Закрытие модального окна
  }

  return (
    <div className='modal-overlay'>
      <div className='modal-container'>
        <div className='modal-header'>
          <h2>Добавление новости</h2>
          <button className='modal-close' onClick={() => navigate(-1)}>
            ✕
          </button>
        </div>
        <div className='modal-body'>
          <label className='modal-label'>
            Заголовок
            <input
              type='text'
              name='title'
              value={news.title}
              onChange={handleChange}
              className='modal-input'
              placeholder='Введите заголовок'
            />
          </label>
          <label className='modal-label'>
            Описание
            <textarea
              name='description'
              value={news.description}
              onChange={handleChange}
              className='modal-textarea'
              placeholder='Введите описание'
            />
          </label>
          <label className='modal-label'>
            Изображение
            <div className='file-dropzone'>
              <input
                type='file'
                name='image'
                onChange={handleChange}
                accept='image/png, image/jpeg'
                className='file-input'
              />
              <p className='file-text'>
                Выберите файл или перетащите его сюда <br />
                JPG или PNG формат
              </p>
              <button className='file-button'>Открыть файл</button>
            </div>
          </label>
        </div>
        <div className='modal-footer'>
          <button className='modal-submit' onClick={handleSubmit}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddNewsModal
