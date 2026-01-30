import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when typing
    if (errors[name] || errors.submit) {
      setErrors(prev => ({ ...prev, [name]: '', submit: '' }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email invalide";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {

        // Save to context
        const userData = data.user || data
        login(userData);

        setSuccessMessage("Connexion réussie !");
        setTimeout(() => {
           
          // la logique de root sur patient ou doctor
          if (userData.role === 'doctor'){
            navigate('/doctor');
          } else {
            navigate('/patient')
          }

        }, 1000);
      } else {
        // Specific error message from API or fallback
        setErrors({ submit: data.error || data.message || "Email ou mot de passe incorrect" });
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ submit: "Erreur de connexion au serveur" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formSection}>
        <div className={styles.formContent}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <img src="/logo.png" alt="Logo" />
            </div>
            <span className={styles.logoText}>DencoferHealth</span>
          </div>

          <div className={styles.formHeader}>
            <h1 className={styles.formTitle}>Bon retour !</h1>
            <p className={styles.formSubtitle}>Connectez-vous pour accéder à votre compte</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
            {errors.submit && <div className={styles.errorMessage}>{errors.submit}</div>}

            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M2.5 5.5L10 11L17.5 5.5M3 16H17C18.1046 16 19 15.1046 19 14V6C19 4.89543 18.1046 4 17 4H3C1.89543 4 1 4.89543 1 6V14C1 15.1046 1.89543 16 3 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                />
              </div>
              {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Mot de passe</label>
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M6 9V6C6 3.79086 7.79086 2 10 2C12.2091 2 14 3.79086 14 6V9M3 9H17C18.1046 9 19 9.89543 19 11V16C19 17.1046 18.1046 18 17 18H3C1.89543 18 1 17.1046 1 16V11C1 9.89543 1.89543 9 3 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
            </div>

            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? "Connexion..." : "Se connecter"}
            </button>

            <p className={styles.signupLink}>
              Pas de compte ? <a href="/signup">S'inscrire</a>
            </p>
          </form>
        </div>
      </div>

      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroIcon}>
            <img src="/logo.png" alt="Logo" className={styles.heroLogo} />
          </div>
          <h2 className={styles.heroTitle}>Votre santé est notre priorité</h2>
          <p className={styles.heroSubtitle}>
            Accédez à vos rendez-vous et à votre dossier médical en un clic.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;