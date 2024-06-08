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
        ["placeholder"]: "HERE",
      });
      const input = shadowRoot?.querySelector("input");

      expect(input?.placeholder).toBe("HERE");
    });

    it("verifies the input field is focused", async () => {
      const { shadowRoot } = await TestUtils.render(CmdHeader.tag);
      const input = shadowRoot?.querySelector("input");

      // By focusing the input field asynchronously within a
      // requestAnimationFrame, this can cause the input field not to be focused
      // immediately after the call to focus(), which could lead to issues in
      // the test.
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

    it("verifies that the home breadcrumb displays the text 'Home'", async () => {
      const { shadowRoot } = await TestUtils.render(CmdHeader.tag);
      const breadcrumb = shadowRoot?.querySelector("button.breadcrumb");

      expect(breadcrumb?.textContent).toBe("Home");
    });

    it("verifies that the home breadcrumb displays the text 'TEST'", async () => {
      const { shadowRoot } = await TestUtils.render(CmdHeader.tag, {
        ["breadcrumb-home"]: "TEST",
      });
      const breadcrumb = shadowRoot?.querySelector("button.breadcrumb");

      expect(breadcrumb?.textContent).toBe("TEST");
    });

    it("verifies that the breadcrumb list is hidden", async () => {
      const { shadowRoot } = await TestUtils.render(CmdHeader.tag, {
        ["hide-breadcrumbs"]: true,
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
        ["breadcrumbs"]: JSON.stringify(["TEST-1", "TEST-2"]),
      });
      const allBreadcrumbs = shadowRoot?.querySelectorAll("button.breadcrumb");

      expect(allBreadcrumbs?.item(0).textContent).toBe("Home");
      expect(allBreadcrumbs?.item(1).textContent).toBe("TEST-1");
      expect(allBreadcrumbs?.item(2).textContent).toBe("TEST-2");
    });

    it("verifies that the home breadcrumb displays the text 'asd' when set via API", async () => {
      const cmdHeader = (await TestUtils.render(CmdHeader.tag)) as CmdHeader;
      const { shadowRoot } = cmdHeader;

      cmdHeader.setBreadcrumbHome("asd");

      const breadcrumbHome = shadowRoot?.querySelector("button.breadcrumb");
      expect(breadcrumbHome?.textContent).toBe("asd");
    });

    it("verifies breadcrumb buttons are correctly set and added via API", async () => {
      const cmdHeader = (await TestUtils.render(CmdHeader.tag)) as CmdHeader;
      const { shadowRoot } = cmdHeader;
      let allBreadcrumbs: NodeListOf<Element> | undefined;

      cmdHeader.setBreadcrumbs(["test1", "test2"]);

      allBreadcrumbs = shadowRoot?.querySelectorAll("button.breadcrumb");
      expect(allBreadcrumbs?.item(1).textContent).toBe("test1");
      expect(allBreadcrumbs?.item(2).textContent).toBe("test2");

      cmdHeader.addBreadcrumb("test3");

      allBreadcrumbs = shadowRoot?.querySelectorAll("button.breadcrumb");
      expect(allBreadcrumbs?.item(3).textContent).toBe("test3");

      cmdHeader.addBreadcrumb("test4", 2);

      allBreadcrumbs = shadowRoot?.querySelectorAll("button.breadcrumb");
      expect(allBreadcrumbs?.item(3).textContent).toBe("test4");

      cmdHeader.addBreadcrumb("test5", 0);

      allBreadcrumbs = shadowRoot?.querySelectorAll("button.breadcrumb");
      expect(allBreadcrumbs?.item(1).textContent).toBe("test5");

      cmdHeader.setBreadcrumbs(["test1"]);

      allBreadcrumbs = shadowRoot?.querySelectorAll("button.breadcrumb");
      expect(allBreadcrumbs?.item(2)).toBeNull();
    });
  });
});
