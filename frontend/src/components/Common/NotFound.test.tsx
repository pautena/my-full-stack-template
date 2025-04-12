import { screen } from "@testing-library/react";
import { render } from "../../test-utils";
import NotFound from "./NotFound";

describe("NotFound component", () => {
  it("renders the 404 text", () => {
    render(<NotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders the Oops! text", () => {
    render(<NotFound />);
    expect(screen.getByText("Oops!")).toBeInTheDocument();
  });

  it("renders the Page not found text", () => {
    render(<NotFound />);
    expect(screen.getByText("Page not found.")).toBeInTheDocument();
  });

  it("renders the Go back button", () => {
    render(<NotFound />);
    expect(screen.getByRole("link", { name: /go back/i })).toBeInTheDocument();
  });

  it("has a link to the home page", () => {
    render(<NotFound />);
    expect(screen.getByRole("link", { name: /go back/i })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
