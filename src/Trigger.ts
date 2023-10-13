import { getReponseCode, response } from "./errors/responseCodes";
import { body } from "./types/body";
import { verifyDiscordBot } from "./util/authenticate";

export class Trigger {
  #body: body;
  #validBot: boolean = false;
  #reponseCode: response = getReponseCode(418);
  #reponseBody: string = "";

  constructor(aSignature: string, aSignatureTimestamp: string, bodyString: string) {
    this.#validBot = verifyDiscordBot(aSignature, aSignatureTimestamp, bodyString);
    this.#body = this.buildBody(bodyString);
  }

  public isValidCaller(): boolean {
    return this.#validBot;
  }

  private buildBody(bodyString: string): body {
    var bodyJson = JSON.parse(bodyString);
    return {
      interactionType: bodyJson.type,
      user: {
        avatar: bodyJson.user.avatar,
        avatar_decoration_data: bodyJson.user.avatar_decoration_data,
        discriminator: bodyJson.user.discriminator,
        global_name: bodyJson.user.global_name,
        id: bodyJson.user.id,
        public_flags: bodyJson.user.public_flags,
        username: bodyJson.user.username,
      },
      version: bodyJson.version,
      fullBody: bodyString,
    };
  }

  // Request Getter
  public getRequestBody(): body {
    return this.#body;
  }

  //Response Getters and Setters
  public getResponseCode(): response {
    return this.#reponseCode;
  }
  public getResponseBody(): string {
    return this.#reponseBody;
  }
  public setResponseBody(body: string) {
    this.#reponseBody = body;
  }
}
