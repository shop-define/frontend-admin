import React from 'react'
import { Form, Input, Button, Card, message } from 'antd'

import UploadButton from '../../components/upload-button/upload-button'
import { useSettings } from '../../helpers/SettingsContext'

const UserAccount: React.FC = () => {
  const { settings, updateSettings } = useSettings() 
  // Получаем текущее значение (title, logo) и функцию обновления

  // Ант-дизайн форма
  const [form] = Form.useForm()

  // При первом рендере (или при каждом) — заполнить форму
  React.useEffect(() => {
    // У нас logo — строка, UploadButton требует массив
    form.setFieldsValue({
      title: settings.title,
      logo: settings.logo ? [settings.logo] : [],
    })
  }, [settings])

  const onFinish = async (values: { title: string; logo: string[] }) => {
    try {
      // Берём первый элемент массива
      const logoFile = values.logo[0] || ''
      await updateSettings({ title: values.title, logo: logoFile })
      message.success('Настройки сохранены')
    } catch (err) {
      message.error('Ошибка сохранения настроек')
    }
  }

  return (
    <Card style={{ maxWidth: 600, margin: '20px auto' }}>
      <Form form={form} layout='vertical' onFinish={onFinish}>
        <Form.Item
          label='Название магазина'
          name='title'
          rules={[{ required: true, message: 'Введите название магазина' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label='Логотип' name='logo'>
          {/* UploadButton ожидает массив строк */}
          <UploadButton maxCount={1} />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default UserAccount
