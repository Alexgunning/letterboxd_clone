import { Headers as FetchHeaders } from 'cross-fetch';
import * as GQLR from 'graphql-request';
import { Param3 } from '../utils';
declare type Variables = Omit<Param3<typeof GQLR.request>, 'undefined'>;
declare type FetchHeaders = typeof FetchHeaders['prototype'];
export declare class GraphQLClient {
    private url;
    private fetchHeaders;
    headers: Headers;
    constructor(url: string);
    send(queryString: string, variables?: Variables): Promise<any>;
}
/**
 * Create a GraphQL Client instance
 */
export declare class Headers {
    private fetchHeaders;
    constructor(fetchHeaders: FetchHeaders);
    set(headers: Record<string, string>): void;
    set(name: string, value: string): void;
    set(header: [string, string]): void;
    add(headers: Record<string, string>): void;
    add(name: string, value: string): void;
    add(header: [string, string]): void;
    del(name: string): void;
    get(name: string): string | null;
    has(name: string): boolean;
    entries(): IterableIterator<[string, string]>;
}
export {};
//# sourceMappingURL=index.d.ts.map