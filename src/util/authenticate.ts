import nacl from "tweetnacl";

export function verifyDiscordBot(signature: string, timestamp: string, body: string): boolean {
  var bodyBuffer = Buffer.from(timestamp + body);
  var signatureBuffer = Buffer.from(signature, "hex");
  var timestampBuffer = Buffer.from(process.env.PUBLIC_KEY ?? "", "hex");

  return nacl.sign.detached.verify(bodyBuffer, signatureBuffer, timestampBuffer);
}
