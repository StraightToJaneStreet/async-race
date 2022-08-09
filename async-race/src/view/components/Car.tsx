import React from 'react';

interface CarComponentProps {
  color: string;
  trackProgress: number;
}

export default function Car({ color, trackProgress: shift }: CarComponentProps) {
  return (
    <div
      className="car"      
      style={({ transform: `translate3d(${shift}%, 0, 0)` })}
      >
      <svg
        width="100"
        height="50"
        viewBox="0 0 52.916667 31.75"
        version="1.1"
        id="svg5"
        xmlns="http://www.w3.org/2000/svg">
        <defs
          id="defs2" />
        <g
          id="layer1">
          <circle
            id="path3865"
            cx="7.9139266"
            cy="24.538902"
            r="4.5626535" />
          <circle
            id="path3865-3"
            cx="42.254929"
            cy="24.538902"
            r="4.5626535" />
          <rect
            fill={color}
            id="rect4061"
            width="52.623562"
            height="19.129787"
            x="0.14655274"
            y="0.14655274"
            ry="9.5648937" />
        </g>
      </svg>
    </div>
  )
}
