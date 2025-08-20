import Styles from "./Nosotros.module.css";


const Nosotros = () => {
  return (
    <div className={Styles.nosotros}>
      <div className={Styles.info}>
        <div className={Styles.container1}>
          <h1>¡Somos un gran equipo!</h1>
          <p>
            Nos complace presentarles al equipo detrás de nuestra exitosa
            empresa de alquiler de juegos de feria. Somos un grupo de
            profesionales apasionados por crear experiencias inolvidables para
            todos nuestros clientes. Cada miembro de nuestro equipo aporta una
            combinación única de creatividad, entusiasmo y experiencia en la
            organización de eventos. Nos encanta ver a la gente disfrutar y
            divertirse con nuestros juegos y atracciones. Desde la instalación
            hasta la operación y el desmontaje, nuestro equipo se asegura de que
            cada detalle esté perfectamente cuidado. Estamos comprometidos con
            la seguridad, la calidad y la satisfacción del cliente. Ya sea una
            fiesta de cumpleaños, una feria escolar, o un evento corporativo,
            nuestro objetivo es hacer de su celebración un momento especial y
            memorable. Gracias por elegirnos para sus eventos. ¡Estamos
            emocionados de ser parte de sus momentos más felices y entretenidos!
          </p>
        </div>
        <div className={Styles.teamDiagram}>
          <img
            src="/assets/team.png"
            alt="Diagrama del equipo"
            className={Styles.diagramImage}
          />
        </div>
      </div>
    </div>
  );
};

export default Nosotros;

