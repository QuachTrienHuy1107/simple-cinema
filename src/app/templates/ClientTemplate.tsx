import { Footer } from "app/components/Common/Footer";
import { Header } from "app/components/Common/Header";
import React from "react";
import { useLocation } from "react-router";

interface ClientTemplateProps {}

const ClientTemplate: React.FC<ClientTemplateProps> = ({ children }: any) => {
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
