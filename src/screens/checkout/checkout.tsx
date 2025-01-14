import { Button, Col, Flex, Form, Input, message, Row, Select } from 'antd'
import Title from 'antd/lib/typography/Title'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { checkoutApi } from '../../api/data'
import Text from 'antd/lib/typography/Text'
import { CheckoutResponse } from '../../api/data/checkout.ts'
import CustomDivider from '../../components/custom-divider/custom-divider.tsx'
import GoodCheckoutPreview from '../../components/good-checkout-preview/good-checkout-preview.tsx'

function Checkout() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm<CheckoutResponse>()
  const [data, setData] = useState<CheckoutResponse>()

  const date = data?.createdAt ? new Date(data?.createdAt) : null
  const dateUpdate = data?.updatedAt ? new Date(data?.updatedAt) : null

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  } as const
  const formattedDate = date?.toLocaleString('ru-RU', options).replace(',', '')
  const formattedUpdateDate = dateUpdate?.toLocaleString('ru-RU', options).replace(',', '')
  const isAllCancelled = data?.status === 'canceled'

  useEffect(() => {
    if (id && id !== 'new') {
      checkoutApi
        .getCheckoutById(id)
        .then((data) => {
          form.setFieldsValue(data)
          setData(data)
        })
        .catch(() => navigate('/404'))
    }
  }, [form, form.setFieldsValue, id])

  const handleSave = () => {
    if (!id) {
      return
    }
    form.submit()
    setIsLoading(true)
    checkoutApi
      .updateCheckoutById(id, form.getFieldsValue())
      .then((data) => setData(data))
      .catch(() =>
        messageApi.open({
          type: 'error',
          content: 'Ошибка сохранения',
        }),
      )
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      {contextHolder}
      <Form form={form} layout={'vertical'} disabled={isAllCancelled}>
        <Flex vertical>
          <Text type='secondary'>id: {id}</Text>
          <Flex justify='space-between' align='flex-end'>
            <Title level={3} style={{ marginTop: 12 }}>
              Статус заказа
            </Title>
            <Title level={3} style={{ marginTop: 12 }}>
              Трек номер
            </Title>
          </Flex>
          <Flex justify='space-between' align='flex-end'>
            <Form.Item name='status' style={{ marginBottom: 0 }}>
              <Select style={{ width: '200px' }}>
                <Select.Option value='created'>Создан</Select.Option>
                <Select.Option value='payed'>Оплачен</Select.Option>
                <Select.Option value='delivery'>В доставке</Select.Option>
                <Select.Option value='delivered'>Доставлен</Select.Option>
                <Select.Option value='success'>Завершен</Select.Option>
                <Select.Option value='canceled'>Отменен</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name='track' style={{ marginBottom: 0 }}>
              <Input />
            </Form.Item>
          </Flex>
          <Row style={{ marginTop: 40 }}>
            <Col span={11}>
              <Title level={3}>Информация о заказе</Title>
              <Form.Item name='recipientAddress' label='Адрес доставки'>
                <Input.TextArea size='large' />
              </Form.Item>
              <Form.Item name='recipientName' label='Получатель'>
                <Input size='large' />
              </Form.Item>
              <Form.Item name='recipientPhone' label='Телефон'>
                <Input size='large' />
              </Form.Item>
              <Flex justify='space-between'>
                <Form.Item label='Дата оформления'>
                  <Text type='secondary' style={{ fontSize: 16 }}>
                    {formattedDate}
                  </Text>
                </Form.Item>
                <Form.Item label='Дата обновления'>
                  <Text type='secondary' style={{ fontSize: 16 }}>
                    {formattedUpdateDate}
                  </Text>
                </Form.Item>
              </Flex>
            </Col>
            <Col span={11} offset={2}>
              <Title level={3}>Сумма заказа</Title>
              <Flex vertical gap={24}>
                <Flex justify='space-between'>
                  <Text style={{ fontSize: 16 }}>Способ оплаты</Text>
                  <Text style={{ fontSize: 16 }} type='secondary'>
                    {data?.paymentMethodName}
                  </Text>
                </Flex>
                <Flex justify='space-between'>
                  <Text style={{ fontSize: 16 }}>Способ доставки</Text>
                  <Text style={{ fontSize: 16 }} type='secondary'>
                    {data?.deliveryMethodName}
                  </Text>
                </Flex>
                <Text style={{ fontSize: 16 }}>{data?.goodsIdList.length} товаров</Text>
                <Flex justify='space-between'>
                  <Title level={3} style={{ margin: 0 }}>
                    Итого
                  </Title>
                  <Title level={3} style={{ margin: 0 }}>
                    {data?.paymentTotal} ₽
                  </Title>
                </Flex>
                <Button
                  style={{ marginTop: 'auto' }}
                  size={'large'}
                  onClick={handleSave}
                  disabled={isLoading || isAllCancelled}
                  loading={isLoading}
                >
                  Сохранить изменения
                </Button>
              </Flex>
            </Col>
          </Row>
          <CustomDivider />
          <Title level={3} style={{ marginTop: 22, marginBottom: 0 }}>
            Состав заказа
          </Title>
          <Row style={{ marginTop: 40 }}>
            <Col span={11}>
              <Flex vertical gap={16}>
                {data?.goodsIdList.map((id, index) => (
                  <>
                    {index <= data?.goodsIdList.length / 2 ? (
                      <>
                        <GoodCheckoutPreview
                          id={id}
                          title={data?.goodsName[index]}
                          price={data?.goodsPrice[index]}
                          count={data?.goodsCount[index]}
                        />
                        <CustomDivider margin={0} />
                      </>
                    ) : null}
                  </>
                ))}
              </Flex>
            </Col>
            <Col offset={2} span={11}>
              <Flex vertical gap={16}>
                {data?.goodsIdList.map((id, index) => (
                  <>
                    {index > data?.goodsIdList.length / 2 ? (
                      <>
                        <GoodCheckoutPreview
                          id={id}
                          title={data?.goodsName[index]}
                          price={data?.goodsPrice[index]}
                          count={data?.goodsCount[index]}
                        />
                        <CustomDivider margin={0} />
                      </>
                    ) : null}
                  </>
                ))}
              </Flex>
            </Col>
          </Row>
        </Flex>
      </Form>
    </>
  )
}

export default Checkout
