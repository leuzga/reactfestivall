import * as React from "react";
import {
  useId,
  Button,
  Toaster,
  useToastController,
  Toast,
  ToastTitle,
  ToastBody,
} from "@fluentui/react-components";
import {
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Input,
  Label,
  makeStyles,
} from "@fluentui/react-components";
import emailjs from "emailjs-com";

const useStyles = makeStyles({
  overlay: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "20px",
    boxSizing: "border-box",
    overflow: "auto",
  },
  dialog: {
    maxWidth: "600px",
    width: "100%",
    height: "auto",
    maxHeight: "90%",
    overflow: "hidden",
    boxSizing: "border-box",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    padding: "35px",
    boxShadow: "0 1px 1px rgba(0, 0, 0, 0.1), 0 1px 12px rgba(0, 0, 0, 0.1)",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    rowGap: "10px",
    width: "100%",
    boxSizing: "border-box",
  },
});

const Contacto = () => {
  const styles = useStyles();
  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);

  const notifySuccess = () =>
    dispatchToast(
      <Toast appearance="primary">
        <ToastTitle style={{ color: '#5B5FC7' }}>Email enviado</ToastTitle>
        <ToastBody style={{ color: '#5B5FC7' }}>
          ¡Tu mensaje se ha enviado correctamente!
        </ToastBody>
      </Toast>,
      { intent: "success" }
    );

  const notifyError = () =>
    dispatchToast(
      <Toast appearance="primary">
        <ToastTitle>Error</ToastTitle>
        <ToastBody>
          Ocurrió un error al enviar el mensaje. Por favor, inténtalo de nuevo
          más tarde.
        </ToastBody>
      </Toast>,
      { intent: "error" }
    );

  const formRef = React.useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_di6xjep",
        "template_rzmruld",
        formRef.current,
        "ZAPktphb4_mUEdgNy"
      )
      .then((response) => {
        console.log("Email enviado:", response);
        notifySuccess();
        formRef.current.reset();
      })
      .catch((error) => {
        console.error("Error al enviar el email:", error);
        notifyError();
      });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <Toaster toasterId={toasterId} />
        <form ref={formRef} onSubmit={sendEmail}>
          <DialogBody>
            <DialogTitle>Envíanos un mensaje</DialogTitle>
            <DialogContent className={styles.content}>
              <Label required htmlFor={"name-input"}>
                Nombre
              </Label>
              <Input
                required
                type="text"
                id={"name-input"}
                name="from_name"
                style={{ height: "40px" }}
              />
              <Label required htmlFor={"email-input"}>
                Correo electrónico
              </Label>
              <Input
                required
                type="email"
                id={"email-input"}
                name="to_email"
                style={{ height: "40px" }}
              />
              <Label required htmlFor={"message-input"}>
                Mensaje
              </Label>
              <Input
                as="textarea"
                required
                id={"message-input"}
                name="message_html"
                style={{ height: "150px" }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                appearance="primary"
                style={{ marginTop: "25px", height: "40px" }}
                
              >
                Enviar mensaje
              </Button>
            </DialogActions>
          </DialogBody>
        </form>
      </div>
    </div>
  );
};

export default Contacto;



