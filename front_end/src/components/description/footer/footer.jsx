import React from 'react';
import styles from './footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                {/* Company Info Section */}
                <div className={styles.footerSection}>
                    <div className={styles.logoSection}>
                        <div className={styles.logoIcon}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <path d="M16 28C16 28 6 20 6 11C6 7.68629 8.68629 5 12 5C13.5 5 14.5 5.5 16 7C17.5 5.5 18.5 5 20 5C23.3137 5 26 7.68629 26 11C26 20 16 28 16 28Z" fill="white" />
                            </svg>
                        </div>
                        <div>
                            <h3 className={styles.companyName}>DencoferHealth</h3>
                            <p className={styles.companyTagline}>Cabinet Médical</p>
                        </div>
                    </div>
                    <p className={styles.companyDescription}>
                        Votre santé est notre priorité. Notre équipe de médecins expérimentés
                        vous accompagne pour tous vos besoins de santé.
                    </p>
                    <div className={styles.socialLinks}>
                        <a href="#" className={styles.socialLink} aria-label="Facebook">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" />
                            </svg>
                        </a>
                        <a href="#" className={styles.socialLink} aria-label="Twitter">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                        </a>
                        <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M18.5 0h-17A1.5 1.5 0 000 1.5v17A1.5 1.5 0 001.5 20h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0018.5 0zM6 17H3V8h3v9zM4.5 6.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM17 17h-3v-4.5c0-1.12-.88-1.5-1.5-1.5s-1.5.38-1.5 1.5V17H8V8h3v1.5c.5-.77 1.5-1.5 2.5-1.5 2 0 3.5 1.5 3.5 3.5V17z" />
                            </svg>
                        </a>
                        <a href="#" className={styles.socialLink} aria-label="Instagram">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 0C7.284 0 6.944.012 5.877.06 4.813.11 4.086.278 3.45.525a4.893 4.893 0 00-1.772 1.153A4.904 4.904 0 00.525 3.45C.278 4.086.109 4.813.06 5.877.012 6.944 0 7.284 0 10s.012 3.056.06 4.123c.05 1.064.218 1.791.465 2.427a4.903 4.903 0 001.153 1.772 4.902 4.902 0 001.772 1.153c.636.247 1.363.416 2.427.465 1.067.048 1.407.06 4.123.06s3.056-.012 4.123-.06c1.064-.049 1.791-.218 2.427-.465a4.902 4.902 0 001.772-1.153 4.902 4.902 0 001.153-1.772c.247-.636.416-1.363.465-2.427.048-1.067.06-1.407.06-4.123s-.012-3.056-.06-4.123c-.049-1.064-.218-1.791-.465-2.427a4.902 4.902 0 00-1.153-1.772A4.893 4.893 0 0016.55.525C15.914.278 15.187.109 14.123.06 13.056.012 12.716 0 10 0zm0 1.802c2.67 0 2.986.01 4.04.058.975.045 1.504.207 1.857.344.466.181.8.398 1.15.748.35.35.566.684.748 1.15.137.353.3.882.344 1.857.048 1.054.058 1.37.058 4.04 0 2.671-.01 2.987-.058 4.041-.045.975-.207 1.504-.344 1.857a3.097 3.097 0 01-.748 1.15c-.35.35-.684.566-1.15.748-.353.137-.882.3-1.857.344-1.054.048-1.37.058-4.04.058-2.671 0-2.987-.01-4.041-.058-.975-.045-1.504-.207-1.857-.344a3.098 3.098 0 01-1.15-.748 3.098 3.098 0 01-.748-1.15c-.137-.353-.3-.882-.344-1.857-.048-1.054-.058-1.37-.058-4.04 0-2.671.01-2.987.058-4.041.045-.975.207-1.504.344-1.857.181-.466.398-.8.748-1.15.35-.35.684-.566 1.15-.748.353-.137.882-.3 1.857-.344 1.054-.048 1.37-.058 4.04-.058z" />
                                <path d="M10 13.333a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm0-8.468a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm5.338-.208a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Quick Links Section */}
                <div className={styles.footerSection}>
                    <h4 className={styles.sectionTitle}>Liens Rapides</h4>
                    <ul className={styles.linkList}>
                        <li><a href="#accueil" className={styles.footerLink}>Accueil</a></li>
                        <li><a href="#medecins" className={styles.footerLink}>Nos Médecins</a></li>
                        <li><a href="#specialites" className={styles.footerLink}>Spécialités</a></li>
                        <li><a href="#rdv" className={styles.footerLink}>Prendre RDV</a></li>
                        <li><a href="#apropos" className={styles.footerLink}>À Propos</a></li>
                    </ul>
                </div>

                {/* Services Section */}
                <div className={styles.footerSection}>
                    <h4 className={styles.sectionTitle}>Nos Services</h4>
                    <ul className={styles.linkList}>
                        <li><a href="#consultation" className={styles.footerLink}>Consultation en ligne</a></li>
                        <li><a href="#telemedecine" className={styles.footerLink}>Télémédecine</a></li>
                        <li><a href="#suivi" className={styles.footerLink}>Suivi médical</a></li>
                        <li><a href="#ordonnances" className={styles.footerLink}>Ordonnances</a></li>
                        <li><a href="#messagerie" className={styles.footerLink}>Messagerie sécurisée</a></li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div className={styles.footerSection}>
                    <h4 className={styles.sectionTitle}>Contact</h4>
                    <ul className={styles.contactList}>
                        <li className={styles.contactItem}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={styles.contactIcon}>
                                <path d="M10 18s8-5.333 8-10.667A8 8 0 002 7.333C2 12.667 10 18 10 18z" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="10" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                            <span>Avenue Margane Sekhna<br />Meknès, Morocco</span>
                        </li>
                        <li className={styles.contactItem}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={styles.contactIcon}>
                                <path d="M18 14v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 01.08 1.18 2 2 0 012.08 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.87a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0118 14z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>+212 612345678</span>
                        </li>
                        <li className={styles.contactItem}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={styles.contactIcon}>
                                <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M2 6l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>DencoferHealth@gmail.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className={styles.footerBottom}>
                <p className={styles.copyright}>
                    © 2026 DencoferHealth. Tous droits réservés.
                </p>
                <div className={styles.bottomLinks}>
                    <a href="#politique" className={styles.bottomLink}>Politique de confidentialité</a>
                    <a href="#conditions" className={styles.bottomLink}>Conditions d'utilisation</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
