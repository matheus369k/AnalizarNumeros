export function setDataOnTheUrlState(params: number[]) {
    delDataOnTheUrlState();

    const url = new URL(window.location.toString());

    url.searchParams.set(
        "list", 
        String(params)
    );
    window.history.pushState({}, "", url);
}

export function getDataOnTheUrlState() {
    const url = new URL(window.location.toString());

    const paramsList = url.searchParams.get("list")?.split(",");

    if (paramsList === undefined) return;

    const listOfNumber = paramsList?.filter(number => Number(number));

    return listOfNumber;
}

export function delDataOnTheUrlState() {
    const url = new URL(window.location.toString());

    url.searchParams.delete(
        "list"
    );
    window.history.pushState({}, "", url);
}