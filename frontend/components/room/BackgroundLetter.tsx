import React from "react";

interface Props {
  props: {
    g: { filter: string; id: string };
    rect1: {
      x: string;
      y: string;
      width: string;
      height: string;
      rx: string;
      transform?: string;
      fill: string;
    };
    image: {
      x: string;
      y: string;
      width: string;
      height: string;
      rx: string;
      transform?: string;
      preserveAspectRatio: string;
    };
    rect2: {
      x: string;
      y: string;
      width: string;
      height: string;
      rx: string;
      transform?: string;
      fill: string;
      fillOpacity: string;
    };
  };
  imageUrl?: string;
}

function BackgroundLetter({ props, imageUrl }: Props) {
  const DEFAULT_IMAGE = "static/images/room-default.png";

  return (
    <g filter={props.g.filter} id={props.g.id}>
      <rect
        x={props.rect1.x}
        y={props.rect1.y}
        width={props.rect1.width}
        height={props.rect1.height}
        rx={props.rect1.rx}
        transform={props.rect1.transform || ""}
        fill={props.rect1.fill}
      />
      <image
        href={imageUrl || DEFAULT_IMAGE}
        x={props.image.x}
        y={props.image.y}
        width={props.image.width}
        height={props.image.height}
        rx={props.image.rx}
        transform={props.image.transform || ""}
        preserveAspectRatio={props.image.preserveAspectRatio}
      />
      <rect
        x={props.rect2.x}
        y={props.rect2.y}
        width={props.rect2.width}
        height={props.rect2.height}
        rx={props.rect2.rx}
        transform={props.rect2.transform || ""}
        fill={props.rect2.fill}
        fillOpacity={props.rect2.fillOpacity}
      />
    </g>
  );
}

export default BackgroundLetter;
