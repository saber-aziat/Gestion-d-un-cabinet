import Menu from "../menu/menu";
import styles from "./acceuil.module.css";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/footer";

function Accueil() {
  const navigate = useNavigate();

  // Data for Specialties
  const specialities = [
    { title: "Cardiologie", count: "8 médecins", color: "#f43f5e", icon: "♥" },
    { title: "Neurologie", count: "5 médecins", color: "#8b5cf6", icon: "🧠" },
    { title: "Orthopédie", count: "6 médecins", color: "#f97316", icon: "🦴" },
    { title: "Ophtalmologie", count: "4 médecins", color: "#06b6d4", icon: "👁" },
    { title: "Médecine Générale", count: "12 médecins", color: "#10b981", icon: "🩺" },
    { title: "Pédiatrie", count: "7 médecins", color: "#ec4899", icon: "👶" },
    { title: "Dermatologie", count: "5 médecins", color: "#3b82f6", icon: "💊" },
    { title: "Pneumologie", count: "3 médecins", color: "#2563eb", icon: "🫁" },
  ];

  // Data for Doctors
  const doctors = [
  {
    name: "Dr. Ahmed El Amrani",
    specialty: "Cardiologue",
    exp: "15 ans d'expérience",
    location: "DencoferHealth – Meknès",
    rating: "4.9",
    reviews: "127",
    available: true,
    image: "https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg"
  },
  {
    name: "Dr. Youssef Benali",
    specialty: "Neurologue",
    exp: "12 ans d'expérience",
    location: "DencoferHealth – Meknès",
    rating: "4.8",
    reviews: "98",
    available: true,
    image: "https://img.freepik.com/free-photo/hospital-healthcare-workers-covid-19-treatment-concept-young-doctor-scrubs-making-daily-errands-clinic-listening-patient-symptoms-look-camera-professional-physician-cure-diseases_1258-57233.jpg"
  },
  {
    name: "Dr. Sara Alami",
    specialty: "Dermatologue",
    exp: "10 ans d'expérience",
    location: "DencoferHealth – Meknès",
    rating: "4.9",
    reviews: "156",
    available: false,
    image: "https://img.freepik.com/free-photo/portrait-smiling-medical-worker-girl-doctor-white-coat-stethoscope-pointing-fingers-le_1258-88166.jpg"
  },
  {
    name: "Dr. Omar Chraibi",
    specialty: "Pédiatre",
    exp: "8 ans d'expérience",
    location: "DencoferHealth – Meknès",
    rating: "4.7",
    reviews: "89",
    available: true,
    image: "https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg"
  },
];


  // Data for Features
  const features = [
  {
    title: "Réservation en ligne",
    description: "Prenez rendez-vous 24h/24 avec le médecin de votre choix en quelques clics.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    )
  },
  {
    title: "Messagerie sécurisée",
    description: "Échangez directement avec votre médecin via notre système de messagerie chiffrée.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
    )
  },
  {
    title: "Données protégées",
    description: "Vos informations médicales sont sécurisées et conformes aux normes RGPD.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    )
  },
  {
    title: "Suivi médical personnalisé",
    description: "Accédez à votre historique médical, vos rendez-vous et recommandations des médecins DencoferHealth.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h18v18H3z"></path>
        <path d="M9 12h6"></path>
        <path d="M12 9v6"></path>
      </svg>
    )
  }
];


  return (
    <>
    <Menu />
    <div className={styles.container}>

      {/* 1. Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.certifiedBadge}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            Cabinet médical certifié
          </div>
          <h1 className={styles.heroTitle}>
            Votre santé, notre <br />priorité
          </h1>
          <p className={styles.heroDescription}>
            DencoferHealth vous offre un accès simplifié à des soins médicaux de qualité.
            Consultez nos médecins spécialisés, prenez rendez-vous en ligne et bénéficiez
            d'un suivi personnalisé.
          </p>
          <div className={styles.heroButtons}>
            <button className={styles.primaryBtn} onClick={() => navigate("/login")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Prendre rendez-vous
            </button>
            <button className={styles.secondaryBtn}>En savoir plus</button>
          </div>

          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>5+</span>
              <span className={styles.statLabel}>Médecins</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>10k+</span>
              <span className={styles.statLabel}>Patients</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>15+</span>
              <span className={styles.statLabel}>Spécialités</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Specialties Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.pill}>Nos Spécialités</span>
          <h2 className={styles.sectionTitle}>
            Trouvez le spécialiste <span className={styles.accentText}>qu'il vous faut</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Découvrez nos différentes spécialités médicales et trouvez le médecin adapté à vos besoins de santé.
          </p>
        </div>

        <div className={styles.gridSystem}>
          {specialities.map((spec, index) => (
            <div key={index} className={styles.specialtyCard}>
              <div
                className={styles.iconBox}
                style={{ backgroundColor: spec.color }}
              >
                {/* Normally we'd use an SVG component here, using Emoji for quick setup as placeholder logic */}
                {spec.icon}
              </div>
              <h3 className={styles.specTitle}>{spec.title}</h3>
              <span className={styles.specCount}>{spec.count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Doctors Section */}
      <section className={`${styles.section} ${styles.doctorSection}`}>
        <div className={styles.headerRow}>
          <div>
            <span className={styles.pill}>Notre Équipe</span>
            <h2 className={styles.sectionTitle}>Médecins recommandés</h2>
          </div>
          <button className={styles.viewAllBtn} onClick={() => navigate("/login")}>Voir tous les médecins →</button>
        </div>

        <div className={styles.gridSystem}>
          {doctors.map((doctor, index) => (
            <div key={index} className={styles.doctorCard}>
              <div className={styles.imageContainer}>
                <img src={doctor.image} alt={doctor.name} className={styles.docImage} />
                <span className={doctor.available ? styles.badge : `${styles.badge} ${styles.badgeUnavailable}`}>
                  {doctor.available ? "Disponible" : "Indisponible"}
                </span>
                <div className={styles.ratingBadge}>
                  ⭐ <span className={styles.ratingCount}>{doctor.rating} ({doctor.reviews})</span>
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.docName}>{doctor.name}</h3>
                <span className={styles.docSpec}>{doctor.specialty}</span>

                <div className={styles.docInfo}>
                  <div className={styles.infoRow}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    {doctor.exp}
                  </div>
                  <div className={styles.infoRow}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    {doctor.location}
                  </div>
                </div>

                <button className={doctor.available ? styles.bookBtn : `${styles.bookBtn} ${styles.bookBtnDisabled}`}>
                  {doctor.available ? "Prendre RDV" : "Non disponible"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Features Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={`${styles.pill}`} style={{ backgroundColor: '#ffedd5', color: '#f97316' }}>Pourquoi nous choisir</span>
          <h2 className={styles.sectionTitle}>
            Une expérience médicale <span className={styles.accentText}>simplifiée</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            DencoferHealth modernise votre parcours de soins avec des outils innovants et une équipe médicale dévouée.
          </p>
        </div>

        <div className={styles.gridSystem}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>
                {feature.icon}
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDesc}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
    <Footer />
    </>
  );
}

export default Accueil;