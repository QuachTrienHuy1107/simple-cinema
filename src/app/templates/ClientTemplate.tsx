import { Banner } from "app/components/Banner";
import { Footer } from "app/components/Common/Footer";
import { Header } from "app/components/Common/Header";
import { selectMovieDetail } from "app/pages/MovieDetail/slice/selectors";
import React from "react";
import { useSelector } from "react-redux";

interface ClientTemplateProps {}

const ClientTemplate: React.FC<ClientTemplateProps> = ({ children }: any) => {
    const { movieDetail } = useSelector(selectMovieDetail);
    return (
        <div>
            <Header />
            <Banner movieDetail={movieDetail} />
            {children}
            <Footer />
        </div>
    );
};

export default ClientTemplate;
