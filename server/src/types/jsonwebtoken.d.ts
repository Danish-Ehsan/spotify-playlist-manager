import * as jwt from "jsonwebtoken";

//This override makes to so the options parameter is optional even with a callback function
declare module "jsonwebtoken" {
  // Define the new overload
  function sign(
    payload: string | Buffer | object,
    secretOrPrivateKey: Secret,
    options?: SignOptions,
    callback: SignCallback
  ): void;
}
