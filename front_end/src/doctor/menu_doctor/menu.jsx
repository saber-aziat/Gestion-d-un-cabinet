import React, { useContext } from 'react';
import { NavLink, useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import styles from './menu.module.css';
import {
    Home,
    Calendar,
    Mail,
    Users,
    MessageSquare,
    History,
    LogOut,
    Heart,
    FileText,
    Bell
} from 'lucide-react';

console.log(motion)
const DoctorMenu = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) {
        return <Navigate to="/login" />;
    }

    const handleLogout = () => {
        // Vider le contexte (supprimer les données utilisateur)
        logout();
        navigate('/');
    };

    const getPhotoUrl = () => {
        if (user.photo) {
            if (user.photo.startsWith('http')) return user.photo;
            return `http://localhost:8000${user.photo}`;
        }
        return 'https://via.placeholder.com/150';
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={styles.header}
        >
            {/* Logo Section */}
            <div className={styles.logoSection} onClick={() => navigate('/')}>
                <div className={styles.logoIcon}>
                    <Heart size={24} fill="currentColor" />
                </div>
                <div className={styles.logoTextContainer}>
                    <span className={styles.logoTitle}>DencoferHealth</span>
                    <span className={styles.logoSubtitle}>Espace Médecin</span>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className={styles.navLinks}>
                <NavLink
                    to="/doctor"
                    end
                    className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                >
                    <Home size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    Accueil
                </NavLink>
                <NavLink
                    to="/doctor/gerer-rdv"
                    className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                >
                    <Calendar size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    Gérer RDV
                </NavLink>
                <NavLink
                    to="/doctor/patients"
                    className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                >
                    <Users size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    Patients
                </NavLink>
                <NavLink
                    to="/doctor/messages"
                    className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                >
                    <MessageSquare size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    Messages
                </NavLink>
                <NavLink
                    to="/doctor/email"
                    className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                >
                    <Mail size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    Email
                </NavLink>
                <NavLink
                    to="/doctor/bilans"
                    className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                >
                    <FileText size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    Bilan
                </NavLink>
                <NavLink
                    to="/doctor/notifications"
                    className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                >
                    <Bell size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    Notification
                </NavLink>
            </nav>

            {/* Profile & Logout Section */}
            <div className={styles.profileSection}>
                <div className={styles.userInfo}>
                    <img
                        src={getPhotoUrl()}
                        alt="Doctor Profile"
                        className={styles.userAvatar}
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/150';
                        }}
                    />
                    <span className={styles.userName}>
                        {user.first_name ? `Dr. ${user.first_name} ${user.last_name}` : `Dr. ${user.username || 'Médecin'}`}
                    </span>
                </div>
                <button className={styles.logoutBtn} onClick={handleLogout}>
                    <LogOut size={16} />
                    Logout
                </button>
            </div>
        </motion.header>
    );
};

export default DoctorMenu;
