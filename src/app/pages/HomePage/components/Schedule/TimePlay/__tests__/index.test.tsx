import * as React from "react";
import { render } from "@testing-library/react";

import { TimePlay } from "..";

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

describe("<TimePlay  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<TimePlay />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
