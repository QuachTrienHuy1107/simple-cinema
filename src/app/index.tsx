/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import "antd/dist/antd.css";
import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { renderRoutes, routes } from "router";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import GlobalStyle from "styles/global-styles";
import { ROUTES } from "utils/constants/settings";
import { useAuthSlice } from "./pages/Form/slice";
import { NotFoundPage } from "./pages/NotFoundPage/Loadable";
import "./index.scss";

export function App() {
    const { i18n } = useTranslation();
    const disptach = useDispatch();
    const { actions } = useAuthSlice();
    React.useEffect(() => {
        const userLogin = localStorage.getItem("user");
        if (userLogin) {
            const credential = JSON.parse(userLogin);

            disptach(actions.checkLoginActionSuccess(credential));
        }
    }, []);

    //=================

    return (
        <BrowserRouter>
            <Helmet
                titleTemplate="%s - React Boilerplate"
                defaultTitle="React Boilerplate"
                htmlAttributes={{ lang: i18n.language }}
            >
                <meta name="description" content="Simple Cinema" />
            </Helmet>

            <Switch>
                {renderRoutes(routes)}
                <Route exact path={ROUTES.NOTFOUND} component={NotFoundPage} />
                <Redirect from="*" to={ROUTES.NOTFOUND} />
            </Switch>
            <GlobalStyle />
        </BrowserRouter>
    );
}
