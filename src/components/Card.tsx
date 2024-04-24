import React, { FC, ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  bg?: string;
}

const Card: FC<CardProps> = ({ children, bg = "bg-gray-100" }) => {
  return (
    <div>
      <div className={`${bg} p-6 rounded-lg shadow-md`}>{children}</div>
    </div>
  );
};

export default Card;
