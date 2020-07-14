/// <reference types="node" />
import { OutgoingHttpHeaders, ServerResponse } from 'http';
import { HttpError } from 'http-errors';
declare type MimeType = 'text/html' | 'application/json';
export declare function sendSuccess(res: ServerResponse, data: object): void;
export declare function sendErrorData(res: ServerResponse, e: HttpError): void;
export declare function sendError(res: ServerResponse, e: HttpError): void;
export declare function sendJSON(res: ServerResponse, status: number, statusMessage: string, headers: OutgoingHttpHeaders, data: object): void;
/**
 * Helper function for sending a response using only the core Node server APIs.
 */
export declare function sendResponse(res: ServerResponse, type: MimeType, data: string): void;
export {};
//# sourceMappingURL=utils.d.ts.map