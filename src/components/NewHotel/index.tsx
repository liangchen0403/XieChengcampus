import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select, DatePicker, InputNumber, message, Upload, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form';
import type { Dayjs } from 'dayjs';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { createHotelWithFiles } from '../../services/hotelService';

interface HotelFormValues {
  name: string;
  address: string;
  description?: string;
  star?: number;
  openingDate: Dayjs;
  tagIds?: string;
  images: UploadFile[];
}

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm<HotelFormValues>();

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleSubmit = async (values: HotelFormValues) => {
    setConfirmLoading(true);
    try {
      // 发送请求
      const result = await createHotelWithFiles(
        values.name,
        values.address,
        values.description,
        values.star,
        values.openingDate,
        values.tagIds,
        values.images
      );

      if (result.code === 201) {
        message.success('酒店创建成功！');
        setOpen(false);
        form.resetFields();
      } else {
        message.error('创建酒店失败');
      }
    } catch (error) {
      console.error('创建酒店错误:', error);
      message.error('创建酒店失败，请检查网络或重试');
    } finally {
      setConfirmLoading(false);
    }
  };

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    listType: 'picture',
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('只能上传JPG/PNG图片！');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('图片大小不能超过2MB！');
      }
      return false; // 阻止自动上传，我们将在提交时一起上传
    },
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        新增酒店
      </Button>
      <Modal
        title="新增酒店"
        open={open}
        onOk={() => form.submit()}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="酒店名称"
            rules={[{ required: true, message: '请输入酒店名称' }]}
          >
            <Input placeholder="请输入酒店名称" />
          </Form.Item>
          <Form.Item
            name="address"
            label="酒店地址"
            rules={[{ required: true, message: '请输入酒店地址' }]}
          >
            <Input placeholder="请输入酒店地址" />
          </Form.Item>
          <Form.Item
            name="description"
            label="酒店描述"
          >
            <Input.TextArea rows={4} placeholder="请输入酒店描述" />
          </Form.Item>
          <Form.Item
            name="star"
            label="酒店星级"
          >
            <InputNumber min={1} max={5} placeholder="请输入酒店星级" />
          </Form.Item>
          <Form.Item
            name="openingDate"
            label="开业时间"
            rules={[{ required: true, message: '请选择开业时间' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="tagIds"
            label="酒店标签"
          >
            <Select placeholder="请选择酒店标签" />
          </Form.Item>
          <Form.Item
            name="images"
            label="酒店图片"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>上传图片</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default App;