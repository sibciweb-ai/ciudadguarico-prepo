import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Hacer scroll al top inmediatamente cuando cambie la ruta
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
