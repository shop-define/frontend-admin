import { Flex, Image } from 'antd'
import fallbackImage from '../../assets/fallback-image.ts'
import { IMAGE_URL } from '../../constants/constants.ts'
import { useEffect, useState } from 'react'
import { goodsApi } from '../../api/data'
import Text from 'antd/lib/typography/Text'
import { useNavigate } from 'react-router-dom'

type Props = {
  id: string
  title: string
  count: number
  price: number
}

function GoodCheckoutPreview({ id, title, count, price }: Props) {
  const navigate = useNavigate()
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    goodsApi.getGoodById(id).then((data) => setImages(data.images))
  }, [])

  return (
    <Flex gap={16} onClick={() => navigate(`/good/${id}`)} style={{ cursor: 'pointer' }}>
      <Image
        style={{
          objectFit: 'contain',
        }}
        width={124}
        height={124}
        preview={false}
        fallback={fallbackImage}
        src={`${IMAGE_URL}/${images[0]}`}
      />
      <Flex vertical justify='space-between' style={{ width: '100%' }}>
        <Text style={{ fontSize: 20 }}>{title}</Text>
        <Text style={{ fontSize: 16 }} type='secondary'>
          {count} шт
        </Text>
      </Flex>
      <Text style={{ fontSize: 20, fontWeight: 500, marginTop: 'auto', minWidth: 'fit-content' }}>{price} ₽</Text>
    </Flex>
  )
}

export default GoodCheckoutPreview
