import { Button, Flex, message, Upload } from 'antd'
import Text from 'antd/lib/typography/Text'
import { RcFile } from 'antd/es/upload'
import { IMAGE_URL } from '../../constants/constants.ts'
import { imagesApi } from '../../api/data'
import s from './upload-button.module.css'

type Props = {
  value?: string[]
  onChange?: (value: string[]) => void
}

function UploadButton({ value = [], onChange }: Props) {
  const [messageApi, contextHolder] = message.useMessage()

  const fileList = value?.map((item) => ({
    url: `${IMAGE_URL}/${item}`,
    uid: item,
    name: item,
  }))

  async function uploadRequest({ file }: { file: string | Blob | RcFile; filename?: string }) {
    try {
      const res = await imagesApi.upload(file as File)
      if (res) onChange?.([...value, res.name])
    } catch (e) {
      messageApi.open({
        type: 'error',
        content: 'Ошибка загрузки фото',
      })
    }
  }

  function handleRemove(item: { name: string }): void {
    onChange?.(value?.filter((val) => val !== item.name))
  }

  return (
    <>
      {contextHolder}
      <Upload
        listType='picture-card'
        showUploadList={true}
        fileList={fileList}
        customRequest={uploadRequest}
        onRemove={handleRemove}
        className={s.upload}
      >
        <Flex justify={'space-between'} vertical className={s.uploadContainer}>
          <Text>Выберите файл или перетащите его сюда</Text>
          <Button block>Открыть файл</Button>
        </Flex>
      </Upload>
    </>
  )
}

export default UploadButton
