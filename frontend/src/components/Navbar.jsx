import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const checkToken = () => setToken(localStorage.getItem('token'));
        window.addEventListener('storage', checkToken);

        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('storage', checkToken);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setIsMenuOpen(false);
        navigate('/login');
        window.dispatchEvent(new Event('storage'));
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Stories', path: '/blogs' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: scrolled ? '15px 40px' : '25px 40px',
                background: scrolled ? 'rgba(5, 5, 5, 0.8)' : 'transparent',
                backdropFilter: scrolled ? 'blur(12px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
                transition: 'all 0.3s ease'
            }}
        >
            <div className="nav-container">
                <Link to="/" onClick={closeMenu} style={{ fontSize: '1.8rem', fontWeight: '800', letterSpacing: '-1px' }}>
                    Neon<span style={{ color: '#6366f1' }}>.</span>
                </Link>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ gap: '40px', alignItems: 'center' }}>
                    {navLinks.map(link => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="nav-link"
                            style={{
                                color: location.pathname === link.path ? 'white' : 'var(--text-secondary)'
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {token ? (
                        <>
                            <Link to="/create" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem' }}>Write</Link>
                            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.6rem 1.5rem', borderRadius: '50px', marginLeft: '1rem' }}>Logout</button>
                        </>
                    ) : (
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/login" className="btn btn-outline" style={{ padding: '0.6rem 1.5rem', borderRadius: '50px' }}>Sign In</Link>
                            <Link to="/register" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', borderRadius: '50px' }}>Register</Link>
                        </div>
                    )}
                </div>

                {/* Mobile Icon */}
                <div className="mobile-icon" style={{ fontSize: '1.8rem', cursor: 'pointer' }} onClick={toggleMenu}>
                    {isMenuOpen ? <IoClose /> : <IoMenu />}
                </div>

                {/* Mobile Menu */}
                <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    {navLinks.map(link => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={closeMenu}
                            style={{
                                fontSize: '2rem',
                                marginBottom: '2rem',
                                fontWeight: '700',
                                color: location.pathname === link.path ? 'white' : 'rgba(255,255,255,0.5)'
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}
                    {token && <Link to="/create" onClick={closeMenu} style={{ fontSize: '1.5rem', color: '#6366f1', marginBottom: '2rem' }}>Write a Story</Link>}
                    {token ? (
                        <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem' }}>Logout</button>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', alignItems: 'center' }}>
                            <Link to="/login" onClick={closeMenu} className="btn btn-outline" style={{ width: '200px' }}>Sign In</Link>
                            <Link to="/register" onClick={closeMenu} className="btn btn-primary" style={{ width: '200px' }}>Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
