import { useRouteError } from "react-router-dom";

type ErrData = {
  status?: number;
  message: string;
  stack?: string;
};

export default function ErrorPage() {
  const error = useRouteError() as ErrData;

  return (
    <>
      <h1>Oh no! You've encountered an error.</h1>
      {error.status && (
        <h3>
          <strong>Error Code:</strong> {error.status}
        </h3>
      )}
      <h3>
        <strong>Error Message:</strong> {error.message}
      </h3>
      {error.stack && (
        <h3>
          <pre>
            <strong>Error Stack:</strong> {error.stack}
          </pre>
        </h3>
      )}
    </>
  );
}
