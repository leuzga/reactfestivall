import { makeStyles, tokens } from "@fluentui/react-components";
import { Image, Text, Link } from "@fluentui/react-components";
import { FaInstagram, FaFacebookSquare, FaLinkedinIn } from "react-icons/fa";
import LogoFestivall from "/FestivallSVG.svg";

const useStyles = makeStyles({
  footer: {
    backgroundColor: "#f5e9fc",
    padding: "90px",
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
    bottom: 0,
    width: "100%",
    "@media (max-width: 768px)": {
      padding: "20px",
    },
  },
  footerContent: {
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    gap: "60px",
    "@media (max-width: 768px)": {
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
    },
  },
  socialIcons: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    "@media (max-width: 768px)": {
      justifyContent: "center",
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "13px",
    "@media (max-width: 768px)": {
      alignItems: "center",
    },
  },
  reserved: {
    textAlign: "center",
    padding: "10px",
    backgroundColor: "#5B5FC7",
    "@media (max-width: 768px)": {
      padding: "5px",
      fontSize: "12px",
    },
  },
});

const Footer = () => {
  const styles = useStyles();

  return (
    <>
      <div className={styles.pageContainer}></div>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.content}>
            <Image
              src={LogoFestivall}
              alt="Logo de la aplicación Festivall"
              width={250}
            />
          </div>
          <div className={styles.content}>
            <Text style={{ color: '#5B5FC7' }} variant="large">
              <b>¡Contáctanos!</b>
            </Text>
            <Text style={{ color: '#5B5FC7' }}>¿Quieres formar parte de nuestro equipo?</Text>
            <Text style={{ color: '#5B5FC7' }}>No dudes en contactarnos.</Text>
          </div>
          <div className={styles.content}>
            <Text style={{ color: '#5B5FC7' }} variant="large">
              <b>Direccion</b>
            </Text>
            <Text>
              <Link
                href="https://www.google.com/maps/search/?api=1&query=Sherman+calle+Wallaby+42+Sydney"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sherman calle Wallaby 42 Sydney
              </Link>
            </Text>
          </div>
          <div className={styles.content}>
            <Text style={{ color: '#5B5FC7' }} variant="large">
              <b>Teléfono</b>
            </Text>
            <Text>
              <Link
                href="https://wa.me/571234567890"
                target="_blank"
                rel="noopener noreferrer"
              >
                +571234567890
              </Link>
            </Text>
          </div>
          <div className={styles.content}>
            <Text style={{ color: '#5B5FC7' }} variant="large">
              <b>Correo electrónico</b>
            </Text>
            <Text>
              <Link href="mailto:festivall.vivelaemocion@gmail.com">
                festivall.vivelaemocion@gmail.com
              </Link>
            </Text>
          </div>
          <div className={styles.content}>
            <Text style={{ color: '#5B5FC7' }} variant="large">
              <b>Síguenos</b>
            </Text>
            <div className={styles.socialIcons}>
              <Link
                href="https://www.instagram.com"
                target="_blank"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </Link>
              <Link
                href="https://www.facebook.com"
                target="_blank"
                aria-label="Facebook"
              >
                <FaFacebookSquare size={24} />
              </Link>
              <Link
                href="https://www.linkedin.com"
                target="_blank"
                aria-label="Facebook"
              >
                <FaLinkedinIn size={24} />
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <div className={styles.reserved}>
        <Text style={{ color: "#ffffff", fontSize: "12px" }}>
          © 2024 - Todos los derechos reservados G5
        </Text>
      </div>
    </>
  );
};

export default Footer;
