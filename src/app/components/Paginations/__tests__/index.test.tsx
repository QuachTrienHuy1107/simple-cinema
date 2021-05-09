import * as React from "react";
import { render } from "@testing-library/react";

import { Paginations } from "..";

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

describe("<Paginations  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<Paginations />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
