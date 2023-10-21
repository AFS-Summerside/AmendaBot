import { getReponseCode, response } from "../errors/responseCodes";
import { body } from "../types/body";
import { verifyDiscordBot } from "../validators/authenticate";

export class Trigger {
  #body: body = {} as body;
  #validBot: boolean = false;
  #reponseCode: response = getReponseCode(500);
  #reponseBody: string = "INITIAL STATE";

  constructor(bodyString: string){
    // this.#body = this.buildBody(bodyString);
  };

  public verifyCall(aSignature: string, aSignatureTimestamp: string):void {
    verifyDiscordBot(aSignature, aSignatureTimestamp, this.#body.fullBody);
    this.#validBot = true;
  }

  //TODO will return body
  private buildBody(bodyString: string): void {
    var bodyJson = JSON.parse(bodyString);
    // return {
    //   interactionType: bodyJson.type,
    //   user: {
    //     avatar: bodyJson.user.avatar,
    //     avatar_decoration_data: bodyJson.user.avatar_decoration_data,
    //     discriminator: bodyJson.user.discriminator,
    //     global_name: bodyJson.user.global_name,
    //     id: bodyJson.user.id,
    //     public_flags: bodyJson.user.public_flags,
    //     username: bodyJson.user.username,
    //   },
    //   version: bodyJson.version,
    //   fullBody: bodyString,
    // };
  }

  // Request Getter
  public getRequestBody(): body {
    return this.#body;
  }
  public isValidCaller(): boolean {
    return this.#validBot;
  }
  
  //Response Getters and Setters
  public getResponseCode(): response {
    return this.#reponseCode;
  }
  public getResponseBody(): string {
    return this.#reponseBody;
  }
  public setResponseBody(body: string): void {
    this.#reponseBody = body;
  }
  public setResponseCode(rc: response): void {
    this.#reponseCode = rc;
  }
}
