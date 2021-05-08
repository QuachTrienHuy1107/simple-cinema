import * as React from "react";
import { render } from "@testing-library/react";

import { Seat } from "..";

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

describe("<Seat  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<Seat />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
