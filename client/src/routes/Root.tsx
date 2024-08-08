import Header from "../components/header";
import { Outlet } from "react-router-dom";

export default function Root() {
  console.log("Root rendering");
  return (
    <>
      <Header />
      <main className="c-main">
        <Outlet />
      </main>
    </>
  );
}
