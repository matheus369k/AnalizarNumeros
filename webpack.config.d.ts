export let entry: string;
export namespace module {
    let rules: {
        test: RegExp;
        use: string;
        exclude: string;
    }[];
}
export namespace resolve {
    let extensions: string[];
}
export namespace output {
    let path: string;
    let filename: string;
}
