import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    // HOMEPAGE → restore saved scroll
    if (pathname === "/") {
      const saved = sessionStorage.getItem("home-scroll");
      if (saved) {
        // Small timeout to allow DOM to render before scrolling
        setTimeout(() => {
          window.scrollTo(0, parseInt(saved));
        }, 50);
      }
      return;
    }

    // OTHER PAGES → always start at top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, [pathname]);

  // Save homepage scroll position while user scrolls
  useEffect(() => {
    const saveScroll = () => {
      if (window.location.pathname === "/") {
        sessionStorage.setItem("home-scroll", window.scrollY.toString());
      }
    };

    window.addEventListener("scroll", saveScroll);
    return () => window.removeEventListener("scroll", saveScroll);
  }, []);

  return null;
}