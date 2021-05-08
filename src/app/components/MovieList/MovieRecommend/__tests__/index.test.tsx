import * as React from "react";
import { render } from "@testing-library/react";

import { MovieRecommend } from "..";

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

describe("<MovieRecommend  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<MovieRecommend />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
