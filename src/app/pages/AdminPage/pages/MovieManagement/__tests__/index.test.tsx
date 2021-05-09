import * as React from "react";
import { render } from "@testing-library/react";

import { MovieManagement } from "..";

jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: str => str,
        i18n: {
            changeLanguage: () => new Promise(() => {}),
        },
    }),
}));

describe("<MovieManagement  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<MovieManagement />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
