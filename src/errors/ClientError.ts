import { AmendaError } from "./AmendaError"
import { response } from "./responseCodes";

export abstract class clientError extends AmendaError{
    maxResponseCode: number = 499
    minResponseCode: number = 400

    constructor(rc: response, setBy: string, reason:string){
        super({rc, setBy, reason});
    }
}