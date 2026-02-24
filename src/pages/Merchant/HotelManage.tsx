import { Table, Select, Space, Input, Button, message, Tag } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
const { Option } = Select;
const { Search } = Input;

interface HotelItem {
  id: number;
  key: React.Key;
  name: string;
  status: 'pending' | 'approved' | 'rejected' | 'published' | 'unpublished';
  createdAt: string;
  updatedAt: string;
  address?: string;
  starRating?: number;
  roomType?: string;
  price?: number;
}

interface HotelResponse {
  code: number;
  data: {
    total: number;
    page: number;
    pageSize: number;
    items: HotelItem[];
  };
}

const HotelTable: React.FC = () => {
  // 状态管理
  const [data, setData] = useState<HotelItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [filters, setFilters] = useState({
    status: undefined as string | undefined,
    searchKeyword: '',
  });

  // 状态标签颜色映射
  const statusColorMap: Record<string, string> = {
    pending: 'orange',    // 审核中
    approved: 'blue',     // 已通过
    rejected: 'red',      // 已驳回
    published: 'green',   // 已发布
    unpublished: 'gray',  // 未发布/已下线
  };

  // 状态标签文本映射
  const statusTextMap: Record<string, string> = {
    pending: '审核中',
    approved: '已通过',
    rejected: '已驳回',
    published: '已发布',
    unpublished: '未发布',
  };

  // 获取酒店数据
  const fetchHotelData = async () => {
    setLoading(true);
    try {
      // 构建查询参数
      const params: any = {
        page: pagination.current,
        pageSize: pagination.pageSize,
      };
      
      // 添加状态过滤条件
      if (filters.status) {
        params.status = filters.status;
      }

      // 调用API
      const response = await axios.get<HotelResponse>('/merchant/hotels', {
        params,
      });

      if (response.data.code === 200) {
        const { total, page, pageSize, items } = response.data.data;
        
        // 格式化数据，添加key属性
        const formattedItems = items.map(item => ({
          ...item,
          key: item.id,
        }));
        
        setData(formattedItems);
        setPagination(prev => ({
          ...prev,
          total,
          current: page,
          pageSize,
        }));
      } else {
        message.error('获取数据失败');
      }
    } catch (error) {
      console.error('获取酒店数据失败:', error);
      message.error('网络请求失败');
    } finally {
      setLoading(false);
    }
  };

  // 表格列定义
  const columns: ColumnsType<HotelItem> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: '酒店名称',
      dataIndex: 'name',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Search
            placeholder="搜索酒店名称"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onSearch={() => {
              confirm();
              setFilters(prev => ({ ...prev, searchKeyword: selectedKeys[0] as string }));
            }}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => {
                confirm();
                setFilters(prev => ({ ...prev, searchKeyword: selectedKeys[0] as string }));
              }}
              size="small"
              style={{ width: 90 }}
            >
              搜索
            </Button>
            <Button
              onClick={() => {
                clearFilters?.();
                setFilters(prev => ({ ...prev, searchKeyword: '' }));
              }}
              size="small"
              style={{ width: 90 }}
            >
              重置
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) =>
        record.name.toLowerCase().includes((value as string).toLowerCase()),
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 120,
      filters: [
        { text: '审核中', value: 'pending' },
        { text: '已通过', value: 'approved' },
        { text: '已驳回', value: 'rejected' },
        { text: '已发布', value: 'published' },
        { text: '未发布', value: 'unpublished' },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.status === value,
      render: (status: string) => (
        <Tag color={statusColorMap[status]}>
          {statusTextMap[status] || status}
        </Tag>
      ),
    },
    {
      title: '地址',
      dataIndex: 'address',
      ellipsis: true,
    },
    {
      title: '星级',
      dataIndex: 'starRating',
      width: 100,
      sorter: (a, b) => (a.starRating || 0) - (b.starRating || 0),
    },
    {
      title: '价格',
      dataIndex: 'price',
      width: 120,
      sorter: (a, b) => (a.price || 0) - (b.price || 0),
      render: (price: number) => price ? `¥${price}` : '-',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      width: 180,
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      width: 180,
      sorter: (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: '操作',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button type="link" size="small" onClick={() => handleView(record)}>
            查看
          </Button>
          <Button type="link" size="small" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          {record.status === 'approved' && (
            <Button type="link" size="small" onClick={() => handlePublish(record)}>
              发布
            </Button>
          )}
        </Space>
      ),
    },
  ];

  // 操作处理函数
  const handleView = (record: HotelItem) => {
    console.log('查看酒店:', record);
    // 跳转到查看页面或打开查看模态框
  };

  const handleEdit = (record: HotelItem) => {
    console.log('编辑酒店:', record);
    // 跳转到编辑页面
  };

  const handlePublish = (record: HotelItem) => {
    console.log('发布酒店:', record);
    // 调用发布接口
  };

  // 状态过滤处理
  const handleStatusFilter = (value: string) => {
    setFilters(prev => ({ ...prev, status: value || undefined }));
  };

  // 搜索处理
  const handleSearch = (value: string) => {
    setFilters(prev => ({ ...prev, searchKeyword: value }));
  };

  // 重置过滤器
  const handleResetFilters = () => {
    setFilters({
      status: undefined,
      searchKeyword: '',
    });
  };

  // 表格变化处理
  const onChange: TableProps<HotelItem>['onChange'] = (paginationInfo, filters, sorter, extra) => {
    console.log('params', paginationInfo, filters, sorter, extra);
    
    // 更新分页信息
    if (paginationInfo.current) {
      setPagination(prev => ({
        ...prev,
        current: paginationInfo.current || 1,
        pageSize: paginationInfo.pageSize || 10,
      }));
    }

    // 处理状态过滤
    if (filters.status && Array.isArray(filters.status) && filters.status.length > 0) {
      setFilters(prev => ({ ...prev, status: (filters.status && filters.status[0]) as string }));
    } else {
      setFilters(prev => ({ ...prev, status: undefined }));
    }
  };

  // 分页配置
  const paginationConfig = {
    ...pagination,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number) => `共 ${total} 条记录`,
    pageSizeOptions: ['5', '10', '20', '50'],
    onChange: (page: number, pageSize: number) => {
      setPagination(prev => ({ ...prev, current: page, pageSize }));
    },
    onShowSizeChange: (current: number, size: number) => {
      setPagination(prev => ({ ...prev, current: 1, pageSize: size }));
    },
  };

  // 监听过滤条件变化，重新获取数据
  useEffect(() => {
    fetchHotelData();
  }, [pagination.current, pagination.pageSize, filters.status, filters.searchKeyword]);

  return (
    <div style={{ padding: 24 }}>
      {/* 过滤工具栏 */}
      <div style={{ marginBottom: 16 }}>
        <Space wrap>
          <Select
            placeholder="选择状态"
            allowClear
            style={{ width: 120 }}
            value={filters.status}
            onChange={handleStatusFilter}
          >
            <Option value="pending">审核中</Option>
            <Option value="approved">已通过</Option>
            <Option value="rejected">已驳回</Option>
            <Option value="published">已发布</Option>
            <Option value="unpublished">未发布</Option>
          </Select>

          <Search
            placeholder="搜索酒店名称"
            allowClear
            style={{ width: 200 }}
            onSearch={handleSearch}
          />

          <Button onClick={handleResetFilters}>重置过滤</Button>
          <Button type="primary" onClick={fetchHotelData} loading={loading}>
            刷新
          </Button>
        </Space>
      </div>

      {/* 酒店表格 */}
      <Table<HotelItem>
        columns={columns}
        dataSource={data}
        onChange={onChange}
        pagination={paginationConfig}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
};

export default HotelTable;