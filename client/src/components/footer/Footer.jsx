
import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Bijouterie Elégance. Tous droits réservés.</p>
        <p>Contact : contact@bijouterie-elegance.com /+216 98 555 999</p>
      </div>
    </footer>
  );
};

export default Footer;
