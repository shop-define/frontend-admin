import { Button, Col, Divider, Flex, Form, Input, message, Radio, Row, Select, Upload } from 'antd'
import Title from 'antd/lib/typography/Title'
import { useEffect, useState } from 'react'
import { IMAGE_URL } from '../../constants/constants.ts'
import { goodApi, GoodCategoriesListResponse, goodCategoryApi, GoodResponse } from '../../api/data'
import { useParams } from 'react-router-dom'

function Good() {
  const { id } = useParams()
  const [messageApi, contextHolder] = message.useMessage()
  const [imageUrl, setImageUrl] = useState<string>()
  const [categories, setCategories] = useState<GoodCategoriesListResponse>([])
  const [form] = Form.useForm<GoodResponse>()

  useEffect(() => {
    goodCategoryApi.getGoodCategories().then(setCategories).catch(console.error)
  }, [])

  useEffect(() => {
    if (id) {
      goodApi
        .getGoodById(id)
        .then((data) => {
          form.setFieldsValue(data)
        })
        .catch(console.error)
    }
  }, [form, form.setFieldsValue, id])

  async function uploadRequest(/*{ file }: { file: string | Blob | RcFile; filename?: string }*/) {
    try {
      const url = '' //await upload(file as File)
      if (url) setImageUrl(url)
    } catch (e) {
      messageApi.open({
        type: 'error',
        content: 'ошибка загрузки фото',
      })
    }
  }
  return (
    <>
      {contextHolder}
      <Form
        form={form}
        layout={'vertical'}
        style={{ maxWidth: 1220, width: '100%', marginLeft: 'auto', marginRight: 'auto' }}
      >
        <Flex vertical>
          <Flex vertical>
            <Title level={2}>Добавление товара</Title>
            <Divider style={{ borderWidth: 2 }} />
          </Flex>
          <Row gutter={{ lg: 32 }} style={{ width: '100%' }}>
            <Col span={16}>
              <Title level={3}>Товар</Title>
              <Form.Item label='Название' name='title'>
                <Input />
              </Form.Item>
              <Form.Item label='Описание' name='description'>
                <Input.TextArea style={{ height: 174 }} />
              </Form.Item>
              <Form.Item label='Медиа'>
                <Upload
                  listType='picture-card'
                  showUploadList={false}
                  customRequest={uploadRequest}
                  style={{ border: 'solid', height: 192 }}
                >
                  {imageUrl ? <img src={`${IMAGE_URL}${imageUrl}`} alt='avatar' style={{ width: '100%' }} /> : 'Фото'}
                </Upload>
              </Form.Item>
              <Title level={3}>Цена</Title>
              <Row gutter={{ lg: 20 }}>
                <Col span={12}>
                  <Form.Item label='Цена без скидки' name='price'>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Цена со скидкой'>
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={8} style={{ height: 760 }}>
              <Title level={3}>Характеристики товара</Title>
              <Form.Item label='Категория' name='categoryId'>
                <Select>
                  <Select.Option value={null}>Не указана</Select.Option>
                  {categories.map((category) => (
                    <Select.Option value={category.id}>{category.title}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Divider style={{ borderWidth: 2 }} />
              <Form.Item label='Артикул' name='articleNumber'>
                <Input />
              </Form.Item>
              <Divider style={{ borderWidth: 2 }} />
              <Form.Item name='title'>
                <Radio.Group name='radiogroup'>
                  <Radio value={1}>Премиум товар</Radio>
                </Radio.Group>
              </Form.Item>
              <div style={{ height: '25%' }}></div>
              <Form.Item>
                <Button size='large' type='primary' block>
                  Опубликовать
                </Button>
              </Form.Item>
              <Form.Item>
                <Button size='large' block>
                  В черновик
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Flex>
      </Form>
    </>
  )
}

export default Good
