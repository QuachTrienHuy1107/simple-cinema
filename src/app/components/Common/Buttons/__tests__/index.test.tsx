import * as React from "react";
import { render } from "@testing-library/react";

import { Button } from "..";

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

describe("<Button  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<Button />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
