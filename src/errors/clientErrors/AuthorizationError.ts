import { ClientError } from "./ClientError";
import { getReponseCode, response } from "../responseCodes";

export class AuthorizationError extends ClientError{
    protected responseCode = getReponseCode(401)
    protected responseCodeReason: string;

    constructor(reason:string){
        super(reason);
        this.responseCodeReason = reason;
    }
}