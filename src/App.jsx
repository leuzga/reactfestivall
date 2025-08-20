import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { AuthProvider } from './components/AuthContext/AuthContext.jsx';
import RandomProductsList from './components/Card/RandomProductsList';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar.jsx';
import DetailProduct from './components/DetailProduct/DetailProduct.jsx';
import FeaturedProducts from './components/ProductsFav/FeaturedProducts.jsx';
import LogoFestivall from '/FestivallSVG.svg';
import ProductCard from './components/Card/ProductCard.jsx';
import CategorySection from './components/Categorias/CategorySection.jsx';
import EmailForm from './components/SendEmail/EmailForm.jsx';
import ShareSocial from './components/ShareSocial/ShareSocial.jsx';
import FavoritesList from './components/FavoriteList/FavoritesList.jsx';
import Contact from './components/Contact/Contact.jsx';
import Nosotros from './components/Nosotros/Nosotros.jsx';
import Reservas from './components/Reservas/Reservas.jsx';
import RegistrarProducto from './components/PanelAdministrador/RegistrarProducto.jsx';
import ListarProductos from './components/PanelAdministrador/ListarProductos.jsx';
import useFetchGamesIdName from './Utils/useFecthGamesIdName';
import { suggestionsAtom } from './data/Store/gamesStore.js';
import WhatsAppButton from './components/btn-wsp/btn-wsp.jsx';
import ReservationsDetail from './components/ReservationsDetail/ReservationsDetail.jsx';
import Login from './components/Login/Login.jsx'; 
import SignUpModal from './components/Modal/SignUpModal.jsx';
import { Link } from 'react-router-dom';

const menuItems = [
  <Link to='/nosotros'>Nosotros</Link>,
  <Link to='/contacto'>Contacto</Link>,
];

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const { data } = useFetchGamesIdName();
  const [, setSuggestions] = useAtom(suggestionsAtom);

  useEffect(() => {
    if (data) {
      setSuggestions(data);
    }
  }, [data, setSuggestions]);

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar
            menuItems={menuItems}
            logo={LogoFestivall}
            showModal={showModal}
            setShowModal={setShowModal}
          />
          <Routes>
            <Route
              path='/'
              element={
                <div>
                  <RandomProductsList />
                  <FeaturedProducts />
                </div>
              }
            />
            <Route path='/detalle/:id' element={<DetailProduct />} />
            <Route path='/product/:id' element={<ProductCard />} />
            <Route path='/RegistrarProducto' element={<RegistrarProducto />} />
            <Route path='/admin' element={<ListarProductos />} />
            <Route path='/emailTest' element={<EmailForm />} />
            <Route path='/contacto' element={<Contact />} />
            <Route path='/nosotros' element={<Nosotros />} />
            <Route path='/share' element={<ShareSocial />} />
            <Route path='/favoritos' element={<FavoritesList />} />
            <Route path='/reservas' element={<Reservas />} />
            <Route path='/detalle-reservas' element={<ReservationsDetail />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUpModal />} />
            <Route path='/logout' element={<Navigate to='/' />} />
          </Routes>
          <Footer />
          <WhatsAppButton />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;
