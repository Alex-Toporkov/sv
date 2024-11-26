// src/components/Footer.js
import React from 'react';
import './css/Footer.css'; // Создайте этот файл для стилей, если необходимо

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <p>&copy; {new Date().getFullYear()} Светлана Губинская. Все права защищены.</p>
            </div>
        </footer>
    );
};

export default Footer;
