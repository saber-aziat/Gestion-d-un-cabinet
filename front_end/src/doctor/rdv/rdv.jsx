import React, { useState, useEffect, useContext } from 'react';
import styles from './rdv.module.css';
import { AuthContext } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';

const DoctorRDV = () => {
    const { user } = useContext(AuthContext);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [viewDate, setViewDate] = useState(new Date());
    const [rdvs, setRdvs] = useState([]);
    const [loading, setLoading] = useState(false);

    const hours = Array.from({ length: 8 }, (_, i) => i + 9); // 9 to 16
    const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

   
    const fetchRdvs = async () => {
        try {
            const res = await fetch(`http://localhost:8000/api/rdv/?doctor_id=${user.id}`);
            const data = await res.json();
            setRdvs(data);
        } catch (error) {
            console.error("Error fetching RDVs:", error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchRdvs();
        }
    }, [user, selectedDate]);

    const handleAction = async (rdvId, status) => {
        try {
            const res = await fetch(`http://localhost:8000/api/rdv/${rdvId}/`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            if (res.ok) {
                fetchRdvs();
            }
        } catch (error) {
            console.error(`Error updating RDV status to ${status}:`, error);
        }
    };

    // Calendar logic
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => {
        let day = new Date(year, month, 1).getDay();
        return day === 0 ? 6 : day - 1;
    };

    const handleYearChange = (e) => setViewDate(new Date(parseInt(e.target.value), viewDate.getMonth(), 1));
    const handleMonthChange = (e) => setViewDate(new Date(viewDate.getFullYear(), parseInt(e.target.value), 1));

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

    const getSlotRdv = (date, hour) => {
        const dateStr = date.toISOString().split('T')[0];
        const timeStr = `${hour.toString().padStart(2, '0')}:00`;
        return rdvs.find(r =>
        r.appointment_date === dateStr &&
        r.appointment_time.startsWith(timeStr)
    );
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}><CalendarIcon size={32} color="#3b82f6" /> Gestion des Rendez-vous</h1>

            <div className={styles.layout}>
                <aside>
                    <div className={styles.calendarCard}>
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
                                    const rdv = getSlotRdv(date, hour);
                                    let slotClass = styles.slot;
                                    let content = null;

                                    if (rdv) {
                                        if (rdv.status === 'accepted') {
                                            slotClass += ` ${styles.acceptedSlot}`;
                                            content = (
                                                <>
                                                    <span style={{ fontWeight: 600 }}>{rdv.patient_name}</span>
                                                    <span className={`${styles.statusTag} ${styles.statusAccepted}`}>Accepté</span>
                                                </>
                                            );
                                        } else if (rdv.status === 'pending') {
                                            slotClass += ` ${styles.pendingSlot}`;
                                            content = (
                                                <>
                                                    <span style={{ fontWeight: 600, fontSize: '0.7rem' }}>{rdv.patient_name}</span>
                                                    <div className={styles.actionBtns}>
                                                        <button className={`${styles.miniBtn} ${styles.acceptBtn}`} onClick={() => handleAction(rdv.id, 'accepted')} title="Accepter"><Check size={14} /></button>
                                                        <button className={`${styles.miniBtn} ${styles.refuseBtn}`} onClick={() => handleAction(rdv.id, 'rejected')} title="rejected"><X size={14} /></button>
                                                    </div>
                                                </>
                                            );
                                        }
                                    }

                                    return (
                                        <div key={i} className={slotClass}>
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
        </div>
    );
};

export default DoctorRDV;
