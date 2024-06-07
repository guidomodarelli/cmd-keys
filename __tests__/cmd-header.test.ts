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
        ['placeholder']: "HERE",
      });
      const input = shadowRoot?.querySelector("input");

      expect(input?.placeholder).toBe("HERE");
    });

    it("verifies the input field is focused", async () => {
      const { shadowRoot } = await TestUtils.render(CmdHeader.tag);
      const input = shadowRoot?.querySelector("input");

      // By focusing the input field asynchronously within a requestAnimationFrame, this can cause the input field not
      // to be focused immediately after the call to focus(), which could lead to issues in the test.
      requestAnimationFrame(() => {
        expect(shadowRoot?.activeElement === input).toBeTruthy();
      });
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
        ['breadcrumb-home']: "TEST",
      });
      const breadcrumb = shadowRoot?.querySelector("button.breadcrumb");

      expect(breadcrumb?.textContent).toBe("TEST");
    });

    it("verifies that the breadcrumb list is hidden", async () => {
      const { shadowRoot } = await TestUtils.render(CmdHeader.tag, {
        ['hide-breadcrumbs']: true,
      });
      const breadcrumbList = shadowRoot?.querySelector(".breadcrumb-list");

      expect(breadcrumbList?.getAttribute("style")).toMatch(/display: none/);
    });

    it("verifies that there is a button with tabindex '-1'", async () => {
      const { shadowRoot } = await TestUtils.render(CmdHeader.tag);
      const firstBreadcrumb = shadowRoot?.querySelector("button.breadcrumb");

      expect(firstBreadcrumb?.getAttribute("tabindex")).toMatch(/-1/);
    });

    it("verifies that there are more breadcrumb buttons", async () => {
      const { shadowRoot } = await TestUtils.render(CmdHeader.tag, {
        ['breadcrumbs']: JSON.stringify(["TEST-1", "TEST-2"])
      });
      const allBreadcrumbs = shadowRoot?.querySelectorAll("button.breadcrumb");

      expect(allBreadcrumbs?.item(0).textContent).toBe("Home")
      expect(allBreadcrumbs?.item(1).textContent).toBe("TEST-1")
      expect(allBreadcrumbs?.item(2).textContent).toBe("TEST-2")
    });
  });
});
