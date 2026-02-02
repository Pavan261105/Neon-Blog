import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
                textAlign: 'center',
                padding: '2rem',
                marginTop: 'auto',
                color: 'var(--text-secondary)',
                borderTop: '1px solid rgba(255,255,255,0.05)'
            }}
        >
            <p>&copy; {new Date().getFullYear()} NeonBlog. Crafted with <span style={{ color: 'var(--accent-color)' }}>&#10084;</span></p>
        </motion.footer>
    );
};

export default Footer;
