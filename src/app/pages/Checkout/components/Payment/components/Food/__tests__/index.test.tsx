import * as React from "react";
import { render } from "@testing-library/react";

import { Food } from "..";

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

describe("<Food  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<Food />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
