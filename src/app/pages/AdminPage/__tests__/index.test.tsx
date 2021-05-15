import * as React from "react";
import { render } from "@testing-library/react";

import { AdminPage } from "..";

jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: str => str,
        i18n: {
            changeLanguage: () => new Promise(() => {}),
        },
    }),
}));

describe("<AdminPage  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<AdminPage />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
