import { AdminPage } from "app/pages/AdminPage";
import { FormTemplate } from "app/pages/Form";
import { Login } from "app/pages/Form/pages/Login";
import { Register } from "app/pages/Form/pages/Register";
import ClientTemplate from "app/templates/ClientTemplate";
import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { Dashboard } from "../app/pages/AdminPage/pages/Dashboard/Loadable";
import { MovieManagement } from "../app/pages/AdminPage/pages/MovieManagement/Loadable";
import { UserManagement } from "../app/pages/AdminPage/pages/UserManagement/Loadable";
import { MovieDetail } from "../app/pages/MovieDetail/Loadable";
// import { MovieForm } from "../app/pages/AdminPage/pages/MovieManagement/MovieForm";
import { ROUTES } from "utils/constants/settings";

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
        path: `${ROUTES.MOVIEDETAIL}/:maPhim`,
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
    {
        path: ROUTES.REGISTER,
        exact: true,
        component: Register,
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
    {
        path: ROUTES.USERMANAGEMENT,
        exact: true,
        component: UserManagement,
        layout: "Admin",
        restricted: true,
    },
    {
        path: ROUTES.MOVIEMANAGEMENT,
        exact: true,
        component: MovieManagement,
        layout: "Admin",
        restricted: true,
    },
    // {
    //     path: `${ROUTES.FORMADMIN}/:maPhim`,
    //     exact: true,
    //     component: MovieForm,
    //     layout: "Admin",
    //     restricted: true,
    // },
    /**
     * Home
     */
];

const isAuthenticated = true;
const isAdmin = true;

const AppLayout = ({
    component: Component,
    layout,
    restricted,
    ...rest
}: PrivateRouteProps): any => {
    // const { isAuthenticated } = useSelector(selectAuth);
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
                (restricted && layout === "Admin" && (
                    <AdminPage {...rest}>
                        <Component {...props} />
                    </AdminPage>
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
