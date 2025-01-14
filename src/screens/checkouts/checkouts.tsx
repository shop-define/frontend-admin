import { useEffect, useState } from 'react'
import { Table, message, Space, Input, Select, Typography, Tag } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { checkoutApi } from '../../api/data/checkout.ts'

const { Title } = Typography
const { Search } = Input

type CheckoutItem = {
  id: string
  createdAt: string
  recipientName: string
  paymentTotal: number
  status: 'created' | 'payed' | 'delivery' | 'delivered' | 'success' | 'canceled'
}

function Checkouts() {
  const navigate = useNavigate()

  // Состояние для массива заказов и загрузки
  const [data, setData] = useState<CheckoutItem[]>([])
  const [loading, setLoading] = useState(false)

  // Пагинация (клиентская или серверная)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Доп. параметры: поиск, сортировка, ФИЛЬТР по статусу
  const [searchQuery, setSearchQuery] = useState('')
  const [sort, setSort] = useState<'date' | 'date_ask' | 'recipientName' | 'recipientName_ask'>('date')
  const [statusFilter, setStatusFilter] = useState<
    'created' | 'payed' | 'delivery' | 'delivered' | 'success' | 'canceled' | undefined
  >(undefined)

  // Загрузка заказов
  const fetchCheckouts = async () => {
    setLoading(true)
    try {
      const response = await checkoutApi.getCheckouts({
        limit: 100,
        offset: 0,
        sort,
        search: searchQuery,
        filter: statusFilter,
      })

      setData(response)
    } catch (err) {
      message.error('Ошибка загрузки заказов')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCheckouts()
    // eslint-disable-next-line
  }, [sort, searchQuery, statusFilter])

  const statusColorMap: Record<CheckoutItem['status'], string> = {
    created: 'blue',
    payed: 'green',
    delivery: 'orange',
    delivered: 'geekblue',
    success: 'green',
    canceled: 'red',
  }

  // Колонки таблицы
  const columns = [
    {
      title: 'Номер заказа',
      dataIndex: 'id',
      key: 'id',
      render: (value: string) => <b>{value}</b>,
    },
    {
      title: 'Дата',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value: string) => {
        const dateObj = new Date(value)
        return dateObj.toLocaleString('ru-RU', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      },
    },
    {
      title: 'Получатель',
      dataIndex: 'recipientName',
      key: 'recipientName',
    },
    {
      title: 'Сумма',
      dataIndex: 'paymentTotal',
      key: 'paymentTotal',
      render: (val: number) => `${val.toLocaleString()} ₽`,
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status: CheckoutItem['status']) => <Tag color={statusColorMap[status]}>{renderStatusText(status)}</Tag>,
    },
  ]

  // Опциональная функция, чтобы подписать статус на русском
  const renderStatusText = (status: CheckoutItem['status']) => {
    switch (status) {
      case 'created':
        return 'Создан'
      case 'payed':
        return 'Оплачен'
      case 'delivery':
        return 'В доставке'
      case 'delivered':
        return 'Доставлен'
      case 'success':
        return 'Завершен'
      case 'canceled':
        return 'Отменен'
      default:
        return status
    }
  }

  const handleSearch = (value: string) => {
    setSearchQuery(value)
  }

  // Обработка выбора статуса
  const handleStatusChange = (value: string) => {
    // Если "all" -> убираем фильтр
    if (value === 'all') {
      setStatusFilter(undefined)
    } else {
      setStatusFilter(value as CheckoutItem['status'])
    }
  }

  return (
    <div className='ant-pro-card' style={{ padding: '16px', background: '#fff' }}>
      <Title level={2} style={{ marginBottom: '16px' }}>
        Заказы
      </Title>

      <Space style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }} wrap>
        {/* Панель слева: поиск + сортировка */}
        <Space>
          Сортировать:
          <Select
            value={sort}
            onChange={(val) => setSort(val)}
            style={{ width: 220 }}
            options={[
              { label: 'Сначала новые', value: 'date' },
              { label: 'Сначала старые', value: 'date_ask' },
              { label: 'Имя (А-Я)', value: 'recipientName' },
              { label: 'Имя (Я-А)', value: 'recipientName_ask' },
            ]}
          />
          Cтатус:
          <Select
            style={{ width: 120, border: 'none' }}
            onChange={handleStatusChange}
            value={statusFilter || 'all'} // если статус не выбран, показываем "all"
          >
            <Select.Option value='all'>Все</Select.Option>
            <Select.Option value='created'>Создан</Select.Option>
            <Select.Option value='payed'>Оплачен</Select.Option>
            <Select.Option value='delivery'>В доставке</Select.Option>
            <Select.Option value='delivered'>Доставлен</Select.Option>
            <Select.Option value='success'>Завершен</Select.Option>
            <Select.Option value='canceled'>Отменен</Select.Option>
          </Select>
        </Space>

        {/* Панель справа: фильтр по статусу */}

        <Search
          placeholder='Найти заказ'
          onSearch={handleSearch}
          allowClear
          enterButton={<SearchOutlined />}
          style={{ width: 272 }}
        />
      </Space>

      <Table
        rowKey='id'
        loading={loading}
        columns={columns}
        dataSource={data}
        // Пагинация (клиентская)
        pagination={{
          current: currentPage,
          pageSize: pageSize,

          onChange: (page, size) => {
            setCurrentPage(page)
            setPageSize(size)
          },
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '50', '100'],
        }}
        onRow={(record) => ({
          onClick: () => navigate(`/checkout/${record.id}`),
          className: 'ant-table-row-clickable',
        })}
      />
    </div>
  )
}

export default Checkouts
