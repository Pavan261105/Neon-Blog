import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoSearch, IoArrowForward } from 'react-icons/io5';
import { API_URL } from '../api_config';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [categories, setCategories] = useState(['All', 'Tech', 'Design', 'Culture', 'Business', 'Lifestyle']);

    useEffect(() => {
        fetchBlogs();
    }, [search, category]);

    const fetchBlogs = async () => {
        try {
            const params = {};
            if (search) params.search = search;
            if (category !== 'All') params.category = category;

            const res = await axios.get(`${API_URL}/api/blogs/`, { params });
            setBlogs(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginBottom: '5rem', textAlign: 'center' }}
            >
                <h1 style={{ fontSize: '4rem', marginBottom: '2rem' }}>Stories & Insights</h1>

                {/* Search Bar */}
                <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                    <IoSearch style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem', color: '#888' }} />
                    <input
                        type="text"
                        placeholder="Search for articles..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input-field"
                        style={{
                            paddingLeft: '3.5rem',
                            borderRadius: '50px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'rgba(255,255,255,0.03)'
                        }}
                    />
                </div>

                {/* Filter Chips */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            style={{
                                padding: '0.8rem 2rem',
                                border: category === cat ? '1px solid #6366f1' : '1px solid rgba(255,255,255,0.1)',
                                background: category === cat ? 'linear-gradient(135deg, #6366f1, #a855f7)' : 'rgba(255,255,255,0.03)',
                                color: category === cat ? 'white' : '#888',
                                cursor: 'pointer',
                                borderRadius: '50px',
                                transition: 'all 0.3s ease',
                                fontSize: '0.9rem',
                                fontWeight: '500'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '3rem' }}>
                {blogs.length > 0 ? blogs.map((blog, index) => (
                    <motion.div
                        key={blog.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="glass"
                        style={{
                            padding: '0',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            border: '1px solid rgba(255,255,255,0.05)',
                            background: 'rgba(255,255,255,0.02)'
                        }}
                    >
                        <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                            <img
                                src={blog.image_url || 'https://via.placeholder.com/800x400'}
                                alt="Cover"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.5s' }}
                                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                            />
                        </div>

                        <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <div style={{ textTransform: 'uppercase', color: '#6366f1', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '1rem', letterSpacing: '1px' }}>
                                {blog.category || 'Thought'}
                            </div>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', lineHeight: '1.2' }}>{blog.title}</h2>
                            <p style={{ flex: 1, marginBottom: '2rem' }}>{blog.content.substring(0, 100)}...</p>

                            <Link to={`/blog/${blog.id}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', color: 'white' }}>
                                Read Article <IoArrowForward />
                            </Link>
                        </div>
                    </motion.div>
                )) : (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', fontSize: '1.5rem', opacity: 0.5 }}>
                        No stories found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blogs;
