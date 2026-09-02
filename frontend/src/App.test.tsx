import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "./App";

test("exposes the application root as a main landmark", () => {
  render(<App />);

  expect(screen.getByRole("main")).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Hello, world!", level: 1 }),
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ),
  ).toBeInTheDocument();
});
