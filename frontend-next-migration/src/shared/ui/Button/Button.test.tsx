import {render, screen} from "@testing-library/react";
import {Button, ButtonTheme} from "./Button";

describe("Button", () => {
  it("test render", () => {
   render(<Button>Test</Button>);
   expect(screen.getByText('Test')).toBeInTheDocument();
  });

  // console.log(ButtonTheme.CLEAR)

  it("should have a theme classname", () => {
    render(<Button theme={ButtonTheme.CLEAR}>Test</Button>);
    expect(screen.getByText('Test')).toHaveClass('clear');
    // screen.debug();
  });

});
