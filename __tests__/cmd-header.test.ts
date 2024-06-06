import { Attributes } from "../src/components/cmd-header/constants";
import { CmdHeader } from "../src/components/cmd-header/cmd-header";
import { TestUtils } from "./TestUtils";

describe("CmdHeader component", () => {
  it("search-wrapper exists", async () => {
    const { shadowRoot } = await TestUtils.render(CmdHeader.tag);
    const searchWrapper = shadowRoot?.querySelector(".search-wrapper");

    expect(searchWrapper).toBeTruthy();
  });

  it("style exists", async () => {
    const { shadowRoot } = await TestUtils.render(CmdHeader.tag);
    const style = shadowRoot?.querySelector("style");

    expect(style).toBeTruthy();
  });

  describe("Input", () => {
    it("check if input exists", async () => {
      const { shadowRoot } = await TestUtils.render(CmdHeader.tag);
      const input = shadowRoot?.querySelector("input");

      expect(input).toBeTruthy();
    });

    it.skip("check input is focused", async () => {
      const { shadowRoot } = await TestUtils.render(CmdHeader.tag);
      const input = shadowRoot?.querySelector("input");

      console.log(shadowRoot?.activeElement);
      expect(shadowRoot?.activeElement === input).toBeTruthy();
    });
  });

  describe("Breadcrumb", () => {
    it("check that the first breadcrumb button exists", async () => {
      const { shadowRoot } = await TestUtils.render(CmdHeader.tag);
      const breadcrumb = shadowRoot?.querySelector("button.breadcrumb");

      expect(breadcrumb).toBeTruthy();
    });

    it("check that the first breadcrumb has the text 'Home'", async () => {
      const { shadowRoot } = await TestUtils.render(CmdHeader.tag);
      const breadcrumb = shadowRoot?.querySelector("button.breadcrumb");

      expect(breadcrumb?.textContent).toBe("Home");
    });

    it("check that the first breadcrumb has the text 'test'", async () => {
      const { shadowRoot } = await TestUtils.render(CmdHeader.tag, {
        [Attributes.BREADCRUMB_HOME]: 'test'
      });
      const breadcrumb = shadowRoot?.querySelector("button.breadcrumb");

      expect(breadcrumb?.textContent).toBe("test");
    });

    it.skip("check that the breadcrumb is hidden", async () => {
      const { shadowRoot } = await TestUtils.render(CmdHeader.tag, {
        [Attributes.HIDE_BREADCRUMBS]: "false"
      });
      const breadcrumb = shadowRoot?.querySelector("button.breadcrumb");

      expect(breadcrumb).toBe("none");
    });

    it.todo("should be a button with certain props");
  });
});
