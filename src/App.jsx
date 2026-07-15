import { useState } from 'react';
import './App.css';
import Navbar from './components/navbar';
import Home from './pages/home';
import Menu from './pages/menu';
import BuildParfait from './pages/build-parfait';
import About from './pages/about';
import Locations from './pages/locations';
import Contact from './pages/contact';
import Footer from './components/footer';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    showToast(`🛒 ${item.name} added to cart!`);
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <Home onNavigate={setActivePage} addToCart={addToCart} />;
      case 'menu':
        return <Menu />;
      case 'build-parfait':
        return <BuildParfait />;
      case 'about':
        return <About />;
      case 'locations':
        return <Locations />;
      case 'contact':
        return <Contact />;
      default:
        return <Home onNavigate={setActivePage} addToCart={addToCart} />;
    }
  };

  return (
    <>
      <Navbar activePage={activePage} onNavigate={setActivePage} cart={cart} />
      <main className="main-content-flow">
        {renderActivePage()}
      </main>

      {/* Floating Visual Cart Toast Notification */}
      {toast && (
        <div className="cart-toast" role="alert">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
          <span>{toast}</span>
        </div>
      )}
      
      {/* Sleek Premium Footer */}
      <Footer onNavigate={setActivePage} />
    </>
  );
}

export default App;
