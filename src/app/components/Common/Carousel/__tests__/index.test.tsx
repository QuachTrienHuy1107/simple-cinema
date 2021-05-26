import * as React from "react";
import { render } from "@testing-library/react";

import { Carousel } from "..";

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

describe("<Carousel  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<Carousel />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
