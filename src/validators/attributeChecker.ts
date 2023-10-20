import { UnexpectedDataTypeError } from "../errors/clientErrors/UnexpectedDataTypeError";

export function isExpectedType(data:any, prototype: Record<string, any>): void{
    // prototype contains a map of all attributes on an Object. If something is defined in
    // the prototype, it must exist on the incoming object or the types dont match.
    for (const key of Object.keys(prototype)) {
        if (prototype[key] !== undefined) {
            if(data[key] === undefined){
                throw new UnexpectedDataTypeError("Expected key of " + key + " found");
            }
        }
    }
}