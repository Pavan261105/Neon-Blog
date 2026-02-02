import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { API_URL } from '../api_config';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/api/contact/`, formData);
            toast.success('Message sent! We will get back to you soon.');
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            toast.error('Failed to send message.');
        }
    };

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass"
                style={{ padding: '4rem', maxWidth: '600px', margin: '0 auto' }}
            >
                <h1 style={{ textAlign: 'center' }}>Contact Us</h1>
                <form style={{ marginTop: '2rem' }} onSubmit={handleSubmit}>
                    <input
                        className="input-field"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <input
                        className="input-field"
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <textarea
                        className="input-field"
                        rows="5"
                        placeholder="Message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                    ></textarea>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
                </form>
            </motion.div>
        </div>
    );
};

export default Contact;
