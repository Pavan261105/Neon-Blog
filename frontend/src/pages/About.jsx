import { motion } from 'framer-motion';
import { IoRocketOutline, IoHeartOutline, IoBulbOutline, IoLogoTwitter, IoLogoLinkedin, IoLogoGithub } from 'react-icons/io5';

const About = () => {
    return (
        <div style={{ overflowX: 'hidden' }}>
            {/* Hero Section */}
            <section style={{
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                marginTop: '-80px',
                padding: '0 20px'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '50vw',
                    height: '50vw',
                    background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    zIndex: -1
                }}></div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', lineHeight: '1.1' }}
                >
                    We are <span style={{ color: '#ec4899' }}>storytellers</span> <br /> styling the future.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{ fontSize: '1.2rem', maxWidth: '600px', opacity: 0.7, lineHeight: 1.6 }}
                >
                    NeonBlog is a digital sanctuary for thinkers, creators, and innovators.
                    We believe in the power of words to shape reality.
                </motion.p>
            </section>

            {/* Our Story Section */}
            <section className="container" style={{ padding: '4rem 0' }}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '4rem',
                    justifyContent: 'center'
                }}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        style={{ flex: '1 1 400px', maxWidth: '600px' }}
                    >
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Our Story</h2>
                        <p style={{ marginBottom: '1rem', fontSize: '1.1rem', opacity: 0.8 }}>
                            It started with a simple idea: the web deserves better typography.
                            What began as a small experiment in 2024 has grown into a vibrant community of writers and readers.
                        </p>
                        <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>
                            We wanted to build a platform where the reading experience is as important as the content itself.
                            No clutter, no distractions—just pure, unadulterated thought.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass"
                        style={{
                            flex: '1 1 400px',
                            height: '400px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'linear-gradient(45deg, rgba(99,102,241,0.1), rgba(236,72,153,0.1))'
                        }}
                    >
                        <span style={{ fontSize: '10rem', opacity: 0.8 }}>✨</span>
                    </motion.div>
                </div>
            </section>

            {/* Values Grid */}
            <section style={{ padding: '6rem 0', background: 'rgba(255,255,255,0.02)' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '4rem' }}>Our Core Values</h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        {[
                            { icon: <IoRocketOutline size={40} />, title: "Innovation", desc: "Pushing boundaries in design and tech." },
                            { icon: <IoHeartOutline size={40} />, title: "Passion", desc: "Driven by a love for quality content." },
                            { icon: <IoBulbOutline size={40} />, title: "Clarity", desc: "Making complex ideas simple and beautiful." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="glass"
                                style={{ padding: '3rem', textAlign: 'center' }}
                            >
                                <div style={{ color: '#6366f1', marginBottom: '1.5rem' }}>{item.icon}</div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{item.title}</h3>
                                <p style={{ opacity: 0.7 }}>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="container" style={{ padding: '6rem 0' }}>
                <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem' }}>Meet the Team</h2>
                <p style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto 4rem auto', opacity: 0.6 }}>
                    The creative minds behind the platform.
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem'
                }}>
                    {[1, 2, 3, 4].map((member, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="glass"
                            style={{ padding: '0', overflow: 'hidden', textAlign: 'center' }}
                        >
                            <div style={{ height: '250px', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {/* Placeholder for Team Image */}
                                <span style={{ fontSize: '4rem' }}>👤</span>
                            </div>
                            <div style={{ padding: '2rem' }}>
                                <h3 style={{ marginBottom: '0.5rem' }}>Team Member {member}</h3>
                                <p style={{ color: '#6366f1', fontSize: '0.9rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>
                                    {['Founder', 'Lead Developer', 'Designer', 'Editor'][i]}
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', opacity: 0.7 }}>
                                    <IoLogoTwitter size={20} style={{ cursor: 'pointer' }} />
                                    <IoLogoLinkedin size={20} style={{ cursor: 'pointer' }} />
                                    <IoLogoGithub size={20} style={{ cursor: 'pointer' }} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Stats Section */}
            <section style={{ padding: '4rem 0', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem', textAlign: 'center' }}>
                    {[
                        { num: '10k+', label: 'Active Readers' },
                        { num: '500+', label: 'Stories Published' },
                        { num: '50+', label: 'Top Authors' },
                        { num: '24/7', label: 'Inspiration' }
                    ].map((stat, i) => (
                        <div key={i}>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', background: 'linear-gradient(135deg, #fff, #888)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                {stat.num}
                            </div>
                            <div style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', marginTop: '0.5rem', opacity: 0.7 }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;
