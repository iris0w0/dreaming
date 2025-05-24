
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Home, Award, Briefcase, Gamepad2, Brush, Twitter, Instagram, Linkedin, Music, ArrowUp, BookOpen,
    Chrome, Box, ListTodo, LayoutGrid, ClipboardList, GitBranch, GitCommit, Code, Palette, PenTool, Film, AudioWaveform, LayoutDashboard, VolumeX, Volume2
} from 'lucide-react';

// 类型定义
type MouseParticle = {
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
    opacity: number;
};

type NavItem = {
    name: string;
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
    id?: string;
    link?: string;
    actionType?: string;
};

type Skill = {
    name: string;
    tools: string[];
};

type WorkExperience = {
    title: string;
    company: string;
    location: string;
    duration: string;
    description: string[];
};

const colors = {
    primary: '#F38181',
    secondary: '#FCE38A',
    accent1: '#EAFFD0',
    accent2: '#95E1D3',
    text: '#000',
};

const navItems: NavItem[] = [
    { name: 'Home', icon: Home, id: 'home' },
    { name: 'My Skills', icon: Award, id: 'skills' },
    { name: 'Work Experience', icon: Briefcase, id: 'experience' },
    { name: 'Game Projects', icon: Gamepad2, id: 'game-projects' },
    { name: 'Art Works', icon: Brush, id: 'art-works' },
    { name: 'Articles', icon: BookOpen, id: 'articles' },
    { name: 'Twitter', icon: Twitter, link: 'https://twitter.com/yourprofile' },
    { name: 'Instagram', icon: Instagram, link: 'https://instagram.com/yourprofile' },
    { name: 'LinkedIn', icon: Linkedin, link: 'https://linkedin.com/in/yourprofile' },
    { name: 'Music', icon: Music, actionType: 'toggle-music' },
];

