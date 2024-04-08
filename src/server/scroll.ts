export const hasScrollBar = (
  propsWidthContainer: number,
  propsWidthScroll: number
): void => {
  const buttonsNextPrev = document.querySelectorAll("#numbers-container>button");
  buttonsNextPrev.forEach((btn: Element) => {
    showHideElement(btn, "show", "hide");
    if (propsWidthScroll === propsWidthContainer) return;
    showHideElement(btn, "hide", "show");
  });
};

export const detectScrollPosition = (
  widthScroll: number | undefined,
  widthContainer: number | undefined,
  scrollbarPosition: number | undefined,
): void => {
  const buttonsNextPrev = document.querySelectorAll("#numbers-container>button");

  if (
    typeof widthScroll === "number" &&
    typeof widthContainer === "number" &&
    typeof scrollbarPosition === "number"
  ) {
    if (scrollbarPosition + widthContainer === widthScroll) {
      showHideElement(buttonsNextPrev[1], "show", "hide");
    }

    if (scrollbarPosition + widthContainer < widthScroll) {
      showHideElement(buttonsNextPrev[1], "hide", "show");
    }

    if (scrollbarPosition === 0) {
      showHideElement(buttonsNextPrev[0], "show", "hide");
    }

    if (scrollbarPosition > 0) {
      showHideElement(buttonsNextPrev[0], "hide", "show");
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
