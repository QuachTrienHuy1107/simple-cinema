import * as React from "react";
import { render } from "@testing-library/react";

import { CommentList } from "..";

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

describe("<CommentList  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<CommentList />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
