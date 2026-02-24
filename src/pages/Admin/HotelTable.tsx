import React from 'react';
import { Table, Tag, Flex } from 'antd';
import type { TableProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { createStaticStyles } from 'antd-style';
import type { AdminHotel } from '../../services/hotelService';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    color: #e0e0e0;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  `,
}));

const stylesFn: TableProps<any>['styles'] = (info) => {
  if (info?.props?.size === 'middle') {
    return {
      root: {
        color: '#e0e0e0',
        borderRadius: 8,
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      },
      title: {
        backgroundImage: 'linear-gradient(90deg, #6a5acd, #836fff)',
        color: '#fff',
        fontSize: '1.25rem',
        fontWeight: 600,
        padding: '12px 16px',
      },
      footer: {
        color: '#9ca3af',
      },
      header: {
        cell: {
          fontWeight: 600,
          fontSize: '0.95rem',
          color: '#b8bdfd',
          padding: '12px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        },
      },
      pagination: {
        root: {
          padding: 10,
        },
        item: {
          color: '#b8bdfd',
        },
      },
    } satisfies TableProps<any>['styles'];
  }
  return {};
};

// 状态颜色映射
const statusColorMap: Record<string, string> = {
  pending: 'orange',
  approved: 'blue',
  rejected: 'red',
  published: 'green',
  unpublished: 'gray',
};

// 状态文本映射
const statusTextMap: Record<string, string> = {
  pending: '审核中',
  approved: '已通过',
  rejected: '已驳回',
  published: '已发布',
  unpublished: '未发布',
};

// 表格列定义
const columns: ColumnsType<AdminHotel> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
    sorter: (a: { id: number; }, b: { id: number; }) => a.id - b.id,
    fixed: 'left' as const,
  },
  {
    title: '酒店名称',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
    sorter: (a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name),
    fixed: 'left' as const,
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
    ellipsis: true,
  },
  {
    title: '星级',
    dataIndex: 'star',
    key: 'star',
    width: 80,
    sorter: (a: { star: number; }, b: { star: number; }) => a.star - b.star,
    render: (star: number) => {
      return Array.from({ length: star }).map((_, index) => (
        <span key={index} style={{ color: '#ffd700' }}>★</span>
      ));
    },
  },
  {
    title: '评分',
    dataIndex: 'rating',
    key: 'rating',
    width: 80,
    sorter: (a: { rating: number; }, b: { rating: number; }) => a.rating - b.rating,
  },
  {
    title: '最低价格',
    key: 'minPrice',
    width: 100,
    sorter: (a: { priceRange: { min: number; }; }, b: { priceRange: { min: number; }; }) => a.priceRange.min - b.priceRange.min,
    render: (_: any, hotel: AdminHotel) => {
      return `¥${hotel.priceRange.min}`;
    },
  },
  {
    title: '最高价格',
    key: 'maxPrice',
    width: 100,
    sorter: (a: { priceRange: { max: number; }; }, b: { priceRange: { max: number; }; }) => a.priceRange.max - b.priceRange.max,
    render: (_: any, hotel: AdminHotel) => {
      return `¥${hotel.priceRange.max}`;
    },
  },
  {
    title: '审核状态',
    dataIndex: 'auditStatus',
    key: 'auditStatus',
    width: 100,
    render: (auditStatus: string) => (
      <Tag color={statusColorMap[auditStatus]}>
        {statusTextMap[auditStatus] || auditStatus}
      </Tag>
    ),
  },
  {
    title: '发布状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (status: string) => (
      <Tag color={statusColorMap[status]}>
        {statusTextMap[status] || status}
      </Tag>
    ),
  },
  {
    title: '审核意见',
    dataIndex: 'auditComment',
    key: 'auditComment',
    ellipsis: true,
    width: 150,
  },
  {
    title: '商户名称',
    key: 'merchantName',
    width: 120,
    render: (_: any, hotel: AdminHotel) => {
      return hotel.merchant.username;
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 150,
    sorter: (a: { createdAt: string | number | Date; }, b: { createdAt: string | number | Date; }) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    render: (createdAt: string) => {
      return new Date(createdAt).toLocaleString();
    },
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: 150,
    sorter: (a: { updatedAt: string | number | Date; }, b: { updatedAt: string | number | Date; }) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
    render: (updatedAt: string) => {
      return new Date(updatedAt).toLocaleString();
    },
  },
];

interface HotelTableProps {
  hotels: AdminHotel[];
  loading: boolean;
  total: number;
  page: number;
  pageSize: number;
  onPaginationChange: (current: number, size: number) => void;
  title?: string;
  customColumns?: ColumnsType<AdminHotel>;
}

const HotelTable: React.FC<HotelTableProps> = ({
  hotels,
  loading,
  total,
  page,
  pageSize,
  onPaginationChange,
  title = '酒店总览',
  customColumns = [],
}) => {
  // Combine default columns with custom columns
  const combinedColumns = [...columns, ...customColumns];

  return (
    <Flex vertical gap="middle">
      <Table
        loading={loading}
        dataSource={hotels}
        columns={combinedColumns}
        rowKey="id"
        classNames={classNames}
        styles={stylesFn}
        title={() => title}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: total,
          onChange: onPaginationChange,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50'],
          showTotal: (total) => `共 ${total} 条数据`,
          showQuickJumper: true,
        }}
        scroll={{
          x: 1600, // Increased width to accommodate action column
          y: 600, // 设置最大高度，确保表格有纵向滚动条
        }}
        size="middle"
      />
    </Flex>
  );
};

export default HotelTable;