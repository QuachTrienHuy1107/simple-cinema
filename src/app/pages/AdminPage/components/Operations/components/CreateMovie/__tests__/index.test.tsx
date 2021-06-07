import * as React from "react";
import { render } from "@testing-library/react";

import { CreateMovie } from "..";

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

describe("<CreateMovie  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<CreateMovie />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
