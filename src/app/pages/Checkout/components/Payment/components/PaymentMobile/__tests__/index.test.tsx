import * as React from "react";
import { render } from "@testing-library/react";

import { PaymentMobile } from "..";

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

describe("<PaymentMobile  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<PaymentMobile />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
