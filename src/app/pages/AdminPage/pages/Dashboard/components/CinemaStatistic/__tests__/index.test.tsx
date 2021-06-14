import * as React from "react";
import { render } from "@testing-library/react";

import { CinemaStatistic } from "..";

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

describe("<CinemaStatistic  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<CinemaStatistic />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
