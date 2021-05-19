import * as React from "react";
import { render } from "@testing-library/react";

import { Detail } from "..";

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

describe("<Detail  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<Detail />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
