import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from './bilan.module.css';
import { FileText, Calendar, Activity, Clipboard, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const PatientBilan = () => {
    const { user } = useContext(AuthContext);
    const [bilans, setBilans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBilans = async () => {
            if (!user || !user.id) return;

            try {
                // Fetch bilans for the current logged-in patient
                const response = await fetch(`http://localhost:8000/api/bilan?patient=${user.id}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch bilans');
                }

                const data = await response.json();
                setBilans(data);
            } catch (err) {
                console.error("Error fetching bilans:", err);
                setError("Impossible de charger vos bilans pour le moment.");
            } finally {
                setLoading(false);
            }
        };

        fetchBilans();
    }, [user]);

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loadingState}>
                    <div className={styles.spinner}></div>
                    <p>Chargement de vos bilans...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.title}>
                    <div className={styles.iconWrapper}>
                        <FileText size={24} />
                    </div>
                    Mes Bilans de Santé
                </div>
            </header>

            {error ? (
                <div className={styles.emptyState}>
                    <p style={{ color: '#ef4444' }}>{error}</p>
                </div>
            ) : bilans.length === 0 ? (
                <div className={styles.emptyState}>
                    <div style={{ fontSize: '4rem', marginBottom: '20px', opacity: 0.2 }}>📋</div>
                    <h3>Aucun bilan disponible</h3>
                    <p>Votre médecin n'a pas encore ajouté de bilan à votre dossier.</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {bilans.map((bilan, index) => (
                        <motion.div
                            key={bilan.id || index}
                            className={styles.card}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className={styles.cardHeader}>
                                <div className={styles.cardTitle}>{bilan.titre}</div>
                                <div className={styles.dateBadge}>
                                    <Calendar size={12} />
                                    {bilan.date_consultation}
                                </div>
                            </div>

                            <div className={styles.section}>
                                <div className={styles.label}><Activity size={14} /> Maladie</div>
                                <div><span className={styles.disease}>{bilan.maladie}</span></div>
                            </div>

                            <div className={styles.section}>
                                <div className={styles.label}><Clipboard size={14} /> Symptômes</div>
                                <div className={styles.value}>{bilan.symptomes}</div>
                            </div>

                            <div className={styles.section}>
                                <div className={styles.label}><CheckCircle size={14} /> Résultat RDV</div>
                                <div className={styles.value}>{bilan.resultat_rdv}</div>
                            </div>

                            {bilan.recommandations && (
                                <div className={styles.recommendations}>
                                    <strong>Recommandations:</strong>
                                    <div style={{ marginTop: '4px' }}>{bilan.recommandations}</div>
                                </div>
                            )}

                            <div className={styles.footer}>
                                <div className={styles.doctorName}>
                                    Dr. {bilan.doctor_name || 'Ilyes ezzajli'}
                                </div>
                                {bilan.prochain_controle && (
                                    <div className={styles.nextControl}>
                                        <Clock size={14} />
                                        Prochain: {bilan.prochain_controle}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PatientBilan;
