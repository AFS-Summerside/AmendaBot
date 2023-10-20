import { AmendaError } from "../AmendaError"

export abstract class ClientError extends AmendaError{
    maxResponseCode: number = 499
    minResponseCode: number = 400

    constructor(reason:string){
        super(reason);
    }
}