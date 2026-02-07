import React, { useState, useEffect, useContext } from 'react';
import styles from './rdv.module.css';
import { AuthContext } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const PatientRDV = () => {
    const { user } = useContext(AuthContext);
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [viewDate, setViewDate] = useState(new Date()); // For the calendar navigation
    const [rdvs, setRdvs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [pendingSlot, setPendingSlot] = useState(null);
    const [loading, setLoading] = useState(false);

    const hours = Array.from({ length: 8 }, (_, i) => i + 9); // 9 to 16
    const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

    useEffect(() => {
        if (user) {
            fetchDoctors();
        }
    }, [user]);

    useEffect(() => {
        if (selectedDoctor) {
            fetchRdvs();
        }
    }, [selectedDoctor]);

    const fetchDoctors = async () => {
        try {
            // Fetch doctors the patient follows
            const res = await fetch(`http://localhost:8000/api/follow/?patient_id=${user.id}&status=accepting`);
            const data = await res.json();
            setDoctors(data);
            if (data.length > 0) setSelectedDoctor(data[0]);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    const fetchRdvs = async () => {
        if (!selectedDoctor) return;
        try {
            const doctorId = selectedDoctor.doctor_id || selectedDoctor.user_id;
            const res = await fetch(`http://localhost:8000/api/rdv/?doctor_id=${doctorId}`);
            const data = await res.json();
            setRdvs(data);
        } catch (error) {
            console.error("Error fetching RDVs:", error);
        }
    };

    // Calendar logic
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => {
        let day = new Date(year, month, 1).getDay();
        return day === 0 ? 6 : day - 1; // Adjust for Monday start
    };

    const handlePrevMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    };

    const handleYearChange = (e) => {
        setViewDate(new Date(parseInt(e.target.value), viewDate.getMonth(), 1));
    };

    const handleMonthChange = (e) => {
        setViewDate(new Date(viewDate.getFullYear(), parseInt(e.target.value), 1));
    };

    // Week logic
    const getStartOfWeek = (date) => {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(d.setDate(diff));
    };

    const startOfWeek = getStartOfWeek(selectedDate);
    const weekDates = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(startOfWeek);
        d.setDate(d.getDate() + i);
        return d;
    });

    const isSlotBooked = (date, hour) => {
        const dateStr = date.toISOString().split('T')[0];
        const timeStr = `${hour.toString().padStart(2, '0')}:00`;
        return rdvs.find(r => r.rdv_date === dateStr && r.rdv_time.startsWith(timeStr));
    };

    const handleSlotClick = (date, hour) => {
        const booked = isSlotBooked(date, hour);
        if (booked) {
            if (booked.status === 'accepted') return; // Cannot click accepted slots
            if (booked.patient_id === user.id) return; // Already requested by me
        }

        setPendingSlot({ date, hour });
        setShowModal(true);
    };

    const confirmBooking = async () => {
        if (!pendingSlot || !selectedDoctor) return;
        setLoading(true);
        const doctorId = selectedDoctor.doctor_id || selectedDoctor.user_id;
        try {
            const res = await fetch('http://localhost:8000/api/rdv/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    patient_id: user.id,
                    doctor_id: doctorId,
                    rdv_date: pendingSlot.date.toISOString().split('T')[0],
                    rdv_time: `${pendingSlot.hour.toString().padStart(2, '0')}:00`,
                })
            });

            if (res.ok) {
                fetchRdvs();
                setShowModal(false);
            }
        } catch (error) {
            console.error("Error booking RDV:", error);
        } finally {
            setLoading(false);
        }
    };

    const getPhotoUrl = (photo) => {
        if (!photo) return 'https://via.placeholder.com/150';
        if (photo.startsWith('http')) return photo;
        return `http://localhost:8000${photo}`;
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}><CalendarIcon size={32} color="#3b82f6" /> Prendre Rendez-vous</h1>

            <div className={styles.layout}>
                {/* Left Side: Doctor selection & Calendar */}
                <aside>
                    <div className={styles.calendarCard}>
                        <div className={styles.doctorSelector}>
                            <label>Choisir un médecin</label>
                            <div className={styles.doctorList}>
                                {doctors.map(doc => (
                                    <div
                                        key={doc.id}
                                        className={`${styles.doctorItem} ${selectedDoctor?.id === doc.id ? styles.doctorItemActive : ''}`}
                                        onClick={() => setSelectedDoctor(doc)}
                                    >
                                        <img src={getPhotoUrl(doc.doctor_photo)} alt={doc.doctor_name} className={styles.doctorAvatar} />
                                        <span>{doc.doctor_name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.calendarHeader}>
                            <select className={styles.select} value={viewDate.getFullYear()} onChange={handleYearChange}>
                                {Array.from({ length: 10 }, (_, i) => 2024 + i).map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                            <select className={styles.select} value={viewDate.getMonth()} onChange={handleMonthChange}>
                                {['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'].map((m, i) => (
                                    <option key={m} value={i}>{m}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.dayGrid}>
                            {weekDays.map(d => <div key={d} className={styles.dayName}>{d}</div>)}
                            {Array.from({ length: getFirstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth()) }).map((_, i) => (
                                <div key={`empty-${i}`} className={`${styles.dayCell} ${styles.empty}`}></div>
                            ))}
                            {Array.from({ length: getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth()) }).map((_, i) => {
                                const day = i + 1;
                                const isSelected = selectedDate.getDate() === day && selectedDate.getMonth() === viewDate.getMonth() && selectedDate.getFullYear() === viewDate.getFullYear();
                                return (
                                    <div
                                        key={day}
                                        className={`${styles.dayCell} ${isSelected ? styles.activeDay : ''}`}
                                        onClick={() => setSelectedDate(new Date(viewDate.getFullYear(), viewDate.getMonth(), day))}
                                    >
                                        {day}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </aside>

                {/* Right Side: Weekly Schedule */}
                <main className={styles.scheduleCard}>
                    <div className={styles.weekGrid}>
                        <div className={styles.gridHeader}>Heure</div>
                        {weekDates.map((date, i) => (
                            <div key={i} className={styles.gridHeader}>
                                {weekDays[i]}<br />
                                <span style={{ fontSize: '0.7rem', fontWeight: 400 }}>{date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                            </div>
                        ))}

                        {hours.map(hour => (
                            <React.Fragment key={hour}>
                                <div className={styles.timeCol}>{hour}:00</div>
                                {weekDates.map((date, i) => {
                                    const booked = isSlotBooked(date, hour);
                                    let slotClass = styles.slot;
                                    let content = null;

                                    if (booked) {
                                        if (booked.status === 'accepted') {
                                            slotClass += ` ${styles.bookedSlot}`;
                                            content = <span className={styles.statusTag}>Occupé</span>;
                                        } else if (booked.patient_id === user.id) {
                                            slotClass += ` ${styles.pendingSlot}`;
                                            content = <span className={`${styles.statusTag} ${styles.statusPending}`}>En attente</span>;
                                        }
                                    }

                                    return (
                                        <div key={i} className={slotClass} onClick={() => handleSlotClick(date, hour)}>
                                            <div className={styles.slotContent}>
                                                {content}
                                            </div>
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        ))}
                    </div>
                </main>
            </div>

            {/* Confirmation Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className={styles.modalOverlay}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className={styles.modal}
                        >
                            <h2 className={styles.modalTitle}>Confirmer la réservation</h2>
                            <p>Voulez-vous réserver un créneau le <strong>{pendingSlot.date.toLocaleDateString('fr-FR')}</strong> à <strong>{pendingSlot.hour}:00</strong> avec <strong>{selectedDoctor.doctor_name}</strong> ?</p>
                            <div className={styles.modalActions}>
                                <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => setShowModal(false)}>Annuler</button>
                                <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={confirmBooking} disabled={loading}>
                                    {loading ? 'Chargement...' : 'Confirmer'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PatientRDV;
