import * as React from "react";
import {
  Button,
  Input,
  Label,
  Spinner,
  DialogTitle,
  Image,
} from "@fluentui/react-components";
import styled, { createGlobalStyle } from "styled-components";
import backgroundImage from "/loginBackground.jpg";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../../data/user";
import SignUpModal from "../Modal/SignUpModal";
import LogoFestivall from "/FestivallSVG.svg";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos para Toastify
import { useAuth } from "../AuthContext/AuthContext";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Playfair Display', serif;
  }

  html, body, #root {
    height: 100%;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  z-index: 9999;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  background: rgba(0, 0, 0, 0.1); /* Fondo semitransparente */
  padding: 2rem;
  border-radius: 8px;
`;

const WelcomeText = styled.div`
  color: #fff;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const InputWrapper = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  height: 40px;
`;

const StyledButton = styled(Button)`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #5B5FC7;
  color: #fff;
  &:hover {
    background-color: #4a4fa3;
  }
  &:disabled {
    background-color: #fff;
  }
`;

const StyledSpinner = styled(Spinner)`
  color: #fff;
`;

const Login = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const { success, user, message } = await validateUser(
        formData.email,
        formData.password
      );
      if (success) {
        login(user); // Actualiza el estado global con la información del usuario
        localStorage.setItem('accountType', user.accountType); // Guarda el tipo de cuenta en localStorage
        toast.success('¡Bienvenido!', { position: "top-center", autoClose: 5000, theme: "light" });
  
        // Redirigir basado en el tipo de cuenta
        if (user.accountType === 'admin') {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        toast.error(message, { position: "top-center", autoClose: 5000, theme: "light" });
      }
    } catch (err) {
      toast.error('Error al iniciar sesión', { position: "top-center", autoClose: 5000, theme: "light" });
    } finally {
      setLoading(false);
    }
  };
  

  const handleOpenSignUpModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Image
            src={LogoFestivall}
            alt="Logo de la aplicación Festivall"
            width={220}
            style={{ display: "block", margin: "0 auto" }}
          />
          <WelcomeText>
            <DialogTitle style={{ color: "#5B5FC7", fontStyle: "italic" }}>
              ¡Bienvenido! 👋
            </DialogTitle>
            <DialogTitle style={{ color: "#5B5FC7" }}>
              Inicia sesión para continuar
            </DialogTitle>
          </WelcomeText>
          <InputWrapper>
            <Label
              required
              htmlFor="email"
              style={{ color: "#5B5FC7", fontWeight: "bold" }}
            >
              Email
            </Label>
            <StyledInput
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <Label
              required
              htmlFor="password"
              style={{ color: "#5B5FC7", fontWeight: "bold" }}
            >
              Contraseña
            </Label>
            <StyledInput
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </InputWrapper>
          <StyledButton
            type="submit"
            appearance="primary"
            disabled={loading}
          >
            {loading ? (
              <StyledSpinner size="small" />
            ) : (
              "Iniciar sesión"
            )}
          </StyledButton>
          <Button
            type="button"
            appearance="secondary"
            onClick={handleOpenSignUpModal}
            style={{ marginTop: "1rem", height: "40px" }}
          >
            Crear cuenta
          </Button>
          <SignUpModal open={isModalOpen} setOpen={setIsModalOpen} />
        </Form>
      </Container>
      <ToastContainer position="top-center" autoClose={5000} />
    </>
  );
};

export default Login;
