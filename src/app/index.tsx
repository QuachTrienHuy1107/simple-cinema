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
import About from "./pages/About/Loadable";
import { useAuthSlice } from "./pages/Form/slice";
import HomePage from "./pages/HomePage/Loadable";
import { NotFoundPage } from "./pages/NotFoundPage/Loadable";
import firebase from "../firebase";

// var database = firebase;
// console.log("databaseRef", databaseRef);
// console.log("firebase", firebase.database());

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

    /**
     * Test mode
     */
    const [spells, setSpells] = React.useState([]);
    React.useEffect(() => {
        const fetchData = async () => {
            const db = firebase;
            console.log("db", db);
            /*   const data = await db.collection("spells").get();
            setSpells(data.docs.map(doc => ({ ...doc.data(), id: doc.id }))); */
        };
        fetchData();
    }, []);

    //=================

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
