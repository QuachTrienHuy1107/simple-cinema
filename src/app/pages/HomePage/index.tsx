import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { homeMessages } from "./messages";

export function HomePage() {
    const { t } = useTranslation();
    return (
        <>
            <Helmet>
                <title>Home Page</title>
                <meta name="description" content="A Boilerplate application homepage" />
            </Helmet>
            <span>{t(homeMessages.testMessage())}</span>
        </>
    );
}
