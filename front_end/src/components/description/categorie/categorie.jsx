import React from 'react';
import styles from './categorie.module.css';
import Menu from '../menu/menu';
import Footer from '../footer/footer';

const Categorie = () => {
  const categories = [
    {
      id: 1,
      name: 'Cardiologie',
      description: 'Maladies du cœur et du système cardiovasculaire',
      doctorCount: 8,
      icon: '❤️',
      color: '#e91e63',
      bgColor: '#fce4ec'
    },
    {
      id: 2,
      name: 'Neurologie',
      description: 'Troubles du système nerveux et du cerveau',
      doctorCount: 5,
      icon: '🧠',
      color: '#9c27b0',
      bgColor: '#f3e5f5'
    },
    {
      id: 3,
      name: 'Orthopédie',
      description: 'Problèmes osseux, articulaires et musculaires',
      doctorCount: 6,
      icon: '🦴',
      color: '#ff9800',
      bgColor: '#fff3e0'
    },
    {
      id: 4,
      name: 'Ophtalmologie',
      description: 'Maladies des yeux et troubles de la vision',
      doctorCount: 4,
      icon: '👁️',
      color: '#00bcd4',
      bgColor: '#e0f7fa'
    },
    {
      id: 5,
      name: 'Pédiatrie',
      description: 'Soins médicaux pour les enfants et adolescents',
      doctorCount: 7,
      icon: '👶',
      color: '#4caf50',
      bgColor: '#e8f5e9'
    },
    {
      id: 6,
      name: 'Dermatologie',
      description: 'Maladies de la peau, des cheveux et des ongles',
      doctorCount: 5,
      icon: '💊',
      color: '#f06292',
      bgColor: '#fce4ec'
    },
    {
      id: 7,
      name: 'Médecine Générale',
      description: 'Consultation et soins de santé générale',
      doctorCount: 12,
      icon: '💉',
      color: '#2196f3',
      bgColor: '#e3f2fd'
    },
    {
      id: 8,
      name: 'Cardiologie',
      description: 'Services de diagnostic et de suivi cardiaque',
      doctorCount: 6,
      icon: '📊',
      color: '#3f51b5',
      bgColor: '#e8eaf6'
    }
  ];

  return (<>
    <Menu />
    <div className={styles.categorieContainer}>
      <div className={styles.categorieHeader}>
        <h1>Nos Spécialités Médicales</h1>
        <p>Découvrez toutes nos spécialités et trouvez le médecin adapté à vos besoins</p>
      </div>

      <div className={styles.categoriesGrid}>
        {categories.map((category) => (
          <div key={category.id} className={styles.categoryCard}>
            <div
              className={styles.categoryIcon}
              style={{
                backgroundColor: category.color,
              }}
            >
              <span className={styles.iconEmoji}>{category.icon}</span>
            </div>

            <div className={styles.categoryContent}>
              <h3 className={styles.categoryName}>{category.name}</h3>
              <p className={styles.categoryDescription}>{category.description}</p>

              <div className={styles.categoryFooter}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className={styles.doctorCount}>{category.doctorCount} médecins</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    < Footer />
  </>);
};

export default Categorie;