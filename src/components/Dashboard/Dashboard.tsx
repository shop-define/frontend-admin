import { Card, Row, Col, Typography, Table, Tag, Space, Select, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import orders from '../../api/data/orders'; // Импорт данных

const { Title } = Typography;
const { Search } = Input;

const Dashboard = () => {
  const navigate = useNavigate(); // Хук для навигации

  // Колонки таблицы заказов
  const orderColumns = [
    {
      title: 'Заказ',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Получатель',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Сумма',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status : string) => <Tag color="green">{status}</Tag>,
    },
  ];

  return (
    <div >
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
            onClick={() => navigate('/products/create')}
          >
            <PlusOutlined style={{ fontSize: '36px', color: '#8f9298' }} />
            <Title level={5}>Добавить товар</Title>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            hoverable
            style={{ textAlign: 'center' }}
            onClick={() => navigate('/categories/create')}
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
            onClick={() => navigate('/products')}
          >
            <Title level={5}>Мои товары</Title>
            <div style={{ fontSize: '14px', color: '#8f9298' }}>5 товаров</div>
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
            onClick={() => navigate('/orders')}
          >
            <Title level={5}>Заказы</Title>
            <div style={{ fontSize: '14px', color: '#8f9298' }}>5 товаров</div>
          </Card>
        </Col>
      </Row>

      {/* Таблица заказов */}
      <div style={{ marginTop: '24px' }}>
        <Title level={4}>Заказы</Title>
        <Space
          style={{
            marginBottom: '16px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Space>
            <Select defaultValue="по дате" style={{ width: 120 }}>
              <Select.Option value="date">по дате</Select.Option>
            </Select>
            <Select defaultValue="Получен" style={{ width: 120 }}>
              <Select.Option value="received">Получен</Select.Option>
            </Select>
          </Space>
          <Search placeholder="Найти заказ" style={{ width: 200 }} />
        </Space>
        <Table
          columns={orderColumns}
          dataSource={orders}
          pagination={false} // Отключаем пагинацию
        />
      </div>
    </div>
  );
};

export default Dashboard;
