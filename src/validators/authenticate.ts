import nacl from "tweetnacl";
import { AuthorizationError } from "../errors/clientErrors/AuthorizationError";

export function verifyDiscordBot(signature: string, timestamp: string, body: string): void {
  var bodyBuffer = Buffer.from(timestamp + body);
  var signatureBuffer = Buffer.from(signature, "hex");
  var timestampBuffer = Buffer.from(process.env.PUBLIC_KEY ?? "", "hex");

  if (!nacl.sign.detached.verify(bodyBuffer, signatureBuffer, timestampBuffer)){
    throw new AuthorizationError("Invalid Signature " + JSON.stringify({signature: signature, timeStamp: timestamp}));
  };
}
