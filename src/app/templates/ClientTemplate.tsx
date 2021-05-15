import { Footer } from "app/components/Common/Footer";
import { Header } from "app/components/Common/Header";
import React from "react";

interface ClientTemplateProps {}

const ClientTemplate: React.FC<ClientTemplateProps> = ({ children }: any) => (
    <div>
        <Header />
        {children}
        <Footer />
    </div>
);

export default ClientTemplate;
