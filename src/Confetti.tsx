import React from "react";
import styled, { keyframes } from "styled-components";
import useCanvas from "./hooks/useCanvas";
import BottomButton from "./BottomButton";
import useAudio from "./hooks/useAudio";
import useCountdown from "./hooks/useCountDown";
import ReadMe from "./ReadMe";

const README_SECONDS = 60 * 3;

const fadeIn = keyframes`
  0 { opacity: 0 }
  to { opacity: 1 }
`;

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  animation: ${fadeIn} 1s forwards;
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
  object-fit: cover;
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
var speed = 2;

type Particle = {
  x: number;
  y: number;
  r: number;
  d: number;
  color: string;
  tilt: number;
  tiltAngleInc: number;
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
      tiltAngleInc: 0.07 * Math.random() + 0.05,
      tiltAngle: 0
    });
  }
}

interface Props extends Candidate {
  onDone: () => void;
}
export default function Confetti({ name, photo, url, color, onDone }: Props) {
  let angle = 0;

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
    particles.forEach((c, a) => {
      c.tiltAngle += c.tiltAngleInc;
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
  useAudio(`${process.env.PUBLIC_URL}/cheer.mp3`);
  const [countDown, startCountDown, abortCountDown] = useCountdown(
    README_SECONDS,
    onDone
  );
  return (
    <Background style={{ backgroundColor: color }}>
      <Photo src={photo} />
      <Name>{name}</Name>
      <Canvas ref={ref} />

      {countDown ? (
        <ReadMe
          url={url}
          percentRemaining={(countDown / README_SECONDS) * 100}
          onClose={abortCountDown}
        />
      ) : (
        <BottomButton style={{ color }} onClick={startCountDown}>
          README!
        </BottomButton>
      )}
    </Background>
  );
}
