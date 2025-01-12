import React from 'react';
import { Card, Descriptions, Typography, Table, Tag, Image } from 'antd';
import mockOrderDetails from '../../api/data/orderDetails';

const { Title } = Typography;

const OrderDetails: React.FC = () => {
  const order = mockOrderDetails;

  const columns = [
    {
      title: 'Товар',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Image src={record.image} alt={text} width={100} height={100} />
          {text}
        </div>
      ),
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Количество',
      dataIndex: 'quantity',
      key: 'quantity',
    },
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Title level={3}>Детали заказа</Title>
      <Card style={{ marginBottom: '24px' }}>
        <Descriptions title={`ID заказа: ${order.id}`} bordered column={2}>
          <Descriptions.Item label="Статус заказа">
            <Tag color="green">{order.status}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Трек номер">{order.trackingNumber}</Descriptions.Item>
          <Descriptions.Item label="Получатель">{order.recipient.name}</Descriptions.Item>
          <Descriptions.Item label="Адрес доставки / ПВЗ">
            {order.recipient.address}
          </Descriptions.Item>
          <Descriptions.Item label="Дата оформления">
            {order.recipient.orderDate}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card style={{ marginBottom: '24px' }}>
        <Descriptions title="Сумма заказа" bordered column={2}>
          <Descriptions.Item label="Способ оплаты">
            {order.payment.method}
          </Descriptions.Item>
          <Descriptions.Item label="Количество товаров">
            {order.payment.itemsCount}
          </Descriptions.Item>
          <Descriptions.Item label="Итоговая сумма">
            {order.payment.finalTotal} ₽
          </Descriptions.Item>
          <Descriptions.Item label="Скидка">
            {order.payment.discount} ₽
          </Descriptions.Item>
          <Descriptions.Item label="Итог">
            <strong>{order.payment.finalTotal} ₽</strong>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card>
        <Title level={4} style={{ marginBottom: '16px' }}>
          Состав заказа
        </Title>
        <Table
          dataSource={order.items}
          columns={columns}
          pagination={false}
          bordered
        />
      </Card>
    </div>
  );
};

export default OrderDetails;
