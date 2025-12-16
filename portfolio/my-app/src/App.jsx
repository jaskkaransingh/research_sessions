import { useState, useEffect, useMemo } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Menu, X, Award, TrendingUp } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());

  // FIX 1: Generate stars once using useMemo so they don't move on scroll
  const stars = useMemo(() => {
    return [...Array(100)].map(() => ({
      size: Math.random() * 2 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 5,
      shouldGlow: Math.random() > 0.7
    }));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: "Orro",
      description: "A full-stack Clothing Website ORRO",
      tech: ["React", "Node.js", "FastAPI",],
      link: "#"
    },
    {
      title: "VeggieDaily",
      description: "Real-time Application for purchasing daily Fruits and vegetables",
      tech: ["React", "Node.js", "Google Firebase", "Tailwind"],
      link: "#"
    },
    {
      title: "Cops Catch",
      description: "Cops Catch Game. A thief need to escape from prison. Help Him ",
      tech: ["Javascript"],
      link: "#"
    }
  ];

  const skills = [
    "JavaScript", "React", "Node.js", "Python","Matplotlib","Numpy","Pandas", "TypeScript",
    "Git", "AR"
  ];

  const certificates = [
    {
      title: "Microsoft Certified Azure AI Fundamentals",
      issuer: "Microsoft",
      date: "2025",
      color: "from-orange-400 to-red-500"
    },
    {
      title: "Full Stack Developer in AI Apps",
      issuer: "WhiteHat Jr",
      date: "2022",
      color: "from-blue-400 to-cyan-500"
    },
    {
      title: "Graphic Designing",
      issuer: "Media Institute of Technology",
      date: "2020",
      color: "from-purple-400 to-pink-500"
    },
    {
      title: "Game Developer",
      issuer: "WhiteHat Jr",
      date: "2020",
      color: "from-blue-400 to-cyan-500"
    },
    {
      title: "Python Language",
      issuer: "Infosys",
      date: "2025",
      color: "from-blue-400 to-cyan-500"
    },
    {
      title: "HTML5- The Language",
      issuer: "Infosys",
      date: "2025",
      color: "from-green-400 to-emerald-500"
    }
  ];

  const activityData = [
    { month: 'Jan', commits: 25, projects: 3 },
    { month: 'Feb', commits: 32, projects: 4 },
    { month: 'Mar', commits: 32, projects: 5 },
    { month: 'Apr', commits: 51, projects: 4 },
    { month: 'May', commits: 32, projects: 6 },
    { month: 'Jun', commits: 39, projects: 7 }
  ];

  const skillsRadarData = [
    { skill: 'Frontend', level: 95 },
    { skill: 'Backend', level: 88 },
    { skill: 'Design', level: 70 },
    { skill: 'Mobile', level: 65 }
  ];

  return (
    <div className="min-h-screen bg-black text-gray-100 overflow-hidden relative">
      
      {/* Universe Background - Fixed */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black"></div>
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: star.size + 'px',
              height: star.size + 'px',
              top: star.top + '%',
              left: star.left + '%',
              animation: `twinkle ${star.duration}s infinite ${star.delay}s`,
              opacity: Math.random() * 0.7 + 0.3,
              boxShadow: star.shouldGlow ? '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(139, 92, 246, 0.4)' : 'none',
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in-up {
          animation: slideInUp 0.6s ease-out forwards;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed w-full bg-black/80 backdrop-blur-md border-b border-purple-500/30 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Portfolio
            </h1>

            <div className="hidden md:flex gap-8">
              {['About', 'Projects', 'Stats', 'Certificates', 'Skills', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-purple-400 transition-all duration-300 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>

            <button
              className="md:hidden text-purple-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pt-4 pb-2 flex flex-col gap-4">
              {['About', 'Projects', 'Stats', 'Certificates', 'Skills', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-purple-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className="relative z-20">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center">
              <div className="inline-block mb-8 animate-slide-in-up">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 p-1">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-5xl font-bold">
                    JS
                  </div>
                </div>
              </div>
              <h2 className="text-6xl md:text-8xl font-bold mb-6 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
                Hi, I'm <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Jaskaran Singh</span>
              </h2>
              <p className="text-2xl md:text-3xl text-gray-400 mb-12 animate-slide-in-up" style={{ animationDelay: '0.2s', animation: 'float 3s ease-in-out infinite' }}>
                Full Stack Developer & Creative Problem Solver
              </p>
              
              {/* FIX 2: Added mailto link */}
              <div className="flex justify-center gap-6 animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
                {[
                  { Icon: Github, href: 'https://github.com/JaskaranSingh-9' },
                  { Icon: Linkedin, href: 'https://www.linkedin.com/in/jaskaran-singh-8b1610201/' },
                  { Icon: Mail, href: 'mailto:jaskaran2667@gmail.com' }
                ].map(({ Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center hover:scale-110 hover:border-purple-400 transition-all duration-300"
                  >
                    <Icon size={24} className="text-purple-400" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6">
          <div className={`max-w-7xl mx-auto ${visibleSections.has('about') ? 'animate-slide-in-up' : 'opacity-0'}`}>
            <h3 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </h3>
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
              <p className="text-gray-300 text-xl leading-relaxed text-center">
                I'm a passionate full-stack developer have experience in building web applications.
                Currently studying at Chitkara University Punjab persuing B.E degree in AI and Future Technology.
                My focus is on writing clean, maintainable code and delivering exceptional user experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-6">
          <div className={`max-w-7xl mx-auto ${visibleSections.has('projects') ? 'animate-slide-in-up' : 'opacity-0'}`}>
            <h3 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h4 className="text-2xl font-semibold mb-3 text-purple-300">{project.title}</h4>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a href={project.link} className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors">
                    View Project <ExternalLink size={16} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section with Charts */}
        <section id="stats" className="py-20 px-6">
          <div className={`max-w-7xl mx-auto ${visibleSections.has('stats') ? 'animate-slide-in-up' : 'opacity-0'}`}>
            <h3 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Development Activity
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Activity Chart */}
              <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                <h4 className="text-2xl font-semibold mb-6 text-purple-300 flex items-center gap-2">
                  <TrendingUp size={24} /> Commits & Projects
                </h4>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={activityData}>
                    <defs>
                      <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #a855f7' }} />
                    <Area type="monotone" dataKey="commits" stroke="#a855f7" fillOpacity={1} fill="url(#colorCommits)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Skills Radar Chart */}
              <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                <h4 className="text-2xl font-semibold mb-6 text-purple-300">Skill Proficiency</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <RadarChart data={skillsRadarData}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis dataKey="skill" stroke="#9ca3af" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#9ca3af" />
                    <Radar name="Level" dataKey="level" stroke="#ec4899" fill="#ec4899" fillOpacity={0.6} />
                    <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #ec4899' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        {/* Certificates Section */}
        <section id="certificates" className="py-20 px-6">
          <div className={`max-w-7xl mx-auto ${visibleSections.has('certificates') ? 'animate-slide-in-up' : 'opacity-0'}`}>
            <h3 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Certificates & Achievements
            </h3>
            {/* FIX 3: Uniform size and layout for certificate boxes */}
            <div className="flex flex-wrap justify-center gap-6">
              {certificates.map((cert, index) => (
                <div
                  key={index}
                  className="w-full md:w-96 h-64 flex flex-col group relative bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-16 h-16 mb-4 rounded-full bg-gradient-to-br ${cert.color} flex items-center justify-center flex-shrink-0`}>
                    <Award size={32} className="text-white" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-purple-300 line-clamp-2">{cert.title}</h4>
                  <div className="mt-auto">
                    <p className="text-gray-400 text-sm mb-1">{cert.issuer}</p>
                    <p className="text-gray-500 text-sm">{cert.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-6">
          <div className={`max-w-7xl mx-auto ${visibleSections.has('skills') ? 'animate-slide-in-up' : 'opacity-0'}`}>
            <h3 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Technologies
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-6 py-3 bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-sm rounded-full text-lg border border-purple-500/30 hover:border-purple-400 hover:scale-110 transition-all duration-300 cursor-pointer"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6">
          <div className={`max-w-7xl mx-auto text-center ${visibleSections.has('contact') ? 'animate-slide-in-up' : 'opacity-0'}`}>
            <h3 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Get In Touch
            </h3>
            <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <a
              href="mailto:jaskaran2667@gmail.com"
              className="inline-block px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              Send Me an Email
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-purple-500/30">
          <div className="max-w-7xl mx-auto text-center text-gray-400">
            <p>&copy; 2025 Jaskaran Singh. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>    
  );
}