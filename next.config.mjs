/** @type {import('next').NextConfig} */
const nextConfig = {
  // 纯内容站：全部页面静态预渲染；图片直接 <img>（素材少且已量化压缩，省掉优化服务依赖）
  images: { unoptimized: true },
  trailingSlash: false,

  // SEO 铁律：同内容只留一个规范地址。www 和 vercel.app 一律 308 永久重定向到裸域名，
  // 否则谷歌/百度会在「同内容三地址」间分散权重、犹豫收录哪个。
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.caihongshuati.com" }],
        destination: "https://caihongshuati.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "caihongshuati-site.vercel.app" }],
        destination: "https://caihongshuati.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
