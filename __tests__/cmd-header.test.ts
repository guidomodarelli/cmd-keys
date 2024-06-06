import { CmdHeader } from "../src/components/cmd-header/cmd-header";
import { TestUtils } from "./TestUtils";

describe("CmdHeader component", () => {
  it("input exists", async () => {
    const { shadowRoot } = await TestUtils.render(CmdHeader.tag);
    const input = shadowRoot?.querySelector("input");
    expect(input).toBeTruthy();
  });
});
