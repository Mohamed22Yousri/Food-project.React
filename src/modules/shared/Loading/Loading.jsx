import { Spinner } from "react-bootstrap";

export default function Loading({ loading }) {
  return (
    <div>
      {loading ? (
        <div className="text-center">
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="success" />
        </div>
      ) : null}
    </div>
  );
}
