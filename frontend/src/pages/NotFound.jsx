import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
    return (
        <div style={{ height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <motion.h1
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{ fontSize: '6rem', color: 'var(--accent-color)' }}
            >
                404
            </motion.h1>
            <p style={{ fontSize: '2rem', marginBottom: '2rem' }}>Page Not Found</p>
            <Link to="/" className="btn btn-primary">Go Home</Link>
        </div>
    );
};

export default NotFound;
