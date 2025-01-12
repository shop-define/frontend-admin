import { Flex, Typography, Image, Button, Tag } from 'antd'
import { GoodSearchResponse } from '../../api/data/good.ts'
import EditOutlined from '@ant-design/icons/EditOutlined'
import StarOutlined from '@ant-design/icons/StarOutlined'
import BarChartOutlined from '@ant-design/icons/BarChartOutlined'
import { useNavigate } from 'react-router-dom'

import { IMAGE_URL } from '../../constants/constants.ts'
import Text from 'antd/lib/typography/Text'
import fallbackImage from '../../assets/fallback-image.ts'
import CustomDivider from '../custom-divider/custom-divider.tsx'

const { Title } = Typography

function GoodPreview(item: GoodSearchResponse['data'][0]) {
  const navigate = useNavigate()
  return (
    <Flex gap='middle'>
      <Image
        style={{
          objectFit: 'contain',
        }}
        width={160}
        height={160}
        preview={false}
        fallback={fallbackImage}
        src={`${IMAGE_URL}/${item.images[0]}`}
      />
      <Flex vertical justify='space-between' style={{ width: '100%' }}>
        <Flex>
          <Flex vertical gap='small' style={{ width: '100%' }}>
            <Flex>
              <Title level={4} style={{ margin: 0, width: 300 }}>
                {item.title}
              </Title>
              <Flex gap='small'>
                <Button disabled icon={<StarOutlined />} />
                <Button icon={<BarChartOutlined />} />
                <Button icon={<EditOutlined />} onClick={() => navigate(`/good/${item.id}`)} />
              </Flex>
              <Tag
                color={item.status === 'published' ? 'rgba(28, 211, 68, 0.15)' : 'rgba(255, 146, 29, 0.2)'}
                style={{ marginLeft: 'auto', justifyContent: 'center', padding: '4px 18px' }}
              >
                <Text style={{ color: item.status === 'published' ? 'rgb(28, 211, 68)' : 'rgb(255, 146, 29)' }}>
                  {item.status === 'published' ? 'Опубликовано' : 'Черновик'}
                </Text>
              </Tag>
            </Flex>
            <Flex gap='middle'>
              <Flex gap='small'>
                {item.priceWithDisc && <Text strong>{item.priceWithDisc} ₽</Text>}
                <Text strong delete={!!item.priceWithDisc} type={item.priceWithDisc ? 'secondary' : undefined}>
                  {item.price} ₽
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex gap='large'>
          <Flex vertical gap={8} align='center'>
            <Text>На складе</Text>
            <Text strong style={{ fontSize: 20, lineHeight: '20px' }}>
              {item.count}
            </Text>
          </Flex>
          <CustomDivider margin={0} vertical height='100%' />
          <Flex vertical gap={8} align='center'>
            <Text>В избранном</Text>
            <Text strong style={{ fontSize: 20, lineHeight: '20px' }}>
              {item._count.FavoriteItem}
            </Text>
          </Flex>
          <CustomDivider margin={0} vertical height='100%' />
          <Flex vertical gap={8} align='center'>
            <Text>В корзине</Text>
            <Text strong style={{ fontSize: 20, lineHeight: '20px' }}>
              {item._count.BasketItem}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default GoodPreview
