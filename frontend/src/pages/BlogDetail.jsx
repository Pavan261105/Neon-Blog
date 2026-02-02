import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { API_URL } from '../api_config';

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        fetchBlog();
        const user = localStorage.getItem('user');
        if (user) setCurrentUser(JSON.parse(user));
    }, [id]);

    const fetchBlog = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/blogs/${id}`);
            setBlog(res.data);
            setEditData(res.data);
        } catch (err) {
            toast.error('Blog not found');
            navigate('/404');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this blog?')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_URL}/api/blogs/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Blog deleted');
            navigate('/');
        } catch (err) {
            toast.error('Failed to delete');
        }
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${API_URL}/api/blogs/${id}`, editData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Blog updated');
            setIsEditing(false);
            fetchBlog();
        } catch (err) {
            toast.error('Failed to update');
        }
    };

    if (!blog) return <div className="container">Loading...</div>;

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass"
                style={{ padding: '3rem', maxWidth: '900px', margin: '0 auto' }}
            >
                {isEditing ? (
                    <div>
                        <input className="input-field" value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
                        <textarea className="input-field" rows="15" value={editData.content} onChange={(e) => setEditData({ ...editData, content: e.target.value })} style={{ fontFamily: 'monospace', fontSize: '0.9rem' }} />
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button onClick={handleUpdate} className="btn btn-primary">Save Changes</button>
                            <button onClick={() => setIsEditing(false)} className="btn btn-outline">Cancel</button>
                        </div>
                    </div>
                ) : (
                    <>
                        {blog.image_url && <img src={blog.image_url} alt="Cover" style={{ width: '100%', borderRadius: '16px', marginBottom: '2rem', maxHeight: '400px', objectFit: 'cover' }} />}
                        <div style={{ marginBottom: '1rem', color: '#6366f1', textTransform: 'uppercase', fontSize: '0.9rem', fontWeight: 'bold' }}>{blog.category}</div>
                        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{blog.title}</h1>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem', opacity: 0.7, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                            <span>By {blog.author_username}</span>
                            <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                        </div>

                        <div className="markdown-content" style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h1: ({ node, ...props }) => <h2 style={{ fontSize: '2.5rem', margin: '2rem 0 1rem' }} {...props} />,
                                    h2: ({ node, ...props }) => <h3 style={{ fontSize: '2rem', margin: '1.5rem 0 1rem' }} {...props} />,
                                    p: ({ node, ...props }) => <p style={{ marginBottom: '1.5rem', color: '#d1d5db' }} {...props} />,
                                    ul: ({ node, ...props }) => <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem', listStyle: 'disc' }} {...props} />,
                                    li: ({ node, ...props }) => <li style={{ marginBottom: '0.5rem' }} {...props} />,
                                    code: ({ node, inline, className, children, ...props }) => {
                                        return inline ? (
                                            <code style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 5px', borderRadius: '4px', fontFamily: 'monospace' }} {...props}>{children}</code>
                                        ) : (
                                            <div style={{ background: '#1e1e1e', padding: '1.5rem', borderRadius: '8px', overflowX: 'auto', margin: '2rem 0' }}>
                                                <code style={{ fontFamily: 'monospace', color: '#e0e0e0' }} {...props}>{children}</code>
                                            </div>
                                        )
                                    },
                                    img: ({ node, ...props }) => <img style={{ maxWidth: '100%', borderRadius: '12px', margin: '2rem 0' }} {...props} />,
                                    blockquote: ({ node, ...props }) => <blockquote style={{ borderLeft: '4px solid #6366f1', paddingLeft: '1.5rem', margin: '2rem 0', fontStyle: 'italic', color: '#a5b4fc' }} {...props} />
                                }}
                            >
                                {blog.content}
                            </ReactMarkdown>
                        </div>

                        {currentUser && currentUser.username === blog.author_username && (
                            <div style={{ marginTop: '4rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', gap: '1rem' }}>
                                <button onClick={() => setIsEditing(true)} className="btn btn-outline">Edit Story</button>
                                <button onClick={handleDelete} className="btn" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid #ef4444' }}>Delete Story</button>
                            </div>
                        )}
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default BlogDetail;
