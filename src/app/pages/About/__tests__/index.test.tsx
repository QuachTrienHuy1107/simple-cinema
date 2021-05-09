import * as React from "react";
import { render } from "@testing-library/react";

import { About } from "..";

jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: str => str,
        i18n: {
            changeLanguage: () => new Promise(() => {}),
        },
    }),
}));

describe("<About  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<About />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
