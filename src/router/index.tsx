import React from "react";
import { lazy } from "react";
import { Link, Redirect, Route, RouteProps } from "react-router-dom";

import { ROUTES } from "config";
import { MovieDetail } from "../app/pages/MovieDetail/Loadable";
import { Dashboard } from "../app/pages/AdminPage/pages/Dashboard/Loadable";

import FormTemplate from "app/templates/FormTemplate";
import ClientTemplate from "app/templates/ClientTemplate";
import AdminTemplate from "app/templates/AdminTemplate";
import { Login } from "app/pages/Form/pages/Login";
import HomePage from "app/pages/HomePage/Loadable";

type PrivateRouteProps = {
    component: React.ComponentType;
    layout: string;
    restricted?: boolean;
} & RouteProps;

type RouterType = {
    path: string;
    exact: boolean;
    component: React.ComponentType;
    layout: string;
    restricted?: boolean | false;
};

const routes: RouterType[] = [
    /**
     * Client
     */
    {
        path: ROUTES.MOVIEDETAIL,
        exact: true,
        component: MovieDetail,
        layout: "Client",
        restricted: true,
    },

    /**
     * Form
     */

    {
        path: ROUTES.LOGIN,
        exact: true,
        component: Login,
        layout: "Form",
        restricted: false,
    },

    /**
     * Admin
     */
    {
        path: ROUTES.DASHBOARD,
        exact: true,
        component: Dashboard,
        layout: "Admin",
        restricted: true,
    },
    /**
     * Home
     */
    {
        path: ROUTES.HOME,
        exact: true,
        component: HomePage,
        layout: "Client",
        restricted: true,
    },
];

const isAuthenticated = true;
const isAdmin = true;

const AppLayout = ({
    component: Component,
    layout,
    restricted,
    ...rest
}: PrivateRouteProps): any => {
    return (
        <Route
            {...rest}
            render={props =>
                (layout === "Form" && (
                    <FormTemplate>
                        <Component {...props} />
                    </FormTemplate>
                )) ||
                (!isAuthenticated && <Redirect to="/login" />) ||
                (layout === "Client" && (
                    <ClientTemplate {...rest}>
                        <Component {...props} />
                    </ClientTemplate>
                )) ||
                (restricted && (
                    <AdminTemplate {...rest}>
                        <Component {...props} />
                    </AdminTemplate>
                )) || <Redirect to="/" />
            }
        />
    );
};

const renderRoutes = (router: any) => {
    if (router && router.length > 0) {
        return router?.map((route: RouterType, index: number) => (
            <AppLayout
                key={index}
                exact
                path={route.path}
                component={route.component}
                layout={route.layout}
                restricted={route.restricted}
            />
        ));
    }
};

export { renderRoutes, routes };
