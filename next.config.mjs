/** @type {import('next').NextConfig} */
const nextConfig = {
  // 纯内容站：全部页面静态预渲染；图片直接 <img>（素材少且已量化压缩，省掉优化服务依赖）
  images: { unoptimized: true },
  trailingSlash: false,
};

export default nextConfig;
