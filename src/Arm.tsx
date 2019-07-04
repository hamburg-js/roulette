import React from "react";
import styled, { keyframes } from "styled-components";

const arm = keyframes`
  0 {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-100%);
  }
  85% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const hand = keyframes`
  0% {
    transform: rotate(25deg);
  }
  60% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const finger = keyframes`
  0% {
    transform: rotate(5deg);
  }
  100% {
    transform: rotate(-10deg);
  }
`;

const Svg = styled.svg`
  position: fixed;
  left: 100vw;
  top: calc(50vh - 16vw);
  width: 33vw;
  transform: translateX(0);
  animation: ${arm} 2s ease-in-out;
  & .finger {
    animation: ${finger} 0.05s 1s both ease-in;
    transform-origin: 98px 39px;
  }
  & .hand {
    animation: ${hand} 0.1s 1.1s both ease-out;
    transform-origin: 138px 83px;
  }
`;

export default function Arm() {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="-55 -220 520 564">
      <g fill="#F0B065" fillRule="evenodd">
        <path d="M97 70c0-16 12-28 28-28 13 0 23 7 28 18l16 35-42 14c-3-4-6-7-8-9l-6-3c-10-5-16-15-16-27z" />
        <g className="hand">
          <path d="M79 9c-8 5-2 18 18 39-16 6-34 14-53 24-7 7-2 15 11 21 7 9 25 18 38 11 23-12 40-3 51-14s17-34-18-49C99 31 91 3 79 9z" />
          <path
            className="finger"
            d="M101 46.3c-1-10.3-27-9.1-46.3-1.8-19.5 8.8-57.5 36.6-49 45.3 8.6 8.7 37.6-21.4 49.7-25 13-4.2 47.5-8.9 45.6-18.5z"
          />
        </g>
        <path
          fill="#696B8A"
          d="M124 106c39 88 98 139 178 153 79 13 151-9 217-67l-1-77c-70 82-139 114-208 96-70-18-117-58-143-120l-43 15z"
        />
      </g>
    </Svg>
  );
}
