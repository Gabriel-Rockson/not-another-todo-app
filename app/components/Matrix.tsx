"use client";

import { memo, useState } from "react";
import Quadrant, { QuadrantProps } from "@/app/components/Quadrant";
import { Position } from "@/app/constants";

const Matrix = memo(function Matrix() {
  const [quadrants, setQuadrants] = useState<QuadrantProps[]>([
    {
      id: 1,
      urgent: true,
      important: true,
      position: Position.URGENT_IMPORTANT,
    },
    {
      id: 2,
      urgent: false,
      important: true,
      position: Position.NOT_URGENT_IMPORTANT,
    },
    {
      id: 3,
      urgent: true,
      important: false,
      position: Position.URGENT_NOT_IMPORTANT,
    },
    {
      id: 4,
      urgent: false,
      important: false,
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
