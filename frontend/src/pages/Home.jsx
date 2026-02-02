import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoArrowForward, IoMailOutline, IoLogoTwitter, IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5';
import { API_URL } from '../api_config';

const Home = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/blogs/?limit=8`);
            setBlogs(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            {/* Hero Section */}
            <section style={{
                minHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                marginTop: '-80px' // offset navbar
            }}>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60vw',
                    height: '60vw',
                    background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    zIndex: -1
                }}></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div style={{
                        display: 'inline-block',
                        padding: '8px 16px',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '50px',
                        marginBottom: '2rem',
                        border: '1px solid rgba(255,255,255,0.1)',
                        fontSize: '0.9rem',
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                    }}>
                        The Future of Publishing
                    </div>
                </motion.div>

                <motion.h1
                    className="hero-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    style={{ maxWidth: '900px', lineHeight: '1', marginBottom: '2rem' }}
                >
                    Ideas that shape <br /> <span style={{ color: 'white' }}>tomorrow.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    style={{ fontSize: '1.2rem', maxWidth: '500px', marginBottom: '3rem', opacity: 0.7 }}
                >
                    A curated collection of thoughts, stories, and perspectives on technology and design.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    style={{ display: 'flex', gap: '1rem' }}
                >
                    <Link to="/blogs" className="btn btn-primary" style={{ padding: '1.2rem 3rem' }}>
                        Start Reading
                    </Link>
                    <Link to="/about" className="btn btn-outline" style={{ padding: '1.2rem 3rem' }}>
                        Our Mission
                    </Link>
                </motion.div>
            </section>

            {/* Featured Section (Horizontal Scroll) */}
            <section style={{ paddingBottom: '8rem', overflow: 'hidden' }}>
                <div className="container" style={{ marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                        <h2 style={{ fontSize: '3rem' }}>Trending</h2>
                        <Link to="/blogs" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.7 }}>
                            View all <IoArrowForward />
                        </Link>
                    </div>
                </div>

                <div style={{ width: '100%', overflow: 'hidden' }}>
                    <div
                        className="hide-scrollbar"
                        style={{
                            display: 'flex',
                            gap: '2rem',
                            overflowX: 'auto',
                            padding: '0 2rem 2rem 2rem'
                        }}
                    >
                        {blogs.map((blog, index) => (
                            <div
                                key={`${blog.id}-${index}`}
                                className="glass"
                                style={{
                                    minWidth: '380px',
                                    maxWidth: '380px',
                                    padding: '0',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    background: 'linear-gradient(180deg, rgba(20,20,20,0.6) 0%, rgba(10,10,10,0.4) 100%)'
                                }}
                            >
                                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                                    {blog.image_url ? (
                                        <img
                                            src={blog.image_url}
                                            alt="Cover"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                transition: 'transform 0.5s ease'
                                            }}
                                            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                        />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', background: '#111' }}></div>
                                    )}
                                    <div style={{
                                        position: 'absolute',
                                        top: '1rem',
                                        left: '1rem',
                                        background: 'rgba(0,0,0,0.6)',
                                        backdropFilter: 'blur(4px)',
                                        padding: '0.4rem 1rem',
                                        borderRadius: '20px',
                                        fontSize: '0.75rem',
                                        textTransform: 'uppercase',
                                        fontWeight: '600',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}>
                                        {blog.category || 'Article'}
                                    </div>
                                </div>

                                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', lineHeight: '1.3' }}>{blog.title}</h3>
                                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(45deg, #6366f1, #ec4899)' }}></div>
                                            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{blog.author_username}</span>
                                        </div>
                                        <Link to={`/blog/${blog.id}`} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <IoArrowForward />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* New Categories Grid Section */}
            <section className="container" style={{ paddingBottom: '8rem' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>Explore Categories</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {['Technology', 'Lifestyle', 'Design', 'Business'].map((cat, i) => (
                        <div key={cat} className="glass" style={{ padding: '3rem 2rem', textAlign: 'center', cursor: 'pointer', transition: '0.3s' }}
                            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-10px)'}
                            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '1rem', color: i % 2 === 0 ? '#6366f1' : '#ec4899' }}>
                                {i === 0 ? '💻' : i === 1 ? '🌿' : i === 2 ? '🎨' : '💼'}
                            </div>
                            <h3>{cat}</h3>
                            <p style={{ marginTop: '0.5rem', opacity: 0.7 }}>Discover the latest {cat.toLowerCase()} trends.</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Newsletter Subscription */}
            <section style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
                <div className="newsletter-bg" style={{ position: 'absolute', inset: 0, zIndex: -1 }}></div>
                <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Stay in the loop</h2>
                    <p style={{ fontSize: '1.2rem', marginBottom: '3rem', opacity: 0.8 }}>
                        Join our newsletter to get the latest insights and stories delivered straight to your inbox.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '1.5rem', color: '#888' }}>
                            <IoMailOutline size={24} />
                        </div>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            style={{ background: 'transparent', border: 'none', color: 'white', flex: 1, padding: '1rem', outline: 'none', fontSize: '1rem' }}
                        />
                        <button className="btn btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '50px' }}>Subscribe</button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '4rem 0', background: 'black' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3rem' }}>
                    <div>
                        <Link to="/" style={{ fontSize: '1.8rem', fontWeight: '800', display: 'block', marginBottom: '1rem' }}>
                            Neon<span style={{ color: '#6366f1' }}>.</span>
                        </Link>
                        <p style={{ maxWidth: '300px', opacity: 0.6 }}>
                            A platform for ideas, stories, and creativity. Built for the future.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
                        <div>
                            <h4 style={{ marginBottom: '1.5rem' }}>Platform</h4>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', opacity: 0.7 }}>
                                <li><Link to="/blogs">Browse Stories</Link></li>
                                <li><Link to="/create">Write a Story</Link></li>
                                <li><Link to="/login">Sign In</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ marginBottom: '1.5rem' }}>Company</h4>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', opacity: 0.7 }}>
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                                <li><Link to="/">Privacy Policy</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: '1.5rem' }}>Connect</h4>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a href="#" style={{ fontSize: '1.5rem', padding: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IoLogoTwitter /></a>
                            <a href="#" style={{ fontSize: '1.5rem', padding: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IoLogoGithub /></a>
                            <a href="#" style={{ fontSize: '1.5rem', padding: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IoLogoLinkedin /></a>
                        </div>
                    </div>
                </div>
                <div className="container" style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', opacity: 0.5, fontSize: '0.9rem' }}>
                    &copy; 2024 Neon Blog. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Home;
