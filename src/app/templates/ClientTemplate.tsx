import { Col, Row } from "antd";
import { Banner } from "app/components/Banner";
import { Footer } from "app/components/Common/Footer";
import { Header } from "app/components/Common/Header";
import { selectMovieDetail } from "app/pages/MovieDetail/slice/selectors";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

interface ClientTemplateProps {}

const ClientTemplate: React.FC<ClientTemplateProps> = ({ children }: any) => {
    const { movieDetail } = useSelector(selectMovieDetail);
    const location = useLocation();

    const isCheckout = location.pathname.includes("checkout");

    return (
        <div>
            {!isCheckout ? (
                <>
                    <Header />
                    {children}
                    <Footer />
                </>
            ) : (
                <>{children}</>
            )}
        </div>
    );
};

export default ClientTemplate;
