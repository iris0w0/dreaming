// app/layout.js
import './globals.css'; // 导入全局 CSS，包括 Tailwind CSS
import { K2D } from 'next/font/google'; // 从 Google Fonts 导入 K2D 字体

// 配置 K2D 字体
const k2d = K2D({
  subsets: ['latin'],
  weight: ['100', '400', '700'], // 确保包含你在 App.js 中使用的字重
  variable: '--font-k2d', // 定义 CSS 变量名，用于 Tailwind 配置
  display: 'swap', // 推荐的字体加载策略，防止布局偏移
});

export const metadata = {
  title: 'Jingyi Zhang (Iris) Portfolio', // 修改为你的网站标题
  description: 'Personal portfolio of Jingyi Zhang (Iris), Game Designer, Project Manager, Community Manager, and Artist.', // 修改为你的网站描述
};

export default function RootLayout({ children }) {
  return (
    // 将字体变量应用到 html 标签，这样所有的 Tailwind 字体类都会生效
    <html lang="en" className={`${k2d.variable}`}>
      <body>{children}</body>
    </html>
  );
}