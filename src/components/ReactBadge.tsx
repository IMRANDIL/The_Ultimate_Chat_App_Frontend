import React from "react";
import "./CustomBadge.css";

const ReactBadge: React.FC = () => {
  const notificationCount = 5; // Set the count dynamically based on your notifications

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="custom-badge">{notificationCount}</div>
    </div>
  );
};

export default ReactBadge;
