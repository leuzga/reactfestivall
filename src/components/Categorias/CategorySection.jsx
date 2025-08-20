import { useState } from "react";
import CategoryCard from "./CategoryCard";
import styles from "./CategorySection.module.css";

const titleMapping = [
  {
    nombreFiltro: "Inflables y Castillos",
    imagenFiltro:
      "https://img.freepik.com/foto-gratis/vista-colorido-castillo-inflable_23-2150844327.jpg",
  },
  {
    nombreFiltro: "Juegos de Agua",
    imagenFiltro:
      "https://bestonjuegosmecanicos.com.mx/wp-content/uploads/2017/05/Juego-Mecanico-Globo-Samba.jpg",
  },
  {
    nombreFiltro: "Juegos Mecánicos",
    imagenFiltro:
      "https://http2.mlstatic.com/parque-de-agua-juego-inflable-con-agua-usa-D_NQ_NP_731019-MLC26420769230_112017-F.jpg",
  },
  {
    nombreFiltro: "Juegos de Destreza",
    imagenFiltro:
      "https://i0.wp.com/concepto.de/wp-content/uploads/2018/08/destreza-e1533845828681.jpg",
  },
  {
    nombreFiltro: "Niños Pequeños",
    imagenFiltro:
      "https://www.chiquimadrid.es/wp-content/uploads/2018/11/juegos-tradicionales-para-ni%C3%B1os.jpg",
  },
  {
    nombreFiltro: "Todos",
    imagenFiltro:
      "https://tackletrading.com/wp-content/uploads/2015/09/Detective-1920px-min2-1024x791.jpg",
  },
];

const CategorySection = ({ onCategoryClick }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryClick = (category) => {
    let updatedCategories = [...selectedCategories];
    if (category.title === "Todos") {
      // Selecciona todas las categorías o ninguna
      if (updatedCategories.length === titleMapping.length - 1) {
        updatedCategories = [];
      } else {
        updatedCategories = titleMapping
          .map((cat) => cat.nombreFiltro)
          .filter((cat) => cat !== "Todos");
      }
    } else {
      const index = selectedCategories.indexOf(category.title);
      if (index !== -1) {
        updatedCategories.splice(index, 1);
      } else {
        updatedCategories.push(category.title);
      }
      // Remueve "Todos" si se selecciona cualquier otra categoría
      const todosIndex = updatedCategories.indexOf("Todos");
      if (todosIndex !== -1) {
        updatedCategories.splice(todosIndex, 1);
      }
    }
    setSelectedCategories(updatedCategories);
    onCategoryClick(updatedCategories);
  };

  return (
    <div className={styles.categorySection}>
      {titleMapping.map((category, index) => {
        const { nombreFiltro, imagenFiltro } = category;
        return (
          <CategoryCard
            key={index}
            categoryName={nombreFiltro}
            categoryDescription={""}
            categoryImageUrl={imagenFiltro}
            isSelected={selectedCategories.includes(nombreFiltro)}
            onClick={() => handleCategoryClick({ title: nombreFiltro })}
          />
        );
      })}
    </div>
  );
};

export default CategorySection;
