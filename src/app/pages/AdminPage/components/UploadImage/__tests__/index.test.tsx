import * as React from "react";
import { render } from "@testing-library/react";

import { UploadImage } from "..";

jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: str => str,
        i18n: {
            changeLanguage: () => new Promise(() => {}),
        },
    }),
}));

describe("<UploadImage  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<UploadImage />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
