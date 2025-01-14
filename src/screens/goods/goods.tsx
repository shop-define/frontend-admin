import { Button, Flex, message, Pagination, Select } from 'antd'
import Title from 'antd/lib/typography/Title'
import Text from 'antd/lib/typography/Text'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { goodsApi } from '../../api/data'
import Search from 'antd/es/input/Search'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { GoodSearchResponse } from '../../api/data/good.ts'
import GoodPreview from '../../components/good-preview/good-preview.tsx'
import CustomDivider from '../../components/custom-divider/custom-divider.tsx'

const pageSize = 10

function Goods() {
  const navigate = useNavigate()
  const [goods, setGoods] = useState<GoodSearchResponse>()
  const [sort, setSort] = useState<
    'date' | 'date_ask' | 'count' | 'count_ask' | 'price' | 'price_ask' | 'published' | 'draft'
  >('date')
  const [searchQuery, setSearchQuery] = useState<string>()
  const [currentPage, setCurrentPage] = useState(0)
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    handleFetch()
  }, [])

  const handleFetch = (search?: string, offset = 0) => {
    goodsApi
      .getGoods({ search, sort, offset, limit: pageSize })
      .then((res) => setGoods(res))
      .catch(() =>
        messageApi.open({
          type: 'error',
          content: 'Ошибка загрузки товаров',
        }),
      )
  }

  const handleSearch = (value: string) => {
    handleFetch(value, 0)
    setCurrentPage(0)
  }

  const handlePaginate = (pageNum: number) => {
    setCurrentPage(pageNum)
    handleFetch(searchQuery, (pageNum - 1) * pageSize)
  }

  return (
    <>
      {contextHolder}
      <Flex vertical gap='large'>
        <Title level={2} style={{ marginBottom: 0 }}>
          Мои товары
        </Title>
        <Flex vertical gap='middle'>
          <Flex justify='space-between' align='center' style={{ width: '100%' }}>
            <Flex align='center' gap='small'>
              <Text>Сортировать:</Text>
              <Select value={sort} onChange={setSort} style={{ width: 170 }}>
                <Select.Option value='date'>Сначала новые</Select.Option>
                <Select.Option value='date_ask'>Сначала старые</Select.Option>
                <Select.Option value='count_ask'>Мало</Select.Option>
                <Select.Option value='count'>Много</Select.Option>
                <Select.Option value='price_ask'>Дешевле</Select.Option>
                <Select.Option value='price'>Дороже</Select.Option>
                <Select.Option value='published'>Опубликованные</Select.Option>
                <Select.Option value='draft'>Неопубликованные</Select.Option>
              </Select>
            </Flex>
            <Flex gap='large'>
              <Search
                placeholder='Найти товар'
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
                onSearch={handleSearch}
                style={{ width: 272 }}
              />
              <Button type='primary' onClick={() => navigate('new')} icon={<PlusOutlined />}>
                Добавить товар
              </Button>
            </Flex>
          </Flex>
          <CustomDivider margin={0} />
          <Flex vertical gap='middle'>
            {goods?.data.map((item) => (
              <>
                <GoodPreview key={item.id} {...item} />
                <CustomDivider margin={0} />
              </>
            ))}
          </Flex>
          {(goods?.total ?? 0) / pageSize > 1 && (
            <Flex align='center' justify='center' gap='small'>
              <Pagination current={currentPage} total={goods?.total} pageSize={pageSize} onChange={handlePaginate} />
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  )
}

export default Goods
