import * as React from "react";
import { render } from "@testing-library/react";

import { AppLayout } from "..";

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

describe("<AppLayout  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<AppLayout />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
