
'use client';

import React, { useState, useEffect, useRef } from 'react';
import ProjectDetailsModal from '../components/ProjectDetailsModal';
import {
    Home, Award, Briefcase, Gamepad2, Brush, Twitter, Instagram, Linkedin, Music, ArrowUp, BookOpen,
    Chrome, Box, ListTodo, LayoutGrid, ClipboardList, GitBranch, GitCommit, Code, Palette, PenTool, Film, AudioWaveform, LayoutDashboard, VolumeX, Volume2
} from 'lucide-react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import RotatingLabels3D from '../components/RotatingLabels3D';

// =================== 类型定义与基础数据 ===================
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

type Project = {
    name: string;
    description: string;
    imageSrc: string;
    detailedImageSrcs: string[];
    detailedDescription: string;
};

type ModalPosition = { left: number; top: number; width: number; height: number };

const colors = {
    primary: '#F38181',
    secondary: '#FCE38A',
    accent1: '#EAFFD0',
    accent2: '#95E1D3',
    text: '#000',
};

const particleColors = [colors.primary, colors.secondary, colors.accent1, colors.accent2];

const navItems: NavItem[] = [
    { name: 'Home', icon: Home, id: 'home' },
    { name: 'My Skills', icon: Award, id: 'skills' },
    { name: 'Game Projects', icon: Gamepad2, id: 'game-projects' },
    { name: 'Work Experience', icon: Briefcase, id: 'experience' },
    { name: 'Art Works', icon: Brush, id: 'art-works' },
    { name: 'Articles', icon: BookOpen, id: 'articles' },
    { name: 'Twitter', icon: Twitter, link: 'https://twitter.com/Iris_dreaming_' },
    { name: 'Instagram', icon: Instagram, link: 'https://www.instagram.com/daydreams_of_iris' },
    { name: 'LinkedIn', icon: Linkedin, link: 'https://www.linkedin.com/in/jingyi-zhang-69829324a/' },
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

const welcomeText = `Welcome to my space — here’s where you can explore what I’m creating, managing, and dreaming up.

I do my best to bring ideas to life with a whole lot of ❤️`;

const gameProjectsData: Project[] = [
    {
        name: 'I Have A Headache',
        description: 'Whether the player can overcome the obstacles along the way and the unaffordable medical bills after arriving at the hospital, the fate depends on the player.',
        imageSrc: '/images/game_projects/project_1.jpg',
        detailedImageSrcs: [
            '/images/game_projects/project_1.jpg',
            '/images/game_projects/headache1.png',
            '/images/game_projects/headache2.png',
            '/images/game_projects/headache3.png',
            '/images/game_projects/headache4.png',
            '/images/game_projects/headache5.png',
        ],
        detailedDescription: 'For example, though you ‘win’ the game by losing it, the very polite Swedish drivers will essentially refuse to hit you with their cars. \nOn the other hand, the taxi drivers drive much faster, and will not even try to slow down.',
    },
    {
        name: 'Evoslime',
        description: 'RESTART = DEATH + RESURRECTION',
        imageSrc: '/images/game_projects/project_2.jpg',
        detailedImageSrcs: [
            '/images/game_projects/project_2.jpg',
            '/images/game_projects/slime1.png',
            '/images/game_projects/slime2.png',
            '/images/game_projects/slime3.png',
        ],
        detailedDescription: 'The player is a slime creature who was created by a wizard. In the game the wizard has sent you to fight different enemies to see how successful his creation is. \nWhen the player is defeated by a creature the wizard iterates on their creation, giving the player a new ability to be able to defeat the enemy that previously beat them.',
    },
    {
        name: 'Move',
        description: 'A first-person VR adventure game in which players will experience the daily life of people with mental issues through physical challenges, and from which they will also experience the impact of mental issues on relationships.',
        imageSrc: '/images/game_projects/project_3.jpg',
        detailedImageSrcs:  [
            '/images/game_projects/project_3.jpg',
            '/images/game_projects/move1.png',
            '/images/game_projects/move2.png',
        ],
        detailedDescription: 'The player can always lie on the bed, but the anxiety/depression value will keep rising until the end of the game. \nPlayers can also get up from bed and do some physical exercise to complete their daily activities like having lunch. \nIf anxiety/hunger is too high, more physical exercise is needed to achieve this daily activity. \nSome events require more difficult actions, such as doing squat holds. For example: the phone keeps ringing, and to answer the phone, do squat hold for 10 seconds. If the phone rings three times and doesnt answer, the anxiety value will increase, the player must do 10 more squats for the following activity. \nFriends, family and financial status are random and not displayed directly to the player. \nDaily mood (affected by anxiety)/energy (affected by hunger) is determined by dice, mood/energy affects efficiency, that is, the number of squats. \nThe content of notes/calls/text messages will hint at the main characters relationship/economic situation and plot.',
    },
    {
        name: 'Snuffed Out',
        description: 'It’s a campfire at the end of the world. 5 strangers converse with each other about their lives before they’re snuffed out, but their anxiety is high, and emotions are hard to contain.',
        imageSrc: '/images/game_projects/project_4.jpg',
        detailedImageSrcs: [
            '/images/game_projects/project_4.jpg',
            '/images/game_projects/snuff1.jpg',
            '/images/game_projects/snuff2.jpg',
            '/images/game_projects/snuff3.png',
        ],
        detailedDescription: '- It’s a campfire at the end of the world. 5 strangers (players) converse with each other about their lives before they’re snuffed out, but their anxiety is high, and emotions are hard to contain. Words are hard to vocalise, they feel limited by the sadness. \nThe game takes place over 12hrs (8pm-8am), with each turn lasting an hour. \nThe goal is to keep each other company without any player plunging into total despair by the final hour.  \n \n- Every player has a private info card with personality, age, name, bio, etc. Also game impacting traits like hating physical contact, being mute, etc.  \n- A despair meter (life points) is kept track of. The group starts with 5/20 despair points and each action a player can take increases or decreases this meter. However, every turn the meter lowers by 1, and some random events insure it will lower more than normal, or increase.  \n- Players can only target someone else, and only one person a turn.  \n- It is necessary to keep track of every player’s personality to ensure everyone survives the night. \n- Actions are revealed simultaneously for every player. \n- Actions might be: hug, casual talk, reminisce, empathise, motivate etc. These either +2, +1, -1 or -2 points depending on target’s info card traits.  \n- Random events can be: group hears a bomb go off nearby: \n- 2 points for everyone. Group sees a squirrel pass by: +1 point for everyone etc etc.',
    },
    {
        name: 'The Children of Caitt',
        description: 'An ARG that players can participate in exploring and interacting with a story. In which there is an ancient secret religion that worshipped cats, we linked the fictional events with the history and artifacts in Gotland. Players who pass all the puzzles will join the secret society. ',
        imageSrc: '/images/game_projects/project_5.jpg',
        detailedImageSrcs: [
            '/images/game_projects/project_5.jpg',
            '/images/game_projects/cat2.png',
            '/images/game_projects/cat3.png',
            '/images/game_projects/cat4.png',
            '/images/game_projects/cat5.png',
            '/images/game_projects/cat6.png',
            '/images/game_projects/cat7.png',
        ],
        detailedDescription: 'The original concept of the game is to make an ARG that players can participate in exploring and interacting with a story. \nAfter brainstorming, we thought of cats as mysterious creatures and the Cat Earth Society meme. \nWe pictured an ancient secret religion that worshipped cats and linked the fictional events with Gotlands history and artifacts. \nTherefore, we set up puzzles to test our players, and let players who pass all the puzzles join the secret society. Thus, we refer to the opening of The Book of Genesis, that God created the world in seven days. We designed the progression of the game to be seven days. Players need to solve a puzzle every day for the first six days, and the last day is for rest and real-life gatherings of players. \n \n Worldbuilding \nRoots of our Cat-ism religion \nIn Two-legs mythology, Goddess Freyjas chariot was pulled by two cats, Bygul and Trjegul. However, in the doctrine of Caitt Society, the true gods are the cats. \nThe true God Caitt created the world in seven days. Caitt created all the things for cats and Caitts children according to the Book of Gemeowsis. \nIn AD 800, Caitt heeded the request of Two-legs and founded the Kingdom of Cat for their people. \n \nReligious persecution \nOver time, the two-legged, non-furry, up-walking creatures betrayed Caitt. A conspiracy to deicide was effectuated and implemented. \nThe Great Cat Massacre happened in the 1700s. Two-legs staged trials for cats, condemned them to death by hanging, and carried out the sentence. \nVisby, which was referred to as just Wi during the mid-14th century, meaning “holy place, place of worship”, was a place of Caitt’s blessing. After the Great Cat Massacre, surviving children of Caitt called the place “Visby”, which means the village of pagan sacrifices.  \n \nPagan’s vendetta \nDuring the religious persecution, survivors stood back, laid low, and waited for the time of revival. \nNowadays, the Children of Caitt are looking forward to recognizing each other in the crowd, and they have the same vendetta. \nTwo-legs had sworn they would not betray, which was proven to be a lie. Now, it is time for them to pay for it. The punishment of Caitt is about to come. \n \nBook of Gemeowsis \nIn the beginning, Caitt created the world. And Caitt said, let there be darkness: and there was darkness. And Caitt saw the darkness, that it was good, and Caittt called the darkness Night. It was the first day. \nAnd Caitt said, let there be a little light: and it was so. And Caitt called the light Moon, that it was good. And Caitt put the moon up high. It was the second day. \nAnd Caitt said, let the waters be gathered together into one place, and let the dry land appear: and it was so. And Caitt called the dry land Playground, and the waters They called the Fountain. And Caitt saw that it was good. It was the third day. \nAnd Caitt said, let there be moving creatures that have lives. And Caitt created fishes and birds, saying: Be fruitful, and multiply, that it was good. And Caitt called the fishes and the birds Food. It was the fourth day. \nAnd Caitt said, let there be feathers and balls: and it was so. And Caitt called the feathers and the balls Toy. And Caitt saw that it was good. It was the fifth day. \nAnd Caitt said, let there be Two-legs: and it was so. And Caitt blessed them, saying: Be sensible and loyal; Believe and trust Lord your Caitt. But without faith it is impossible to please Them. Caitt would punish you for your hearts that betray Them. And two-legs promised that they will not betray. It was the sixth day. \nAnd Caitt saw everything that he had made, and, behold, it was very good. Thus the world was finished. And Caitt rested from all their work which They had made. It was the seventh day. \n \nGameplay Story \nWe are the last faithful children of our kingdom, \nthe remaining loyal disciples of Caitt. \nWhat was defiled will be cleansed, \nwas stolen will get returned. \nAwake, the forgotten brothers and sisters of ours, \nour creator will rise, \nand those broken in Visby will be made whole again.',
    },
    {
        name: 'BLOCKLORDS',
        description: 'BLOCKLORDS is a multiplayer medieval real-time strategy game. Choose from several playstyles, including farming, fighting, resource management, and ruling, and forge your own destiny as your Hero, all tied together by a single, fully player-owned economy.',
        imageSrc: '/images/game_projects/project_6.jpg',
        detailedImageSrcs: [
            '/images/game_projects/project_6.jpg',
            '/images/game_projects/BLOCKLORDS (4).png',
            '/images/game_projects/BLOCKLORDS (3).png',
            '/images/game_projects/BLOCKLORDS (5).png',
            '/images/game_projects/BLOCKLORDS (1).png',
            '/images/game_projects/BLOCKLORDS (2).png',
        ],
        detailedDescription: 'BLOCKLORDS harnesses web3 technology and gives players complete freedom of expression in its medieval metaverse. \nPlayers have the ability to craft their own unique narrative and story warring as salaried knights, pursuing lordship, wrecking havoc as raiders, developing their lineage, passing on coveted traits to heirs, and more still. \nWeb3, or otherwise called blockchain technology, gives gamers full control over their gaming experience. \nThe strategy title combines the best mechanics of top strategy games, from the political strategy of Crusader Kings to the battle of Total War. \nBuilt using Web3, each character in BLOCKLORDS exists as a unique digital asset whose attributes are determined through a combination of its history and player’s decisions. \nThe game is also backed by a player-driven economy and ecosystem, giving players complete ownership over their character and heirs as they battle for their place in the rich and expansive medieval world. \nBLOCKLORDS makes it easy for anyone to start their epic quest by giving each new player a free starter character.',
    },
];

const artWorksData = [
    { id: 1, aspectRatio: 'aspect-w-4 aspect-h-3', imageSrc: '/images/art_works/art_1.png', title: 'My Art 1', description: 'Paper-cut style illustration'},
    { id: 2, aspectRatio: 'aspect-w-3 aspect-h-4', imageSrc: '/images/art_works/art_2.png', title: 'My Art 2', description: 'Aesthetic Character Design'},
    { id: 3, aspectRatio: 'aspect-w-1 aspect-h-1', imageSrc: '/images/art_works/art_3.png', title: 'My Art 3', description: 'Character & Action Design'},
    { id: 4, aspectRatio: 'aspect-w-16 aspect-h-9', imageSrc: '/images/art_works/art_4.png', title: 'My Art 4', description: 'Childrens picture book illustration'},
    { id: 5, aspectRatio: 'aspect-w-9 aspect-h-16', imageSrc: '/images/art_works/art_5.png', title: 'My Art 5', description: '3D props deisgn and character design'},
    { id: 6, aspectRatio: 'aspect-w-5 aspect-h-4', imageSrc: '/images/art_works/art_6.png', title: 'My Art 6', description: 'Character Design'},
];

const articlesData = [
    {
        title: 'Gender expression and gender identity in virtual reality: avatars, role-adoption, and social interaction in VRChat',
        description: 'Utilizing unobtrusive observations and interviews within the VRChat platform, this research explored avatar choices, interactions, and full-body tracking (FBT) technology utilization as they related to users’ expressions and perceptions of gender in virtual reality (VR).',
        link: 'https://www.frontiersin.org/journals/virtual-reality/articles/10.3389/frvir.2024.1305758/full',
    },
    {
        title: 'On the Characterization of Documentary Film in the Mode of Search: A Case Study of Searching for Sugar Man and Finding Vivian Maier',
        description: 'The paper is analyzed under the guidance of Deleuze’s philosophy of cinema and a comparison with other scholars, and summarizes the method of portraying the main character in the documentary in the search mode and the advantages of this mode, so as to help the writers and directors of future documentaries understanding the psychology of characters and portraying them better. It can also bring people out of the real object and the whole, and face the potential world.',
        link: 'https://drive.google.com/file/d/1T0CHSB1um_YC4DOS9y8Y1t4iL7p7j7Fc/view?usp=sharing',
    },
];

// =================== 导航栏按钮组件 ===================
function NavItemButton({
    item,
    scale,
    zIndex,
    isHovered,
    onHover,
    onLeave,
    onClick,
    isMusicPlaying,
    showTip,
    tipColor,
}: {
    item: NavItem;
    scale: number;
    zIndex: number;
    isHovered: boolean;
    onHover: () => void;
    onLeave: () => void;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isMusicPlaying: boolean;
    showTip: boolean;
    tipColor: string;
}) {
    // 水波纹动画状态
    const [ripples, setRipples] = useState<{ x: number; y: number; key: number }[]>([]);
    const btnRef = useRef<HTMLButtonElement>(null);

    // 生成水波纹
    const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = btnRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setRipples((prev) => [...prev, { x, y, key: Date.now() + Math.random() }]);
        onClick(e);
    };

    // 动画结束移除水波纹
    const handleRippleEnd = (key: number) => {
        setRipples((prev) => prev.filter(r => r.key !== key));
    };

    return (
        <div className="relative flex flex-col items-center">
            <button
                ref={btnRef}
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
                onFocus={onHover}
                onBlur={onLeave}
                onClick={handleBtnClick}
                style={{
                    backgroundColor: colors.accent1,
                    transform: `scale(${scale})`,
                    zIndex,
                    transition: 'transform 0.35s cubic-bezier(.4,2,.3,1), z-index 0.2s',
                    boxShadow: isHovered ? `0 4px 24px 0 ${colors.primary}33` : undefined,
                }}
                className={`
                    relative p-3 md:p-4 rounded-full flex items-center justify-center
                    overflow-hidden font-k2d-regular
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400
                    transition-shadow duration-300
                `}
                tabIndex={0}
            >
                {item.actionType === 'toggle-music'
                    ? (isMusicPlaying
                        ? <Volume2 className="w-6 h-6 md:w-7 md:h-7" style={{ color: colors.primary }} />
                        : <VolumeX className="w-6 h-6 md:w-7 md:h-7" style={{ color: colors.primary }} />)
                    : <item.icon className="w-6 h-6 md:w-7 md:h-7" style={{ color: colors.primary }} />}
                {/* 水波纹动画 */}
                {ripples.map(ripple => (
                    <span
                        key={ripple.key}
                        className="absolute pointer-events-none"
                        style={{
                            left: ripple.x - 60,
                            top: ripple.y - 60,
                            width: 120,
                            height: 120,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.5)',
                            animation: 'ripple-effect 0.7s cubic-bezier(.4,0,.2,1)',
                        }}
                        onAnimationEnd={() => handleRippleEnd(ripple.key)}
                    />
                ))}
            </button>
            {/* tips仅悬停时显示 */}
            {showTip && (
                <span
                    className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded text-xs font-k2d-bold whitespace-nowrap pointer-events-none"
                    style={{
                        background: tipColor,
                        color: '#fff',
                        opacity: 1,
                        transition: 'opacity 0.25s cubic-bezier(.4,2,.3,1)',
                        zIndex: 100,
                        boxShadow: '0 2px 8px 0 #0002',
                    }}
                >
                    {item.name}
                </span>
            )}
        </div>
    );
}

