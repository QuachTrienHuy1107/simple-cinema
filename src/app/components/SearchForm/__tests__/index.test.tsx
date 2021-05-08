import * as React from "react";
import { render } from "@testing-library/react";

import { SearchForm } from "..";

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

describe("<SearchForm  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<SearchForm />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
