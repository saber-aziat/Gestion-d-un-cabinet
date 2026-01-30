import React, { useState } from 'react';
import styles from './sign_up.module.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    photo: null
  });

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
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: file
      }));
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est obligatoire";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom est obligatoire";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Veuillez entrer une adresse email valide";
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      newErrors.phone = "Le numéro de téléphone doit contenir au moins 10 chiffres";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
  const formDataToSend = new FormData();
  formDataToSend.append('firstName', formData.firstName);
  formDataToSend.append('lastName', formData.lastName);
  formDataToSend.append('email', formData.email);
  formDataToSend.append('phone', formData.phone);
  formDataToSend.append('password', formData.password);
  if (formData.photo) {
    formDataToSend.append('photo', formData.photo);
  }

  const response = await fetch('http://localhost:8000/api/signup/', {
    method: 'POST',
    body: formDataToSend,
  });

  const data = await response.json();

  if (response.ok) {
    console.log(data);  // tu verras photo_url ici
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      photo: null
    });
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
  } else {
    setErrors({ submit: data.message || data.error || 'Une erreur est survenue' });
  }
} catch (error) {
  console.error('Error:', error);
  setErrors({ submit: 'Erreur de connexion au serveur' });
} finally {
  setLoading(false);
}

  };

  return (
    <div className={styles.signUpContainer}>
      {/* Left Side - Form */}
      <div className={styles.formSection}>
        <div className={styles.formContent}>
          {/* Logo */}
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <img src="/logo.png" alt="DencoferHealth Logo" />
            </div>
            <span className={styles.logoText}>DencoferHealth</span>
          </div>

          {/* Title */}
          <div className={styles.formHeader}>
            <h1 className={styles.formTitle}>Créer un compte</h1>
            <p className={styles.formSubtitle}>
              Inscrivez-vous pour prendre rendez-vous avec nos médecins
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Success Message */}
            {successMessage && (
              <div className={styles.successMessage}>
                ✓ {successMessage}
              </div>
            )}

            {/* Error Message */}
            {errors.submit && (
              <div className={styles.errorMessage}>
                ✗ {errors.submit}
              </div>
            )}

            {/* Name Fields */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName" className={styles.label}>
                  Prénom
                </label>
                <div className={styles.inputWrapper}>
                  <svg className={styles.inputIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM3 18a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Ahmed"
                    className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                    required
                  />
                </div>
                {errors.firstName && <span className={styles.fieldError}>{errors.firstName}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="lastName" className={styles.label}>
                  Nom
                </label>
                <div className={styles.inputWrapper}>
                  <svg className={styles.inputIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM3 18a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Ali"
                    className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                    required
                  />
                </div>
                {errors.lastName && <span className={styles.fieldError}>{errors.lastName}</span>}
              </div>
            </div>

            {/* Email */}
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M2 6l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="AhmedAli@exemple.com"
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>
                Téléphone
              </label>
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M18 14v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 01.08 1.18 2 2 0 012.08 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.87a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0118 14z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder=" 06 12 34 56 78"
                  className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                  required
                />
              </div>
            </div>

            {/* Photo Upload */}
            <div className={styles.formGroup}>
              <label htmlFor="photo" className={styles.label}>
                Photo de profil (optionnel)
              </label>
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className={`${styles.input} ${styles.fileInput}`}
                />
              </div>
            </div>

            {/* Password */}
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Mot de passe
              </label>
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="3" y="9" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M6 9V6a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.passwordToggle}
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M2 2l16 16M8.878 8.879a2 2 0 1 0 2.828 2.828M4.52 4.52C2.5 5.995 1 8.5 1 10c0 4 4 7 9 7 1.544 0 2.97-.411 4.24-1.1M17.48 13.48C18.5 12.005 19 10.5 19 10c0-4-4-7-9-7-.544 0-1.07.05-1.58.14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M1 10s4-7 9-7 9 7 9 7-4 7-9 7-9-7-9-7z" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
            </div>

            {/* Submit Button */}
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Création en cours...' : 'Créer mon compte'}
              {!loading && (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>

            {/* Login Link */}
            <p className={styles.loginLink}>
              Déjà inscrit ? <a href="/login">Se connecter</a>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Hero */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <a href="/" className={styles.heroIcon}>
            <img src="/logo.png" alt="DencoferHealth Logo" className={styles.heroLogo} />
          </a>
          <h2 className={styles.heroTitle}>Votre santé, notre priorité</h2>
          <p className={styles.heroSubtitle}>
            Rejoignez DencoferHealth et bénéficiez d'un accès<br />
            simplifié à des soins médicaux de qualité.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;