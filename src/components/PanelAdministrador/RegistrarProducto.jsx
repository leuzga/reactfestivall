import { useState, useEffect } from "react";
import styles from "./RegistrarProducto.module.css";
import { agregarProducto } from "../../data/juegos";
import { LeerCategorias } from "../../data/dataService";
import {
  crearCaracteristica,
  obtenerCaracteristicas,
} from "../../data/caracteristicas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@fluentui/react-components";

import styled from "styled-components";

const SubmitButton = styled(Button)`
  margin-top: 15px;
`;

const RegistrarProducto = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [largo, setLargo] = useState("");
  const [ancho, setAncho] = useState("");
  const [altura, setAltura] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [valorArriendo, setValorArriendo] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [img_urls, setImgUrls] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [selectedCaracteristicas, setSelectedCaracteristicas] = useState([]);
  const [error, setError] = useState("");
  const [nuevaCaracteristica, setNuevaCaracteristica] = useState("");

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const categoriasData = await LeerCategorias();
        setCategorias(categoriasData);
      } catch (error) {
        console.error("Error al leer las categorías", error);
      }
    };
    const fetchCaracteristicas = async () => {
      try {
        const caracteristicasData = await obtenerCaracteristicas();
        setCaracteristicas(caracteristicasData);
      } catch (error) {
        console.error("Error al obtener características", error);
      }
    };

    fetchCategorias();
    fetchCaracteristicas();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (
      !nombre ||
      !descripcion ||
      !largo ||
      !ancho ||
      !altura ||
      !capacidad ||
      !valorArriendo ||
      !cantidad ||
      !img_urls ||
      !categoria ||
      selectedCaracteristicas.length === 0
    ) {
      setError("Por favor complete todos los campos.");
      return;
    }

    const categoriaSeleccionada = categorias.find(
      (cat) => cat.id.toString() === categoria
    );
    if (!categoriaSeleccionada) {
      setError("Categoría seleccionada no es válida.");
      return;
    }

    const nuevoProducto = {
      nombre,
      descripcion,
      largo: parseFloat(largo),
      ancho: parseFloat(ancho),
      altura: parseFloat(altura),
      capacidad: parseInt(capacidad),
      valorArriendo: parseInt(valorArriendo),
      cantidad: parseInt(cantidad),
      img_urls,
      tipo: {
        title: categoriaSeleccionada.title,
        description: categoriaSeleccionada.description,
        img_url: categoriaSeleccionada.img_url,
      },
      caracteristicas: selectedCaracteristicas.map((id) => {
        const caracteristica = caracteristicas.find((car) => car.id === id);
        return {
          id: caracteristica.id,
          nombre: caracteristica.nombre,
        };
      }),
    };

    try {
      "Nuevo Producto", JSON.stringify(nuevoProducto, null, 2);
      await agregarProducto(nuevoProducto);
      toast.success("Producto registrado exitosamente!");
      setNombre("");
      setDescripcion("");
      setLargo("");
      setAncho("");
      setAltura("");
      setCapacidad("");
      setValorArriendo("");
      setCantidad("");
      setImgUrls("");
      setCategoria("");
      setSelectedCaracteristicas([]);
      setError("");
    } catch (error) {
      setError("Error al registrar el producto. Inténtelo de nuevo.");
      console.error("Error al registrar el producto:", error);
    }
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImgUrls([...img_urls, ...imageUrls]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = img_urls.filter((_, i) => i !== index);
    setImgUrls(updatedImages);
  };

  const handleChangeNumericInput = (setter, value) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && numericValue >= 0) {
      setter(numericValue);
    }
  };

  const handleCrearCaracteristica = async () => {
    if (!nuevaCaracteristica) {
      setError("Ingrese un nombre para la nueva característica.");
      return;
    }

    const nuevaCaracteristicaObj = {
      nombre: nuevaCaracteristica,
    };

    try {
      const caracteristicaCreada = await crearCaracteristica(
        nuevaCaracteristicaObj
      );
      setCaracteristicas([...caracteristicas, caracteristicaCreada]);
      setNuevaCaracteristica("");
    } catch (error) {
      setError("Error al crear la característica. Inténtelo de nuevo.");
      console.error("Error al crear la característica:", error);
    }
  };

  return (
    <div className={styles.containerPrincipal}>
      <ToastContainer position="top-center" />
      <div className={styles.formContainer}>
        <h2 className={styles.titleForm}>Agregar Juego</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <div className={styles.formSection}>
            <div className={styles.generalInfo}>
              <div className={styles.inputContainer}>
                <label htmlFor="nombre" className={styles.label}>
                  Nombre:
                </label>
                <input
                  type="text"
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className={`${styles.input} ${styles.textInput}`}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="descripcion" className={styles.label}>
                  Descripción:
                </label>
                <textarea
                  id="descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className={`${styles.input} ${styles.textAreaInput}`}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="largo" className={styles.label}>
                  Largo (metros):
                </label>
                <input
                  type="number"
                  id="largo"
                  value={largo}
                  onChange={(e) =>
                    handleChangeNumericInput(setLargo, e.target.value)
                  }
                  className={`${styles.input} ${styles.numberInput}`}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="ancho" className={styles.label}>
                  Ancho (metros):
                </label>
                <input
                  type="number"
                  id="ancho"
                  value={ancho}
                  onChange={(e) =>
                    handleChangeNumericInput(setAncho, e.target.value)
                  }
                  className={`${styles.input} ${styles.numberInput}`}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="altura" className={styles.label}>
                  Altura (metros):
                </label>
                <input
                  type="number"
                  id="altura"
                  value={altura}
                  onChange={(e) =>
                    handleChangeNumericInput(setAltura, e.target.value)
                  }
                  className={`${styles.input} ${styles.numberInput}`}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="categoria" className={styles.label}>
                  Categoría:
                </label>
                <select
                  id="categoria"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className={`${styles.input} ${styles.selectInput}`}
                  required
                >
                  <option value="">Seleccione una categoría</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="capacidad" className={styles.label}>
                  Capacidad:
                </label>
                <input
                  type="number"
                  id="capacidad"
                  value={capacidad}
                  onChange={(e) =>
                    handleChangeNumericInput(setCapacidad, e.target.value)
                  }
                  className={`${styles.input} ${styles.numberInput}`}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="valorArriendo" className={styles.label}>
                  Valor Arriendo:
                </label>
                <input
                  type="number"
                  id="valorArriendo"
                  value={valorArriendo}
                  onChange={(e) =>
                    handleChangeNumericInput(setValorArriendo, e.target.value)
                  }
                  className={`${styles.input} ${styles.numberInput}`}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="cantidad" className={styles.label}>
                  Cantidad:
                </label>
                <input
                  type="number"
                  id="cantidad"
                  value={cantidad}
                  onChange={(e) =>
                    handleChangeNumericInput(setCantidad, e.target.value)
                  }
                  className={`${styles.input} ${styles.numberInput}`}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="img_url" className={styles.label}>
                  Imagen:
                </label>
                <input
                  type="file"
                  id="img_url"
                  onChange={handleImageChange}
                  className={`${styles.input} ${styles.fileInput}`}
                  multiple
                  required
                />
                {img_urls.length > 0 && (
                  <div className={styles.imagePreviewContainer}>
                    {img_urls.map((url, index) => (
                      <div key={index} className={styles.imageWrapper}>
                        <img
                          src={url}
                          alt={`Preview ${index}`}
                          className={styles.imagePreview}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className={styles.removeImageButton}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="nuevaCaracteristica" className={styles.label}>
                  Nueva Característica:
                </label>
                <input
                  type="text"
                  id="nuevaCaracteristica"
                  value={nuevaCaracteristica}
                  onChange={(e) => setNuevaCaracteristica(e.target.value)}
                  className={`${styles.input} ${styles.textInput}`}
                />
                <SubmitButton
                  appearance="primary"
                  type="button"
                  onClick={handleCrearCaracteristica}
                  className={styles.addButton}
                >
                  Agregar
                </SubmitButton>
              </div>
            </div>
          </div>
          <div className={styles.caracteristicasList}>
            {caracteristicas.map((caracteristica) => (
              <div
                key={caracteristica.id}
                className={styles.caracteristicaItem}
              >
                <div className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    id={`caracteristica-${caracteristica.id}`}
                    checked={selectedCaracteristicas.includes(
                      caracteristica.id
                    )}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCaracteristicas([
                          ...selectedCaracteristicas,
                          caracteristica.id,
                        ]);
                      } else {
                        setSelectedCaracteristicas(
                          selectedCaracteristicas.filter(
                            (id) => id !== caracteristica.id
                          )
                        );
                      }
                    }}
                  />
                </div>
                <div className={styles.labelContainer}>
                  <label htmlFor={`caracteristica-${caracteristica.id}`}>
                    {caracteristica.nombre}
                  </label>
                </div>
              </div>
            ))}
          </div>

          <SubmitButton
            appearance="primary"
            type="submit"
            className={styles.submitButton}
          >
            Registrar Producto
          </SubmitButton>
        </form>
      </div>
    </div>
  );
};

export default RegistrarProducto;
