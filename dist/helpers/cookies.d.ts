type IWebDriverCookie = {
    name: string;
    value: string;
    domain?: string;
    path?: string;
    expiry?: number;
    secure?: boolean;
    httpOnly?: boolean;
};
export declare class Cookies {
    private readonly items;
    constructor(cookies?: IWebDriverCookie[]);
    toString(): string;
    saveToFileSync(path: string): void;
    static fromJSONString(jsonString: string): Cookies;
    static fromJSONFileSync(jsonFilePath: string): Cookies;
    [Symbol.iterator](): Generator<IWebDriverCookie, void, unknown>;
    get length(): number;
}
export {};
