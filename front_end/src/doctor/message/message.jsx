import React, { useState, useEffect, useContext, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './message.module.css';
import { AuthContext } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Send,
    MoreVertical,
    MessageCircle,
    User,
    Phone,
    Video,
    Info,
    CheckCheck
} from 'lucide-react';

const Message = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const [conversations, setConversations] = useState([]);
    const [selectedConv, setSelectedConv] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [messagesLoading, setMessagesLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (user && user.id) {
            fetchConversations();
        }
    }, [user]);

    useEffect(() => {
        if (selectedConv) {
            fetchMessages(selectedConv.patient_id || selectedConv.user_id);
        }
    }, [selectedConv]);

    useEffect(scrollToBottom, [messages]);

    const fetchConversations = async () => {
        setLoading(true);
        try {
            // Appelle l'API pour récupérer les patients acceptés
            const followRes = await fetch(`http://localhost:8000/api/patient/`);
            const followedPatients = await followRes.json();

            // Transforme chaque patient en objet conversation
            const convs = followedPatients.map(p => ({
                id: p.id,
                patient_id: p.patient_id || p.user_id,
                name: p.patient_name || `${p.patient_first_name} ${p.patient_last_name}`,
                photo: p.patient_photo,
                last_message: "Cliquez pour discuter",
                time: ""
            }));

            setConversations(convs);

            // If we came from the patient page with a specific ID
            if (location.state?.selectedPatientId) {
                const targetConv = convs.find(c => (c.patient_id || c.user_id) === location.state.selectedPatientId);
                if (targetConv) setSelectedConv(targetConv);
            }
        } catch (error) {
            console.error('Error fetching conversations:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMessages = async (patientId) => {
        setMessagesLoading(true);
        try {
            // Récupère les messages entre le docteur et ce patient
            const response = await fetch(`http://localhost:8000/api/message/?with_user=${patientId}&doctor_id=${user.id}`);
            if (!response.ok) throw new Error('Failed to fetch messages');
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
            // Mock data if API is not fully ready
            setMessages([
                { id: 1, sender_id: patientId, text: "Bonjour Docteur, j'ai une question concernant mon traitement.", created_at: "10:30" },
                { id: 2, sender_id: user.id, text: "Bonjour, quel est votre souci exactement ?", created_at: "10:35" },
            ]);
        } finally {
            setMessagesLoading(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConv) return;

        const messageData = {
            receiver_id: selectedConv.patient_id || selectedConv.user_id,
            text: newMessage.trim(),
            sender_id: user.id
        };

        try {
            const response = await fetch('http://localhost:8000/api/message/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(messageData),
            });

            if (response.ok) {
                const savedMsg = await response.json();
                setMessages(prev => [...prev, savedMsg]);
                setNewMessage('');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            // Optimistic UI for demo if backend fails
            setMessages(prev => [...prev, { ...messageData, id: Date.now(), created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
            setNewMessage('');
        }
    };

    const filteredConversations = conversations.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            {/* Left Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h1 className={styles.sidebarTitle}>Messages</h1>
                    <div className={styles.searchWrapper}>
                        <Search className={styles.searchIcon} size={18} />
                        <input
                            type="text"
                            className={styles.searchInput}
                            placeholder="Rechercher une conversation..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.conversationList}>
                    {loading ? (
                        <div style={{ padding: '2rem', textAlign: 'center' }}>
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                                <MessageCircle size={32} color="#cbd5e1" />
                            </motion.div>
                        </div>
                    ) : filteredConversations.length > 0 ? (
                        filteredConversations.map((conv) => (
                            <div
                                key={conv.id}
                                className={`${styles.conversationItem} ${selectedConv?.id === conv.id ? styles.activeItem : ''}`}
                                onClick={() => setSelectedConv(conv)}
                            >
                                <div className={styles.avatarWrapper}>
                                    <img src={getPhotoUrl(conv.photo)} alt={conv.name} className={styles.avatar} />
                                    <div className={styles.onlineStatus}></div>
                                </div>
                                <div className={styles.convInfo}>
                                    <div className={styles.convHeader}>
                                        <span className={styles.convName}>{conv.name}</span>
                                        <span className={styles.convTime}>{conv.time}</span>
                                    </div>
                                    <div className={styles.lastMessage}>{conv.last_message}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.emptyChat} style={{ height: 'auto', padding: '3rem 1rem' }}>
                            <p>Aucun patient trouvé</p>
                        </div>
                    )}
                </div>
            </aside>

            {/* Chat Window */}
            <main className={styles.chatWindow}>
                {selectedConv ? (
                    <>
                        <header className={styles.chatHeader}>
                            <div className={styles.chatUserInfo}>
                                <img src={getPhotoUrl(selectedConv.photo)} alt={selectedConv.name} className={styles.headerAvatar} />
                                <div>
                                    <h2 className={styles.headerName}>{selectedConv.name}</h2>
                                    <span className={styles.headerStatus}>Disponible</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', color: '#64748b' }}>
                                <Phone size={20} style={{ cursor: 'pointer' }} />
                                <Video size={20} style={{ cursor: 'pointer' }} />
                                <Info size={20} style={{ cursor: 'pointer' }} />
                            </div>
                        </header>

                        <div className={styles.messagesArea}>
                            {messagesLoading && messages.length === 0 ? (
                                <div className={styles.emptyChat}>Chargement des messages...</div>
                            ) : (
                                messages.map((msg) => {
                                    const isMe = msg.sender_id === user.id;
                                    return (
                                        <div
                                            key={msg.id}
                                            className={`${styles.messageRow} ${isMe ? styles.myMessageRow : styles.patientMessageRow}`}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                                gap: '8px',
                                                flexDirection: isMe ? 'row-reverse' : 'row',
                                                justifyContent: 'flex-start' // Override CSS justify-content to match flow direction
                                            }}
                                        >
                                            <img
                                                src={getPhotoUrl(isMe ? user.photo : selectedConv.photo)}
                                                alt="Avatar"
                                                style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                                            />
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                className={`${styles.messageBubble} ${isMe ? styles.myBubble : styles.patientBubble}`}
                                            >
                                                {msg.content}
                                                <span className={styles.messageTime}>
                                                    {/* ✅ Formatter la date pour afficher seulement HH:MM */}
                                                    {new Date(msg.created_at).toLocaleTimeString('fr-FR', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                    {isMe && <CheckCheck size={12} style={{ display: 'inline', marginLeft: '4px' }} />}
                                                </span>
                                            </motion.div>
                                        </div>
                                    );
                                })
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <form className={styles.inputArea} onSubmit={handleSendMessage}>
                            <input
                                type="text"
                                className={styles.messageInput}
                                placeholder="Écrivez votre message ici..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button type="submit" className={styles.sendBtn} disabled={!newMessage.trim()}>
                                <Send size={20} />
                            </button>
                        </form>
                    </>
                ) : (
                    <div className={styles.emptyChat}>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <MessageCircle size={80} className={styles.emptyIcon} />
                            <h2>Votre Messagerie</h2>
                            <p>Sélectionnez un patient à gauche pour commencer à discuter.</p>
                        </motion.div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Message;