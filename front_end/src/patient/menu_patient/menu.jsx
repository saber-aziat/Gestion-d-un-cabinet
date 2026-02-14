import React, { useContext, useEffect } from 'react';
import { NavLink, useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import styles from './menu.module.css';
import {
  Home, Search, Calendar, MessageSquare, History, LogOut, Heart, Bell, User
} from 'lucide-react';

console.log(motion)


const PatientMenu = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Debug : affichez les données utilisateur
  useEffect(() => {
    console.log('PatientMenu - Current user:', user);
  }, [user]);

  if (!user) {
    console.log('PatientMenu - No user, redirecting to login');
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Fonction pour construire l'URL complète de la photo
  const getPhotoUrl = () => {
    if (user.photo) {
      // Si la photo commence par http, c'est déjà une URL complète
      if (user.photo.startsWith('http')) {
        return user.photo;
      }
      // Sinon, construire l'URL complète avec votre domaine backend
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
          <span className={styles.logoSubtitle}>Espace Patient</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className={styles.navLinks}>
        <NavLink
          to="/patient"
          end
          className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
        >
          <Home size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
          Accueil
        </NavLink>
        <NavLink
          to="/patient/gerer_rdv"
          className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
        >
          <Calendar size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
          Prendre RDV
        </NavLink>
        <NavLink
          to="/patient/messages"
          className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
        >
          <MessageSquare size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
          Messages
        </NavLink>
        <NavLink
          to="/patient/notifications"
          className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
        >
          <Bell size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
          Notification
        </NavLink>
        <NavLink
          to="/patient/profil"
          className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
        >
          <User size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
          Profil
        </NavLink>
      </nav>

      {/* Profile & Logout Section */}
      <div className={styles.profileSection}>
        <div className={styles.userInfo}>
          <span className={styles.userName}>
            {/* CORRIGÉ : utilisez first_name et last_name au lieu de firstName et lastName */}
            {user.first_name && user.last_name
              ? `${user.first_name} ${user.last_name}`
              : user.email || 'Patient'}
          </span>
          <img
            src={getPhotoUrl()}
            alt="Profile"
            className={styles.userAvatar}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/150';
            }}
          />
        </div>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </motion.header>
  );
};

export default PatientMenu;
