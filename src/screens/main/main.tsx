import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Typography, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

// Ваши API
import { goodsApi } from '../../api/data/good'
import { checkoutApi } from '../../api/data/checkout'

// Компонент Checkouts (ваша таблица заказов)
import Checkouts from '../checkouts/checkouts'

const { Title } = Typography

const Dashboard = () => {
  const navigate = useNavigate()

  // Стейт для количества товаров и заказов
  const [goodsCount, setGoodsCount] = useState<number>(0)
  const [checkoutsCount, setCheckoutsCount] = useState<string>('0')

  useEffect(() => {
    // Загружаем товары, чтобы узнать их число
    goodsApi
      .getGoods({ limit: 1, offset: 0 }) 
      .then((res) => {
        // Если 'getGoods' возвращает { data: [...], total: number }
        // Можно записать так:
        setGoodsCount(res.total ?? 0)
      })
      .catch(() => {
        message.error('Не удалось получить количество товаров')
      })

    // Загружаем заказы (массив), limit=100
    checkoutApi
      .getCheckouts({ limit: 100, offset: 0 })
      .then((res) => {
        // Если API ВОЗВРАЩАЕТ МАССИВ (а не { data, total })
        // res = [... массив заказов ...]
        if (Array.isArray(res)) {
          // Если их пришло ровно 100, показываем ">100",
          // иначе просто длину массива
          if (res.length === 100) {
            setCheckoutsCount('>100')
          } else {
            setCheckoutsCount(String(res.length))
          }
        } else {
          // На случай непредвиденного формата
          message.error('Ответ при запросе заказов оказался не массивом')
        }
      })
      .catch(() => {
        message.error('Не удалось получить количество заказов')
      })
  }, [])

  return (
    <div>
      {/* Карточки для добавления */}
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card
            hoverable
            style={{ textAlign: 'center' }}
            onClick={() => navigate('/news/create')}
          >
            <PlusOutlined style={{ fontSize: '36px', color: '#8f9298' }} />
            <Title level={5}>Добавить новость</Title>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            hoverable
            style={{ textAlign: 'center' }}
            onClick={() => navigate('/good/new')}
          >
            <PlusOutlined style={{ fontSize: '36px', color: '#8f9298' }} />
            <Title level={5}>Добавить товар</Title>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            hoverable
            style={{ textAlign: 'center' }}
            onClick={() => navigate('/category')}
          >
            <PlusOutlined style={{ fontSize: '36px', color: '#8f9298' }} />
            <Title level={5}>Добавить категорию</Title>
          </Card>
        </Col>
      </Row>

      {/* Карточки для перехода */}
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col span={12}>
          <Card
            hoverable
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            onClick={() => navigate('/good')}
          >
            <Title level={5}>Мои товары</Title>
            <div style={{ fontSize: '14px', color: '#8f9298' }}>
              {goodsCount} товаров
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            hoverable
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            onClick={() => navigate('/checkouts')}
          >
            <Title level={5}>Заказы</Title>
            <div style={{ fontSize: '14px', color: '#8f9298' }}>
              {checkoutsCount} заказов
            </div>
          </Card>
        </Col>
      </Row>

      {/* Таблица заказов */}
      <Checkouts />
    </div>
  )
}

export default Dashboard
