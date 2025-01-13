import { Button, Flex, Form, Input, message, Modal, Select } from 'antd'
import Title from 'antd/lib/typography/Title'
import UploadButton from '../upload-button/upload-button.tsx'
import { useEffect } from 'react'
import { categoriesApi } from '../../api/data'
import { useNavigate } from 'react-router-dom'
import { CategoryResponse, GoodCategoriesListResponse } from '../../api/data/categories.ts'

type Props = {
  openModal?: 'delete' | 'create' | 'edit' | false
  onClose?: () => void
  onDelete?: (id: number) => void
  id?: number
  categories?: GoodCategoriesListResponse
  onCreate?: (category: CategoryResponse) => void
  onUpdate?: (category: CategoryResponse) => void
}

function CategoryModal({ openModal, onClose, onDelete, categories, onCreate, onUpdate, id }: Props) {
  const [form] = Form.useForm<
    CategoryResponse & {
      image: string[]
      icon: string[]
    }
  >()
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      categoriesApi
        .getCategoryById(id)
        .then((data) => {
          form.setFieldsValue({
            ...data,
            image: data.image ? [data.image] : [],
            icon: data.icon ? [data.icon] : [],
          })
        })
        .catch(() => navigate('/404'))
    } else {
      form.resetFields()
    }
  }, [form, form.setFieldsValue, id])

  const handleCreate = () => {
    form.submit()
    const fields = form.getFieldsValue()
    categoriesApi
      .createCategory({
        ...fields,
        image: fields?.image?.[0] ?? null,
        icon: fields?.icon?.[0] ?? null,
      })
      .then((data) => {
        onClose?.()
        onCreate?.(data)
      })
      .catch(() =>
        messageApi.open({
          type: 'error',
          content: 'Ошибка создания',
        }),
      )
  }

  const handleEdit = () => {
    form.submit()
    if (!id) return
    const fields = form.getFieldsValue()
    categoriesApi
      .updateCategory(id, {
        ...fields,
        image: fields?.image?.[0] ?? null,
        icon: fields?.icon?.[0] ?? null,
      })
      .then((data) => {
        onClose?.()
        onUpdate?.(data)
      })
      .catch(() =>
        messageApi.open({
          type: 'error',
          content: 'Ошибка сохранения',
        }),
      )
  }

  const handleDelete = () => {
    if (!id) return
    categoriesApi
      .deleteCategory(id)
      .then(() => {
        onClose?.()
        onDelete?.(id)
      })
      .catch(() =>
        messageApi.open({
          type: 'error',
          content: 'Ошибка удаления',
        }),
      )
  }

  return (
    <>
      {contextHolder}
      <Modal
        open={!!openModal}
        onCancel={onClose}
        footer={() => (
          <div style={{ marginTop: 60 }}>
            {openModal === 'delete' ? (
              <Flex gap={44}>
                <Button size='large' block key='submit' onClick={handleDelete}>
                  Да
                </Button>
                <Button size='large' block key='back' onClick={onClose}>
                  Нет
                </Button>
              </Flex>
            ) : (
              <Flex justify='center'>
                <Button onClick={openModal === 'create' ? handleCreate : handleEdit} size='large'>
                  {openModal === 'create' ? 'Добавить' : 'Сохранить'}
                </Button>
              </Flex>
            )}
          </div>
        )}
      >
        {openModal === 'delete' && <Title level={2}>Вы действительно хотите удалить категорию?</Title>}
        {openModal !== 'delete' && (
          <Form layout='vertical' form={form}>
            <Title level={2}>{openModal === 'create' ? 'Добавление категории' : 'Редактирование категории'}</Title>
            <Form.Item
              label='Название'
              name='title'
              rules={[
                {
                  required: true,
                  message: 'Заполните поле',
                },
              ]}
            >
              <Input size='large' />
            </Form.Item>
            <Form.Item
              label='Описание'
              name='description'
              rules={[
                {
                  required: true,
                  message: 'Заполните поле',
                },
              ]}
            >
              <Input size='large' />
            </Form.Item>
            <Form.Item label='Главная категория' name='parentId' initialValue={null}>
              <Select size='large'>
                <Select.Option value={null}>Не указана</Select.Option>
                {categories?.map((category) => <Select.Option value={category.id}>{category.title}</Select.Option>)}
              </Select>
            </Form.Item>
            <Flex justify='space-between'>
              <Form.Item label='Фото' name='image' style={{ width: '200px', overflow: 'hidden' }}>
                <UploadButton maxCount={1} />
              </Form.Item>
              <Form.Item label='Иконка' name='icon' style={{ width: '200px', overflow: 'hidden' }}>
                <UploadButton maxCount={1} />
              </Form.Item>
            </Flex>
          </Form>
        )}
      </Modal>
    </>
  )
}

export default CategoryModal
