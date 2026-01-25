import React from 'react';
import styles from './propos.module.css';
import Menu from '../menu/menu';
import Footer from '../footer/footer';

const Propos = () => {
  const stats = [
    {
      id: 1,
      value: '50+',
      label: 'Médecins spécialistes'
    },
    {
      id: 2,
      value: '10 000+',
      label: 'Patients satisfaits'
    },
    {
      id: 3,
      value: '15+',
      label: "Années d'expérience"
    },
    {
      id: 4,
      value: '98%',
      label: 'Taux de satisfaction'
    }
  ];

  const missionIcons = [
    {
      id: 1,
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <circle cx="30" cy="30" r="8" stroke="white" strokeWidth="3" />
          <circle cx="30" cy="30" r="15" stroke="white" strokeWidth="3" />
          <circle cx="30" cy="30" r="22" stroke="white" strokeWidth="3" />
        </svg>
      ),
      color: '#0f5f7f'
    },
    {
      id: 2,
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M30 45C30 45 15 35 15 22C15 16.4772 19.4772 12 25 12C27.5 12 29.5 13 30 14C30.5 13 32.5 12 35 12C40.5228 12 45 16.4772 45 22C45 35 30 45 30 45Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      color: '#f48fb1'
    },
    {
      id: 3,
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <circle cx="30" cy="30" r="18" stroke="white" strokeWidth="3" />
          <path d="M30 18V30L38 34" stroke="white" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
      color: '#0f5f7f'
    },
    {
      id: 4,
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <circle cx="23" cy="20" r="6" stroke="white" strokeWidth="3" />
          <circle cx="37" cy="20" r="6" stroke="white" strokeWidth="3" />
          <path d="M15 40C15 33.3726 20.3726 28 27 28H33C39.6274 28 45 33.3726 45 40V42H15V40Z" stroke="white" strokeWidth="3" />
        </svg>
      ),
      color: '#0f5f7f'
    }
  ];

  const values = [
    {
      id: 1,
      title: 'Bienveillance',
      description: 'Nous plaçons le bien-être de nos patients au cœur de chaque décision.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 28C16 28 6 20 6 11C6 7.68629 8.68629 5 12 5C13.5 5 14.5 5.5 16 7C17.5 5.5 18.5 5 20 5C23.3137 5 26 7.68629 26 11C26 20 16 28 16 28Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      color: '#0f5f7f'
    },
    {
      id: 2,
      title: 'Excellence',
      description: 'Nous nous engageons à fournir des soins médicaux de la plus haute qualité.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 4L18.5 11.5L26 14L18.5 16.5L16 24L13.5 16.5L6 14L13.5 11.5L16 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="16" cy="14" r="4" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      color: '#0f5f7f'
    },
    {
      id: 3,
      title: 'Accessibilité',
      description: 'Des soins de santé accessibles à tous, à tout moment.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="13" cy="10" r="4" stroke="currentColor" strokeWidth="2" />
          <circle cx="22" cy="10" r="4" stroke="currentColor" strokeWidth="2" />
          <path d="M7 24C7 19.5817 10.5817 16 15 16H19C23.4183 16 27 19.5817 27 24V26H7V24Z" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      color: '#0f5f7f'
    },
    {
      id: 4,
      title: 'Confiance',
      description: 'La confidentialité et la sécurité de vos données sont notre priorité.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 4L26 8V14C26 21 21 26 16 28C11 26 6 21 6 14V8L16 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M12 16L15 19L21 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      color: '#0f5f7f'
    }
  ];

  return (<><Menu />
    <div className={styles.proposContainer}>
      {/* Header Section */}
      <div className={styles.proposHeader}>
        <h1>À Propos de DencoferHealth</h1>
        <p>
          Depuis plus de 15 ans, nous accompagnons nos patients dans leur parcours de santé<br />
          avec dévouement et professionnalisme. Notre mission : rendre les soins médicaux<br />
          accessibles et personnalisés.
        </p>
      </div>

      {/* Statistics Section */}
      <div className={styles.statsSection}>
        {stats.map((stat) => (
          <div key={stat.id} className={styles.statCard}>
            <h2 className={styles.statValue}>{stat.value}</h2>
            <p className={styles.statLabel}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Mission Section */}
      <div className={styles.missionSection}>
        <div className={styles.missionContent}>
          <span className={styles.sectionBadge}>Notre Mission</span>
          <h2 className={styles.sectionTitle}>Réinventer l'accès aux soins médicaux</h2>
          <p className={styles.missionText}>
            Chez DencoferHealth, nous croyons que chaque personne mérite un accès simple
            et rapide à des soins de qualité. Notre plateforme combine l'expertise médicale
            traditionnelle avec les technologies modernes pour offrir une expérience patient
            exceptionnelle.
          </p>
          <p className={styles.missionText}>
            Notre équipe de médecins qualifiés est disponible pour vous accompagner dans
            toutes les étapes de votre parcours de santé, de la prévention au traitement.
          </p>
        </div>

        <div className={styles.missionGrid}>
          {missionIcons.map((item) => (
            <div
              key={item.id}
              className={styles.missionIcon}
              style={{ backgroundColor: item.color }}
            >
              {item.icon}
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className={styles.valuesSection}>
        <span className={styles.sectionBadge}>Nos Valeurs</span>
        <h2 className={styles.sectionTitleCenter}>Ce qui nous guide</h2>

        <div className={styles.valuesGrid}>
          {values.map((value) => (
            <div key={value.id} className={styles.valueCard}>
              <div
                className={styles.valueIcon}
                style={{ color: value.color }}
              >
                {value.icon}
              </div>
              <h3 className={styles.valueTitle}>{value.title}</h3>
              <p className={styles.valueDescription}>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </>);
};

export default Propos;