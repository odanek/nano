export const emptyObject = Object.freeze({});

export function objectEquals(left: Record<string, unknown>, right: Record<string, unknown>) {
    if (left === right) {
        return true;
    }

    const leftKeys = Object.keys(left);
    const rightKeys = Object.keys(right);
    if (leftKeys.length !== rightKeys.length) {
        return false;
    }
    
    for (const key of leftKeys) {
        if (!right.hasOwnProperty(key) || left[key] !== right[key]) {
            return false;
        }
    }
    return true;
}