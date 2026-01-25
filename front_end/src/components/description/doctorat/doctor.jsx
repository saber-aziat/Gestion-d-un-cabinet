import React, { useState } from 'react';
import styles from './doctor.module.css';
import Menu from '../menu/menu';
import Footer from '../footer/footer';
import { useNavigate } from "react-router-dom";

const Doctor = () => {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const doctors = [
    {
      id: 1,
      name: 'Dr. Marie Dupont',
      specialty: 'Cardiologue',
      rating: 4.9,
      reviews: 157,
      experience: '15 ans',
      location: 'Paris 8ème',
      available: true,
      image: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
      id: 2,
      name: 'Dr. Jean Martin',
      specialty: 'Neurologue',
      rating: 4.8,
      reviews: 93,
      experience: '12 ans',
      location: 'Paris 16ème',
      available: true,
      image: 'https://randomuser.me/api/portraits/men/2.jpg'
    },
    {
      id: 3,
      name: 'Dr. Sophie Bernard',
      specialty: 'Dermatologue',
      rating: 4.9,
      reviews: 158,
      experience: '10 ans',
      location: 'Paris 6ème',
      available: false,
      image: 'https://randomuser.me/api/portraits/women/3.jpg'
    },
    {
      id: 4,
      name: 'Dr. Thomas Petit',
      specialty: 'Orthopédiste',
      rating: 4.7,
      reviews: 112,
      experience: '18 ans',
      location: 'Paris 12ème',
      available: true,
      image: 'https://randomuser.me/api/portraits/men/4.jpg'
    },
    {
      id: 5,
      name: 'Dr. Pierre Leroy',
      specialty: 'Pédiatre',
      rating: 4.9,
      reviews: 201,
      experience: '20 ans',
      location: 'Paris 7ème',
      available: true,
      image: 'https://randomuser.me/api/portraits/men/5.jpg'
    },
    {
      id: 6,
      name: 'Dr. Claire Moreau',
      specialty: 'Médecine Générale',
      rating: 4.6,
      reviews: 89,
      experience: '8 ans',
      location: 'Paris 15ème',
      available: true,
      image: 'https://randomuser.me/api/portraits/women/6.jpg'
    },
    {
      id: 7,
      name: 'Dr. Antoine Roux',
      specialty: 'Ophtalmologue',
      rating: 4.8,
      reviews: 134,
      experience: '14 ans',
      location: 'Paris 9ème',
      available: true,
      image: 'https://randomuser.me/api/portraits/men/7.jpg'
    },
    {
      id: 8,
      name: 'Dr. Isabelle Laurent',
      specialty: 'Cardiologue',
      rating: 4.9,
      reviews: 176,
      experience: '16 ans',
      location: 'Paris 17ème',
      available: false,
      image: 'https://randomuser.me/api/portraits/women/8.jpg'
    }
  ];

  const specialties = [
    'Tous',
    'Cardiologie',
    'Neurologie',
    'Dermatologie',
    'Pédiatrie',
    'Orthopédie',
    'Ophtalmologie',
    'Médecine Générale'
  ];

  const getSpecialtyFromFilter = (filter) => {
    const mapping = {
      'Cardiologie': 'Cardiologue',
      'Neurologie': 'Neurologue',
      'Dermatologie': 'Dermatologue',
      'Pédiatrie': 'Pédiatre',
      'Orthopédie': 'Orthopédiste',
      'Ophtalmologie': 'Ophtalmologue',
      'Médecine Générale': 'Médecine Générale'
    };
    return mapping[filter] || filter;
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesFilter = activeFilter === 'Tous' || doctor.specialty === getSpecialtyFromFilter(activeFilter);
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (<>
    <Menu />
    <div className={styles.doctorContainer}>
      <div className={styles.doctorHeader}>
        <h1>Nos Médecins</h1>
        <p>Trouvez le spécialiste qui vous convient parmi notre équipe de médecins qualifiés</p>
      </div>

      <div className={styles.searchFilterSection}>
        <div className={styles.searchBar}>
          <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher un médecin..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.filterButtons}>
          {specialties.map((specialty) => (
            <button
              key={specialty}
              className={`${styles.filterBtn} ${activeFilter === specialty ? styles.active : ''}`}
              onClick={() => setActiveFilter(specialty)}
            >
              {specialty}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.doctorsGrid}>
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className={styles.doctorCard}>
            <div className={styles.doctorImageWrapper}>
              <img src={doctor.image} alt={doctor.name} className={styles.doctorImage} />
            </div>

            <div className={styles.doctorInfo}>
              <h3 className={styles.doctorName}>{doctor.name}</h3>
              <p className={styles.doctorSpecialty}>{doctor.specialty}</p>

              <div className={styles.doctorRating}>
                <span className={styles.star}>⭐</span>
                <span className={styles.ratingValue}>{doctor.rating}</span>
                <span className={styles.reviewsCount}>({doctor.reviews} avis)</span>
              </div>

              <div className={styles.doctorDetails}>
                <span className={styles.detailItem}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" fill="currentColor" opacity="0.2" />
                    <path d="M8 4v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  {doctor.experience}
                </span>
                <span className={styles.detailItem}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 14s6-4 6-8a6 6 0 0 0-12 0c0 4 6 8 6 8z" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="8" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  {doctor.location}
                </span>
              </div>

              <button className={`${styles.appointmentBtn} ${!doctor.available ? styles.unavailable : ''}`} onClick={() => navigate("/login")}>
                {doctor.available ? 'Prendre rendez-vous' : 'Non disponible'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className={styles.noResults}>
          <p>Aucun médecin trouvé correspondant à votre recherche.</p>
        </div>
      )}
    </div>
    < Footer />
  </>);
};

export default Doctor;
