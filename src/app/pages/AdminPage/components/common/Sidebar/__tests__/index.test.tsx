import * as React from "react";
import { render } from "@testing-library/react";

import { Sidebar } from "..";

jest.mock("react-i18next", () => ({
    useTranslation: () => {
        return {
            t: str => str,
            i18n: {
                changeLanguage: () => new Promise(() => {}),
            },
        };
    },
}));

describe("<Sidebar  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<Sidebar />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
