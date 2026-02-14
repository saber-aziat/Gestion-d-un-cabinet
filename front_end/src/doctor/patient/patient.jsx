import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './patient.module.css';
import { AuthContext } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Trash2, Users, Search, Loader2 } from 'lucide-react';

const Patient = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [actionLoading, setActionLoading] = useState({});

    useEffect(() => {
        if (user && user.id) {
            fetchPatients();
        }
    }, [user]);

    const fetchPatients = async () => {
        setLoading(true);
        try {
            // Standard approach: fetch followed patients for the doctor
            // We filter for 'accepting' status as these are the doctor's active patients
            const response = await fetch(`http://localhost:8000/api/patient/`);
            if (!response.ok) throw new Error('Failed to fetch patients');

            const data = await response.json();
            // Filter only accepted patients
            const acceptedPatients = data.filter(req => req.status === 'accepted');
            setPatients(acceptedPatients);
        } catch (error) {
            console.error('Error fetching patients:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (requestId) => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce patient de votre liste ?')) return;

        setActionLoading(prev => ({ ...prev, [requestId]: true }));
        try {
            const response = await fetch(`http://localhost:8000/api/patient/${requestId}/`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setPatients(prev => prev.filter(p => p.id !== requestId));
            } else {
                throw new Error('Delete failed');
            }
        } catch (error) {
            console.error('Error deleting patient:', error);
            alert('Erreur lors de la suppression du patient');
        } finally {
            setActionLoading(prev => ({ ...prev, [requestId]: false }));
        }
    };

    const handleSendMessage = (patientId) => {
        // Navigate to message page, potentially with patient ID as a query param or state
        navigate('/doctor/messages', { state: { selectedPatientId: patientId } });
    };

    const filteredPatients = patients.filter(p => {
        const fullName = `${p.patient_first_name || ''} ${p.patient_last_name || ''} ${p.patient_name || ''}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loadingState}>
                    <div className={styles.spinner}></div>
                    <p>Chargement de votre liste de patients...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h1 className={styles.title}>Mes Patients</h1>
                    <span className={styles.countBadge}>{filteredPatients.length}</span>
                </div>

                <div style={{ position: 'relative' }}>
                    <Search className={styles.searchIcon} size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                        type="text"
                        placeholder="Rechercher un patient..."
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ padding: '0.625rem 1rem 0.625rem 2.5rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', width: '250px' }}
                    />
                </div>
            </header>

            <AnimatePresence>
                {filteredPatients.length > 0 ? (
                    <motion.div
                        className={styles.grid}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {filteredPatients.map((patient) => (
                            <motion.div
                                key={patient.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={styles.card}
                            >
                                <div className={styles.avatarSection}>
                                    <img
                                        src={patient.patient_photo ? (patient.patient_photo.startsWith('http') ? patient.patient_photo : `http://localhost:8000${patient.patient_photo}`) : 'https://via.placeholder.com/150'}
                                        alt={patient.patient_name}
                                        className={styles.avatar}
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                                    />
                                </div>

                                <div className={styles.infoSection}>
                                    <h3 className={styles.patientName}>
                                        {patient.patient_name || `${patient.patient_first_name} ${patient.patient_last_name}`}
                                    </h3>
                                    <p style={{ margin: '4px 0 0', fontSize: '0.875rem', color: '#64748b' }}>
                                        Patient suivi
                                    </p>
                                </div>

                                <div className={styles.actionsSection}>
                                    <button
                                        className={styles.messageBtn}
                                        onClick={() => handleSendMessage(patient.patient_id || patient.user_id)}
                                    >
                                        <MessageSquare size={18} />
                                        Message
                                    </button>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => handleDelete(patient.id)}
                                        disabled={actionLoading[patient.id]}
                                    >
                                        {actionLoading[patient.id] ? (
                                            <Loader2 size={18} className={styles.spinner} style={{ width: '18px', height: '18px', margin: 0 }} />
                                        ) : (
                                            <Trash2 size={18} />
                                        )}
                                        Supprimer
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        className={styles.emptyState}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Users size={48} className={styles.emptyIcon} />
                        <h3>Aucun patient trouvé</h3>
                        <p>{searchTerm ? "Aucun patient ne correspond à votre recherche." : "Vous n'avez pas encore de patients dans votre liste."}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Patient;
