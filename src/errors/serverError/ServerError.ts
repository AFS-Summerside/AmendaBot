import { AmendaError } from "../AmendaError"

export abstract class ServerError extends AmendaError{
    maxResponseCode: number = 599
    minResponseCode: number = 500

    constructor(reason:string){
        super(reason);
    }
}