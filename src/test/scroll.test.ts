import { detectScrollPosition, hasScrollBar, showHideElement } from "../server/scroll";

document.body.innerHTML =
    "<div id='numbers-container'>" +
        "<button id='btn-prevent' class='show'>" +
        "</button>" +
        "<ul>" +
        "</ul>" +
        "<button id='btn-next' class='show'>" +
        "</button>" +
    "</div>";

const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prevent");
test("Replace classes hide show on the button", () => {
    showHideElement(btnPrev, "show", "hide");

    expect(btnPrev?.classList).toContain("hide");
})

describe("detect state scroll init", () => {
    test("No has scroll", ()=> {
        hasScrollBar(1000, 1000);

        expect(btnNext?.classList).toContain("hide");
        expect(btnPrev?.classList).toContain("hide");
    });
    test("Has scroll", () => {
        hasScrollBar(1000, 1100);

        expect(btnNext?.classList).toContain("show");
        expect(btnPrev?.classList).toContain("show");
    });
});

describe("Verification hide show scroll for the position", () => {
    test("Scroll start position", () => {
        detectScrollPosition(1200, 1000, 0);

        expect(btnNext?.classList).toContain("show");
        expect(btnPrev?.classList).toContain("hide");
    });
    test("Scroll center position", () => {
        detectScrollPosition(1200, 1000, 100);

        expect(btnNext?.classList).toContain("show");
        expect(btnPrev?.classList).toContain("show");
    });
    test("Scroll end position", ()=>{
        detectScrollPosition(1200, 1000, 200);

        expect(btnNext?.classList).toContain("hide");
        expect(btnPrev?.classList).toContain("show");
    });
});
