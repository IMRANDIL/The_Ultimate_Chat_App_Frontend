import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background color
        zIndex: 9999, // Higher z-index to ensure it's on top
      }}
    >
      <Spinner
        animation="border"
        role="status"
        style={{
          width: "80px",
          height: "80px",
        }}
      >
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
