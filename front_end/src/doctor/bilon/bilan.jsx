
import React, { useState, useEffect } from 'react';
import styles from './bilan.module.css';
import { Plus, User, Search, Calendar, Activity, Clipboard, CheckCircle, Clock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Bilan = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [bilans, setBilans] = useState([]);
    const [loadingPatients, setLoadingPatients] = useState(true);
    const [loadingBilans, setLoadingBilans] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        titre: '',
        date_consultation: '',
        maladie: '',
        symptomes: '',
        resultat_rdv: '',
        recommandations: '',
        prochain_controle: ''
    });

    // Fetch Patients
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/patient/');
                if (response.ok) {
                    const data = await response.json();
                    setPatients(data);
                } else {
                    console.error('Failed to fetch patients');
                }
            } catch (error) {
                console.error('Error fetching patients:', error);
            } finally {
                setLoadingPatients(false);
            }
        };

        fetchPatients();
    }, []);

    // Fetch Bilans for selected patient
    useEffect(() => {
        if (!selectedPatient) return;

        const fetchBilans = async () => {
            setLoadingBilans(true);
            try {
                
                const response = await fetch(`http://localhost:8000/api/bilan?patient=${selectedPatient.id}`);

                if (response.ok) {
                    const data = await response.json();
                    // Assuming data is an array of bilans
                    setBilans(data);
                } else {
                    console.error('Failed to fetch bilans');
                }
            } catch (error) {
                console.error('Error fetching bilans:', error);
            } finally {
                setLoadingBilans(false);
            }
        };

        fetchBilans();
    }, [selectedPatient]);

    const filteredPatients = patients.filter(patient =>
        (patient.patient_last_name && patient.patient_last_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (patient.patient_first_name && patient.patient_first_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handlePatientClick = (patient) => {
        setSelectedPatient(patient);
        setBilans([]); // Clear previous bilans while loading
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedPatient) return;

        const payload = {
            ...formData,
            patient: selectedPatient.id // Assuming relationship is ID based
        };
        
        
        try {
            const response = await fetch('http://localhost:8000/api/bilan/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                
            });
              
            console.log(payload);
            if (response.ok) {
                const newBilan = await response.json();
                setBilans(prev => [...prev, newBilan]);
                setShowModal(false);
                setFormData({
                    titre: '',
                    date_consultation: '',
                    maladie: '',
                    symptomes: '',
                    resultat_rdv: '',
                    recommandations: '',
                    prochain_controle: ''
                });
                console.log(formData)
            } else {
                console.error('Failed to save bilan');
            }
        } catch (error) {
            console.error('Error saving bilan:', error);
        }
    };

    return (
        <div className={styles.container}>
            {/* Sidebar with Patients */}
            <div className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h2 className={styles.sidebarTitle}>Vos Patients</h2>
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input
                            type="text"
                            className={styles.searchInput}
                            placeholder="Rechercher..."
                            style={{ paddingLeft: '35px' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.patientList}>
                    {loadingPatients ? (
                        <p style={{ textAlign: 'center', color: '#94a3b8' }}>Chargement...</p>
                    ) : (
                        filteredPatients.map(patient => (
                            <div
                                key={patient.id}
                                className={`${styles.patientItem} ${selectedPatient?.id === patient.id ? styles.active : ''}`}
                                onClick={() => handlePatientClick(patient)}
                            >
                                <div className={styles.patientAvatar}>
                                    {patient.patient_photo || patient.photo ? (
                                        <img
                                            src={(patient.patient_photo || patient.photo).startsWith('http') ? (patient.patient_photo || patient.photo) : `http://localhost:8000${patient.patient_photo || patient.photo}`}
                                            alt="Patient"
                                            className={styles.avatarImg}
                                        />
                                    ) : (
                                        <User size={16} />
                                    )}
                                </div>
                                <div>
                                    <div style={{ fontWeight: '600' }}>{patient.patient_last_name} {patient.patient_first_name}</div>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Patient</div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className={styles.mainContent}>
                <div className={styles.header}>
                    <h1 className={styles.pageTitle}>
                        {selectedPatient ? `Bilans de ${selectedPatient.patient_first_name} ${selectedPatient.patient_last_name}` : 'Gestion des Bilans'}
                    </h1>

                    {selectedPatient && (
                        <button className={styles.addButton} onClick={() => setShowModal(true)}>
                            <Plus size={20} />
                            Nouveau Bilan
                        </button>
                    )}
                </div>

                {!selectedPatient ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyStateIcon}>📋</div>
                        <h2>Sélectionnez un patient</h2>
                        <p>Choisissez un patient dans la liste pour voir ou ajouter des bilans.</p>
                    </div>
                ) : (
                    <div className={styles.bilanGrid}>
                        <AnimatePresence>
                            {loadingBilans ? (
                                <p>Chargement des bilans...</p>
                            ) : bilans.length === 0 ? (
                                <p>Aucun bilan trouvé pour ce patient.</p>
                            ) : (
                                bilans.map((bilan, index) => (
                                    <motion.div
                                        key={bilan.id || index}
                                        className={styles.bilanCard}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <div className={styles.cardHeader}>
                                            <div className={styles.cardTitle}>{bilan.titre}</div>
                                            <div className={styles.cardDate}>
                                                <Calendar size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                                                {bilan.date_consultation}
                                            </div>
                                        </div>

                                        <div className={styles.cardSection}>
                                            <div className={styles.cardLabel}><Activity size={12} style={{ marginRight: '4px' }} /> Maladie</div>
                                            <div className={`${styles.cardValue} ${styles.disease}`}>{bilan.maladie}</div>
                                        </div>

                                        <div className={styles.cardSection}>
                                            <div className={styles.cardLabel}><Clipboard size={12} style={{ marginRight: '4px' }} /> Symptômes</div>
                                            <div className={styles.cardValue}>{bilan.symptomes}</div>
                                        </div>

                                        <div className={styles.cardSection}>
                                            <div className={styles.cardLabel}><CheckCircle size={12} style={{ marginRight: '4px' }} /> Résultat RDV</div>
                                            <div className={styles.cardValue}>{bilan.resultat_rdv}</div>
                                        </div>

                                        {bilan.recommandations && (
                                            <div className={styles.recommendation}>
                                                <strong>Recommandations:</strong><br />
                                                {bilan.recommandations}
                                            </div>
                                        )}

                                        <div className={styles.cardSection} style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
                                            <div className={styles.cardLabel}><Clock size={12} style={{ marginRight: '4px' }} /> Prochain Contrôle</div>
                                            <div className={styles.cardValue} style={{ color: '#3b82f6', fontWeight: '600' }}>{bilan.prochain_controle}</div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className={styles.modalOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className={styles.modalContent}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                        >
                            <div className={styles.modalHeader}>
                                <h2 className={styles.modalTitle}>Nouveau Bilan</h2>
                                <button className={styles.closeButton} onClick={() => setShowModal(false)}>
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Titre du Bilan</label>
                                    <input
                                        type="text"
                                        className={styles.input}
                                        name="titre"
                                        value={formData.titre}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Ex: Consultation Cardio"
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Date de Consultation</label>
                                        <input
                                            type="date"
                                            className={styles.input}
                                            name="date_consultation"
                                            value={formData.date_consultation}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Prochain Contrôle</label>
                                        <input
                                            type="date"
                                            className={styles.input}
                                            name="prochain_controle"
                                            value={formData.prochain_controle}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Maladie Détectée</label>
                                    <input
                                        type="text"
                                        className={styles.input}
                                        name="maladie"
                                        value={formData.maladie}
                                        onChange={handleInputChange}
                                        placeholder="Ex: Hypertension"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Symptômes</label>
                                    <textarea
                                        className={styles.textarea}
                                        style={{ minHeight: '80px' }}
                                        name="symptomes"
                                        value={formData.symptomes}
                                        onChange={handleInputChange}
                                        placeholder="Liste des symptômes..."
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Résultat du RDV</label>
                                    <textarea
                                        className={styles.textarea}
                                        style={{ minHeight: '80px' }}
                                        name="resultat_rdv"
                                        value={formData.resultat_rdv}
                                        onChange={handleInputChange}
                                        placeholder="Conclusions..."
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Recommandations</label>
                                    <textarea
                                        className={styles.textarea}
                                        name="recommandations"
                                        value={formData.recommandations}
                                        onChange={handleInputChange}
                                        placeholder="Traitements, conseils..."
                                    />
                                </div>

                                <button type="submit" className={styles.submitButton}>
                                    Enregistrer le Bilan
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Bilan;
