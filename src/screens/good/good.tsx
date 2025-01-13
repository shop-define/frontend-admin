import { Button, Col, Divider, Flex, Form, Input, message, Modal, Radio, Row, Select } from 'antd'
import Title from 'antd/lib/typography/Title'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { categoriesApi, goodsApi } from '../../api/data'
import { GoodResponse } from '../../api/data/good.ts'
import UploadButton from '../../components/upload-button/upload-button.tsx'
import CustomDivider from '../../components/custom-divider/custom-divider.tsx'
import { GoodCategoriesListResponse } from '../../api/data/categories.ts'

function Good() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const [categories, setCategories] = useState<GoodCategoriesListResponse>([])
  const [form] = Form.useForm<GoodResponse>()

  useEffect(() => {
    categoriesApi.getGoodCategories().then(setCategories).catch(console.error)
  }, [])

  useEffect(() => {
    if (id && id !== 'new') {
      goodsApi
        .getGoodById(id)
        .then((data) => {
          form.setFieldsValue(data)
        })
        .catch(() => navigate('/404'))
    }
  }, [form, form.setFieldsValue, id])

  const handleSave = () => {
    if (!id) {
      return
    }
    setIsLoading(true)
    goodsApi
      .updateGoodById(id, form.getFieldsValue())
      .catch(() =>
        messageApi.open({
          type: 'error',
          content: 'Ошибка сохранения',
        }),
      )
      .finally(() => setIsLoading(false))
  }

  const handleDelete = () => {
    if (!id) {
      return
    }
    setIsLoading(true)
    goodsApi
      .deleteGoodById(id)
      .then(() => navigate('/good'))
      .catch(() =>
        messageApi.open({
          type: 'error',
          content: 'Ошибка удаления',
        }),
      )
      .finally(() => setIsLoading(false))
  }

  const handlePublish = (status: 'published' | 'draft') => {
    form.submit()
    setIsLoading(true)
    goodsApi
      .createGood({ ...form.getFieldsValue(), status })
      .then((data) => {
        navigate(`/good/${data.id}`)
      })
      .catch(() =>
        messageApi.open({
          type: 'error',
          content: 'Ошибка создания',
        }),
      )
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      {contextHolder}
      <Modal
        open={isOpenDeleteModal}
        onCancel={() => setIsOpenDeleteModal(false)}
        footer={() => (
          <>
            <Flex gap={44}>
              <Button
                size='large'
                block
                key='submit'
                onClick={() => {
                  setIsOpenDeleteModal(false)
                  handleDelete()
                }}
              >
                Да
              </Button>
              <Button size='large' block key='back' onClick={() => setIsOpenDeleteModal(false)}>
                Нет
              </Button>
            </Flex>
          </>
        )}
      >
        <Title level={2}>Вы действительно хотите удалить товар?</Title>
      </Modal>
      <Form form={form} layout={'vertical'}>
        <Flex vertical>
          <Flex vertical>
            <Title level={2}>{id === 'new' ? 'Добавление товара' : 'Редактировать товар'}</Title>
            <Divider style={{ borderWidth: 2 }} />
          </Flex>
          <Row gutter={{ lg: 32 }} style={{ width: '100%', display: 'inline-flex' }}>
            <Col span={16}>
              <Title level={3}>Товар</Title>
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
              <Form.Item label='Описание' name='description'>
                <Input.TextArea style={{ height: 174 }} />
              </Form.Item>
              <Form.Item label='Медиа' name='images'>
                <UploadButton />
              </Form.Item>
              <Title level={3}>Цена</Title>
              <Row gutter={{ lg: 20 }}>
                <Col span={12}>
                  <Form.Item
                    label='Цена без скидки'
                    name='price'
                    rules={[
                      {
                        required: true,
                        message: 'Заполните поле',
                      },
                    ]}
                  >
                    <Input size='large' />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Цена со скидкой' name='priceWithDisc'>
                    <Input size='large' />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={8} style={{ display: 'inline-flex', flexDirection: 'column' }}>
              <Title level={3}>Характеристики товара</Title>
              {id !== 'new' && (
                <>
                  <Form.Item label='Статус' name='status'>
                    <Select size='large'>
                      <Select.Option value='published'>Опубликованный</Select.Option>
                      <Select.Option value='draft'>Черновик</Select.Option>
                    </Select>
                  </Form.Item>
                  <CustomDivider />
                </>
              )}
              <Form.Item label='Категория' name='categoryId'>
                <Select size='large'>
                  <Select.Option value={null}>Не указана</Select.Option>
                  {categories.map((category) => (
                    <Select.Option value={category.id}>{category.title || category.id}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <CustomDivider />
              <Form.Item label='Артикул' name='articleNumber'>
                <Input size='large' />
              </Form.Item>
              <CustomDivider />
              <Form.Item label='Название модификации' name='modifiedName'>
                <Input size='large' />
              </Form.Item>
              <CustomDivider />
              <Form.Item label='Количество' name='count'>
                <Input size='large' />
              </Form.Item>
              {false && (
                <>
                  <CustomDivider />
                  <Form.Item name='title'>
                    <Radio.Group name='radiogroup'>
                      <Radio value={1}>Премиум товар</Radio>
                    </Radio.Group>
                  </Form.Item>
                </>
              )}
              <div style={{ marginTop: 'auto' }} />
              {id !== 'new' ? (
                <>
                  <Form.Item>
                    <Button disabled={isLoading} size='large' type='primary' block onClick={handleSave}>
                      Сохранить
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button disabled={isLoading} size='large' block onClick={() => setIsOpenDeleteModal(true)}>
                      Удалить
                    </Button>
                  </Form.Item>
                </>
              ) : (
                <>
                  <Form.Item style={{ display: 'none' }}>
                    <Button
                      disabled={isLoading}
                      size='large'
                      type='primary'
                      block
                      onClick={() => handlePublish('published')}
                    >
                      Опубликовать
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      disabled={isLoading}
                      size='large'
                      type='primary'
                      block
                      onClick={() => handlePublish('draft')}
                    >
                      В черновик
                    </Button>
                  </Form.Item>
                </>
              )}
            </Col>
          </Row>
        </Flex>
      </Form>
    </>
  )
}

export default Good
