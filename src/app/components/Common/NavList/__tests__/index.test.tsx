import * as React from "react";
import { render } from "@testing-library/react";

import { NavList } from "..";

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

describe("<NavList  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<NavList />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
