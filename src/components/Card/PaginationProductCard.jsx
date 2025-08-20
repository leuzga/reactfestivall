import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { FaArrowLeft, FaArrowRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import styles from './PaginationProductCard.module.css'; 

const PaginationProductCard = ({ products, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState('');

  const renderProducts = () => {
    if (!Array.isArray(products)) {
      return <div>No products available</div>;
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return products.slice(startIndex, endIndex).map(product => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleChangePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleInputChange = (e) => {
    setInputPage(e.target.value);
  };

  const goToPage = () => {
    const pageNumber = parseInt(inputPage, 10);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      setInputPage('');
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxPages = Math.min(totalPages, 6);
    let startPage = Math.min(Math.max(1, currentPage - 2), totalPages - maxPages + 1);

    if (startPage > 1) {
      pages.push(
        <button key={1} onClick={() => handleChangePage(1)}>
          {1}
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsisStart">...</span>);
      }
    }

    for (let i = 0; i < maxPages; i++) {
      pages.push(
        <button key={startPage + i} onClick={() => handleChangePage(startPage + i)} className={currentPage === startPage + i ? styles.active : ''}>
          {startPage + i}
        </button>
      );
    }

    if (startPage + maxPages - 1 < totalPages) {
      if (startPage + maxPages <= totalPages) {
        pages.push(<span key="ellipsisEnd">...</span>);
      }
      pages.push(
        <button key={totalPages} onClick={() => handleChangePage(totalPages)}>
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className={styles.paginationContainer}> 
      <div className={styles.productGrid}> 
        {renderProducts()}
      </div>
      <div className={styles.paginationControls}> 
        <button onClick={() => handleChangePage(currentPage - 1)} disabled={currentPage === 1}>
          <FaArrowLeft color="CD55A4" />
        </button>
        {currentPage > 3 && <button onClick={() => handleChangePage(1)}>{1}</button>}
        {currentPage > 4 && <span>...</span>}
        {renderPageNumbers()}
        {currentPage < totalPages - 3 && <span>...</span>}
        {currentPage < totalPages - 2 && <button onClick={() => handleChangePage(totalPages)}>{totalPages}</button>}
        <button onClick={() => handleChangePage(currentPage + 1)} disabled={currentPage === totalPages}>
          <FaArrowRight color="CD55A4" />
        </button>
        
      </div>
    </div>
  );
};

export default PaginationProductCard;