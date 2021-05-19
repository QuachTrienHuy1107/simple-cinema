import * as React from "react";
import { render } from "@testing-library/react";

import { Banner } from "..";

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

describe("<Banner  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<Banner />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
