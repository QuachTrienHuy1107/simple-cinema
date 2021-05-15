/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { renderRoutes, routes } from "router";
import GlobalStyle from "styles/global-styles";
import { ROUTES } from "utils/constants/settings";
import About from "./pages/About/Loadable";
import HomePage from "./pages/HomePage/Loadable";
import { NotFoundPage } from "./pages/NotFoundPage/Loadable";

export function App() {
    const { i18n } = useTranslation();
    return (
        <BrowserRouter>
            <Helmet
                titleTemplate="%s - React Boilerplate"
                defaultTitle="React Boilerplate"
                htmlAttributes={{ lang: i18n.language }}
            >
                <meta name="description" content="A React Boilerplate application" />
            </Helmet>

            <Switch>
                <Route exact path={ROUTES.HOME} component={HomePage} />
                <Route exact path={ROUTES.ABOUT} component={About} />

                {renderRoutes(routes)}
                <Route exact path={ROUTES.NOTFOUND} component={NotFoundPage} />
                <Redirect from="*" to={ROUTES.NOTFOUND} />
            </Switch>
            <GlobalStyle />
        </BrowserRouter>
    );
}
