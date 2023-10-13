import { AmendaError } from "./AmendaError"

export abstract class clientError extends AmendaError{
    maxResponseCode: number = 499
    minResponseCode: number = 400

    contructor(aResponseCode: number, ){
        this.responseCode = this.validateResponseCode(aResponseCode);
        this.reponseCodeDescription = "";
    }
}