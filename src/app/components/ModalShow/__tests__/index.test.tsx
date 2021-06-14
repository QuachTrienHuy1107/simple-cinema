import * as React from "react";
import { render } from "@testing-library/react";

import { ModalShow } from "..";

describe("<ModalShow  />", () => {
    it("should match snapshot", () => {
        const loadingIndicator = render(<ModalShow />);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});
