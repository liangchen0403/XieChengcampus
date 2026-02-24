import type { Dayjs } from 'dayjs';
import type { UploadFile } from 'antd/es/upload/interface';

interface CreateHotelResponse {
  code: number;
  data: {
    id: number;
    status: string;
    createdAt: string;
  };
}

export const createHotelWithFiles = async (
  name: string,
  address: string,
  description: string | undefined,
  star: number | undefined,
  openingDate: Dayjs,
  tagIds: string | undefined,
  files: UploadFile[]
): Promise<CreateHotelResponse> => {
  // 获取token
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('未找到认证令牌');
  }

  // 创建 FormData 对象
  const formData = new FormData();
  
  // 添加文本字段
  formData.append('name', name);
  formData.append('address', address);
  if (description) {
    formData.append('description', description);
  }
  if (star) {
    formData.append('star', star.toString());
  }
  formData.append('openingDate', openingDate.format('YYYY-MM-DD'));
  if (tagIds) {
    formData.append('tagIds', tagIds);
  }
  
  // 添加文件
  files.forEach((file) => {
    if (file.originFileObj) {
      formData.append('files', file.originFileObj as Blob);
    }
  });

  // 发送请求
  const response = await fetch('/api/merchant/hotels/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      // 注意：不要设置 Content-Type，让浏览器自动设置
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

// export default {
//   createHotel,
//   prepareHotelData
// };