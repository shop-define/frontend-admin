import { Modal, Form, Input, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const CategoryModal = ({ visible, onCancel }) => {
  return (
    <Modal visible={visible} title="Добавление категории" footer={null} onCancel={onCancel}>
      <Form layout="vertical" onFinish={(values) => console.log(values)}>
        <Form.Item label="Название" name="name" rules={[{ required: true, message: 'Введите название' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Фото" name="photo">
          <Upload>
            <Button icon={<UploadOutlined />}>Загрузить</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryModal;
