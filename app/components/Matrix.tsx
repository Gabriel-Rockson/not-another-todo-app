"use client";

import { memo, useState } from "react";
import Quadrant, { QuadrantProps } from "@/app/components/Quadrant";
import { Position } from "@/app/constants";

const Matrix = memo(function Matrix() {
  const [quadrants, setQuadrants] = useState<QuadrantProps[]>([
    {
      id: 1,
      name: "Urgent and Important",
      position: Position.URGENT_IMPORTANT,
    },
    {
      id: 2,
      name: "Not Urgent and Important",
      position: Position.NOT_URGENT_IMPORTANT,
    },
    {
      id: 3,
      name: "Urgent and Not Important",
      position: Position.URGENT_NOT_IMPORTANT,
    },
    {
      id: 4,
      name: "Not Urgent and Not Important",
      position: Position.NOT_URGENT_NOT_IMPORTANT,
    },
  ]);

  return (
    <div className={"grid grid-cols-2 gap-2 w-full h-fit min-h-96"}>
      {quadrants.map((quadrant) => (
        <Quadrant key={quadrant.id} {...quadrant} />
      ))}
    </div>
  );
});

export default Matrix;
