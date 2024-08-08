import { redirect } from "react-router-dom";

export default async function refreshToken(redirectTo: string) {
  console.log("refreshToken firing");
  const res = await fetch("/api/auth/refresh-token");
  console.log(res);

  if (!res.ok) {
    const errData = await res.json();
    console.log({ errData });
    throw errData;
  }

  throw redirect(redirectTo);
}
