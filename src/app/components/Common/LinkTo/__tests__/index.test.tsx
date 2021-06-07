import * as React from "react";
import { render } from "@testing-library/react";

import { Anchor } from "..";

describe("<Anchor  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<Anchor />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
