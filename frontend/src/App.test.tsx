import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "./App";

test("exposes the application root as a main landmark", () => {
  render(<App />);

  expect(screen.getByRole("main")).toBeInTheDocument();
});
