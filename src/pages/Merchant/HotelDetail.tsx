import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Descriptions,
  Image,
  Tag,
  List,
  Space,
  Button,
  Typography,
  Divider,
  Spin,
  message,
  Carousel,
  Form,
  Input,
  InputNumber,
  Select,
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getHotelDetail, updateHotelInfo, type HotelDetail as HotelDetailType } from '../../services/hotelService';
import AddRoom from '../../components/AddRoom';

const { Title, Text, Paragraph } = Typography;



const HotelDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hotelDetail, setHotelDetail] = useState<HotelDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [roomDrawerOpen, setRoomDrawerOpen] = useState(false);
  const [form] = Form.useForm();

  // 当酒店详情加载完成或编辑模式切换时，设置表单值
  useEffect(() => {
    if (hotelDetail && editing) {
      form.setFieldsValue({
        name: hotelDetail.name,
        address: hotelDetail.address,
        description: hotelDetail.description,
        star: hotelDetail.star,
        tags: hotelDetail.tags,
      });
    }
  }, [hotelDetail, editing, form]);

  const handleBack = () => {
    navigate('/merchant/HotelManage');
  };

  const fetchHotelDetail = async () => {
    if (!id) return;

    setLoading(true);
    try {
      const detail = await getHotelDetail(parseInt(id));
      setHotelDetail(detail);
    } catch (error: any) {
      console.error('获取酒店详情失败:', error);
      message.error(error.message || '网络请求失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotelDetail();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>加载中...</div>
      </div>
    );
  }

  if (!hotelDetail) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Text type="danger">未找到酒店信息</Text>
        <Button type="primary" onClick={handleBack} style={{ marginTop: 16 }}>
          返回列表
        </Button>
      </div>
    );
  }

  // 处理修改提交
  const handleSubmit = async (values: any) => {
    if (!id) return;
    
    try {
      const response = await updateHotelInfo(parseInt(id), values);
      message.success(response.message || '酒店信息修改成功');
      setEditing(false);
      // 重新获取酒店详情
      fetchHotelDetail();
    } catch (error: any) {
      console.error('修改酒店信息失败:', error);
      message.error(error.message || '修改酒店信息失败，请重试');
    }
  };

  // 处理添加房型
  const handleAddRoom = () => {
    setRoomDrawerOpen(true);
  };

  // 处理房型添加成功
  const handleRoomAddSuccess = () => {
    // 重新获取酒店详情
    fetchHotelDetail();
  };
  // 轮播图样式
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  // 状态标签颜色映射
  const statusColorMap: Record<string, string> = {
    pending: 'orange',
    approved: 'blue',
    rejected: 'red',
    published: 'green',
    unpublished: 'gray',
  };

  // 状态标签文本映射
  const statusTextMap: Record<string, string> = {
    pending: '审核中',
    approved: '已通过',
    rejected: '已驳回',
    published: '已发布',
    unpublished: '未发布',
  };

  return (
    <div style={{ padding: 24 }}>
      {/* 头部导航 */}
      <div style={{ marginBottom: 24 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
          返回列表
        </Button>
      </div>

      {/* 酒店基本信息 */}
      <Card
        title={
          <Space size="middle">
            <Title level={3}>{hotelDetail.name}</Title>
            <Tag color={statusColorMap[hotelDetail.status]}>
              {statusTextMap[hotelDetail.status]}
            </Tag>
          </Space>
        }
        style={{ marginBottom: 24 }}
      >
        {/* 酒店图片 */}
        <div style={{ marginBottom: 24 }}>
          <Title level={4}>酒店图片</Title>
          <Carousel autoplay style={{ maxWidth: 800, margin: '0 auto' }} draggable={true}>
            {hotelDetail.images.map((image) => (
              <div key={image.id} style={{ textAlign: 'center', padding: 20 }}>
                <Image
                  width={700}
                  src={image.url}
                  alt={`${hotelDetail.name} - ${image.type}`}
                />
                <div style={{ marginTop: 16 }}>
                  <Tag>{image.type === 'main' ? '主图' : '设施图'}</Tag>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
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
                mode="tags"
                style={{ width: '100%' }}
                placeholder="请选择或输入酒店标签"
                options={[
                  { value: '江景', label: '江景' },
                  { value: '奢华', label: '奢华' },
                  { value: '亲子', label: '亲子' },
                  { value: '商务', label: '商务' },
                  { value: '度假', label: '度假' },
                ]}
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

        <Divider />

        {/* 房型信息 */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Title level={4}>房型信息</Title>
            <Button type="primary" size="small" onClick={handleAddRoom}>
              添加房型
            </Button>
          </div>
          <div>
            {hotelDetail.rooms.map((room) => (
              <Card
                key={room.id}
                title={room.type}
                style={{ marginBottom: 16 }}
                extra={
                  <Text strong style={{ fontSize: 18, color: '#ff4d4f' }}>
                    ¥{room.price}
                  </Text>
                }
              >
                <Descriptions column={{ xs: 1, sm: 2, md: 4 }}>
                  <Descriptions.Item label="面积">{room.area}㎡</Descriptions.Item>
                  <Descriptions.Item label="床型">{room.bedType}</Descriptions.Item>
                  <Descriptions.Item label="最大入住">{room.maxOccupancy}人</Descriptions.Item>
                  <Descriptions.Item label="总房间数">{room.totalRooms}间</Descriptions.Item>
                  <Descriptions.Item label="可用房间数">{room.available}间</Descriptions.Item>
                </Descriptions>

                {/* 房型图片 */}
                {room.images.length > 0 && (
                  <div style={{ marginTop: 16 }}>
                    <Text strong>房型图片：</Text>
                    <Carousel autoplay style={{ maxWidth: 400, marginTop: 8 }}>
                      {room.images.map((img, index) => (
                        <div key={index} style={{ textAlign: 'center', padding: 10 }}>
                          <Image
                            width={300}
                            height={200}
                            src={img}
                            alt={`${room.type} - 图片${index + 1}`}
                          />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                )}

                {/* 房间设施 */}
                <div style={{ marginTop: 16 }}>
                  <Text strong>房间设施：</Text>
                  <Space wrap style={{ marginTop: 8 }}>
                    {room.amenities.map((amenity, index) => (
                      <Tag key={index}>{amenity}</Tag>
                    ))}
                  </Space>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 添加房型组件 */}
        {id && (
          <AddRoom
            hotelId={parseInt(id)}
            open={roomDrawerOpen}
            onClose={() => setRoomDrawerOpen(false)}
            onSuccess={handleRoomAddSuccess}
          />
        )}
      </Card>
    </div>
  );
};

export default HotelDetail;