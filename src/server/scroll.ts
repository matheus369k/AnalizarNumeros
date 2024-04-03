const btnsNextPrev = document.querySelectorAll("#numbers-container>button");

export const hasScollBar = (
  propsWidthContainer: number,
  propsWidthScroll: number
): void => {
  btnsNextPrev.forEach((btn: Element) => {
    showHideElement(btn, "show", "hidde");
    if (propsWidthScroll === propsWidthContainer) return;
    showHideElement(btn, "hidde", "show");
  });
};

export const detectScrollPosition = (propsListNumbers: Element | null): void => {
  const widthScroll = propsListNumbers?.scrollWidth;
  const widthContainer = propsListNumbers?.clientWidth;
  const scrollbarPosition = propsListNumbers?.scrollLeft;

  if (
    typeof widthScroll === "number" &&
    typeof widthContainer === "number" &&
    typeof scrollbarPosition === "number"
  ) {
    if (scrollbarPosition + widthContainer === widthScroll) {
      showHideElement(btnsNextPrev[1], "show", "hidde");
    }

    if (scrollbarPosition + widthContainer < widthScroll) {
      showHideElement(btnsNextPrev[1], "hidde", "show");
    }

    if (scrollbarPosition === 0) {
      showHideElement(btnsNextPrev[0], "show", "hidde");
    }

    if (scrollbarPosition > 0) {
      showHideElement(btnsNextPrev[0], "hidde", "show");
    }
  }
};

export const showHideElement =(
    propsMsgList: Element,
    propsCurrentClass: string,
    propsNewClass: string
  ): void => {
    propsMsgList.classList.replace(propsCurrentClass, propsNewClass);
  }
