import { Attributes } from "../src/components/cmd-header/constants";
import { CmdHeader } from "../src/components/cmd-header/cmd-header";
import { TestUtils } from "./TestUtils";

describe("CmdHeader component", () => {
  it("verifies the presence of the .search-wrapper element", async () => {
    const { shadowRoot } = await TestUtils.render(CmdHeader.tag);
    const searchWrapper = shadowRoot?.querySelector(".search-wrapper");

    expect(searchWrapper).toBeTruthy();
  });

  it("verifies the presence of the style element", async () => {
    const { shadowRoot } = await TestUtils.render(CmdHeader.tag);
    const style = shadowRoot?.querySelector("style");

    expect(style).toBeTruthy();
  });

  describe("Input", () => {
    it("verifies the presence of the input field", async () => {
      const { shadowRoot } = await TestUtils.render(CmdHeader.tag);
      const input = shadowRoot?.querySelector("input");

      expect(input).toBeTruthy();
    });

    it("verifies the input placeholder is 'Type here...'", async () => {
      const { shadowRoot } = await TestUtils.render(CmdHeader.tag);
      const input = shadowRoot?.querySelector("input");

      expect(input?.placeholder).toBe("Type here...");
    });

    it("verifies the input placeholder has changed to 'HERE'", async () => {
      const { shadowRoot } = await TestUtils.render(CmdHeader.tag, {
        [Attributes.PLACEHOLDER]: "HERE",
      });
      const input = shadowRoot?.querySelector("input");

      expect(input?.placeholder).toBe("HERE");
    });

    it("verifies the input field is focused", async () => {
      const { shadowRoot } = await TestUtils.render(CmdHeader.tag);
      const input = shadowRoot?.querySelector("input");

      // By focusing the input field asynchronously within a requestAnimationFrame, this can cause the input field not
      // to be focused immediately after the call to focus(), which could lead to issues in the test.
      // One solution is to wait for a brief period after focusing the input field to allow the focus to be established.
      setTimeout(() => {
        expect(shadowRoot?.activeElement === input).toBeTruthy();
      }, 0);
    });
  });

  describe("Breadcrumb", () => {
    it("verifies that the first breadcrumb button is present", async () => {
      const { shadowRoot } = await TestUtils.render(CmdHeader.tag);
      const breadcrumb = shadowRoot?.querySelector("button.breadcrumb");

      expect(breadcrumb).toBeTruthy();
    });

    it("verifies that the first breadcrumb displays the text 'Home'", async () => {
      const { shadowRoot } = await TestUtils.render(CmdHeader.tag);
      const breadcrumb = shadowRoot?.querySelector("button.breadcrumb");

      expect(breadcrumb?.textContent).toBe("Home");
    });

    it("verifies that the first breadcrumb displays the text 'TEST'", async () => {
      const { shadowRoot } = await TestUtils.render(CmdHeader.tag, {
        [Attributes.BREADCRUMB_HOME]: "TEST",
      });
      const breadcrumb = shadowRoot?.querySelector("button.breadcrumb");

      expect(breadcrumb?.textContent).toBe("TEST");
    });

    it("verifies that the breadcrumb is hidden", async () => {
      const { shadowRoot } = await TestUtils.render(CmdHeader.tag, {
        [Attributes.HIDE_BREADCRUMBS]: true,
      });
      const breadcrumbList = shadowRoot?.querySelector(".breadcrumb-list");

      expect(breadcrumbList?.getAttribute("style")).toMatch(/display: none/);
    });

    it("verifies that there is a button with tabindex '-1'", async () => {
      const { shadowRoot } = await TestUtils.render(CmdHeader.tag);
      const firstBreadcrumb = shadowRoot?.querySelector("button.breadcrumb");

      expect(firstBreadcrumb?.getAttribute("tabindex")).toMatch(/-1/);
    });
  });
});
