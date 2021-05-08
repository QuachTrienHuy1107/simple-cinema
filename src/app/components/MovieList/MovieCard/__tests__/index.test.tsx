import * as React from "react";
import { render } from "@testing-library/react";

import { MovieCard } from "..";

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

describe("<MovieCard  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<MovieCard />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
