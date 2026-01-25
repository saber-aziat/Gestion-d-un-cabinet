import { NavLink } from "react-router-dom";
import styles from "./menu.module.css";

function Menu() {
  return (
    <header className={styles.header}>
        
      {/* Logo Section */}
      <div className={styles.logoSection}>
        <div className={styles.logoIcon}>
         
            <img src="/logo.png" alt="Logo" width="40" height="40"/>
          <div className={styles.notifDot}></div>
        </div>
        <div className={styles.logoTextContainer}>
          <span className={styles.logoTitle}>Dencofer_Health</span>
          <span className={styles.logoSubtitle}>Cabinet Médical</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className={styles.navLinks}>
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
        >
          Accueil
        </NavLink>
        <NavLink
          to="/doctors"
          className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
        >
          Nos Médecins
        </NavLink>
        <NavLink
          to="/categorie"
          className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
        >
          Spécialités
        </NavLink>
        <NavLink
          to="/apropos"
          className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
        >
          À Propos
        </NavLink>
      </nav>

      {/* Auth Section */}
      <div className={styles.authSection}>
        <NavLink to="/login" className={styles.loginLink}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          Connexion
        </NavLink>
        <NavLink to="/sign_up" className={styles.signupBtn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
          Inscription
        </NavLink>
      </div>
    </header>
  );
}

export default Menu;
