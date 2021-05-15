import * as React from "react";
import { render } from "@testing-library/react";

import { Filter } from "..";

jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: str => str,
        i18n: {
            changeLanguage: () => new Promise(() => {}),
        },
    }),
}));

describe("<Filter  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<Filter />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
