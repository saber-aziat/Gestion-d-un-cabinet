import React, { useState, useEffect, useContext, useRef } from 'react';
import styles from './email.module.css';
import { AuthContext } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send,
    User,
    Mail,
    Paperclip,
    Search,
    CheckCircle2,
    AlertCircle,
    X,
    FileText,
    Loader2
} from 'lucide-react';

const Email = () => {
    const { user } = useContext(AuthContext);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);
    const [isSending, setIsSending] = useState(false);
    const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: string }

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (user && user.id) {
            fetchPatients();
        }
    }, [user]);

    const fetchPatients = async () => {
        setLoading(true);
        try {
            // Using the same endpoint as message.jsx to get patients
            const response = await fetch(`http://localhost:8000/api/follow/?doctor_id=${user.id}&status=accepted`);
            if (!response.ok) throw new Error('Failed to fetch patients');
            const data = await response.json();

            // Map data to a consistent format if needed
            const formattedPatients = data.map(p => ({
                id: p.id,
                user_id: p.patient_id || p.user_id,
                nom: p.patient_last_name || p.last_name || "",
                prenom: p.patient_first_name || p.first_name || "",
                photo: p.patient_photo || p.photo,
                full_name: `${p.patient_first_name || p.first_name || ""} ${p.patient_last_name || p.last_name || ""}`
            }));

            setPatients(formattedPatients);
        } catch (error) {
            console.error('Error fetching patients:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSendEmail = async (e) => {
        e.preventDefault();

        if (!selectedPatient) {
            setStatus({ type: 'error', message: 'Veuillez sélectionner un destinataire.' });
            return;
        }

        if (!subject || !message) {
            setStatus({ type: 'error', message: 'Le titre et le contenu sont obligatoires.' });
            return;
        }

        setIsSending(true);
        setStatus(null);

        try {
            const formData = new FormData();
            formData.append('nom', selectedPatient.nom);
            formData.append('prenom', selectedPatient.prenom);
            formData.append('titre', subject);
            formData.append('contenu', message);
            if (file) {
                formData.append('fichier', file);
            }

            const response = await fetch('http://localhost:8000/api/email/', {
                method: 'POST',
                // Note: Don't set Content-Type header when using FormData
                body: formData,
            });

            if (response.ok) {
                setStatus({ type: 'success', message: 'Email envoyé avec succès !' });
                // Reset form
                setSubject('');
                setMessage('');
                setFile(null);
                setSelectedPatient(null);
                setSearchTerm('');
            } else {
                const errorData = await response.json().catch(() => ({}));
                setStatus({ type: 'error', message: errorData.message || 'Une erreur est survenue lors de l\'envoi.' });
            }
        } catch (error) {
            console.error('Error sending email:', error);
            setStatus({ type: 'error', message: 'Erreur de connexion au serveur.' });
        } finally {
            setIsSending(false);
        }
    };

    const filteredPatients = patients.filter(p =>
        p.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getPhotoUrl = (photo) => {
        if (photo) {
            if (photo.startsWith('http')) return photo;
            return `http://localhost:8000${photo}`;
        }
        return 'https://via.placeholder.com/150';
    };

    return (
        <div className={styles.container}>
            <motion.div
                className={styles.card}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <header className={styles.header}>
                    <h1>Envoyer un Email</h1>
                    <p>Communiquez avec vos patients en toute simplicité.</p>
                </header>

                <AnimatePresence>
                    {status && (
                        <motion.div
                            className={`${styles.statusMessage} ${styles[status.type]}`}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                            {status.message}
                            <button
                                className={styles.closeStatus}
                                onClick={() => setStatus(null)}
                                style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
                            >
                                <X size={16} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleSendEmail} style={{ display: 'flex', flex_direction: 'column', gap: '2rem' }}>

                    {/* Part 1: Select Person */}
                    <section className={styles.section}>
                        <div className={styles.sectionTitle}>
                            <span>1</span> Sélectionner un patient
                        </div>
                        <div className={styles.searchWrapper}>
                            <Search className={styles.searchIcon} size={20} />
                            <input
                                type="text"
                                className={styles.searchInput}
                                placeholder="Rechercher par nom..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className={styles.patientList}>
                            {loading ? (
                                <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '2rem' }}>
                                    <Loader2 className="animate-spin" size={32} color="#3b82f6" />
                                </div>
                            ) : filteredPatients.length > 0 ? (
                                filteredPatients.map(patient => (
                                    <div
                                        key={patient.id}
                                        className={`${styles.patientCard} ${selectedPatient?.id === patient.id ? styles.selectedPatient : ''}`}
                                        onClick={() => setSelectedPatient(patient)}
                                    >
                                        <img src={getPhotoUrl(patient.photo)} alt={patient.full_name} className={styles.avatar} />
                                        <div className={styles.patientInfo}>
                                            <span className={styles.patientName}>{patient.full_name}</span>
                                            {selectedPatient?.id === patient.id && (
                                                <span className={styles.selectedBadge}>Sélectionné</span>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '2rem', color: '#94a3b8' }}>
                                    Aucun patient trouvé.
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Part 2: Email Details */}
                    <section className={styles.section}>
                        <div className={styles.sectionTitle}>
                            <span>2</span> Détails de l'email
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Titre de l'email</label>
                            <input
                                type="text"
                                className={styles.textInput}
                                placeholder="Sujet de votre message"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Contenu</label>
                            <textarea
                                className={`${styles.textInput} ${styles.textarea}`}
                                placeholder="Écrivez votre message ici..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            ></textarea>
                        </div>
                    </section>

                    {/* Part 3: Attachment */}
                    <section className={styles.section}>
                        <div className={styles.sectionTitle}>
                            <span>3</span> Pièce jointe (Optionnel)
                        </div>
                        <div
                            className={`${styles.fileUpload} ${file ? styles.fileSelected : ''}`}
                            onClick={() => fileInputRef.current.click()}
                        >
                            <input
                                type="file"
                                hidden
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                            <div className={styles.fileUploadContent}>
                                {file ? (
                                    <>
                                        <FileText size={32} color="#10b981" />
                                        <span>{file.name}</span>
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                            style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px' }}
                                        >
                                            Supprimer
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Paperclip size={32} />
                                        <span>Cliquez pour joindre un fichier</span>
                                        <p style={{ fontSize: '0.85rem' }}>PDF, Images ou Documents</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Send Button */}
                    <div className={styles.buttonWrapper}>
                        <button
                            type="submit"
                            className={styles.sendButton}
                            disabled={isSending || !selectedPatient}
                        >
                            {isSending ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Envoi en cours...
                                </>
                            ) : (
                                <>
                                    <Send size={20} />
                                    Envoyer l'email
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>

            {/* Inline spinning animation for Loader2 since we might not have global styles for it */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
            ` }} />
        </div>
    );
};

export default Email;
