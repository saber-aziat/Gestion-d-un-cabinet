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

    const doctorInfo = {
        name: "Dr. Ilyes",
        specialty: "Médecin Généraliste & Spécialiste",
        email: "ilyes.doctor@dencofer.com",
        bio: "Diplômé de la Faculté de Médecine avec mention très bien, Dr. Ilyes possède plus de 15 ans d'expérience dans le diagnostic et le traitement des maladies chroniques et aiguës.",
        highlights: [
            { title: "Expertise", desc: "Spécialisé en médecine interne et chirurgie mineure." },
            { title: "Engagement", desc: "Écoute attentive et soins personnalisés à chaque consultation." },
            { title: "Horaires", desc: "Lundi au Samedi de 8h30 à 18h00." }
        ],
        image: "/ilyes.avif"
    };

    return (
        <div className={styles.container}>
            {/* Hero Section - Cabinet Info */}
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
                        <div className={styles.infoItem}>
                            <div className={styles.infoText}>
                                <span className={styles.infoLabel}>Téléphone :</span>
                                <span>{cabinetInfo.phone}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Doctor Info Section (Scroll) */}
            <section className={styles.floorsSection}>
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className={styles.sectionTitle}
                >
                    Notre Médecin Principal
                </motion.h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', maxWidth: '1000px', margin: '0 auto' }}>

                    {/* Main Doctor Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className={styles.floorCard}
                        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '2rem' }}
                    >
                        <div className={styles.floorImageWrapper} style={{ flex: '0 0 300px' }}>
                            <img
                                src={doctorInfo.image}
                                alt={doctorInfo.name}
                                className={styles.floorImage}
                                style={{ objectFit: 'cover', height: '100%' }}
                            />
                        </div>
                        <div className={styles.floorContent} style={{ flex: 1 }}>
                            <h3 className={styles.floorTitle || 'floorTitle'} style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{doctorInfo.name}</h3>
                            <span style={{ color: '#0f5f7f', fontWeight: 'bold', fontSize: '1.2rem', display: 'block', marginBottom: '1rem' }}>
                                {doctorInfo.specialty}
                            </span>
                            <p className={styles.floorDesc} style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                                {doctorInfo.bio}
                            </p>
                            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #eee' }}>
                                <span style={{ display: 'block', marginBottom: '0.5rem' }}><strong>Email:</strong> {doctorInfo.email}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Highlights Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {doctorInfo.highlights.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                style={{
                                    background: 'white',
                                    padding: '2rem',
                                    borderRadius: '16px',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem'
                                }}
                            >
                                <h4 style={{ color: '#0f5f7f', fontSize: '1.3rem', margin: 0 }}>{item.title}</h4>
                                <p style={{ color: '#666', lineHeight: '1.5', margin: 0 }}>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Description;
