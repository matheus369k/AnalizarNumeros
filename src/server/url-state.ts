export function setDataOnTheUrlState(name: string, params: number[] | boolean) {
    delDataOnTheUrlState(name);

    const url = new URL(window.location.toString());
    console.log(url)

    url.searchParams.set(
        name,
        String(params)
    );
    window.history.pushState({}, "", url);
}

export function getDataOnTheUrlState() {
    const url = new URL(window.location.toString());

    const paramsList = url.searchParams.get("list")?.split(",");
    const analiseState = Boolean(url.searchParams.get("analise"));

    if (paramsList === undefined) return;
    if (analiseState === undefined) return;

    const listOfNumber = paramsList?.filter(number => Number(number));

    return {listOfNumber ,analiseState};
}

export function delDataOnTheUrlState(name: string) {
    const url = new URL(window.location.toString());

    url.searchParams.delete(
        name
    );
    window.history.pushState({}, "", url);
}