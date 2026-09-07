import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import SiteFooter from "./SiteFooter";

afterEach(cleanup);

test("renders the minimal Contact footer with safe accessible profile links", () => {
  render(<SiteFooter />);

  const footer = screen.getByRole("contentinfo", { name: "Contact" });
  expect(footer).toHaveAttribute("id", "contact");

  const linkedIn = screen.getByRole("link", { name: "LinkedIn profile" });
  expect(linkedIn).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/h-meclazcke/",
  );
  expect(linkedIn).toHaveAttribute("target", "_blank");
  expect(linkedIn).toHaveAttribute("rel", expect.stringContaining("noopener"));

  const github = screen.getByRole("link", { name: "GitHub profile" });
  expect(github).toHaveAttribute("href", "https://github.com/hmeclazcke");
  expect(github).toHaveAttribute("target", "_blank");
  expect(github).toHaveAttribute("rel", expect.stringContaining("noopener"));

  expect(footer.querySelectorAll("a")).toHaveLength(2);
  expect(
    footer.querySelector('img[src$="contact/piedra-movediza-lineart.png"]'),
  ).toHaveAttribute("alt", "");
  expect(
    footer.querySelector('img[src$="contact/piedra-movediza-lineart.png"]'),
  ).toHaveAttribute("aria-hidden", "true");
  expect(
    screen.queryByText(/let'?s connect|contact|email|phone|©/i),
  ).toBeNull();
});