// =================== 居中圆角导航栏组件 ===================
function FisheyeNavBar({
    items,
    isMusicPlaying,
    onNavClick,
}: {
    items: NavItem[];
    isMusicPlaying: boolean;
    onNavClick: (item: NavItem) => void;
}) {
    // 鼠标在导航栏内的像素x坐标
    const [mouseX, setMouseX] = useState<number | null>(null);
    // 鼠标悬停的按钮index
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
    // 导航栏整体放大
    const [navHover, setNavHover] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);

    // 鼠标移动监听
    useEffect(() => {
        const nav = navRef.current;
        if (!nav) return;
        const handleMove = (e: MouseEvent) => setMouseX(e.clientX);
        const handleLeave = () => { setMouseX(null); setHoveredIdx(null); setNavHover(false); };
        nav.addEventListener('mousemove', handleMove);
        nav.addEventListener('mouseleave', handleLeave);
        return () => {
            nav.removeEventListener('mousemove', handleMove);
            nav.removeEventListener('mouseleave', handleLeave);
        };
    }, []);
    
    // 计算每个按钮的scale/zIndex
    const getBtnProps = (idx: number) => {
        // 鼠标悬停优先
        if (hoveredIdx !== null) {
            const dist = Math.abs(idx - hoveredIdx);
            if (dist === 0) return { scale: 2.1, zIndex: 40, showTip: true };
            if (dist === 1) return { scale: 1.4, zIndex: 30, showTip: false };
            if (dist === 2) return { scale: 1.18, zIndex: 20, showTip: false };
            if (dist === 3) return { scale: 1.07, zIndex: 10, showTip: false };
            return { scale: 1, zIndex: 0, showTip: false };
        }
        // 鼠标未悬停时，鱼眼跟随鼠标x
        if (mouseX !== null && navRef.current) {
            const navRect = navRef.current.getBoundingClientRect();
            const btnCount = items.length;
            const btnWidth = navRect.width / btnCount;
            const btnCenter = navRect.left + btnWidth * (idx + 0.5);
            const distPx = Math.abs(mouseX - btnCenter);
            // 120px内最大，逐步递减
            if (distPx < 40) return { scale: 1.5, zIndex: 20, showTip: false };
            if (distPx < 80) return { scale: 1.18, zIndex: 10, showTip: false };
            if (distPx < 120) return { scale: 1.07, zIndex: 5, showTip: false };
            return { scale: 1, zIndex: 0, showTip: false };
        }
        // 默认
        return { scale: 1, zIndex: 0, showTip: false };
    };

    // 导航栏整体放大
    const navScale = navHover || hoveredIdx !== null ? 1.12 : 1;

    return (
        <div
            ref={navRef}
            className="fixed left-1/2 bottom-8 z-50 flex justify-center items-center w-full px-2"
            style={{
                transform: `translateX(-50%) scale(${navScale})`,
                transition: 'transform 0.35s cubic-bezier(.4,2,.3,1)',
                maxWidth: '100vw',
            }}
            onMouseEnter={() => setNavHover(true)}
            onMouseLeave={() => setNavHover(false)}
        >
            {/* 关键：响应式控制 overflow-x 和 flex-wrap */}
            <div
                className="
                    flex gap-2 md:gap-4 px-4 py-3 rounded-full shadow-2xl bg-white/90 border border-pink-200 backdrop-blur-md
                    overflow-x-auto flex-nowrap
                    md:overflow-x-visible md:flex-wrap
                "
                style={{
                    boxShadow: navHover || hoveredIdx !== null
                        ? `0 8px 40px 0 ${colors.primary}33`
                        : '0 2px 12px 0 #0001',
                    transition: 'box-shadow 0.35s cubic-bezier(.4,2,.3,1), background 0.35s cubic-bezier(.4,2,.3,1)',
                    background: navHover || hoveredIdx !== null
                        ? colors.accent2
                        : colors.accent2,
                    WebkitOverflowScrolling: 'touch',
                    maxWidth: '100vw',
                }}
            >
                {items.map((item, idx) => {
                    const { scale, zIndex, showTip } = getBtnProps(idx);
                    return (
                        <NavItemButton
                            key={item.name}
                            item={item}
                            scale={scale}
                            zIndex={zIndex}
                            isHovered={hoveredIdx === idx}
                            onHover={() => setHoveredIdx(idx)}
                            onLeave={() => setHoveredIdx(null)}
                            onClick={() => onNavClick(item)}
                            isMusicPlaying={isMusicPlaying}
                            showTip={showTip}
                            tipColor={colors.primary}
                        />
                    );
                })}
            </div>
            {/* 水波纹动画样式 */}
            <style>{`
                @keyframes ripple-effect {
                    0% { transform: scale(0); opacity: 0.7; }
                    80% { opacity: 0.3; }
                    100% { transform: scale(2.2); opacity: 0; }
                }
            `}</style>
        </div>
    );
}

    // 环形标签动画组件
    function RotatingLabels({
        labels,
        radius,
        fontSize,
        duration,
        color,
        }: {
        labels: string[];
        radius: number;
        fontSize: number;
        duration: number; // 动画一圈秒数
        color: string;
        }) {
        // 旋转动画
        const [angle, setAngle] = useState(0);
        useEffect(() => {
            let frame: number;
            const animate = () => {
            setAngle((prev) => (prev + 360 / (duration * 60)) % 360);
            frame = requestAnimationFrame(animate);
            };
            frame = requestAnimationFrame(animate);
            return () => cancelAnimationFrame(frame);
        }, [duration]);
        const count = labels.length;
        return (
            <div
            style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: radius * 2,
                height: radius * 2,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
            }}
            >
            {labels.map((label, i) => {
                const theta = ((360 / count) * i + angle) * (Math.PI / 180);
                const x = radius + radius * Math.cos(theta);
                const y = radius + radius * Math.sin(theta);
                return (
                <span
                    key={label}
                    style={{
                    position: 'absolute',
                    left: x,
                    top: y,
                    transform: `translate(-50%, -50%)`,
                    fontSize,
                    color,
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    textShadow: '0 2px 8px #fff8',
                    pointerEvents: 'none',
                    userSelect: 'none',
                    letterSpacing: 1,
                    }}
                >
                    {label}
                </span>
                );
            })}
            </div>
        );
        }

