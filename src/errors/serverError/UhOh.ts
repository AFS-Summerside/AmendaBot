import { AmendaErrorInterface } from "../AmendaErrorInterface";

export class UhOh extends Error implements AmendaErrorInterface{
    protected responseCode: number;
    protected responseCodeReason: string;

    constructor(msg:string,code?:number){
        let respCode:number = code===undefined?500:code;
        super("Reponse of " + respCode + " because " + msg);

        this.responseCode = respCode;
        this.responseCodeReason = msg;
    }
    getResponseCodeReason(): string {
        return this.responseCodeReason
    }
    getResponseCode(): number {
        return this.responseCode;
    }
    getResponseDescription(): string {
        return "Honestly, I dont really know, something is wonky though"
    }

}
