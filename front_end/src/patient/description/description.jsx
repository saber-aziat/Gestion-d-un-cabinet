import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from './description.module.css';
import { motion } from 'framer-motion';


console.log(motion)

const Description = () => {
    const { user } = useContext(AuthContext);

    const cabinetInfo = {
        title: "DencoferHealth cabinet",
        address: "123 Avenue de la Santé, Marjane sekhna, Meknes",
        email: "dencoferHealth@gmail.com",
        phone: "+212 7 11 92 98 85"
    };

    const floors = [
        {
            level: 1,
            title: "Accueil & Administration",
            description: "Notre premier étage est dédié à l'accueil chaleureux de nos patients. Vous y trouverez les guichets d'inscription, la salle d'attente principale et les services administratifs pour vos dossiers médicaux.",
            image: "/photo1.avif"
        },
        {
            level: 2,
            title: "Médecine Générale & Pédiatrie",
            description: "Le deuxième étage regroupe nos médecins généralistes expérimentés et un service de pédiatrie spécialement aménagé pour le confort des enfants.",
            image: "/photo2.avif"
        },
        {
            level: 3,
            title: "Spécialités Chirurgicales",
            description: "Cet étage abrite nos consultations spécialisées en chirurgie, cardiologie et neurologie, avec des équipements de diagnostic de pointe.",
            image: "/photo3.avif"
        },
        {
            level: 4,
            title: "Laboratoire & Imagerie",
            description: "Equipé des dernières technologies, le quatrième étage est réservé aux analyses biologiques, radiographies, scanners et IRM.",
            image: "/photo3.avif"
        },
        {
            level: 5,
            title: "Bloc Opératoire & Récupération",
            description: "Le dernier étage assure une sécurité maximale avec nos blocs opératoires stériles et une unité de soins post-opératoires pour une récupération optimale.",
            image: "/photo4.avif"
        }
    ];

    return (
        <div className={styles.container}>
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={styles.heroSection}
            >
                <div className={styles.leftHero}>
                    <h1 className={styles.cabinetTitle}>{cabinetInfo.title}</h1>
                    <img
                        src="/logo2.png"
                        alt="Cabinet Logo"
                        className={styles.cabinetPhoto}
                        onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1538108176634-118e775f05b9?auto=format&fit=crop&q=80&w=800";
                        }}
                    />
                </div>

                <div className={styles.rightHero}>
                    <span className={styles.welcomeText}>Welcome back :</span>
                    <span className={styles.personName}>
                        {user?.role === 'doctor' ? 'Dr. ' : ''}
                        {user?.first_name ? `${user.first_name} ${user.last_name}` : user?.email || "Utilisateur"}
                    </span>

                    <div className={styles.infoCard}>
                        <div className={styles.infoItem}>
                            <div className={styles.infoText}>
                                <span className={styles.infoLabel}>Titre cabinet :</span>
                                <span>{cabinetInfo.title}</span>
                            </div>
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.infoText}>
                                <span className={styles.infoLabel}>Adresse :</span>
                                <span>{cabinetInfo.address}</span>
                            </div>
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.infoText}>
                                <span className={styles.infoLabel}>Email :</span>
                                <span>{cabinetInfo.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Floors Section */}
            <section className={styles.floorsSection}>
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className={styles.sectionTitle}
                >
                    Structure de notre Cabinet
                </motion.h2>

                {floors.map((floor, index) => (
                    <motion.div
                        key={floor.level}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={styles.floorCard}
                    >
                        <div className={styles.floorImageWrapper}>
                            <img src={floor.image} alt={floor.title} className={styles.floorImage} />
                        </div>
                        <div className={styles.floorContent}>
                            <span className={styles.floorNumber}>Etage {floor.level}</span>
                            <h3 className={floor.title}>{floor.title}</h3>
                            <p className={styles.floorDesc}>{floor.description}</p>
                        </div>
                    </motion.div>
                ))}
            </section>
        </div>
    );
};

export default Description;
