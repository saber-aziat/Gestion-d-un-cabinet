import React, { useState, useEffect, useContext } from 'react';
import styles from './historique.module.css';
import { AuthContext } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Clock, User, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Historiquee = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.id) {
            fetchRequests();
        }
    }, [user]);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            // Fetching follow requests for the patient
            // We use user_id=${user.id} assuming that's the patient filter
            const response = await fetch(`http://localhost:8000/api/follow/?user_id=${user.id}`);
            if (!response.ok) throw new Error('Failed to fetch requests');

            const data = await response.json();
            setRequests(data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusMessage = (request) => {
        const doctorName = request.doctor_name || `${request.doctor_first_name} ${request.doctor_last_name}`;

        switch (request.status) {
            case 'accepting':
            case 'accepted':
                return (
                    <div className={styles.infoSection}>
                        <p className={styles.requestText}>
                            Le Docteur <span className={styles.doctorName}>{doctorName}</span> a accepté votre demande de suivi.
                        </p>
                    </div>
                );
            case 'refuse':
            case 'refused':
                return (
                    <div className={styles.infoSection}>
                        <p className={styles.requestText}>
                            Le Docteur <span className={styles.doctorName}>{doctorName}</span> a refusé votre demande de suivi.
                        </p>
                    </div>
                );
            case 'pending':
            default:
                return (
                    <div className={styles.infoSection}>
                        <p className={styles.requestText}>
                            Votre demande de suivi auprès du Docteur <span className={styles.doctorName}>{doctorName}</span> est en attente.
                        </p>
                    </div>
                );
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'accepting':
            case 'accepted':
                return (
                    <div className={styles.acceptedBadge}>
                        <CheckCircle2 size={16} />
                        Acceptée
                    </div>
                );
            case 'refuse':
            case 'refused':
                return (
                    <div className={styles.refusedBadge}>
                        <XCircle size={16} />
                        Refusée
                    </div>
                );
            case 'pending':
            default:
                return (
                    <div className={styles.pendingBadge}>
                        <Clock size={16} />
                        En attente
                    </div>
                );
        }
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loadingState}>
                    <div className={styles.spinner}></div>
                    <p>Chargement de votre historique...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h1 className={styles.title}>Mon Historique de Demandes</h1>
                    <span className={styles.countBadge}>{requests.length}</span>
                </div>
            </header>

            <AnimatePresence>
                {requests.length > 0 ? (
                    <motion.div
                        className={styles.grid}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {requests.map((request) => (
                            <motion.div
                                key={request.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={styles.card}
                            >
                                <div className={styles.avatarSection}>
                                    <img
                                        src={request.doctor_photo ? (request.doctor_photo.startsWith('http') ? request.doctor_photo : `http://localhost:8000${request.doctor_photo}`) : 'https://via.placeholder.com/150'}
                                        alt={request.doctor_name}
                                        className={styles.avatar}
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                                    />
                                </div>

                                {getStatusMessage(request)}

                                <div className={styles.actionsSection}>
                                    {getStatusBadge(request.status)}
                                    {(request.status === 'accepting' || request.status === 'accepted') && (
                                        <Link
                                            to={`/patient/messages?doctor_id=${request.doctor_id}&doctor_name=${request.doctor_name}`}
                                            className={styles.messageBtn}
                                        >
                                            <MessageSquare size={18} />
                                            Message
                                        </Link>
                                    )}
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
                        <AlertCircle size={48} className={styles.emptyIcon} />
                        <h3>Aucune demande trouvée</h3>
                        <p>Vous n'avez pas encore envoyé de demandes de suivi à des médecins.</p>
                        <Link to="/patient/trouver-medecin" style={{
                            marginTop: '1rem',
                            display: 'inline-block',
                            color: '#3b82f6',
                            textDecoration: 'underline'
                        }}>
                            Trouver un médecin
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Historiquee;
