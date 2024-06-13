import { render, screen } from "@testing-library/react";
import { Container } from "./Container";

describe("Container", () => {
    it("renders children", () => {
        render(<Container>test</Container>);
        expect(screen.getByText("test")).toBeInTheDocument();
    });

    it("applies additional className", () => {
        render(<Container className="custom">test</Container>);
        expect(screen.getByText("test")).toHaveClass("custom");
    });

    it("renders as fluid", () => {
        render(<Container fluid>test</Container>);
        expect(screen.getByText("test")).toHaveClass("fluid");
    });

    // todo - fix this test
    // it("applies the correct max-width", () => {
    //     render(<Container>test</Container>);
    //     const container = screen.getByText("test").parentElement;
    //     expect(container).toHaveStyle("max-width: 1140px");
    //
    //     // simulate a smaller screen size
    //     Object.defineProperty(window, "innerWidth", {
    //         writable: true,
    //         configurable: true,
    //         value: 576,
    //     });
    //     window.dispatchEvent(new Event("resize"));
    //
    //     expect(container).toHaveStyle("max-width: 540px");
    //
    //     // reset the window size
    //     Object.defineProperty(window, "innerWidth", {
    //         writable: true,
    //         configurable: true,
    //         value: 1024,
    //     });
    //     window.dispatchEvent(new Event("resize"));
    //
    //     expect(container.firstChild).toHaveStyle("max-width: 960px");
    // });
});