const skillsData: Skill[] = [
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

const toolIcons: Record<string, React.ReactNode> = {
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

const workExperienceData: WorkExperience[] = [
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
            'Built and nurtured an active player community through events, interactions, and influencer collaborations.',
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

const fullIntroText = `Hey, I’m Jingyi Zhang (Iris) 👋
I’m a Game Designer, Project Manager, Community Manager, and sometimes an Artist.

Welcome to my space — here’s where you can explore what I’m creating, managing, and dreaming up.
I do my best to bring ideas to life with a whole lot of ❤️`;

const App = () => {
    // Typewriter effect
    const [displayedIntroText, setDisplayedIntroText] = useState('');
    const [introTextIndex, setIntroTextIndex] = useState(0);
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    // Back to top button
    const [showBackToTop, setShowBackToTop] = useState(false);

    // Mouse particle effect
    const [mouseParticles, setMouseParticles] = useState<MouseParticle[]>([]);
    const particleColors = [colors.primary, colors.secondary, colors.accent1, colors.accent2];
    const particleCount = useRef(0);

    // Navigation hover tooltip
    const [hoveredNav, setHoveredNav] = useState<string | null>(null);

    // Music playback
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // My Skills section
    const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

    // 关键：只在客户端渲染特效，防止 hydration mismatch
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    // Typewriter effect
    useEffect(() => {
        if (introTextIndex < fullIntroText.length) {
            const timeoutId = setTimeout(() => {
                setDisplayedIntroText((prev) => prev + fullIntroText[introTextIndex]);
                setIntroTextIndex((prev) => prev + 1);
            }, 18);
            return () => clearTimeout(timeoutId);
        } else {
            setIsTypingComplete(true);
        }
    }, [introTextIndex]);

    // Back to top button
    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Mouse particle effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const newParticle: MouseParticle = {
                id: particleCount.current++,
                x: e.clientX,
                y: e.clientY,
                color: particleColors[Math.floor(Math.random() * particleColors.length)],
                size: Math.random() * 8 + 5,
                opacity: 1,
            };

            setMouseParticles((prevParticles) => {
                const updatedParticles = [...prevParticles, newParticle];
                if (updatedParticles.length > 30) {
                    return updatedParticles.slice(1);
                }
                return updatedParticles;
            });
        };

        let animationFrameId: number;
        const animateParticles = () => {
            setMouseParticles((prevParticles) =>
                prevParticles
                    .map((p) => ({
                        ...p,
                        opacity: p.opacity - 0.03,
                        size: p.size * 0.95,
                    }))
                    .filter((p) => p.opacity > 0.05)
            );
            animationFrameId = requestAnimationFrame(animateParticles);
        };

        window.addEventListener('mousemove', handleMouseMove);
        animationFrameId = requestAnimationFrame(animateParticles);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [particleColors]);

    // Smooth scroll or open link
    const handleNavItemClick = useCallback(
        (item: NavItem, event: React.MouseEvent<HTMLButtonElement>) => {
            createRipple(event);
            if (item.link) {
                window.open(item.link, '_blank', 'noopener noreferrer');
            } else if (item.actionType === 'toggle-music') {
                if (audioRef.current) {
                    if (isMusicPlaying) {
                        audioRef.current.pause();
                    } else {
                        audioRef.current.play();
                    }
                    setIsMusicPlaying((prev) => !prev);
                }
            } else if (item.id) {
                const element = document.getElementById(item.id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        },
        [isMusicPlaying]
    );

    // Resume download handler
    const handleDownloadResume = () => {
        const resumeUrl = '/resume/jingyi_zhang_resume.pdf';
        const link = document.createElement('a');
        link.href = resumeUrl;
        link.setAttribute('download', 'Jingyi_Zhang_Resume.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Button ripple effect
    const createRipple = (event: React.MouseEvent<HTMLElement>) => {
        const button = event.currentTarget as HTMLElement;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        // 用 getBoundingClientRect 计算相对位置
        const rect = button.getBoundingClientRect();
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - rect.left - radius}px`;
        circle.style.top = `${event.clientY - rect.top - radius}px`;
        circle.className = 'ripple';

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        button.appendChild(circle);
    };

    // 让导航栏始终浮动底部，内容区有足够padding-bottom
    const NAV_HEIGHT = 80;

return (
    <div className="relative min-h-screen" style={{ backgroundColor: colors.secondary, color: colors.text, fontFamily: 'K2D, sans-serif' }}>
        <style>{`
            body {
                font-family: 'K2D', sans-serif;
                background-color: ${colors.secondary};
                color: ${colors.text};
            }
            .font-k2d-thin {
                font-family: 'K2D', sans-serif;
                font-weight: 100;
            }
            .font-k2d-regular {
                font-family: 'K2D', sans-serif;
                font-weight: 400;
            }
            .font-k2d-bold {
                font-family: 'K2D', sans-serif;
                font-weight: 700;
            }
            .ripple {
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                background-color: rgba(255, 255, 255, 0.7);
                pointer-events: none;
            }
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `}</style>

        {/* 只在客户端渲染鼠标粒子特效 */}
        {mounted && (
            <div style={{ position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999 }}>
                {mouseParticles.map((p) => (
                    <div
                        key={p.id}
                        style={{
                            position: 'absolute',
                            left: p.x,
                            top: p.y,
                            width: p.size,
                            height: p.size,
                            backgroundColor: p.color,
                            opacity: p.opacity,
                            borderRadius: '50%',
                            transform: 'translate(-50%, -50%)',
                            pointerEvents: 'none',
                        }}
                    />
                ))}
            </div>
        )}

        {/* 只在客户端渲染音频播放器和底部导航栏 */}
        {mounted && (
            <>
                <audio ref={audioRef} loop>
                    <source src="/audio/background_music.mp3" type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
                <nav
                    className="fixed left-0 right-0 bottom-0 z-50 shadow-lg p-4 flex justify-center items-center rounded-t-xl md:rounded-t-3xl"
                    style={{
                        backgroundColor: colors.accent2,
                        height: NAV_HEIGHT,
                        minHeight: NAV_HEIGHT,
                    }}
                >
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
                                             font-k2d-regular"
                                    style={{ backgroundColor: colors.accent1 }}
                                >
                                    {item.actionType === 'toggle-music' ? (
                                        isMusicPlaying ? <Volume2 className="w-5 h-5 md:w-6 md:h-6" style={{ color: colors.primary }} /> : <VolumeX className="w-5 h-5 md:w-6 md:h-6" style={{ color: colors.primary }} />
                                    ) : (
                                        <item.icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: colors.primary }} />
                                    )}

                                    {hoveredNav === item.name && (
                                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-k2d-thin">
                                            {item.name}
                                        </span>
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                </nav>
            </>
        )}

        {/* 页面内容，底部留出导航栏高度 */}
        <main className="mx-auto px-4 py-16 md:py-24" style={{ maxWidth: 900, paddingBottom: NAV_HEIGHT + 32 }}>
            {/* Home Section */}
            <section id="home" className="flex flex-col items-center justify-center text-center min-h-[60vh]">
                <img
                    src="/images/your_photo.jpg"
                    alt="Jingyi Zhang (Iris)"
                    width={192}
                    height={192}
                    className="w-36 h-36 md:w-48 md:h-48 rounded-full object-cover shadow-lg mb-8"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = 'https://placehold.co/200x200/F38181/FFFFFF?text=Photo+Error';
                    }}
                />
                <div className="text-xl md:text-2xl max-w-2xl leading-relaxed font-k2d-regular whitespace-pre-line mb-6" style={{ minHeight: 220 }}>
                    {/* 打字机效果应用到整个介绍文本 */}
                    {isTypingComplete ? (
                        <span>
                            {fullIntroText.split(/(Jingyi Zhang \(Iris\))/).map((part, idx) =>
                                part === 'Jingyi Zhang (Iris)' ? (
                                    <span key={idx} className="font-k2d-bold" style={{ color: colors.primary }}>{part}</span>
                                ) : (
                                    <React.Fragment key={idx}>{part}</React.Fragment>
                                )
                            )}
                        </span>
                    ) : (
                        <>
                            {displayedIntroText.split(/(Jingyi Zhang \(Iris\))/).map((part, idx) =>
                                part === 'Jingyi Zhang (Iris)' ? (
                                    <span key={idx} className="font-k2d-bold" style={{ color: colors.primary }}>{part}</span>
                                ) : (
                                    <React.Fragment key={idx}>{part}</React.Fragment>
                                )
                            )}
                            <span className="animate-pulse">|</span>
                        </>
                    )}
                </div>
                <button
                    onClick={(e) => {
                        handleDownloadResume();
                        createRipple(e);
                    }}
                    className="relative mt-4 px-8 py-4 bg-gradient-to-r from-red-400 to-pink-500 text-white text-lg font-k2d-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 overflow-hidden"
                    style={{ backgroundColor: colors.primary }}
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
                                                {toolIcons[tool] || <span className="w-5 h-5">?</span>}
                                                <span className="mt-1">{tool}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Work Experience Section */}
                <section id="experience" className="min-h-screen flex flex-col items-center justify-center py-24 md:py-32">
                    <h2 className="text-4xl md:text-6xl font-k2d-bold mb-8" style={{ color: colors.primary }}>Work Experience</h2>
                    <div className="w-full max-w-4xl relative pl-8 md:pl-0">
                        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5" style={{ backgroundColor: colors.primary }}></div>
                        {workExperienceData.map((job, index) => (
                            <div
                                key={index}
                                className={`flex flex-col md:flex-row items-start md:items-stretch w-full mb-12 relative ${
                                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                }`}
                            >
                                {/* Timeline dot and line (mobile) */}
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
                                {/* Timeline dot and content (desktop) */}
                                <div className="hidden md:flex w-full items-center justify-between">
                                    {/* Left content */}
                                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                                        {index % 2 !== 0 && (
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
                                    {/* Timeline dot */}
                                    <div className="relative w-2/12 flex justify-center">
                                        <div className="w-4 h-4 rounded-full absolute top-1/2 -translate-y-1/2" style={{ backgroundColor: colors.primary, border: `2px solid ${colors.secondary}` }}></div>
                                    </div>
                                    {/* Right content */}
                                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? '' : 'md:text-left'}`}>
                                        {index % 2 === 0 && (
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
                                    // 可扩展为跳转到详情页
                                }}
                            >
                                <img
                                    src={`/images/game_projects/project_${i}.jpg`}
                                    alt={`Game Project ${i}`}
                                    width={600}
                                    height={400}
                                    className="w-full h-48 md:h-64 object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null;
                                        target.src = `https://placehold.co/600x400/${colors.primary.substring(1)}/FFFFFF?text=Game+Project+${i}`;
                                    }}
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
                            { id: 1, aspectRatio: 'aspect-w-4 aspect-h-3' },
                            { id: 2, aspectRatio: 'aspect-w-3 aspect-h-4' },
                            { id: 3, aspectRatio: 'aspect-w-1 aspect-h-1' },
                            { id: 4, aspectRatio: 'aspect-w-16 aspect-h-9' },
                            { id: 5, aspectRatio: 'aspect-w-9 aspect-h-16' },
                            { id: 6, aspectRatio: 'aspect-w-5 aspect-h-4' },
                        ].map((art) => (
                            <div key={art.id} className={`rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden font-k2d-regular ${art.aspectRatio}`} style={{ backgroundColor: colors.accent2 }}>
                                <img
                                    src={`/images/art_works/art_${art.id}.png`}
                                    alt={`Art Work ${art.id}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null;
                                        target.src = `https://placehold.co/400x400/${colors.accent2.substring(1)}/FFFFFF?text=Art+Work+${art.id}`;
                                    }}
                                />
                                <div className="p-4 text-center absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent text-white">
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
            {mounted && showBackToTop && (
                <button
                    onClick={(e) => {
                        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                        createRipple(e);
                    }}
                    className="fixed bottom-28 right-8 p-4 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 overflow-hidden"
                    style={{ backgroundColor: colors.primary, zIndex: 100 }}
                >
                    <ArrowUp className="w-6 h-6" />
                </button>
            )}
        </div>
    );
};

export default App;