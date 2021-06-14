import * as React from "react";
import { render } from "@testing-library/react";

import { UserStatistic } from "..";

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

describe("<UserStatistic  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<UserStatistic />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
