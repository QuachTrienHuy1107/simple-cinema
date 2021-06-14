import * as React from "react";
import { render } from "@testing-library/react";

import { CinemaPosition } from "..";

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

describe("<CinemaPosition  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<CinemaPosition />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
