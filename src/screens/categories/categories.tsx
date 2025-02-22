import { Button, Flex, Image, message } from 'antd'
import Title from 'antd/lib/typography/Title'
import Text from 'antd/lib/typography/Text'
import { useEffect, useState } from 'react'
import { categoriesApi } from '../../api/data'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import CustomDivider from '../../components/custom-divider/custom-divider.tsx'
import { GoodCategoriesListResponse } from '../../api/data/categories.ts'
import EditOutlined from '@ant-design/icons/EditOutlined'
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import fallbackImage from '../../assets/fallback-image.ts'
import { IMAGE_URL } from '../../constants/constants.ts'
import CategoryModal from '../../components/category-modal/category-modal.tsx'
import { useNavigate, useParams } from 'react-router-dom'

function Categories() {
  const { id } = useParams()
  const [categories, setCategories] = useState<GoodCategoriesListResponse>()
  const [allCategories, setAllCategories] = useState<GoodCategoriesListResponse>()
  const [openModal, setOpenModal] = useState<'edit' | 'delete' | 'create' | false>(false)
  const [messageApi, contextHolder] = message.useMessage()
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const navigate = useNavigate()

  const parentCategory = allCategories?.find((cat) => cat.id.toString() === id)

  useEffect(() => {
    handleFetch()
  }, [id])

  const handleClose = () => {
    setCategoryId(null)
    setOpenModal(false)
  }

  const handleFetch = () => {
    categoriesApi
      .getGoodCategories()
      .then((res) => {
        setCategories(
          res.filter((item) => {
            return id ? item.parentId?.toString() === id : true
          }),
        )
        setAllCategories(res)
      })
      .catch(() =>
        messageApi.open({
          type: 'error',
          content: 'Ошибка загрузки товаров',
        }),
      )
  }

  return (
    <>
      {contextHolder}
      <CategoryModal
        openModal={openModal}
        id={categoryId ?? undefined}
        onCreate={(data) => setCategories((prev) => [...(prev ?? []), data])}
        onUpdate={(data) => setCategories((prev) => [...(prev ?? []).filter((item) => item.id !== data.id), data])}
        onDelete={(deletedId) => {
          setCategories((prev) => prev?.filter((item) => item.id !== deletedId))
          setAllCategories((prev) => prev?.filter((item) => item.id !== deletedId))
        }}
        onClose={handleClose}
        categories={allCategories?.filter((item) => item.id !== categoryId)}
      />
      <Flex vertical gap={108}>
        <Button
          style={{
            paddingTop: 50,
            paddingBottom: 50,
            fontSize: 32,
            fontWeight: 'bold',
            display: 'flex',
            flexDirection: 'column',
            height: 'fit-content',
          }}
          onClick={() => setOpenModal('create')}
        >
          <PlusOutlined style={{ fontSize: 50 }} />
          Добавить категорию
        </Button>
        <Flex vertical>
          <Title level={2}>
            {parentCategory ? `Список дочерних категорий "${parentCategory.title}"` : 'Список категорий'}
          </Title>
          <Flex
            vertical
            align='center'
            justify='center'
            style={{
              paddingTop: 24,
              paddingBottom: 24,
              borderWidth: 2,
              borderStyle: 'solid',
              borderColor: '#f5f5f5',
              borderRadius: 6,
            }}
            gap={24}
          >
            {categories?.map((item, index) => (
              <>
                <Flex style={{ padding: '0 36px', width: '100%' }} align='center' justify='space-between'>
                  <Flex gap='middle' align='center'>
                    <Image
                      style={{
                        objectFit: 'contain',
                        borderRadius: 6,
                      }}
                      width={32}
                      height={32}
                      preview={false}
                      fallback={fallbackImage}
                      src={`${IMAGE_URL}/${item.icon}`}
                    />
                    <Text style={{ fontSize: 22 }}>{item.title}</Text>
                  </Flex>
                  <Flex gap={24}>
                    <Button icon={<ArrowRightOutlined />} onClick={() => navigate(`/category/${item.id.toString()}`)} />
                    <Button
                      icon={<EditOutlined />}
                      onClick={() => {
                        setOpenModal('edit')
                        setCategoryId(item.id)
                      }}
                    />
                    <Button
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        setOpenModal('delete')
                        setCategoryId(item.id)
                      }}
                    />
                  </Flex>
                </Flex>
                {index !== categories?.length - 1 && <CustomDivider margin={0} />}
              </>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default Categories
