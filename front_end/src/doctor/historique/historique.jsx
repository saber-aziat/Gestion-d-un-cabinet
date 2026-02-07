import React, { useState, useEffect, useContext } from 'react';
import styles from './historiue.module.css';
import { AuthContext } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Clock, User, AlertCircle } from 'lucide-react';

const Historique = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState({});

    useEffect(() => {
        if (user && user.id) {
            fetchRequests();
        }
    }, [user]);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/api/follows/?doctor_id=${user.id}`);
            if (!response.ok) throw new Error('Failed to fetch requests');

            const data = await response.json();
            // Filter only pending requests
            const pendingRequests = data.filter(req => req.status === 'pending');
            setRequests(pendingRequests);
        } catch (error) {
            console.error('Error fetching requests:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (requestId, patientId, status) => {
        setActionLoading(prev => ({ ...prev, [requestId]: true }));
        try {
            // The user asked to change status to 'accepting' or 'refuse'
            const response = await fetch(`http://localhost:8000/api/follows/${requestId}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: status,
                    user_id: patientId // Included as requested "et user_id de patient"
                }),
            });

            if (response.ok) {
                // Remove the handled request from the list
                setRequests(prev => prev.filter(req => req.id !== requestId));
            } else {
                throw new Error('Action failed');
            }
        } catch (error) {
            console.error(`Error performing ${status} action:`, error);
            alert(`Erreur lors de l'opération ${status}`);
        } finally {
            setActionLoading(prev => ({ ...prev, [requestId]: false }));
        }
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loadingState}>
                    <div className={styles.spinner}></div>
                    <p>Chargement des demandes...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h1 className={styles.title}>Demandes en attente</h1>
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
                                        src={request.patient_photo ? (request.patient_photo.startsWith('http') ? request.patient_photo : `http://localhost:8000${request.patient_photo}`) : 'https://via.placeholder.com/150'}
                                        alt={request.patient_name}
                                        className={styles.avatar}
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                                    />
                                </div>

                                <div className={styles.infoSection}>
                                    <p className={styles.requestText}>
                                        <span className={styles.patientName}>
                                            {request.patient_name || `${request.patient_first_name} ${request.patient_last_name}`}
                                        </span>
                                        {' '}vous a demandé de suivre leur malade
                                    </p>
                                </div>

                                <div className={styles.actionsSection}>
                                    <button
                                        className={styles.acceptBtn}
                                        onClick={() => handleAction(request.id, request.patient_id || request.user_id, 'accepting')}
                                        disabled={actionLoading[request.id]}
                                    >
                                        {actionLoading[request.id] ? (
                                            <div className={styles.spinner} style={{ width: '16px', height: '16px', margin: 0, borderWidth: '2px' }}></div>
                                        ) : (
                                            <Check size={18} />
                                        )}
                                        Accepter
                                    </button>
                                    <button
                                        className={styles.refuseBtn}
                                        onClick={() => handleAction(request.id, request.patient_id || request.user_id, 'refuse')}
                                        disabled={actionLoading[request.id]}
                                    >
                                        <X size={18} />
                                        Refuser
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
                        <Clock size={48} className={styles.emptyIcon} />
                        <h3>Aucune demande en attente</h3>
                        <p>Toutes les demandes ont été traitées ou aucune n'est arrivée pour le moment.</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Historique;
