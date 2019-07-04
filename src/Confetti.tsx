import React from "react";
import styled from "styled-components";
import useCanvas from "./hooks/useCanvas";
import BottomButton from "./BottomButton";

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Photo = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
`;

const Name = styled.a`
  font-size: 10vw;
  font-weight: bold;
  text-decoration: underline;
  color: #fff;
  transform: rotate(-10deg);
`;

function randomFromTo(a: number, b: number) {
  return Math.floor(Math.random() * (b - a + 1) + a);
}

var intensity = 150;
var angle = 0;
var speed = 2;
var tiltAngle = 0;
var TiltChangeCountdown = 5;

type Color = {
  r: number;
  g: number;
  b: number;
};

type Particle = {
  x: number;
  y: number;
  r: number;
  d: number;
  color: string;
  tilt: number;
  tiltAngleIncremental: number;
  tiltAngle: number;
};

var particles: Particle[] = [];

function initParticles(width: number, height: number) {
  for (var e = 0; e < intensity; e++) {
    var color = {
      r: Math.floor(255 * Math.random()),
      g: Math.floor(255 * Math.random()),
      b: Math.floor(255 * Math.random())
    };

    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: randomFromTo(5, 30),
      d: Math.random() * intensity + 10,
      color: "rgba(" + color.r + ", " + color.g + ", " + color.b + ", 0.7)",
      tilt: Math.floor(10 * Math.random()) - 10,
      tiltAngleIncremental: 0.07 * Math.random() + 0.05,
      tiltAngle: 0
    });
  }
}

interface Props extends Candidate {
  onClick: () => void;
}
export default function Confetti({ name, photo, url, color, onClick }: Props) {
  const ref = useCanvas((ctx, { width, height }) => {
    if (!particles.length) {
      initParticles(width, height);
    }
    ctx.clearRect(0, 0, width, height);
    particles.forEach(d => {
      ctx.beginPath();
      ctx.lineWidth = d.r / 2;
      ctx.strokeStyle = d.color;
      ctx.moveTo(d.x + d.tilt + d.r / 4, d.y);
      ctx.lineTo(d.x + d.tilt, d.y + d.tilt + d.r / 4);
      ctx.stroke();
    });

    angle += 0.01;
    tiltAngle += 0.1;
    TiltChangeCountdown--;

    particles.forEach((c, a) => {
      c.tiltAngle += c.tiltAngleIncremental;
      c.y += (Math.cos(angle + c.d) + 1 + c.r / speed) / 2;
      c.x += Math.sin(angle);
      c.tilt = 15 * Math.sin(c.tiltAngle - a / 3);

      if (c.x > width + 5 || c.x < -5 || c.y > height) {
        particles[a] =
          a % 5 > 0 || a % 2 === 0
            ? {
                ...c,
                x: Math.random() * width,
                y: -10,
                tilt: Math.floor(10 * Math.random()) - 10
              }
            : Math.sin(angle) > 0
            ? {
                ...c,
                x: -5,
                y: Math.random() * height,
                tilt: Math.floor(10 * Math.random()) - 10
              }
            : {
                ...c,
                x: width + 5,
                y: Math.random() * height,
                tilt: Math.floor(10 * Math.random()) - 10
              };
      }
    });
  });
  return (
    <Background style={{ backgroundColor: color }}>
      <Photo src={photo} />
      <Name href={url}>{name}</Name>
      <Canvas ref={ref} />
      <BottomButton style={{ color }} onClick={onClick}>
        Next...
      </BottomButton>
    </Background>
  );
}
