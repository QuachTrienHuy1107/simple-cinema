import * as React from "react";
import { render } from "@testing-library/react";

import { MovieForm } from "..";

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

describe("<MovieForm  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<MovieForm />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
