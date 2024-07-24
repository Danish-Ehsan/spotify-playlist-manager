import jwt from "jsonwebtoken";

export function signTokenPromise(
  payload: string | object,
  secret: string,
  options?: jwt.SignOptions
): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token as string);
      }
    });
  });
}
