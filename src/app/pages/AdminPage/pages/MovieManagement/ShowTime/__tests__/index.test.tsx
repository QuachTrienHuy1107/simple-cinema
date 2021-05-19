import * as React from "react";
import { render } from "@testing-library/react";

import { ShowTime } from "..";

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

describe("<ShowTime  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<ShowTime />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
