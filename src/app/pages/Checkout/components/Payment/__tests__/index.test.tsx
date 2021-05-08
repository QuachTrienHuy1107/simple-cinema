import * as React from "react";
import { render } from "@testing-library/react";

import { Payment } from "..";

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

describe("<Payment  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<Payment />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
