import React from "react";
import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Input,
  Label,
  makeStyles,
  Spinner,
} from "@fluentui/react-components";
import { TbEyeClosed } from "react-icons/tb";
import { RxEyeOpen } from "react-icons/rx";
import { createUser } from "../../data/user"; // Asegúrate de que la ruta sea correcta
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Asegúrate de que este archivo esté importado
import { useNavigate } from "react-router-dom"; // Importa useNavigate

const useStyles = makeStyles({
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    marginTop: "15px",
    "@media (max-width: 768px)": {
      flexDirection: "column",
      gap: "20px",
    },
  },
  section: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  passwordContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  togglePassword: {
    cursor: "pointer",
  },
  spinnerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100px", // Ajusta según sea necesario
  },
});

const SignUpModal = ({ open, setOpen }) => {
  const [formData, setFormData] = React.useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    direccion: "",
    password: "",
    confirmPassword: "",
    accountType: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);
  const [loading, setLoading] = React.useState(false); // Estado para manejar la carga
  const styles = useStyles();
  const navigate = useNavigate(); // Hook para redireccionar

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true); // Mostrar el spinner mientras se procesa la solicitud

    const result = await createUser({
      nombre: formData.nombre,
      apellido: formData.apellido,
      telefono: formData.telefono,
      email: formData.email,
      direccion: formData.direccion,
      contraseña: formData.password,
      accountType: formData.accountType.toUpperCase(),
    });

    setLoading(false); // Ocultar el spinner

    if (result.success) {
      toast.success("La cuenta se ha creado correctamente.");
      setTimeout(() => {
        setOpen(false);
        navigate("/login"); // Redirige al login después de cerrar el modal
      }, 2000); // 2 segundos de retraso para que el mensaje se lea
    } else {
      toast.error(result.message);
    }
  };

  const handleClear = () => {
    setFormData({
      nombre: "",
      apellido: "",
      telefono: "",
      email: "",
      direccion: "",
      password: "",
      confirmPassword: "",
      accountType: "",
    });
    setError(null);
    setSuccess(null);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(e, data) => setOpen(data.open)}>
        <DialogSurface>
          <DialogTitle>Crear una cuenta</DialogTitle>
          <DialogContent>
            <ToastContainer position="top-center" />
            {loading ? (
              <div className={styles.spinnerContainer}>
                <Spinner />
              </div>
            ) : (
              <form className={styles.inputContainer} onSubmit={handleSubmit}>
                <div className={styles.section}>
                  <Label required htmlFor="nombre">
                    Nombre
                  </Label>
                  <Input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    style={{ height: "40px" }}
                  />

                  <Label required htmlFor="apellido">
                    Apellidos
                  </Label>
                  <Input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                    style={{ height: "40px" }}
                  />

                  <Label required htmlFor="email">
                    Correo electrónico
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ height: "40px" }}
                  />

                  <Label required htmlFor="telefono">
                    Teléfono
                  </Label>
                  <Input
                    type="text"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    style={{ height: "40px" }}
                  />
                </div>

                <div className={styles.section}>
                  <Label required htmlFor="direccion">
                    Dirección
                  </Label>
                  <Input
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    required
                    style={{ height: "40px" }}
                  />

                  <Label required htmlFor="password">
                    Contraseña
                  </Label>
                  <div className={styles.passwordContainer}>
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      style={{ height: "40px" }}
                    />
                    <span
                      className={styles.togglePassword}
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? <TbEyeClosed /> : <RxEyeOpen />}
                    </span>
                  </div>

                  <Label required htmlFor="confirmPassword">
                    Confirmar Contraseña
                  </Label>
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    style={{ height: "40px" }}
                  />
                  <Label required htmlFor="accountType">
                    Tipo de Cuenta
                  </Label>
                  <select
                    id="accountType"
                    name="accountType"
                    value={formData.accountType}
                    onChange={handleChange}
                    required
                    style={{ height: "40px" }}
                  >
                    <option value="user">Usuario</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </form>
            )}
          </DialogContent>
          <DialogActions style={{ marginTop: "25px" }}>
            <Button
              className={styles.btn}
              appearance="default"
              onClick={handleClear}
              style={{ height: "40px" }}
            >
              Limpiar
            </Button>
            <Button
              appearance="secondary"
              onClick={() => setOpen(false)}
              style={{ height: "40px" }}
            >
              Cerrar
            </Button>
            <Button appearance="primary" onClick={handleSubmit}>
              Registrarse
            </Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>
    </>
  );
};

export default SignUpModal;