// =================== 页面主组件 ===================
const App = () => {
    // 音乐播放
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Typewriter effect
    const [displayedWelcomeText, setDisplayedWelcomeText] = useState('');
    const [welcomeTextIndex, setWelcomeTextIndex] = useState(0);
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    // Back to top button
    const [showBackToTop, setShowBackToTop] = useState(false);

    // Mouse particle effect
    const [mouseParticles, setMouseParticles] = useState<MouseParticle[]>([]);
    const particleCount = useRef(0);

    // My Skills section
    const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
    // 检测skills区域是否在视口
    const [isSkillsInView, setIsSkillsInView] = useState(false);
    const skillsSectionRef = useRef<HTMLDivElement>(null);

    // Modal
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalPosition, setModalPosition] = useState<ModalPosition | null>(null);
    const [modalBackgroundColor, setModalBackgroundColor] = useState<string | null>(null);

    // 关键：只在客户端渲染特效，防止 hydration mismatch
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    // Typewriter effect
    useEffect(() => {
        if (welcomeTextIndex < welcomeText.length) {
            const timeoutId = setTimeout(() => {
                setDisplayedWelcomeText((prev) => prev + welcomeText[welcomeTextIndex]);
                setWelcomeTextIndex((prev) => prev + 1);
            }, 18);
            return () => clearTimeout(timeoutId);
        } else {
            setIsTypingComplete(true);
        }
    }, [welcomeTextIndex, welcomeText]);

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

    // 导航栏点击
    const handleNavClick = (item: NavItem) => {
        if (item.actionType === 'toggle-music') {
            setIsMusicPlaying((prev) => !prev);
            if (audioRef.current) {
                if (!isMusicPlaying) audioRef.current.play();
                else audioRef.current.pause();
            }
        } else if (item.link) {
            window.open(item.link, '_blank', 'noopener noreferrer');
        } else if (item.id) {
            const el = document.getElementById(item.id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };

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

    // open project animation
    const handleProjectClick = (project: Project, event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setModalPosition({
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY,
            width: rect.width,
            height: rect.height,
        });
        setSelectedProject(project);
        setIsModalOpen(true);
        const backgroundColor = window.getComputedStyle(event.currentTarget).backgroundColor;
        setModalBackgroundColor(backgroundColor);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalPosition(null);
        setTimeout(() => setSelectedProject(null), 300);
    };

    const skillColors = [colors.primary, colors.secondary, colors.accent1, colors.accent2];
    // 为每个技能卡片维护一个颜色索引
    const [skillBgIndexes, setSkillBgIndexes] = useState<number[]>(() =>
        Array(skillsData.length).fill(0)
    );
    // 定时切换每个卡片的颜色
    useEffect(() => {
        const interval = setInterval(() => {
            setSkillBgIndexes(prev =>
                prev.map((idx) => {
                    let nextIdx = Math.floor(Math.random() * (skillColors.length - 1));
                    if (nextIdx >= idx) nextIdx += 1;
                    return nextIdx;
                })
            );
        }, 4000);
        return () => clearInterval(interval);
    }, [skillColors.length]);

    //work afar
    const workCardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [workCardTransforms, setWorkCardTransforms] = useState<{ scale: number; translateY: number; opacity: number }[]>(
        () => workExperienceData.map(() => ({ scale: 1, translateY: 0, opacity: 1 }))
    );

    useEffect(() => {
        const handleScroll = () => {
            const newTransforms = workCardRefs.current.map((ref) => {
                if (!ref) return { scale: 1, translateY: 0, opacity: 1 };
                const rect = ref.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                // 计算卡片中心距离视口中心的距离
                const cardCenter = rect.top + rect.height / 2;
                const viewportCenter = windowHeight / 2;
                const dist = cardCenter - viewportCenter;
                // 距离越远，scale 越小，opacity 越低，translateY 越大
                const maxDist = windowHeight * 0.8;
                const norm = Math.min(Math.abs(dist) / maxDist, 1);
                const scale = 1 - norm * 0.25; // 最小缩放到0.75
                const opacity = 1 - norm * 0.6; // 最小透明度0.4
                const translateY = dist * 0.18; // 产生远近感
                return { scale, translateY, opacity };
            });
            setWorkCardTransforms(newTransforms);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // 初始化
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    //不在页面内时停动
    useEffect(() => {
        const handleScroll = () => {
            if (!skillsSectionRef.current) return;
            const rect = skillsSectionRef.current.getBoundingClientRect();
            // 只要有一部分在视口内就算in view
            const inView = rect.bottom > 0 && rect.top < window.innerHeight;
            setIsSkillsInView(inView);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const projectColors = [colors.accent1, colors.accent2, colors.primary, colors.secondary];
    // 为每个项目卡片维护一个颜色索引和悬停状态
    const [projectBgIndexes, setProjectBgIndexes] = useState<number[]>(() =>
        Array(gameProjectsData.length).fill(0)
    );

    const projectIntervalRef = useRef<(NodeJS.Timeout | null)[]>([]);

    const handleProjectMouseEnter = (idx: number) => {

        // 立即切换到下一个颜色
        setProjectBgIndexes(prev =>
            prev.map((colorIdx, i) =>
                i === idx ? (colorIdx + 1) % projectColors.length : colorIdx
            )
        );

        // 启动动画
        if (projectIntervalRef.current[idx]) clearInterval(projectIntervalRef.current[idx]!);
        projectIntervalRef.current[idx] = setInterval(() => {
            setProjectBgIndexes(prev =>
                prev.map((colorIdx, i) =>
                    i === idx ? (colorIdx + 1) % projectColors.length : colorIdx
                )
            );
        }, 4000); // 0.4秒切换一次
    };

    const handleProjectMouseLeave = (idx: number) => {
        // 停止动画并恢复原色
        if (projectIntervalRef.current[idx]) {
            clearInterval(projectIntervalRef.current[idx]!);
            projectIntervalRef.current[idx] = null;
        }
        setProjectBgIndexes(prev =>
            prev.map((colorIdx, i) => (i === idx ? 0 : colorIdx))
        );
    };

    useEffect(() => {
        // 组件卸载时清理所有interval
        return () => {
            projectIntervalRef.current.forEach(timer => {
                if (timer) clearInterval(timer);
            });
        };
    }, []);

    // article bigger
    const [hoveredArticleIdx, setHoveredArticleIdx] = useState<number | null>(null);
    const articleHoverColors = [colors.primary, colors.accent2, colors.accent1, colors.secondary];

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
            `}</style>
    <main>
            {/* 鼠标粒子特效 */}
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

            {/* 音乐播放器和居中圆角导航栏 */}
            {mounted && (
                <>
                    <audio ref={audioRef} loop>
                        <source src="/audio/SimpleBeats.mp3" type="audio/mpeg" />
                    </audio>
                    <FisheyeNavBar
                        items={navItems}
                        isMusicPlaying={isMusicPlaying}
                        onNavClick={handleNavClick}
                    />
                </>
            )}

            <section
            id="home"
            className="relative flex items-end justify-center min-h-[60vh] w-full"
            style={{ height: '100vh', minHeight: 600, padding: 0, margin: 0 }}
            >
            {/* 底部大头像和环形标签 */}
            <div
                className="absolute left-1/2 flex flex-col items-center"
                style={{
                top: '80px', // 推荐4cm或120px
                transform: 'translateX(-50%)',
                width: '100%',
                pointerEvents: 'none',
                zIndex: 2,
                }}
            >
                {/* 名字和按钮 */}
                <div className="flex flex-col items-center" style={{ pointerEvents: 'auto', marginBottom: '80px' }}>
                    <span
                        className="font-k2d-bold"
                        style={{
                        fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                        color: colors.primary,
                        lineHeight: 1.1,
                        letterSpacing: 2,
                        textShadow: '0 2px 16px #fff8',
                        }}
                    >
                        Jingyi Zhang
                    </span>
                    <span
                        className="font-k2d-bold"
                        style={{
                        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                        color: colors.primary,
                        opacity: 0.7,
                        marginTop: 0,
                        letterSpacing: 2,
                        }}
                    >
                        Iris
                    </span>
                    <a
                        href="/resume/jingyi_zhang_resume.pdf"
                        download="Jingyi_Zhang_Resume.pdf"
                        className="mt-8 px-8 py-4 bg-gradient-to-r from-red-400 to-pink-500 text-white text-lg font-k2d-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 overflow-hidden text-center"
                        style={{
                            backgroundColor: colors.primary,
                            display: 'inline-block',
                            position: 'relative',   // 新增
                            zIndex: 10,             // 新增，确保比图片高
                        }}
                    >
                        GET MY RESUME
                    </a>
                    </div>

                <div className="relative" style={{ width: 440, height: 440 }}>
                <RotatingLabels3D
                    labels={['Game Designer', 'Project Manager', 'Community Manager', 'Artist']}
                    radius={180}
                    fontSize={40}
                    duration={18}
                    color={colors.accent2}
                    centerZ={80}
                >
                    <img
                    src="/images/your_photo.png"
                    alt="Jingyi Zhang (Iris)"
                    className="object-cover"
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        height: '80vh',
                        width: 'auto',
                        maxWidth: '90vw',
                        zIndex: 2,
                        objectFit: 'cover',
                        objectPosition: 'center',
                        pointerEvents: 'auto',
                    }}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = 'https://placehold.co/240x240/F38181/FFFFFF?text=Photo+Error';
                    }}
                    />
                </RotatingLabels3D>
                </div>
            </div>

            {/* 右侧打字机 */}
            <div
                className="absolute right-[12vw] top-[40vh] flex flex-col items-start max-w-xl"
                style={{
                zIndex: 3,
                minWidth: 320,
                maxWidth: 600,
                pointerEvents: 'auto',
                }}
            >
                <div
                className="text-xl md:text-2xl leading-relaxed font-k2d-regular whitespace-pre-line mb-6"
                style={{ minHeight: 120, color: colors.text }}
                >
                {isTypingComplete ? (
                    <span>
                        {welcomeText.split(/(\n)/).map((part, idx) =>
                            part === '\n' ? <br key={idx} /> : <React.Fragment key={idx}>{part}</React.Fragment>
                        )}
                    </span>
                ) : (
                    <>
                        {displayedWelcomeText.split(/(\n)/).map((part, idx) =>
                            part === '\n' ? <br key={idx} /> : <React.Fragment key={idx}>{part}</React.Fragment>
                        )}
                        <span className="animate-pulse">|</span>
                    </>
                )}
                </div>
            </div>
            </section>

    {/* My Skills Section */}
    <section
        id="skills"
        ref={skillsSectionRef}
        className="min-h-screen flex flex-col items-center justify-center py-24 md:py-32"
    >
    <h2 className="text-4xl md:text-6xl font-k2d-bold mb-8" style={{ color: colors.primary }}>My Skills</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-4xl">
        {skillsData.map((skill, index) => {
        const bgColor = skillColors[skillBgIndexes[index]];
        const isRed = bgColor === colors.primary;
        const isSelected = selectedSkill === skill.name;
        const showTools = isSelected || (isRed && isSkillsInView);

        return (
            <div
            key={index}
            className="p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center font-k2d-regular cursor-pointer flex flex-col items-center justify-center h-full"
            style={{
                backgroundColor: bgColor,
                transition: 'background-color 0.5s cubic-bezier(.4,2,.3,1)'
            }}
            onClick={() => setSelectedSkill(selectedSkill === skill.name ? null : skill.name)}
            >
            <h3 className="text-2xl font-k2d-bold mb-2" style={{ color: colors.text }}>{skill.name}</h3>
            {showTools && (
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
        );
        })}
    </div>
    </section>

                    {/* Game Projects Section*/}
<section id="game-projects" className="min-h-screen flex flex-col items-center justify-center py-24 md:py-32">
    <h2 className="text-4xl md:text-6xl font-k2d-bold mb-8" style={{ color: colors.primary }}>Game Projects</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {gameProjectsData.map((project, index) => (
            <div
                key={index}
                className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden font-k2d-regular cursor-pointer"
                style={{
                    backgroundColor: projectColors[projectBgIndexes[index]],
                    transition: 'background-color 0.4s cubic-bezier(.4,2,.3,1)'
                }}
                onClick={(event) => handleProjectClick(project, event)}
                onMouseEnter={() => handleProjectMouseEnter(index)}
                onMouseLeave={() => handleProjectMouseLeave(index)}
                tabIndex={0}
            >
                <img
                    src={project.imageSrc}
                    alt={project.name}
                    width={600}
                    height={400}
                    className="w-full h-48 md:h-64 object-cover"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = `https://placehold.co/600x400/${colors.primary.substring(1)}/FFFFFF?text=${encodeURIComponent(project.name)}`;
                    }}
                />
                <div className="p-6">
                    <h3 className="text-2xl font-k2d-bold mb-2" style={{ color: colors.text }}>{project.name}</h3>
                    <p className="text-gray-700" style={{ whiteSpace: 'pre-line' }}>{project.description}</p>
                </div>
            </div>
        ))}
    </div>
</section>
{isModalOpen && selectedProject && (
    <ProjectDetailsModal
        project={selectedProject}
        onClose={handleCloseModal}
        initialPosition={modalPosition}
        backgroundColor={modalBackgroundColor}
    />
)}

{/* Work Experience Section*/}
<section id="experience" className="min-h-screen flex flex-col items-center justify-center py-24 md:py-32">
    <h2 className="text-4xl md:text-6xl font-k2d-bold mb-8" style={{ color: colors.primary }}>Work Experience</h2>
    <div className="w-full max-w-4xl relative pl-8 md:pl-0">
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5" style={{ backgroundColor: colors.primary }}></div>
        {workExperienceData.map((job, index) => (
            <div
                key={index}
                ref={el => { workCardRefs.current[index] = el; }}
                style={{
                    transform: `scale(${workCardTransforms[index]?.scale ?? 1}) translateY(${workCardTransforms[index]?.translateY ?? 0}px)`,
                    opacity: workCardTransforms[index]?.opacity ?? 1,
                    transition: 'transform 0.5s cubic-bezier(.4,2,.3,1), opacity 0.5s cubic-bezier(.4,2,.3,1)',
                    willChange: 'transform, opacity',
                }}
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
                                <li key={i} style={{ whiteSpace: 'pre-line' }}>{desc}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* Timeline dot and content (desktop) */}
                <div className="hidden md:flex w-full items-center justify-between">
                    {/* Left content */}
                    <div className={`w-full md:w-6/12 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                        {index % 2 !== 0 && (
                            <div className="p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 font-k2d-regular" style={{ backgroundColor: index % 2 === 0 ? colors.accent1 : colors.accent2 }}>
                                <h3 className="text-2xl font-k2d-bold mb-2" style={{ color: colors.text }}>{job.title}</h3>
                                <p className="text-lg text-gray-800 mb-1">{job.company}, {job.location}</p>
                                <p className="text-gray-600">{job.duration}</p>
                                <ul className="list-disc list-inside mt-4 text-gray-700 space-y-1">
                                    {job.description.map((desc, i) => (
                                        <li key={i} style={{ whiteSpace: 'pre-line' }}>{desc}</li>
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
                    <div className={`w-full md:w-6/12 ${index % 2 === 0 ? '' : 'md:text-left'}`}>
                        {index % 2 === 0 && (
                            <div className="p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 font-k2d-regular" style={{ backgroundColor: index % 2 === 0 ? colors.accent1 : colors.accent2 }}>
                                <h3 className="text-2xl font-k2d-bold mb-2" style={{ color: colors.text }}>{job.title}</h3>
                                <p className="text-lg text-gray-800 mb-1">{job.company}, {job.location}</p>
                                <p className="text-gray-600">{job.duration}</p>
                                <ul className="list-disc list-inside mt-4 text-gray-700 space-y-1">
                                    {job.description.map((desc, i) => (
                                        <li key={i} style={{ whiteSpace: 'pre-line' }}>{desc}</li>
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

{/* Art Works Section */}
<section id="art-works" className="min-h-screen flex flex-col items-center justify-center py-24 md:py-32">
    <h2 className="text-4xl md:text-6xl font-k2d-bold mb-8" style={{ color: colors.primary }}>Art Works</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {artWorksData.map((art) => (
            <div key={art.id} className={`rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden font-k2d-regular ${art.aspectRatio}`} style={{ backgroundColor: colors.accent2 }}>
                <img
                    src={art.imageSrc}
                    alt={art.title}
                    title={art.description}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = `https://placehold.co/400x400/${colors.accent2.substring(1)}/FFFFFF?text=Art+Work+${art.id}`;
                    }}
                />
                <div className="p-4 text-center absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent text-white">
                    <h3 className="text-xl font-k2d-bold" style={{ color: colors.text }}>{art.title}</h3>
                </div>
            </div>
        ))}
    </div>
</section>

{/* Articles Section */}
<section id="articles" className="min-h-screen flex flex-col items-center justify-center py-24 md:py-32">
    <h2 className="text-4xl md:text-6xl font-k2d-bold mb-8" style={{ color: colors.primary }}>Articles</h2>
    <div className="w-full max-w-4xl space-y-8">
        {articlesData.map((article, index) => {
            // 悬停时变大+背景色变化
            const isHovered = hoveredArticleIdx === index;
            const bgColor = isHovered
                ? articleHoverColors[index % articleHoverColors.length]
                : colors.accent1;
            const scale = isHovered ? 1.07 : 1;
            const boxShadow = isHovered
                ? `0 8px 32px 0 ${colors.primary}33`
                : '0 2px 12px 0 #0001';

            return (
                <div
                    key={index}
                    className="p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 font-k2d-regular cursor-pointer"
                    style={{
                        backgroundColor: bgColor,
                        transform: `scale(${scale})`,
                        boxShadow,
                        transition: 'background-color 0.3s cubic-bezier(.4,2,.3,1), transform 0.3s cubic-bezier(.4,2,.3,1), box-shadow 0.3s cubic-bezier(.4,2,.3,1)'
                    }}
                    onMouseEnter={() => setHoveredArticleIdx(index)}
                    onMouseLeave={() => setHoveredArticleIdx(null)}
                    tabIndex={0}
                >
                    <h3 className="text-2xl font-k2d-bold mb-2" style={{ color: colors.text }}>{article.title}</h3>
                    <p className="text-gray-700 mb-4" style={{ whiteSpace: 'pre-line' }}>{article.description}</p>
                    <a
                        href={article.link}
                        className="inline-block text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Read More
                    </a>
                </div>
            );
        })}
    </div>
</section>
    </main>

    {mounted && <SpeedInsights />}
    {mounted && showBackToTop && (
      <button
        onClick={() => {
                        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
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
