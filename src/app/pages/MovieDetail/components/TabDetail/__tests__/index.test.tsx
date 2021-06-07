import * as React from "react";
import { render } from "@testing-library/react";

import { TabDetail } from "..";

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

describe("<TabDetail  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<TabDetail />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
