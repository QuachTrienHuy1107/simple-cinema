import * as React from "react";
import { render } from "@testing-library/react";

import { Operations } from "..";

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

describe("<Operations  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<Operations />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
