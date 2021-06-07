import * as React from "react";
import { render } from "@testing-library/react";

import { TitleStyle } from "..";

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

describe("<TitleStyle  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<TitleStyle />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
