import * as React from "react";
import { render } from "@testing-library/react";

import { Schedule } from "..";

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

describe("<Schedule  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<Schedule />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
