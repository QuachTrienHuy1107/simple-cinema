import { AdminPage } from "app/pages/AdminPage/Loadable";
import { Checkout } from "app/pages/Checkout/Loadable";
import { FormTemplate } from "app/pages/Form/Loadable";
import { Login } from "app/pages/Form/pages/Login";
import { Register } from "app/pages/Form/pages/Register";
import { selectAuth } from "app/pages/Form/slice/selectors";
import HomePage from "app/pages/HomePage/Loadable";
import ClientTemplate from "app/templates/ClientTemplate";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { ROUTES } from "utils/constants/settings";
import { Dashboard } from "../app/pages/AdminPage/pages/Dashboard/Loadable";
import { MovieManagement } from "../app/pages/AdminPage/pages/MovieManagement/Loadable";
import { ShowTime } from "../app/pages/AdminPage/pages/MovieManagement/ShowTime";
import { UserManagement } from "../app/pages/AdminPage/pages/UserManagement/Loadable";
import { MovieDetail } from "../app/pages/MovieDetail/Loadable";

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
        path: `${ROUTES.HOME}`,
        exact: true,
        component: HomePage,
        layout: "Client",
        restricted: false,
    },
    {
        path: `${ROUTES.MOVIEDETAIL}/:maPhim`,
        exact: true,
        component: MovieDetail,
        layout: "Client",
        restricted: false,
    },
    {
        path: `${ROUTES.CHECKOUT}/:maLichChieu`,
        exact: true,
        component: Checkout,
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

    {
        path: `${ROUTES.SHOWTIME}`,
        exact: true,
        component: ShowTime,
        layout: "Admin",
        restricted: true,
    },
];

const AppLayout = ({
    component: Component,
    layout,
    restricted,
    ...rest
}: PrivateRouteProps): any => {
    const { credentials } = useSelector(selectAuth);

    React.useLayoutEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, []);

    return (
        <>
            <Route
                {...rest}
                render={props =>
                    (layout === "Form" && (
                        <FormTemplate>
                            <Component {...props} />
                        </FormTemplate>
                    )) ||
                    (!localStorage.getItem("user") && restricted === true && (
                        <Redirect to={ROUTES.LOGIN} />
                    )) ||
                    (layout === "Client" && (
                        <ClientTemplate {...rest}>
                            <Component {...props} />
                        </ClientTemplate>
                    )) ||
                    (credentials?.maLoaiNguoiDung === "QuanTri" && layout === "Admin" && (
                        <AdminPage {...rest}>
                            <Component {...props} />
                        </AdminPage>
                    )) || <Redirect to={ROUTES.HOME} />
                }
            />
        </>
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
