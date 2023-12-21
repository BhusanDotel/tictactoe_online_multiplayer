import React from "react";

const Line = (props) => {
  const pathRef = React.useRef(null);

  React.useEffect(() => {
    const totalLength = pathRef.current.getTotalLength();
    pathRef.current.style.transition = "none";
    pathRef.current.style.strokeDasharray = totalLength;
    pathRef.current.style.strokeDashoffset = totalLength;
    pathRef.current.getBoundingClientRect();

    pathRef.current.style.transition = "stroke-dashoffset 0.6s ease-in-out";
    pathRef.current.style.strokeDashoffset = "0";
  }, []);

  return (
    <svg width="450" height="450">
      <path
        ref={pathRef}
        d={props.lineCoords}
        style={{
          fill: "none",
          stroke: "black",
          strokeWidth: "10",
        }}
      />
    </svg>
  );
};

export default Line;
