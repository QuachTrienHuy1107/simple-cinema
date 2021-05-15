import * as React from "react";
import { render } from "@testing-library/react";

import { BannerDetail } from "..";

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

describe("<BannerDetail  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<BannerDetail />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
