
import { InvalidReponseCode } from "./InvalidReponseCode";

export class ReponseCodeNotFound extends InvalidReponseCode{
    constructor(rc: number){
        super(rc);
    }
}