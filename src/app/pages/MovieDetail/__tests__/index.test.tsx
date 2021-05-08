import * as React from "react";
import { render } from "@testing-library/react";

import { MovieDetail } from "..";

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

describe("<MovieDetail  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<MovieDetail />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
