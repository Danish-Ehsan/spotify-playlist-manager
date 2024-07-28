import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <Header />
      <main className="c-main">
        <Outlet />
      </main>
    </>
  );
}
