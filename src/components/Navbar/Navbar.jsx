import { useState } from "react";
import { Button, CounterBadge } from "@fluentui/react-components";
import { ImSearch } from "react-icons/im";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import SignUpModal from "../Modal/SignUpModal";
import MenuAvatar from "./MenuAvatar";
import SearchDrawer from "../Search/SearchDrawer";
import { useAuth } from "../AuthContext/AuthContext";
import { useAtom } from "jotai";
import { cartCountAtom } from "../../data/Store/cartCountAtom";
import { drawerOpenAtom } from "../../data/Store/drawerStore";
import { BsHandbag } from "react-icons/bs";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 96px;
  width: 100%;
  position: sticky;
  top: 0;
  background: linear-gradient(180deg, #f5e9fc, rgba(121, 90, 246, 0));
  backdrop-filter: blur(10px);
  padding: 0 20px;
  z-index: 1000;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 20px;
  }
`;

const LeftSection = styled.div`
  max-width: 200px;
`;

const CenterSection = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 10px;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 10px;
  }
`;

const NavButton = styled.button`
  background: transparent;
  border: none;
  color: #795af6;
  font-size: 20px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ca63d2;
  }
`;

const Navbar = ({ menuItems, logo }) => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const [open, setOpen] = useAtom(drawerOpenAtom);
  const [cartCount] = useAtom(cartCountAtom);

  const redirectToHome = () => {
    navigate("/");
  };

  const redirectToAdmin = () => {
    navigate("/admin");
  };

  const handleSignUpClick = () => {
    setOpenDialog(true);
  };

  const handleLogin = () => {
    navigate("/login"); // Redirige al usuario a la página de login
  };

  // Leer el tipo de cuenta del localStorage
  const isAdmin = localStorage.getItem("accountType") === "ADMIN";

  return (
    <>
      <NavbarContainer>
        <LeftSection>
          <img
            src={logo}
            alt="Logo"
            style={{ maxWidth: "100%", width: "200px" }}
            onClick={redirectToHome}
          />
        </LeftSection>
        <CenterSection>
          {menuItems.map((item) => (
            <NavButton key={item}>{item}</NavButton>
          ))}
          {isAuthenticated && isAdmin && (
            <NavButton onClick={redirectToAdmin}>Admin</NavButton>
          )}
        </CenterSection>
        <RightSection>
          <Button
            appearance="primary"
            iconPosition="before"
            onClick={() => setOpen(true)}
            shape="circular"
            icon={<ImSearch />}
          >
            Buscar
          </Button>
          <Link
            to="/detalle-reservas"
            style={{
              textDecoration: "none",
              color: "inherit",
              position: "relative",
            }}
          >
            <BsHandbag
              style={{
                fontSize: "20px",
                color: "#795af6",
                cursor: "pointer",
              }}
            />
            {cartCount > 0 && (
              <CounterBadge
                count={cartCount}
                size="small"
                style={{
                  position: "absolute",
                  top: "-5px", // Ajusta según sea necesario
                  right: "-10px", // Ajusta según sea necesario
                }}
              />
            )}
          </Link>
          {isAuthenticated ? (
            <MenuAvatar user={user} />
          ) : (
            <NavButton onClick={handleLogin}>LogIn</NavButton>
          )}
          <NavButton onClick={handleSignUpClick}>Sign Up</NavButton>
        </RightSection>
      </NavbarContainer>
      <SearchDrawer open={open} onClose={() => setOpen(false)} />
      <SignUpModal open={openDialog} setOpen={setOpenDialog} />
    </>
  );
};

export default Navbar;
