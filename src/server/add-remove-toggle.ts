export const removeClass = (element: Element | null, className: string): void => {
  element?.classList.remove(className);
}

export const addClass = (element: Element | null, className: string): void => {
  element?.classList.add(className);
}

export const toggleClass = (element: Element | null, className: string): void => {
  element?.classList.toggle(className);
}
