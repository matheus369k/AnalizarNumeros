export const detectScrollPosition = (
  widthScroll: number | undefined,
  widthContainer: number | undefined,
  scrollbarPosition: number | undefined,
): void => {
  const btnNext = document.getElementById("btn-next");
  const btnPrev = document.getElementById("btn-prevent");

  if (
    typeof widthScroll === "number" &&
    typeof widthContainer === "number" &&
    typeof scrollbarPosition === "number"
  ) {
    if (scrollbarPosition + widthContainer >= widthScroll) {
      showHideElement(btnNext, "show", "hide");
    }

    if (scrollbarPosition + widthContainer < widthScroll) {
      showHideElement(btnNext, "hide", "show");
    }

    if (scrollbarPosition === 0) {
      showHideElement(btnPrev, "show", "hide");
    }

    if (scrollbarPosition > 0) {
      showHideElement(btnPrev, "hide", "show");
    }
  }
};

export const showHideElement = (
  propsMsgList: Element | null,
  propsCurrentClass: string,
  propsNewClass: string
): void => {
  propsMsgList?.classList.replace(propsCurrentClass, propsNewClass);
};
