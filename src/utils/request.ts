import { getToken } from './auth';
import { tansParams, errorCode } from './index';

// 创建一个基于 fetch 的 HTTP 客户端
export const service = async (url, options) => {
  // 设置默认选项
  const defaultOptions = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: options.body,
  };
  
  // 合并默认配置和用户提供的配置
  const requestOptions = { ...defaultOptions, ...options };

  // 处理 GET 请求参数
  if (requestOptions.method === 'GET' && options.params) {
    url += '?' + tansParams(options.params);
  }

  // 添加 Token
  if (getToken() && !(requestOptions.headers || {}).isToken === false) {
    requestOptions.headers['Authorization'] = getToken();
  }

  try {
    // 发起网络请求
    const response = await fetch(url, requestOptions);

    // 检查响应是否成功
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 解析 JSON 响应
    const data = await response.json();

    // 根据状态码处理响应
    return handleResponse(data, response.status);
  } catch (error) {
    console.error('Network request failed:', getErrorMessage(error));
    throw error;
  }
};

// 根据状态码处理响应
function handleResponse(data, status) {
  const code = data.code || 200;
  const msg = errorCode[code] || data.msg || errorCode['default'];

  if (code !== 200) {
    console.error(`Server responded with code ${code}: ${msg}`);
    throw new Error(msg);
  }

  return data;
}

// 获取错误信息
function getErrorMessage(error) {
  let message = error.message;
  if (message.includes("Failed to fetch")) {
    message = "后端接口连接异常";
  } else if (message.includes("timeout")) {
    message = "系统接口请求超时";
  } else if (message.includes("Request failed with status code")) {
    message = `系统接口${message.substr(message.length - 3)}异常`;
  }
  return message;
}

export default service;