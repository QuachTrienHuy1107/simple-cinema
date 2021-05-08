import * as React from "react";
import { render } from "@testing-library/react";

import { Checkout } from "..";

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

describe("<Checkout  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<Checkout />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
