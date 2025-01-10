import { Button, Col, Divider, Flex, Form, Input, message, Radio, Row, Select } from 'antd'
import Title from 'antd/lib/typography/Title'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { goodsApi, GoodCategoriesListResponse, goodCategoryApi } from '../../api/data'
import { GoodResponse } from '../../api/data/good.ts'
import UploadButton from '../../components/upload-button/upload-button.tsx'

function Good() {
  const { id } = useParams()
  // @ts-expect-error fut
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [messageApi, contextHolder] = message.useMessage()
  const [categories, setCategories] = useState<GoodCategoriesListResponse>([])
  const [form] = Form.useForm<GoodResponse>()

  useEffect(() => {
    goodCategoryApi.getGoodCategories().then(setCategories).catch(console.error)
  }, [])

  useEffect(() => {
    if (id) {
      goodsApi
        .getGoodById(id)
        .then((data) => {
          form.setFieldsValue(data)
        })
        .catch(console.error)
    }
  }, [form, form.setFieldsValue, id])

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
          <Row gutter={{ lg: 32 }} style={{ width: '100%', display: 'inline-flex' }}>
            <Col span={16}>
              <Title level={3}>Товар</Title>
              <Form.Item label='Название' name='title'>
                <Input />
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
                  <Form.Item label='Цена без скидки' name='price'>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Цена со скидкой' name='priceWithDisc'>
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Title level={3}>Количество</Title>
              <Form.Item label='Количество' name='count'>
                <Input type='number' />
              </Form.Item>
            </Col>
            <Col span={8} style={{ display: 'inline-flex', flexDirection: 'column' }}>
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
              <Form.Item style={{ marginTop: 'auto' }}>
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
