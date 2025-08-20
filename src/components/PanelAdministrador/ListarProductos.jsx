
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  InlineDrawer,
  makeStyles as makeFluentStyles,
  Tab,
  TabList,
} from "@fluentui/react-components";
import { useState, useEffect } from "react";
import RegistrarProducto from "./RegistrarProducto";
import AdminListProd from "../AdminListProd/AdminListProd";
import RegistrarCategoria from "./RegistrarCategoria";
import AdminListCategorias from "../AdminListCategorias/AdminListCategorias";
import AdminListUser from "../AdminListUser/AdminListUser";
import AdminListCaracteristicas from "../AdminListCarac/AdminListCaracteristicas";
import styles from "./ListarProductos.module.css";

const useFluentStyles = makeFluentStyles({
  root: {
    display: "flex",
    height: "100%",
  },
  drawer: {
    display: "flex",
    flexDirection: "column",
    borderRight: "2px solid #f5e9fc",
    width: "220px",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "16px",
    height: "calc(100vh - 50px)",
    borderRadius: "8px",
  },

  drawerContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center", 
    justifyContent: "center",
    height: "100%",
  },
  content: {
    flex: 1,
    padding: "16px",
    overflowY: "auto",
  },
  tab: {
    marginBottom: "12px", // Añade espacio entre los tabs
  },
});

const ListarProductos = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("panel");

  const fluentStyles = useFluentStyles();

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 1200);
    };

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const handleComponentChange = (componentName) => {
    setSelectedComponent(componentName);
  };

  return (
    <div className={styles.contMain}>
      {isMobile && (
        <div className={styles.mobileOverlay}>
          <p className={styles.msj}>
            Esta función no está disponible en dispositivos móviles.
          </p>
        </div>
      )}
      {!isMobile && (
        <div className={fluentStyles.root}>
          <InlineDrawer separator open className={fluentStyles.drawer}>
            <DrawerHeader>
              <DrawerHeaderTitle>Menú</DrawerHeaderTitle>
            </DrawerHeader>

            <DrawerBody className={fluentStyles.drawerContent}>
              <TabList
                defaultSelectedValue="panel"
                vertical
                onTabSelect={(e, { value }) => handleComponentChange(value)}
              >
                <Tab value="panel" className={fluentStyles.tab}>Panel</Tab>
                <Tab value="RegistrarProducto" className={fluentStyles.tab}>Agregar Producto</Tab>
                <Tab value="AdminListProd" className={fluentStyles.tab}>Listar productos</Tab>
                <Tab value="RegistrarCategoria" className={fluentStyles.tab}>Agregar Categoria</Tab>
                <Tab value="AdminListCategorias" className={fluentStyles.tab}>Listar Categorías</Tab>
                <Tab value="AdminListUser" className={fluentStyles.tab}>Listar Usuarios</Tab>
                <Tab value="AdminListCaracteristicas" className={fluentStyles.tab}>Listar Caracteristicas</Tab>
              </TabList>
            </DrawerBody>
          </InlineDrawer>

          <div className={fluentStyles.content}>
            {selectedComponent === "panel" && (
              <div className={styles.panelContainer}>
                {/* Panel content here */}
              </div>
            )}
            {selectedComponent === "RegistrarProducto" && (
              <RegistrarProducto />
            )}
            {selectedComponent === "AdminListProd" && <AdminListProd />}
            {selectedComponent === "RegistrarCategoria" && (
              <RegistrarCategoria />
            )}
            {selectedComponent === "AdminListCategorias" && (
              <AdminListCategorias />
            )}
            {selectedComponent === "AdminListUser" && <AdminListUser />}
            {selectedComponent === "AdminListCaracteristicas" && (
              <AdminListCaracteristicas />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListarProductos;




