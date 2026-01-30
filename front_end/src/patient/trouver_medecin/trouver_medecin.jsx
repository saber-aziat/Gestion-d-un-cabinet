import React, { useState, useEffect , useContext} from 'react';
import styles from './trouver_medecin.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, MapPin, UserPlus, Check } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';


const TrouverMedecin = () => {

    const [categories, setCategories] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Tous');
    const [loading, setLoading] = useState(true);
    const [following, setFollowing] = useState({});
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchCategories();
        fetchDoctors();
    }, []);
  
    console.log(motion)
    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/categorie/');
            const data = await response.json();
            // Data might be an array of objects or strings depending on backend
            setCategories(['Tous', ...data.map(c => typeof c === 'string' ? c : c.name)]);
        } catch (error) {
            console.error('Error fetching categories:', error);
            // Fallback categories if API fails
            setCategories(['Tous', 'Cardiologie', 'Neurologie', 'Dermatologie', 'Pédiatrie', 'Orthopédie', 'Ophtalmologie', 'Médecine Générale']);
        }
    };

    const fetchDoctors = async (category = 'Tous') => {
        setLoading(true);
        try {
            const url = category === 'Tous'
                ? 'http://localhost:8000/api/doctors/'
                : `http://localhost:8000/api/doctors/?category=${encodeURIComponent(category)}`;

            const response = await fetch(url);
            const data = await response.json();
            setDoctors(data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
            setDoctors([]);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterClick = (category) => {
        setSelectedCategory(category);
        fetchDoctors(category);
    };

    const handleFollow = async (doctorId) => {
        try {
            const response = await fetch('http://localhost:8000/api/follow/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ doctor_id: doctorId  ,  patient_id: user.id}),
            });

            if (response.ok) {
                setFollowing(prev => ({ ...prev, [doctorId]: !prev[doctorId] }));
            }
        } catch (error) {
            console.error('Error following doctor:', error);
        }
    };

    return (
        <div className={styles.container}>
            {/* Filter Section */}
            <div className={styles.filterWrapper}>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`${styles.filterBtn} ${selectedCategory === cat ? styles.activeFilter : ''}`}
                        onClick={() => handleFilterClick(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Doctors Grid */}
            <AnimatePresence mode='wait'>
                {loading ? (
                    <div className={styles.loadingWrapper}>
                        <div className={styles.spinner}></div>
                        <p>Chargement des médecins...</p>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.doctorsGrid}
                    >
                        {doctors.map((doc) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                key={doc.id}
                                className={styles.card}
                            >
                                <div className={styles.imageSection}>
                                    <span className={styles.badge}>{doc.status || 'Disponible'}</span>
                                    <img
                                        src={doc.photo ? (doc.photo.startsWith('http') ? doc.photo : `http://localhost:8000${doc.photo}`) : 'https://via.placeholder.com/300x300'}
                                        alt={doc.name}
                                        className={styles.doctorImg}
                                    />
                                    <div className={styles.rating}>
                                        <Star size={14} className={styles.star} fill="currentColor" />
                                        
                                    </div>
                                </div>

                                <div className={styles.infoSection}>
                                    <h3 className={styles.doctorName}>Dr. {doc.first_name} {doc.last_name}</h3>
                                    <span className={styles.specialty}>{doc.categorie_name || doc.categorie_name}</span>

                                    <div className={styles.details}>
                                        <div className={styles.detailItem}>
                                            <Clock size={16} />
                                            <span>{doc.experience_years || '10'} ans d'expérience</span>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <MapPin size={16} />
                                            <span>{doc.education_level || 'DencoferHealth'} – {doc.education_city || 'Casablanca'}</span>
                                        </div>
                                    </div>

                                    <div className={styles.btnGroup}>
                                        <button
                                            className={`${styles.followBtn} ${following[doc.id] ? styles.followed : ''}`}
                                            onClick={() => handleFollow(doc.id)}
                                        >
                                            {following[doc.id] ? <Check size={18} /> : <UserPlus size={18} />}
                                            {following[doc.id] ? 'Suivi' : 'Suivre +'}
                                        </button>
                                        <button className={styles.appointmentBtn}>
                                            Prendre RDV
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {doctors.length === 0 && !loading && (
                <div className={styles.loadingWrapper}>
                    <p>Aucun médecin trouvé dans cette catégorie.</p>
                </div>
            )}
        </div>
    );
};

export default TrouverMedecin;
