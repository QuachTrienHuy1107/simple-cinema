import * as React from "react";
import { render } from "@testing-library/react";

import { Comment } from "..";

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

describe("<Comment  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<Comment />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
