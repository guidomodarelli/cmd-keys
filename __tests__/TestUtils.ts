export class TestUtils {
  /**
   * Renders a given element with provided attributes
   * and returns a promise which resolves as soon as
   * rendered element becomes available.
   */
  static render(tag: string, attributes = {}): Promise<HTMLElement> {
    TestUtils.renderToDocument(tag, attributes);
    return TestUtils.waitForComponentToRender(tag);
  }

  /**
   * Replaces document's body with provided element
   * including given attributes.
   */
  private static renderToDocument(tag: string, attributes: object) {
    const htmlAttributes = TestUtils.mapObjectToHTMLAttributes(attributes);
    document.body.innerHTML = `<${tag} ${htmlAttributes}></${tag}>`;
  }

  /**
   * Converts an object to HTML string representation of attributes.
   *
   * For example: `{ foo: "bar", baz: "foo" }`
   * becomes `foo="bar" baz="foo"`
   */
  private static mapObjectToHTMLAttributes(attributes: object): string {
    return Object.entries(attributes).reduce((previous, current) => {
      return previous + ` ${current[0]}="${current[1]}"`;
    }, "");
  }

  /**
   * Returns a promise which resolves as soon as
   * requested element becomes available.
   */
  private static async waitForComponentToRender(tag: string):Promise<HTMLElement> {
    return new Promise(resolve => {
      function requestComponent() {
        const element = document.querySelector(tag) as HTMLElement;
        if (element) {
          resolve(element);
        } else {
          window.requestAnimationFrame(requestComponent);
        }
      }
      requestComponent();
    });
  }
}
