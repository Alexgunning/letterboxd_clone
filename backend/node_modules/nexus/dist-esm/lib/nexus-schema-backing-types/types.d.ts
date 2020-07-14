/**
 * Helpers for handling the generated backing types typgen
 */
declare global {
    interface NexusBackingTypes {
    }
}
declare type GenTypesShapeKeys = 'types';
declare type GenTypesShape = Record<GenTypesShapeKeys, any>;
export declare type GetNexusFutureGen<K extends GenTypesShapeKeys, Fallback = any> = NexusBackingTypes extends infer GenTypes ? GenTypes extends GenTypesShape ? GenTypes[K] : Fallback : Fallback;
export declare type BackingTypes = Record<string, string>;
export {};
//# sourceMappingURL=types.d.ts.map