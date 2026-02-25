import React, { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Space,
  Typography,
  Tag,
  Descriptions,
  message,
} from 'antd';
import { updateHotelInfo, type HotelDetail } from '../../services/hotelService';
import axios from 'axios';

const { Title, Text, Paragraph } = Typography;

interface Tag {
  id: number;
  name: string;
  category: string;
}

interface TagsResponse {
  code: number;
  data: Tag[];
}

interface HotelEditProps {
  hotelDetail: HotelDetail;
  onUpdate: () => void;
}

const HotelEdit: React.FC<HotelEditProps> = ({ hotelDetail, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagsLoading, setTagsLoading] = useState(false);

  // 当酒店详情加载完成或编辑模式切换时，设置表单值
  useEffect(() => {
    if (hotelDetail && editing) {
      // 查找标签名称对应的ID
      const tagIds = hotelDetail.tags.map(tagName => {
        const tag = tags.find(t => t.name === tagName);
        return tag ? tag.id : null;
      }).filter((id): id is number => id !== null);
      
      form.setFieldsValue({
        name: hotelDetail.name,
        address: hotelDetail.address,
        description: hotelDetail.description,
        star: hotelDetail.star,
        tags: tagIds,
      });
    }
  }, [hotelDetail, editing, form, tags]);

  // 获取标签列表
  const fetchTags = async () => {
    setTagsLoading(true);
    try {
      const response = await axios.get<TagsResponse>('/api/tags');
      if (response.data.code === 200) {
        setTags(response.data.data);
      } else {
        message.error('获取标签列表失败');
      }
    } catch (error) {
      console.error('获取标签列表失败:', error);
      message.error('网络请求失败');
    } finally {
      setTagsLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  // 处理修改提交
  const handleSubmit = async (values: any) => {
    try {
      // 查找标签ID对应的名称
      const tagNames = values.tags.map((tagId: number) => {
        const tag = tags.find(t => t.id === tagId);
        return tag ? tag.name : '';
      }).filter(Boolean);
      
      // 构建提交数据，确保tags字段是字符串数组
      const submitData = {
        ...values,
        tags: tagNames
      };
      
      const response = await updateHotelInfo(hotelDetail.id, submitData);
      message.success(response.message || '酒店信息修改成功');
      setEditing(false);
      // 通知父组件更新酒店详情
      onUpdate();
    } catch (error: any) {
      console.error('修改酒店信息失败:', error);
      message.error(error.message || '修改酒店信息失败，请重试');
    }
  };

  return (
    <>
      {/* 酒店基本信息、描述和标签 - 编辑模式 */}
      {editing ? (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginBottom: 24 }}
        >
          <Title level={4}>基本信息</Title>
          <Form.Item
            name="name"
            label="酒店名称"
            rules={[{ required: true, message: '请输入酒店名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="酒店地址"
            rules={[{ required: true, message: '请输入酒店地址' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="star"
            label="酒店星级"
          >
            <InputNumber min={1} max={5} />
          </Form.Item>
          <Form.Item
            name="description"
            label="酒店描述"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="tags"
            label="酒店标签"
          >
            <Select
              mode="multiple"
              loading={tagsLoading}
              style={{ width: '100%' }}
              placeholder="请选择酒店标签"
              options={tags.map(tag => ({
                value: tag.id,
                label: tag.name
              }))}
              tokenSeparators={[',']}
            />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                确认修改
              </Button>
              <Button onClick={() => setEditing(false)}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      ) : (
        <>
          {/* 酒店基本信息 */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Title level={4}>基本信息</Title>
              <Button type="primary" size="small" onClick={() => setEditing(true)}>
                修改信息
              </Button>
            </div>
            <Descriptions bordered column={{ xs: 1, sm: 2, md: 3 }}>
              <Descriptions.Item label="酒店地址">{hotelDetail.address}</Descriptions.Item>
              <Descriptions.Item label="酒店星级">
                {Array.from({ length: hotelDetail.star }).map((_, index) => (
                  <span key={index}>★</span>
                ))}
              </Descriptions.Item>
              <Descriptions.Item label="评分">{hotelDetail.rating}</Descriptions.Item>
              <Descriptions.Item label="开业时间">{hotelDetail.openingDate}</Descriptions.Item>
              <Descriptions.Item label="审核意见">{hotelDetail.auditComment}</Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {new Date(hotelDetail.createdAt).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="更新时间">
                {new Date(hotelDetail.updatedAt).toLocaleString()}
              </Descriptions.Item>
            </Descriptions>
          </div>

          {/* 酒店描述 */}
          <div style={{ marginBottom: 24 }}>
            <Title level={4}>酒店描述</Title>
            <Paragraph>{hotelDetail.description}</Paragraph>
          </div>

          {/* 酒店标签 */}
          <div style={{ marginBottom: 24 }}>
            <Title level={4}>酒店标签</Title>
            <Space wrap>
              {hotelDetail.tags.map((tag, index) => (
                <Tag key={index} color="blue">
                  {tag}
                </Tag>
              ))}
            </Space>
          </div>
        </>
      )}
    </>
  );
};

export default HotelEdit;