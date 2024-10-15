import { TypeDefinition } from "./type";

export function checkTypes(object: Record<string, any>, types: Record<string, TypeDefinition>) {
    for (const [key, type] of Object.entries(types)) {
        if (!type.check(object[key])) {
            throw new Error(`Property ${key} has incorrect type, ${type.name} expected`);
        }
    }
}