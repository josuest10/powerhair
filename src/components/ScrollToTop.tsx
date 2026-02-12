import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackMetaPageView } from "@/lib/meta-pixel";
import { captureUTMParams } from "@/lib/utm-tracker";
import { captureFbclid } from "@/lib/fbc-capture";
import { trackTikTokPageView } from "@/lib/tiktok-pixel";

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Capture UTM params from URL on every route change
    captureUTMParams();
    
    // Capture fbclid from URL and store as _fbc cookie for Meta attribution
    captureFbclid();

    // Meta Pixel: track PageView on route changes for SPA
    trackMetaPageView();
    
    // TikTok Pixel: track PageView on route changes for SPA
    trackTikTokPageView();
  }, [pathname, search]);

  return null;
};

export default ScrollToTop;
