import React from 'react';
import { Card, Row, Col, Typography, Space, Input, Button, Badge, Tag, Tooltip } from 'antd';
import { SearchOutlined, PlusOutlined, StarOutlined, LineChartOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const mockProducts = [
  {
    id: 1,
    name: 'Футболка "Светлая сторона"',
    price: '2 820 ₽',
    oldPrice: '4 700 ₽',
    rating: '4.8',
    inDelivery: 2235,
    inStock: 233,
    sold: 2242,
    inFavorites: 242,
    inCart: 152,
    status: 'Опубликовано',
    image: '../src/assets/shirt.jpg', // Заглушка
  },
  {
    id: 3,
    name: 'Футболка "Светлая сторона"',
    price: '2 820 ₽',
    oldPrice: '4 700 ₽',
    rating: '4.8',
    inDelivery: 2235,
    inStock: 233,
    sold: 2242,
    inFavorites: 242,
    inCart: 152,
    status: 'Опубликовано',
    image: '../src/assets/shirt.jpg', // Заглушка
  },
  {
    id: 2,
    name: 'Футболка "Светлая сторона"',
    price: '2 820 ₽',
    oldPrice: '4 700 ₽',
    rating: '4.8',
    inDelivery: 2235,
    inStock: 233,
    sold: 2242,
    inFavorites: 242,
    inCart: 152,
    status: 'Опубликовано',
    image: '../src/assets/shirt.jpg', // Заглушка
  },
  // Добавьте другие товары, если нужно
];

const ProductList: React.FC = () => {
  const navigate = useNavigate();

  const handleEdit = (id: number) => {
    navigate(`/edit-product/${id}`);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Заголовок страницы */}
      <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
        <Col>
          <Title level={3}>Мои товары</Title>
        </Col>
        <Col>
          <Input
            placeholder="Найти товар"
            prefix={<SearchOutlined />}
            style={{ width: 200, marginRight: '16px' }}
          />
          <Button type="primary" icon={<PlusOutlined />}>
            Добавить товар
          </Button>
        </Col>
      </Row>

      {/* Список товаров */}
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {mockProducts.map((product) => (
          <Card key={product.id} bordered>
            <Row align="middle" gutter={16}>
              <Col flex="80px">
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: 80, height: 80, borderRadius: 8 }}
                />
              </Col>
              <Col flex="auto">
                <Row justify="space-between" align="middle">
                  <Col>
                    <Title level={5} style={{ margin: 0 }}>
                      {product.name}
                    </Title>
                    <Space size="small">
                      <Text strong>{product.price}</Text>
                      {product.oldPrice && (
                        <Text delete type="secondary">
                          {product.oldPrice}
                        </Text>
                      )}
                      <Text type="secondary">Рейтинг: {product.rating}</Text>
                    </Space>
                  </Col>
                  <Col>
                    <Badge
                      count={product.status === 'Опубликовано' ? 'Опубликовано' : 'Черновик'}
                      style={{
                        backgroundColor:
                          product.status === 'Опубликовано' ? '#52c41a' : '#d9d9d9',
                      }}
                    />
                  </Col>
                </Row>

                <Row style={{ marginTop: 16 }} gutter={32}>
                  <Col>
                    <Text>В доставке: {product.inDelivery}</Text>
                  </Col>
                  <Col>
                    <Text>На складе: {product.inStock}</Text>
                  </Col>
                  <Col>
                    <Text>Продано: {product.sold}</Text>
                  </Col>
                  <Col>
                    <Text>В избранном: {product.inFavorites}</Text>
                  </Col>
                  <Col>
                    <Text>В корзине: {product.inCart}</Text>
                  </Col>
                </Row>

                <Row justify="end" style={{ marginTop: 16 }} gutter={16}>
                  <Col>
                    <Tooltip title="В избранное">
                      <Button icon={<StarOutlined />} shape="circle" />
                    </Tooltip>
                  </Col>
                  <Col>
                    <Tooltip title="Статистика">
                      <Button icon={<LineChartOutlined />} shape="circle" />
                    </Tooltip>
                  </Col>
                  <Col>
                    <Tooltip title="Редактировать">
                      <Button
                        icon={<EditOutlined />}
                        shape="circle"
                        onClick={() => handleEdit(product.id)}
                      />
                    </Tooltip>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        ))}
      </Space>
    </div>
  );
};

export default ProductList;
