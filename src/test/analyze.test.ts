import { analyzeNumbers } from "../server/analyze";
import { JSDOM } from "jsdom";

describe("Analizar mensagens", () => {
  const dom = new JSDOM(
    "<!DOCTYPE html>" +
      "<html>" +
      "<body>" +
      "<ul>" +
      "<li id='msg-register'></li>" +
      "<li id='msg-large'></li>" +
      "<li id='msg-small'></li>" +
      "<li id='msg-sum'></li>" +
      "<li id='msg-average'></li>" +
      "</ul>" +
      "</body>" +
      "</html>"
  );
  global.document = dom.window.document;

  analyzeNumbers([4, 5, 7, 4], 20, 5);

  const messages = document.querySelectorAll("ul>li>p");

  test("Register numbers", () => {
    expect(messages[0].textContent).toEqual("Foram registrados 4 numero(s) ao todo");
  });
  test("Big number", () => {
    expect(messages[1].textContent).toEqual("O maior numero inserido foi 4");
  });
  test("Small number", () => {
    expect(messages[2].textContent).toEqual("O menor numero inserido foi 4");
  });
  test("Sum numbers", () =>{
    expect(messages[3].textContent).toEqual("A soma de todo(s) o(s) numero(s) e 20");
  });
  test("Media numbers", () => {
    expect(messages[4].textContent).toEqual("A media de todo(s) o(s) numero(s) e 5.0");
  });
});
