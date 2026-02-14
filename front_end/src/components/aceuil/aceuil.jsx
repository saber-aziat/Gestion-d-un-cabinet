import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Stethoscope,
  Heart,
  Baby,
  Microscope,
  Clock,
  ShieldCheck,
  Users,
  MapPin,
  Phone,
  Mail,
  Menu as MenuIcon,
  X,
  ArrowRight,
  Star
} from 'lucide-react';
import styles from './aceuil.module.css';

const Aceuil = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.container}>
      {/* NAVIGATION MENU */}
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>
            <Stethoscope className={styles.logoIcon} />
            <span>DencoferHealth</span>
          </div>

          <div className={`${styles.navLinks} ${isMenuOpen ? styles.active : ''}`}>
            <a href="#hero" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Accueil</a>
            <a href="#doctor" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Le Médecin</a>
            <a href="#services" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Services</a>
            <a href="#why-us" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Pourquoi Nous?</a>
            <a href="#testimonials" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Témoignages</a>
            
          </div>

          <div className={styles.navButtons}>
            <Link to="/login" className={styles.btnNavSecondary}>Connexion</Link>
            <Link to="/signup" className={styles.btnNavPrimary}>Inscription</Link>
            <button className={styles.mobileMenuBtn} onClick={toggleMenu}>
              {isMenuOpen ? <X /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <h1 className={styles.heroTitle}>
              Votre santé, <br />
              <span className={styles.highlight}>Notre priorité absolue</span>
            </h1>
            <p className={styles.heroDescription}>
              Bienvenue au cabinet du Dr. Ilyes Ezzajli. Nous offrons une médecine moderne, humaine et accessible à tous.
              Prenez rendez-vous en quelques clics et gérez votre santé en toute simplicité.
            </p>
            <div className={styles.heroButtons}>
              <button className={styles.btnPrimary}>
                Prendre Rendez-vous <ArrowRight size={18} />
              </button>
              <Link to="/login" className={styles.btnSecondary}>
                Se Connecter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 1. PRÉSENTATION DU DOCTEUR */}
      <section id="doctor" className={styles.doctorSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Votre Médecin</h2>
            <div className={styles.titleUnderline}></div>
          </div>

          <div className={styles.doctorCard}>
            <div className={styles.doctorImageWrapper}>
              <img src="/ilyes.avif" alt="Dr. Ilyes Ezzajli" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div className={styles.doctorInfo}>
              <h3>Dr. Ilyes Ezzajli</h3>
              <p className={styles.doctorSpecialty}>Médecin Généraliste & Spécialiste en Santé Publique</p>

              <p className={styles.doctorBio}>
                Diplômé de la Faculté de Médecine de Paris avec plus de 15 ans d'expérience, le Dr. Ilyes Ezzajli s'engage à fournir des soins complets et personnalisés.
                Passionné par la médecine préventive et le suivi à long terme, il accorde une importance particulière à l'écoute et à la relation médecin-patient.
              </p>

              <div className={styles.doctorDetails}>
                <div className={styles.detailItem}>
                  <Clock className={styles.detailIcon} />
                  <div>
                    <strong>Expérience</strong>
                    <p>15+ Années de pratique</p>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <Users className={styles.detailIcon} />
                  <div>
                    <strong>Patients</strong>
                    <p>+5000 Patients suivis</p>
                  </div>
                </div>
              </div>

              <blockquote className={styles.doctorQuote}>
                "Chaque patient est unique. Mon objectif est de vous offrir le meilleur parcours de soin possible, dans un cadre bienveillant et professionnel."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES OFFERTS */}
      <section id="services" className={styles.servicesSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Nos Services Médicaux</h2>
            <p className={styles.sectionSubtitle}>Des soins complets pour toute la famille</p>
          </div>

          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIconWrapper}><Stethoscope /></div>
              <h4>Consultation Générale</h4>
              <p>Diagnostic complet, suivi régulier et prévention des maladies courantes.</p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIconWrapper}><Heart /></div>
              <h4>Cardiologie Préventive</h4>
              <p>Surveillance de la tension artérielle, ECG et conseils cardio-vasculaires.</p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIconWrapper}><Baby /></div>
              <h4>Pédiatrie</h4>
              <p>Suivi de croissance, vaccinations et soins pour les nourrissons et enfants.</p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIconWrapper}><Microscope /></div>
              <h4>Analyses & Biologie</h4>
              <p>Interprétation rapide des résultats d'analyses et prélèvements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. POURQUOI NOUS CHOISIR ? */}
      <section id="why-us" className={styles.whyChooseUsSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Pourquoi Nous Choisir ?</h2>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}><ShieldCheck /></div>
              <h3>Expertise Reconnue</h3>
              <p>Une équipe médicale hautement qualifiée et régulièrement formée.</p>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}><Clock /></div>
              <h3>Disponibilité Rapide</h3>
              <p>Prise de rendez-vous en ligne 24/7 et créneaux d'urgence.</p>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}><Users /></div>
              <h3>Approche Humaine</h3>
              <p>Un suivi personnalisé et une écoute attentive pour chaque patient.</p>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}><Stethoscope /></div>
              <h3>Équipement Moderne</h3>
              <p>Utilisation des dernières technologies pour des diagnostics précis.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TÉMOIGNAGES PATIENTS */}
      <section id="testimonials" className={styles.testimonialsSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Ce Que Disent Nos Patients</h2>
          </div>

          <div className={styles.testimonialsGrid}>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialHeader}>
                <div className={styles.patientAvatar}>TA</div>
                <div>
                  <h4>Tawfiq El Achehab</h4>
                  <div className={styles.stars}>
                    <Star size={16} fill="#fbbf24" stroke="#fbbf24" />
                    <Star size={16} fill="#fbbf24" stroke="#fbbf24" />
                    <Star size={16} fill="#fbbf24" stroke="#fbbf24" />
                    <Star size={16} fill="#fbbf24" stroke="#fbbf24" />
                    <Star size={16} fill="#fbbf24" stroke="#fbbf24" />
                  </div>
                </div>
              </div>
              <p className={styles.testimonialText}>
                "Le Dr. Ilyes Ezzajli est un médecin exceptionnel. Très à l'écoute et professionnel. Je recommande vivement ce cabinet pour toute la famille."
              </p>
            </div>

            <div className={styles.testimonialCard}>
              <div className={styles.testimonialHeader}>
                <div className={styles.patientAvatar} style={{ background: '#e0f2fe', color: '#0284c7' }}>SA</div>
                <div>
                  <h4>Saber Aziat</h4>
                  <div className={styles.stars}>
                    <Star size={16} fill="#fbbf24" stroke="#fbbf24" />
                    <Star size={16} fill="#fbbf24" stroke="#fbbf24" />
                    <Star size={16} fill="#fbbf24" stroke="#fbbf24" />
                    <Star size={16} fill="#fbbf24" stroke="#fbbf24" />
                    <Star size={16} fill="#fbbf24" stroke="#fbbf24" />
                  </div>
                </div>
              </div>
              <p className={styles.testimonialText}>
                "Cabinet très moderne et propre. Les secrétaires sont adorables et le Dr. Ezzajli prend le temps de bien expliquer les choses. Merci !"
              </p>
            </div>

            <div className={styles.testimonialCard}>
              <div className={styles.testimonialHeader}>
                <div className={styles.patientAvatar} style={{ background: '#fce7f3', color: '#db2777' }}>FA</div>
                <div>
                  <h4>Fatima Amal</h4>
                  <div className={styles.stars}>
                    <Star size={16} fill="#fbbf24" stroke="#fbbf24" />
                    <Star size={16} fill="#fbbf24" stroke="#fbbf24" />
                    <Star size={16} fill="#fbbf24" stroke="#fbbf24" />
                    <Star size={16} fill="#fbbf24" stroke="#fbbf24" />
                    <Star size={16} fill="#fbbf24" stroke="none" />
                  </div>
                </div>
              </div>
              <p className={styles.testimonialText}>
                "J'ai enfin trouvé un médecin de confiance avec le Dr. Ilyes Ezzajli. Suivi sérieux et rendez-vous rapides. Top."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. STRUCTURE DU CABINET */}
      <section id="structure" className={styles.structureSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Notre Cabinet</h2>
            <p className={styles.sectionSubtitle}>Un espace moderne dédié à votre bien-être</p>
          </div>

          <div className={styles.structureGrid}>
            <div className={styles.structureCard}>
              <img src="/photo1.avif" alt="Salle d'attente" className={styles.structureImg} />
              <div className={styles.structureInfo}>
                <h3>Accueil & Salle d'attente</h3>
                <p>Un espace chaleureux pour vous accueillir.</p>
              </div>
            </div>
            <div className={styles.structureCard}>
              <img src="/photo2.avif" alt="Salle d'examen" className={styles.structureImg} />
              <div className={styles.structureInfo}>
                <h3>Salles d'Examens</h3>
                <p>Équipées des dernières technologies.</p>
              </div>
            </div>
            <div className={styles.structureCard}>
              <img src="/photo3.avif" alt="Laboratoire" className={styles.structureImg} />
              <div className={styles.structureInfo}>
                <h3>Laboratoire d'Analyses</h3>
                <p>Pour vos prélèvements sur place.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className={styles.mainFooter}>
        <div className={styles.footerContainer}>
          <div className={styles.footerCol}>
            <div className={styles.footerLogo}>
              <Stethoscope size={24} />
              <h3>DencoferHealth</h3>
            </div>
            <p>Votre partenaire santé de confiance. Nous nous engageons à vous fournir des soins de qualité supérieure.</p>
            <div className={styles.contactInfo}>
              <p><MapPin size={16} /> 123 Avenue de la Santé, 75000 Paris</p>
              <p><Phone size={16} /> 01 23 45 67 89</p>
              <p><Mail size={16} /> contact@dencoferhealth.com</p>
            </div>
          </div>

          <div className={styles.footerCol}>
            <h3>Liens Rapides</h3>
            <ul className={styles.footerLinks}>
              <li><a href="#hero">Accueil</a></li>
              <li><a href="#doctor">Le Médecin</a></li>
              <li><a href="#services">Services</a></li>
              <li><Link to="/login">Connexion</Link></li>
              <li><Link to="/signup">Inscription</Link></li>
            </ul>
          </div>

          <div className={styles.footerCol}>
            <h3>Horaires</h3>
            <ul className={styles.hoursList}>
              <li><span>Lun - Ven:</span> <span>08:00 - 19:00</span></li>
              <li><span>Samedi:</span> <span>09:00 - 14:00</span></li>
              <li><span>Dimanche:</span> <span>Fermé</span></li>
            </ul>
          </div>

          <div className={styles.footerCol}>
            <h3>Localisation</h3>
            <div className={styles.mapContainer}>
              {/* Simulate Map */}
              <div className={styles.mapPlaceholder}>
                <MapPin size={32} />
                <span>Voir sur Google Maps</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} DencoferHealth - Dr. Ilyes Ezzajli. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Aceuil;
