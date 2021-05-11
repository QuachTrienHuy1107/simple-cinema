import * as React from "react";
import { render } from "@testing-library/react";

import { UserDetail } from "..";

jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: str => str,
        i18n: {
            changeLanguage: () => new Promise(() => {}),
        },
    }),
}));

describe("<UserDetail  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<UserDetail />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});