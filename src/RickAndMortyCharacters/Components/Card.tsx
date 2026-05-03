import React from "react";
import type { ResponseInterface } from "../Hooks/useApiCall";

interface CardProps {
  character: ResponseInterface;
}

const Card: React.FC<CardProps> = ({ character }) => {
  const { name = "", status = "", species = "", image = "" } = character;

  const statusStyle =
    status === "Alive"
      ? "text-green-500"
      : status === "Dead"
        ? "text-red-500"
        : "text-gray-500";

  return (
    <div className="flex flex-col gap-2 w-50 h-75 border-2  items-center rounded">
      <img src={image} alt={name} width={"100%"} height={"100%"} />
      <p>{name}</p>
      <p className={`${statusStyle}`}>{status}</p>
      <p>{species}</p>
    </div>
  );
};

export default Card;
