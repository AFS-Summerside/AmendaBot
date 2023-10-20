import { ClientError } from "./ClientError";
import { getReponseCode, response } from "../responseCodes";

export class AuthorizationError extends ClientError{
    protected responseCode: response;
    protected responseCodeReason: string;

    constructor(reason:string){
        super(reason);
        this.responseCode = getReponseCode(401);
        this.responseCodeReason = reason;
    }
}