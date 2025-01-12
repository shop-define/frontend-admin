import { Table, Tag, Typography, Space, Input, Select } from 'antd';
import data from '../../api/data/orders';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Search } = Input;

const OrderList = () => {
  const navigate = useNavigate();



  const columns = [
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
    <div>
      <Title level={3}>Заказы</Title>
      <Space style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
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
        columns={columns}
        dataSource={data}
        pagination={false} 
        onRow={(record) => ({
          onClick: () => navigate(`/orders/${record.orderId}`), // Переход на страницу заказа
        })}
        rowKey="id"
      />
    </div>
  );
};

export default OrderList;
