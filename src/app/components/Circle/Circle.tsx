import React from "react";

type Props = {
  variant: "green" | "yellow" | "orange";
  size: "small" | "large";
};

const Circle = ({ variant = "orange", size = "small" }: Props) => {
  let bgColor;
  let circleSize;

  switch (size) {
    case "small":
      circleSize = "w-14 h-14";
      break;
    case "large":
      circleSize = "w-28 h-28";
      break;
    default:
      circleSize = "w-14 h-14";
  }

  switch (variant) {
    case "orange":
      bgColor = "bg-orange-500";
      break;
    case "yellow":
      bgColor = "bg-yellow-500";
      break;
    case "green":
      bgColor = "bg-green-500";
      break;
    default:
      bgColor = "bg-orange-500";
  }

  return <div className={`${bgColor} ${circleSize} p-2 rounded-full`}></div>;
};

export default Circle;
