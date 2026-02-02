import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { API_URL } from '../api_config';

const CreateBlog = () => {
    const [formData, setFormData] = useState({ title: '', content: '', image_url: '', category: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post(`${API_URL}/api/blogs/`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Blog published!');
            navigate('/');
        } catch (err) {
            toast.error('Failed to publish blog');
        }
    };

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass"
                style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}
            >
                <h2 style={{ marginBottom: '2rem' }}>Write a Story</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        className="input-field"
                        placeholder="Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                    <input
                        className="input-field"
                        placeholder="Cover Image URL (Optional)"
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    />
                    <input
                        className="input-field"
                        placeholder="Category (e.g. Tech, updates)"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                    <textarea
                        className="input-field"
                        rows="15"
                        placeholder="Tell your story... (Markdown supported)"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        required
                        style={{ resize: 'vertical', fontFamily: 'monospace', fontSize: '0.9rem' }}
                    />
                    <button type="submit" className="btn btn-primary">Publish</button>
                </form>
            </motion.div>
        </div>
    );
};

export default CreateBlog;
