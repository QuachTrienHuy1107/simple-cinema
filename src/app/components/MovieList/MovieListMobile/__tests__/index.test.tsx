import * as React from "react";
import { render } from "@testing-library/react";

import { MovieListMobile } from "..";

describe("<MovieListMobile  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<MovieListMobile />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
