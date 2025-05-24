/** @type {import('tailwindcss').Config} */
module.exports = {
  // 确保这里包含了所有你使用 Tailwind CSS 类的文件路径
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // 如果你使用 Pages Router
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',   // 如果你使用 App Router (推荐)
    // 确保也包含了你的主组件文件，例如 `app/page.tsx` 或 `pages/index.tsx`
  ],
  theme: {
    extend: {
      // 在这里定义你的自定义字体
      fontFamily: {
        // 'k2d' 是一个自定义的 Tailwind 字体名称，你可以用它来代替默认字体
        // 'var(--font-k2d)' 是从 `next/font/google` 导入 K2D 字体时生成的 CSS 变量
        k2d: ['var(--font-k2d)', 'sans-serif'],
      },
      // 也可以在这里定义你的颜色，这样你就可以使用 Tailwind 的颜色类，例如 `bg-primary`
      colors: {
        primary: '#F38181',
        secondary: '#FCE38A',
        accent1: '#EAFFD0',
        accent2: '#95E1D3',
        text: '#000',
      }
    },
  },
  plugins: [],
};