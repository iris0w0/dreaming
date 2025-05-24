import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Home, Award, Briefcase, Gamepad2, Brush, Twitter, Instagram, Linkedin, Music, ArrowUp, BookOpen,
  // Tool Icons (generic ones from Lucide React)
  Chrome, Box, ListTodo, LayoutGrid, ClipboardList, GitBranch, GitCommit, Code, Palette, PenTool, Film, AudioWaveform, LayoutDashboard, VolumeX, Volume2 
} from 'lucide-react';

const App = () => {
  // 导航项配置
  const navItems = [
    { name: 'Home', icon: Home, id: 'home' },
    { name: 'My Skills', icon: Award, id: 'skills' },
    { name: 'Work Experience', icon: Briefcase, id: 'experience' },
    { name: 'Game Projects', icon: Gamepad2, id: 'game-projects' },
    { name: 'Art Works', icon: Brush, id: 'art-works' },
    { name: 'Articles', icon: BookOpen, id: 'articles' }, // 新增 Articles 按钮
    { name: 'Twitter', icon: Twitter, link: 'https://twitter.com/yourprofile' }, // 直接链接
    { name: 'Instagram', icon: Instagram, link: 'https://instagram.com/yourprofile' }, // 直接链接
    { name: 'LinkedIn', icon: Linkedin, link: 'https://linkedin.com/in/yourprofile' }, // 直接链接
    { name: 'Music', icon: Music, actionType: 'toggle-music' }, // 音乐开关
  ];

  // 网站主色调
  const colors = {
    primary: '#F38181', // 主要强调色
    secondary: '#FCE38A', // 网页背景色
    accent1: '#EAFFD0', // 辅助色1
    accent2: '#95E1D3', // 辅助色2
    text: '#000', // 主要文字颜色
  };

  // 简介文本和打字机效果相关状态
  // 整个简介文本，包括 "Hey, I’m Jingyi Zhang (Iris) 👋"
  const fullIntroText = "Hey, I’m Jingyi Zhang (Iris) 👋\nI’m a Game Designer, Project Manager, Community Manager, and sometimes an Artist.\n\nWelcome to my space — here’s where you can explore what I’m creating, managing, and dreaming up.\nI do my best to bring ideas to life with a whole lot of ❤️";
  const [displayedIntroText, setDisplayedIntroText] = useState('');
  const [introTextIndex, setIntroTextIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // 返回顶部按钮显示状态
  const [showBackToTop, setShowBackToTop] = useState(false);

  // 鼠标轨迹效果相关状态
  const [mouseParticles, setMouseParticles] = useState([]);
  const particleColors = [colors.primary, colors.secondary, colors.accent1, colors.accent2];
  const particleCount = useRef(0); // 使用 ref 避免频繁 re-render

  // 导航栏悬停提示状态
  const [hoveredNav, setHoveredNav] = useState(null);

  // 简历下载次数（前端模拟）
  const [resumeDownloads, setResumeDownloads] = useState(0);

  // 音乐播放状态和引用
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  // My Skills 部分的状态
  const [selectedSkill, setSelectedSkill] = useState(null); // 存储当前选中的技能

  // My Skills 数据和工具图标映射
  const skillsData = [
    { name: 'Game Design', tools: ['Unity', 'Miro', 'Jira', 'Google Suite'] },
    { name: 'Project Management', tools: ['Trello', 'Jira', 'Google Suite', 'Microsoft Suite'] },
    { name: 'Creative Writing', tools: ['Microsoft Suite', 'Google Suite'] },
    { name: 'Graphical Design', tools: ['Photoshop', 'Illustrator', 'Google Suite'] },
    { name: 'Video Editing', tools: ['Premiere', 'Google Suite'] },
    { name: 'Music Production', tools: ['Audition', 'Studio One'] },
    { name: 'Account Management', tools: ['Google Suite', 'Microsoft Suite'] },
    { name: 'Data Analysis', tools: ['Google Suite', 'Microsoft Suite'] },
    { name: 'Online advertising', tools: ['Google Suite', 'Microsoft Suite'] },
  ];

  const toolIcons = {
    'Google Suite': <Chrome className="w-5 h-5" />,
    'Unity': <Box className="w-5 h-5" />,
    'Trello': <ListTodo className="w-5 h-5" />,
    'Miro': <LayoutGrid className="w-5 h-5" />,
    'Jira': <ClipboardList className="w-5 h-5" />,
    'Git': <GitBranch className="w-5 h-5" />,
    'SVN': <GitCommit className="w-5 h-5" />,
    'VSCode': <Code className="w-5 h-5" />,
    'Photoshop': <Palette className="w-5 h-5" />,
    'Illustrator': <PenTool className="w-5 h-5" />,
    'Premiere': <Film className="w-5 h-5" />,
    'Audition': <AudioWaveform className="w-5 h-5" />, 
    'Studio One': <Music className="w-5 h-5" />,
    'Microsoft Suite': <LayoutDashboard className="w-5 h-5" />,
  };

  // Work Experience 数据
  const workExperienceData = [
    {
      title: 'Game Designer (Full-time)',
      company: 'Gamescan Stockholm Studios/Metaking Studio',
      location: 'Stockholm, Sweden',
      duration: 'Nov 2023 - Present',
      description: [
        'Delivered core gameplay, progression, mechanics, and economy systems for live game BLOCKLORDS (30K+ players), collaborating with the Game Director and cross-functional teams using Miro, Google Suite, Figma, and Unity to drive features from concept to implementation.',
        'Planned and tracked production via Jira and Trello, facilitating sprint planning and managing cross-team dependencies.',
        'Created and maintained design documentation; ensured clarity and consistency across teams.',
        'Led design reviews, gameplay explanation, and QA meetings to align expectations and improve release quality.',
        'Used player data and community feedback to iterate and optimize gameplay features.',
        'Stayed current with LiveOps and core game design trends to ensure continuous gameplay evolution.',
      ],
    },
    {
      title: 'Community Manager (Full-time)',
      company: 'XD Inc.',
      location: 'Shanghai, China',
      duration: 'Mar 2022 - Jul 2022',
      description: [
        'Ran cross-platform campaigns (RedNote, Weibo, TapTap) for XD Town, growing visibility and engagement.',
        'Provided problem solutions based on user feedback and worked with the development team to incorporate user-centric solutions.',
        'Built and nurtured an. active player community through events, interactions, and influencer collaborations.',
        'Oversaw projects with outsourced artists, ensuring quality, timeliness, and budget alignment.',
      ],
    },
    {
      title: 'Community Manager (Full-time)',
      company: 'Shengqu Games',
      location: 'Shanghai, China',
      duration: 'Jun 2021 - Mar 2022',
      description: [
        'Managed Final Fantasy XIV China’s official RedNote account, increasing followers by 450% in four months.',
        'Used performance data to adjust content strategy, boosting engagement and reach.',
        'Collaborated with marketing and dev teams to create consistent messaging across channels.',
        'Executed online campaigns and community events, contributing to user acquisition growth.',
      ],
    },
    {
      title: 'Assistant to the registrar (Intern)',
      company: 'Taicang Library',
      location: 'Suzhou, China',
      duration: 'Feb 2021 - May 2021',
      description: [
        'Assisted with exhibitions, data collection, and various curatorial tasks.',
      ],
    },
    {
      title: 'Assistant to the registrar (Intern)',
      company: 'Xiamen Powerlong Art Center',
      location: 'Xiamen, China',
      duration: 'Sep 2019 - Jan 2020',
      description: [
        'Assisted with exhibitions, data collection, and various curatorial tasks.',
      ],
    },
  ];


  // 打字机效果
  useEffect(() => {
    if (introTextIndex < fullIntroText.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedIntroText((prev) => prev + fullIntroText[introTextIndex]);
        setIntroTextIndex((prev) => prev + 1);
      }, 20); // 打字速度，已加速至 20ms
      return () => clearTimeout(timeoutId);
    } else {
      setIsTypingComplete(true);
    }
  }, [introTextIndex, fullIntroText]);

  // 监听滚动事件，控制返回顶部按钮显示
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 鼠标轨迹效果
  useEffect(() => {
    const handleMouseMove = (e) => {
      const newParticle = {
        id: particleCount.current++,
        x: e.clientX,
        y: e.clientY,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        size: Math.random() * 8 + 5, // Random size between 5 and 13
        opacity: 1,
      };

      setMouseParticles((prevParticles) => {
        const updatedParticles = [...prevParticles, newParticle];
        // 限制粒子数量以优化性能
        if (updatedParticles.length > 30) {
          return updatedParticles.slice(1);
        }
        return updatedParticles;
      });
    };

    const animateParticles = () => {
      setMouseParticles((prevParticles) =>
        prevParticles
          .map((p) => ({
            ...p,
            opacity: p.opacity - 0.03, // 逐渐淡出
            size: p.size * 0.95, // 逐渐缩小
          }))
          .filter((p) => p.opacity > 0.05) // 移除完全淡出的粒子
      );
      requestAnimationFrame(animateParticles);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const animationFrameId = requestAnimationFrame(animateParticles);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // 空依赖数组表示只在组件挂载时运行一次

  // 平滑滚动到指定区域或打开链接
  const handleNavItemClick = useCallback((item, event) => {
    createRipple(event); // 触发波纹效果
    if (item.link) {
      window.open(item.link, '_blank', 'noopener noreferrer'); // 打开外部链接
    } else if (item.actionType === 'toggle-music') {
      if (audioRef.current) {
        if (isMusicPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsMusicPlaying(!isMusicPlaying);
      }
    } else {
      const element = document.getElementById(item.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [isMusicPlaying]);

  // 简历下载处理
  const handleDownloadResume = () => {
    // 模拟下载 PDF 文件
    // 建议将简历文件放置在 public/resume/ 目录下，例如：/resume/jingyi_zhang_resume.pdf
    const resumeUrl = '/resume/jingyi_zhang_resume.pdf'; // 替换为你的真实简历PDF文件URL
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.setAttribute('download', 'Jingyi_Zhang_Resume.pdf'); // 设置下载文件名
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 模拟后台记录下载次数
    setResumeDownloads((prev) => prev + 1);
    console.log(`简历已下载。当前下载次数 (前端模拟): ${resumeDownloads + 1}`);
    // 在实际应用中，这里会发起一个API请求到后端，例如：
    // fetch('/api/record-download', { method: 'POST' });
  };

  // 按钮波纹效果
  const createRipple = (event) => {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple'); // 添加 CSS 动画类

    const ripple = button.getElementsByClassName('ripple')[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  return (
    // 全局样式容器
    <div className="relative min-h-screen" style={{ backgroundColor: colors.secondary, color: colors.text, fontFamily: 'K2D, sans-serif' }}>
      {/* K2D 字体导入及全局 CSS 样式 */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=K2D:wght@100;400;700&display=swap');
        body {
          font-family: 'K2D', sans-serif;
          background-color: ${colors.secondary};
          color: ${colors.text};
        }
        .font-k2d-thin {
          font-family: 'K2D', sans-serif;
          font-weight: 100; /* Extra Light */
        }
        .font-k2d-regular {
          font-family: 'K2D', sans-serif;
          font-weight: 400; /* Regular */
        }
        .font-k2d-bold {
          font-family: 'K2D', sans-serif;
          font-weight: 700; /* Bold */
        }

        /* Ripple effect CSS */
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          background-color: rgba(255, 255, 255, 0.7); /* 白色波纹 */
          pointer-events: none; /* 确保波纹不阻挡点击事件 */
        }

        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }

        /* Timeline specific styles */
        .timeline-item {
          position: relative;
          padding-left: 30px; /* Space for the line and dot */
          margin-bottom: 40px;
        }
        .timeline-item:last-child {
          margin-bottom: 0;
        }
        .timeline-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 10px; /* Position of the vertical line */
          width: 2px;
          height: 100%;
          background-color: ${colors.primary}; /* Timeline line color */
        }
        .timeline-item::after {
          content: '';
          position: absolute;
          top: 5px; /* Position of the dot */
          left: 5px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: ${colors.primary}; /* Timeline dot color */
          border: 2px solid white; /* White border around dot */
          z-index: 1;
        }
        /* Hide line for the last item */
        .timeline-item:last-child::before {
          height: 0;
        }
      `}</style>

      {/* 鼠标轨迹粒子 */}
      {mouseParticles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: p.opacity,
            transform: 'translate(-50%, -50%)', // 将粒子中心定位在鼠标位置
            transition: 'opacity 0.1s linear, transform 0.1s linear', // 平滑淡出和缩小
            zIndex: 9999,
          }}
        />
      ))}

      {/* 背景音乐播放器 */}
      <audio ref={audioRef} loop>
        {/* 建议将音乐文件放置在 public/audio/ 目录下，例如：/audio/background_music.mp3 */}
        <source src="/audio/background_music.mp3" type="audio/mpeg" />
        你的浏览器不支持音频播放。
      </audio>

      {/* 浮动导航栏 (底部) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 shadow-lg p-4 flex justify-center items-center rounded-t-xl md:rounded-t-3xl" style={{ backgroundColor: colors.accent2 }}>
        <div className="flex space-x-4 md:space-x-8">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              <button
                onClick={(e) => handleNavItemClick(item, e)}
                onMouseEnter={() => setHoveredNav(item.name)}
                onMouseLeave={() => setHoveredNav(null)}
                className="relative p-2 md:p-3 rounded-full transition-all duration-300 ease-in-out
                           hover:bg-gray-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                           flex items-center justify-center overflow-hidden
                           font-k2d-regular" // 应用 K2D regular 字体
                style={{ backgroundColor: colors.accent1 }} // 按钮背景色
              >
                {item.actionType === 'toggle-music' ? (
                  isMusicPlaying ? <Volume2 className="w-5 h-5 md:w-6 md:h-6" style={{ color: colors.primary }} /> : <VolumeX className="w-5 h-5 md:w-6 md:h-6" style={{ color: colors.primary }} />
                ) : (
                  <item.icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: colors.primary }} /> // 图标颜色
                )}

                {hoveredNav === item.name && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-k2d-thin"> {/* 应用 K2D thin 字体 */}
                    {item.name}
                  </span>
                )}
              </button>
            </div>
          ))}
        </div>
      </nav>

      {/* 页面内容 */}
      <main className="container mx-auto px-4 py-24 md:py-32">
        {/* Home Section */}
        <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center pt-16 md:pt-0">
          {/* 建议将照片文件放置在 public/images/ 目录下，例如：/images/your_photo.jpg */}
          <img
            src="/images/your_photo.jpg" // 替换为你的照片URL
            alt="Jingyi Zhang (Iris)"
            className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-lg mb-8"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/200x200/F38181/FFFFFF?text=Photo+Error'; }}
          />
          <p className="text-xl md:text-2xl max-w-3xl leading-relaxed font-k2d-regular whitespace-pre-line">
            {displayedIntroText.split('Jingyi Zhang (Iris)').map((part, index) => (
              <React.Fragment key={index}>
                {part}
                {index < fullIntroText.split('Jingyi Zhang (Iris)').length - 1 && (
                  <span className="font-k2d-bold" style={{ color: colors.primary }}>Jingyi Zhang (Iris)</span>
                )}
              </React.Fragment>
            ))}
            {!isTypingComplete && <span className="animate-pulse">|</span>} {/* 打字机光标 */}
          </p>
          <button
            onClick={(e) => {
              handleDownloadResume();
              createRipple(e);
            }}
            className="relative mt-8 px-8 py-4 bg-gradient-to-r from-red-400 to-pink-500 text-white text-lg font-k2d-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 overflow-hidden"
            style={{ backgroundColor: colors.primary }} // 按钮背景色
          >
            GET MY RESUME
          </button>
        </section>

        {/* My Skills Section */}
        <section id="skills" className="min-h-screen flex flex-col items-center justify-center py-24 md:py-32">
          <h2 className="text-4xl md:text-6xl font-k2d-bold mb-8" style={{ color: colors.primary }}>My Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-4xl">
            {skillsData.map((skill, index) => (
              <div
                key={index}
                className="p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center font-k2d-regular cursor-pointer"
                style={{ backgroundColor: colors.accent1 }}
                onClick={() => setSelectedSkill(selectedSkill === skill.name ? null : skill.name)}
              >
                <h3 className="text-2xl font-k2d-bold mb-2" style={{ color: colors.text }}>{skill.name}</h3>
                {selectedSkill === skill.name && (
                  <div className="mt-4 flex flex-wrap justify-center gap-4">
                    {skill.tools.map((tool, toolIndex) => (
                      <div key={toolIndex} className="flex flex-col items-center text-sm font-k2d-regular">
                        {toolIcons[tool] || <span className="w-5 h-5">?</span>} {/* 显示工具图标或占位符 */}
                        <span className="mt-1">{tool}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Work Experience Section (Timeline) */}
        <section id="experience" className="min-h-screen flex flex-col items-center justify-center py-24 md:py-32">
          <h2 className="text-4xl md:text-6xl font-k2d-bold mb-8" style={{ color: colors.primary }}>Work Experience</h2>
          <div className="w-full max-w-4xl relative pl-8 md:pl-0">
            {/* 垂直时间轴线 (仅在桌面端显示) */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5" style={{ backgroundColor: colors.primary }}></div>

            {workExperienceData.map((job, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-start md:items-stretch w-full mb-12 relative ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : '' // 交替左右布局
                }`}
              >
                {/* 时间轴点和线 (移动端) */}
                <div className="md:hidden timeline-item w-full">
                  <div className="p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 font-k2d-regular" style={{ backgroundColor: index % 2 === 0 ? colors.accent1 : colors.accent2 }}>
                    <h3 className="text-2xl font-k2d-bold mb-2" style={{ color: colors.text }}>{job.title}</h3>
                    <p className="text-lg text-gray-800 mb-1">{job.company}, {job.location}</p>
                    <p className="text-gray-600">{job.duration}</p>
                    <ul className="list-disc list-inside mt-4 text-gray-700 space-y-1">
                      {job.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 时间轴点和内容 (桌面端) */}
                <div className="hidden md:flex w-full items-center justify-between">
                  {/* 左侧内容 */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                    {index % 2 !== 0 && ( // Only render content on left for odd indices
                      <div className="p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 font-k2d-regular" style={{ backgroundColor: index % 2 === 0 ? colors.accent1 : colors.accent2 }}>
                        <h3 className="text-2xl font-k2d-bold mb-2" style={{ color: colors.text }}>{job.title}</h3>
                        <p className="text-lg text-gray-800 mb-1">{job.company}, {job.location}</p>
                        <p className="text-gray-600">{job.duration}</p>
                        <ul className="list-disc list-inside mt-4 text-gray-700 space-y-1">
                          {job.description.map((desc, i) => (
                            <li key={i}>{desc}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* 时间轴点 */}
                  <div className="relative w-2/12 flex justify-center">
                    <div className="w-4 h-4 rounded-full absolute top-1/2 -translate-y-1/2" style={{ backgroundColor: colors.primary, border: `2px solid ${colors.secondary}` }}></div>
                  </div>

                  {/* 右侧内容 */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? '' : 'md:text-left'}`}>
                    {index % 2 === 0 && ( // Only render content on right for even indices
                      <div className="p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 font-k2d-regular" style={{ backgroundColor: index % 2 === 0 ? colors.accent1 : colors.accent2 }}>
                        <h3 className="text-2xl font-k2d-bold mb-2" style={{ color: colors.text }}>{job.title}</h3>
                        <p className="text-lg text-gray-800 mb-1">{job.company}, {job.location}</p>
                        <p className="text-gray-600">{job.duration}</p>
                        <ul className="list-disc list-inside mt-4 text-gray-700 space-y-1">
                          {job.description.map((desc, i) => (
                            <li key={i}>{desc}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* Game Projects Section */}
        <section id="game-projects" className="min-h-screen flex flex-col items-center justify-center py-24 md:py-32">
          <h2 className="text-4xl md:text-6xl font-k2d-bold mb-8" style={{ color: colors.primary }}>Game Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden font-k2d-regular cursor-pointer"
                style={{ backgroundColor: colors.accent1 }}
                onClick={() => {
                  console.log(`点击了游戏项目 ${i}，进入详情页`);
                  // 实际应用中，这里可以跳转到项目详情页或打开模态框
                  // 例如：router.push(`/game-projects/${i}`);
                }}
              >
                {/* 建议将游戏项目图片放置在 public/images/game_projects/ 目录下，例如：/images/game_projects/project_${i}.jpg */}
                <img
                  src={`/images/game_projects/project_${i}.jpg`} // 替换为你的游戏项目图片URL
                  alt={`Game Project ${i}`}
                  className="w-full h-48 md:h-64 object-cover" // 确保横图效果
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/${colors.primary.substring(1)}/FFFFFF?text=Game+Project+${i}`; }}
                />
                <div className="p-6">
                  <h3 className="text-2xl font-k2d-bold mb-2" style={{ color: colors.text }}>Project Name {i}</h3>
                  <p className="text-gray-700">Brief description of the game project. Highlights and technologies used.</p>
                  <span className="inline-block mt-4 text-blue-600 hover:underline">View Details</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Art Works Section */}
        <section id="art-works" className="min-h-screen flex flex-col items-center justify-center py-24 md:py-32">
          <h2 className="text-4xl md:text-6xl font-k2d-bold mb-8" style={{ color: colors.primary }}>Art Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
            {[
              { id: 1, aspectRatio: 'aspect-w-4 aspect-h-3' }, // 横向
              { id: 2, aspectRatio: 'aspect-w-3 aspect-h-4' }, // 纵向
              { id: 3, aspectRatio: 'aspect-w-1 aspect-h-1' }, // 方形
              { id: 4, aspectRatio: 'aspect-w-16 aspect-h-9' }, // 宽屏
              { id: 5, aspectRatio: 'aspect-w-9 aspect-h-16' }, // 竖屏
              { id: 6, aspectRatio: 'aspect-w-5 aspect-h-4' }, // 稍宽
            ].map((art, index) => (
              <div key={art.id} className={`rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden font-k2d-regular ${art.aspectRatio}`} style={{ backgroundColor: colors.accent2 }}>
                {/* 建议将艺术作品图片放置在 public/images/art_works/ 目录下，例如：/images/art_works/art_${art.id}.png */}
                <img
                  src={`/images/art_works/art_${art.id}.png`} // 替换为你的艺术作品图片URL
                  alt={`Art Work ${art.id}`}
                  className="w-full h-full object-cover" // 确保图片填充容器
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x400/${colors.accent2.substring(1)}/FFFFFF?text=Art+Work+${art.id}`; }}
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-k2d-bold" style={{ color: colors.text }}>Artwork Title {art.id}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Articles Section */}
        <section id="articles" className="min-h-screen flex flex-col items-center justify-center py-24 md:py-32">
          <h2 className="text-4xl md:text-6xl font-k2d-bold mb-8" style={{ color: colors.primary }}>Articles</h2>
          <div className="w-full max-w-4xl space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 font-k2d-regular" style={{ backgroundColor: colors.accent1 }}>
                <h3 className="text-2xl font-k2d-bold mb-2" style={{ color: colors.text }}>Article Title {i}</h3>
                <p className="text-gray-700 mb-4">A brief summary of your article content. This could be a blog post, research paper, or any written piece.</p>
                <a href="#" className="inline-block text-blue-600 hover:underline">Read More</a>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 返回顶部按钮 */}
      {showBackToTop && (
        <button
          onClick={(e) => {
            document.getElementById('home').scrollIntoView({ behavior: 'smooth' }); // 确保平滑滚动到 Home 部分
            createRipple(e);
          }}
          className="fixed bottom-24 right-8 p-4 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 overflow-hidden"
          style={{ backgroundColor: colors.primary }} // 按钮背景色
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default App;
