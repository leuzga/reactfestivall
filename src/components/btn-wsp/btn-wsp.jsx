import React from "react";
import { FaWhatsapp } from 'react-icons/fa';
import styles from './btn-wsp.module.css';

const WhatsAppButton = () => {
    const handleClick = () => {
        const phoneNumber = '+543541386597'; // Reemplaza con el número de WhatsApp al que quieres enviar mensajes
        const message = encodeURIComponent('Hola,me gustaria consultarte sobre una reserva!');
        const url = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(url, '_blank');
    };

    return (
        <div className= {styles.whatsappBtn} onClick={handleClick} >
            <FaWhatsapp size={50} color="#fff" />
        </div>
    );
};

export default WhatsAppButton;