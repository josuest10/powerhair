import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackMetaPageView } from "@/lib/meta-pixel";
import { captureUTMParams } from "@/lib/utm-tracker";

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Capture UTM params from URL on every route change
    captureUTMParams();

    // TikTok Pixel: single-page apps must call page() on route changes
    if (typeof window !== "undefined" && window.ttq?.page) {
      window.ttq.page();
      console.log("TikTok Pixel: PageView tracked", { pathname, search });
    }

    // Meta Pixel: track PageView on route changes for SPA
    trackMetaPageView();
  }, [pathname, search]);

  return null;
};

export default ScrollToTop;
