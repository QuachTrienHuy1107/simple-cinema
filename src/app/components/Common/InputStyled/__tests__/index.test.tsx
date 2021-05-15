import * as React from "react";
import { render } from "@testing-library/react";

import { InputStyled } from "..";

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

describe("<InputStyled  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<InputStyled />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
