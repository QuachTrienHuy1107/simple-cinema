import * as React from "react";
import { render } from "@testing-library/react";

import { MovieList } from "..";

jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: str => str,
        i18n: {
            changeLanguage: () => new Promise(() => {}),
        },
    }),
}));

describe("<MovieList  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<MovieList />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
