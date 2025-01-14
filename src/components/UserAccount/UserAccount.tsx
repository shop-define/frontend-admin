import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Card, message, Typography, Divider, Space, List } from 'antd'

// <-- ваш UploadButton для загрузки картинок
import UploadButton from '../../components/upload-button/upload-button'

// <-- используем Context, где храним settings (title, logo)
import { useSettings } from '../../helpers/SettingsContext'

// <-- API для способов оплаты / доставки
import { methodsApi } from '../../api/data/methods'

// Типы (пример, поправьте, если у вас другие)
import type { PaymentMethod, DeliveryMethod } from '../../api/data/methods'

const { Title } = Typography

const UserAccount: React.FC = () => {
  // 
  // 1. Настройки (название / лого)
  // 
  const { settings, updateSettings } = useSettings()
  const [form] = Form.useForm()

  // При загрузке/обновлении settings синхронизируем форму
  useEffect(() => {
    form.setFieldsValue({
      title: settings.title,
      logo: settings.logo ? [settings.logo] : [],
    })
  }, [settings, form])

  const onFinish = async (values: { title: string; logo: string[] }) => {
    try {
      const logoFile = values.logo?.[0] || ''
      await updateSettings({ title: values.title, logo: logoFile })
      message.success('Настройки сохранены')
    } catch {
      message.error('Ошибка сохранения настроек')
    }
  }

  // ==
  // 2. Способы оплаты
  // ==
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [paymentForm] = Form.useForm()

  // При сабмите формы добавления способа оплаты
// Пример для onAddPaymentMethod
const onAddPaymentMethod = (values: {
  title: string
  description?: string
  image?: string[]
}) => {
  // Если description не задан, ставим пустую строку
  const descriptionStr = values.description ?? ''
  // Если image пустой массив, берём ''
  const imageName = values.image?.[0] || ''

  methodsApi
    .createPaymentMethod({
      title: values.title,
      description: descriptionStr,
      image: imageName,
    })
    .then(() => {
      message.success('Способ оплаты добавлен')
      paymentForm.resetFields()
      fetchPaymentMethods()
    })
    .catch(() => message.error('Ошибка при добавлении способа оплаты'))
}


  const handleRemovePayment = (id: string) => {
    methodsApi
      .deletePaymentMethod(id)
      .then(() => {
        message.success('Способ оплаты удалён')
        setPaymentMethods((prev) => prev.filter((item) => item.id !== id))
      })
      .catch(() => message.error('Ошибка при удалении способа оплаты'))
  }

  const fetchPaymentMethods = () => {
    methodsApi
      .getPaymentMethods({ limit: 100 })
      .then((res) => {
          setPaymentMethods(res)
        
      })
      .catch(() => message.error('Ошибка при загрузке способов оплаты'))
  }

  // ==
  // 3. Способы доставки
  // ==
  const [deliveryMethods, setDeliveryMethods] = useState<DeliveryMethod[]>([])
  const [deliveryForm] = Form.useForm()

  const onAddDeliveryMethod = (values: {
    title: string
    description?: string
    image?: string[]
  }) => {
    const descriptionStr = values.description ?? ''
    const imageName = values.image?.[0] || ''
    methodsApi
      .createDeliveryMethod({
        title: values.title,
        description: descriptionStr,
        image: imageName,
      })
      .then(() => {
        message.success('Способ доставки добавлен')
        deliveryForm.resetFields()
        fetchDeliveryMethods()
      })
      .catch(() => message.error('Ошибка при добавлении способа доставки'))
  }
  

  const handleRemoveDelivery = (id: string) => {
    methodsApi
      .deleteDeliveryMethod(id)
      .then(() => {
        message.success('Способ доставки удалён')
        setDeliveryMethods((prev) => prev.filter((item) => item.id !== id))
      })
      .catch(() => message.error('Ошибка при удалении способа доставки'))
  }

  const fetchDeliveryMethods = () => {
    methodsApi
      .getDeliveryMethods({ limit: 100 })
      .then((res) => {
        
        setDeliveryMethods(res)
      })
      .catch(() => message.error('Ошибка при загрузке способов доставки'))
  }

  // При первом рендере грузим способы оплаты/доставки
  useEffect(() => {
    fetchPaymentMethods()
    fetchDeliveryMethods()
  }, [])

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        Личный кабинет
      </Title>

      {/*  Блок настроек магазина (название и логотип)  */}
      <Card style={{ marginBottom: 24 }}>
        <Title level={4}>Настройки магазина</Title>
        <Divider />
        <Form form={form} layout='vertical' onFinish={onFinish}>
          <Form.Item
            label='Название магазина'
            name='title'
            rules={[{ required: true, message: 'Введите название магазина' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label='Логотип' name='logo'>
            <UploadButton maxCount={1} />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Space direction='vertical' style={{ width: '100%' }} size='large'>
        {/*  Способы оплаты  */}
        <Card>
          <Title level={4}>Способы оплаты</Title>
          <Divider />
          <List
            dataSource={paymentMethods}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button danger onClick={() => handleRemovePayment(item.id)}>
                    Удалить
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={item.title}
                  description={
                    <>
                      {item.description}
                      {item.image && (
                        <div style={{ marginTop: 8 }}>
                          <img
                            src={item.image}
                            alt={item.title}
                            style={{ width: 60 }}
                          />
                        </div>
                      )}
                    </>
                  }
                />
              </List.Item>
            )}
          />
          <Divider />
          {/* Форма добавления способа оплаты */}
          <Form form={paymentForm} layout='vertical' onFinish={onAddPaymentMethod}>
            <Form.Item
              label='Название'
              name='title'
              rules={[{ required: true, message: 'Введите название' }]}
            >
              <Input placeholder='Введите название способа оплаты' />
            </Form.Item>
            <Form.Item label='Описание' name='description'>
              <Input.TextArea placeholder='Описание (не обязательно)' />
            </Form.Item>
            <Form.Item label='Изображение' name='image'>
              <UploadButton maxCount={1} />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Добавить способ оплаты
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {/*  Способы доставки  */}
        <Card>
          <Title level={4}>Способы доставки</Title>
          <Divider />
          <List
            dataSource={deliveryMethods}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button danger onClick={() => handleRemoveDelivery(item.id)}>
                    Удалить
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={item.title}
                  description={
                    <>
                      {item.description}
                      {item.image && (
                        <div style={{ marginTop: 8 }}>
                          <img
                            src={item.image}
                            alt={item.title}
                            style={{ width: 60 }}
                          />
                        </div>
                      )}
                    </>
                  }
                />
              </List.Item>
            )}
          />
          <Divider />
          {/* Форма добавления способа доставки */}
          <Form form={deliveryForm} layout='vertical' onFinish={onAddDeliveryMethod}>
            <Form.Item
              label='Название'
              name='title'
              rules={[{ required: true, message: 'Введите название' }]}
            >
              <Input placeholder='Введите название способа доставки' />
            </Form.Item>
            <Form.Item label='Описание' name='description'>
              <Input.TextArea placeholder='Описание (не обязательно)' />
            </Form.Item>
            <Form.Item label='Изображение' name='image'>
              <UploadButton maxCount={1} />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Добавить способ доставки
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </div>
  )
}

export default UserAccount
