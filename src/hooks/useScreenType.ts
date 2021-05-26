import { useMediaQuery } from "react-responsive";

export function useScreenType() {
    const FullScreen = ({ children }) => {
        const isFullScreen = useMediaQuery({ minWidth: 992 });
        return isFullScreen ? children : null;
    };
    const Tablet = ({ children }) => {
      const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 992 });
      return isTablet ? children : null;
    };
    const Desktop = ({ children }) => {
        const isDesktop = useMediaQuery({ minWidth: 768 });
        return isDesktop ? children : null;
    };
    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ minWidth: 0, maxWidth: 767 });
        return isMobile ? children : null;
    };

    const XSmallMobile = ({ children }) => {
        const isMobile = useMediaQuery({ minWidth: 576 });
        return isMobile ? children : null;
    };
    const SmallMobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 575 });
        return isMobile ? children : null;
    };

    return { FullScreen,Desktop, Tablet, Mobile, SmallMobile,XSmallMobile };
}
