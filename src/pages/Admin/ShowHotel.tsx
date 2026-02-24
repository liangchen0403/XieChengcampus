import React, { useState, useEffect } from 'react';
import { message } from 'antd';

import { getAdminHotelList, type AdminHotel } from '../../services/hotelService';
import HotelTable from './HotelTable';

const ShowHotel: React.FC = () => {
  const [hotels, setHotels] = useState<AdminHotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // 获取酒店列表
  const fetchHotels = async () => {
    console.log('获取酒店列表:', { page, pageSize });
    setLoading(true);
    try {
      const result = await getAdminHotelList(page, pageSize);
      console.log('获取酒店列表成功:', { total: result.total, itemsCount: result.items.length });
      setHotels(result.items);
      setTotal(result.total);
    } catch (error: any) {
      console.error('获取酒店列表失败:', error);
      message.error(error.message || '获取酒店列表失败');
    } finally {
      setLoading(false);
    }
  };

  // 处理分页变化
  const handlePaginationChange = (current: number, size: number) => {
    console.log('分页变化:', { current, size });
    setPage(current);
    setPageSize(size);
  };

  // 当分页变化时，重新获取数据
  useEffect(() => {
    fetchHotels();
  }, [page, pageSize]);

  return (
    <div style={{ padding: 12 }}>
      <HotelTable
        hotels={hotels}
        loading={loading}
        total={total}
        page={page}
        pageSize={pageSize}
        onPaginationChange={handlePaginationChange}
        title="酒店总览"
      />
    </div>
  );
};

export default ShowHotel;