import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    // TikTok Pixel: single-page apps must call page() on route changes
    if (typeof window !== "undefined" && window.ttq?.page) {
      window.ttq.page();
      console.log("TikTok Pixel: PageView tracked", { pathname, search });
    }
  }, [pathname, search]);

  return null;
};

export default ScrollToTop;
