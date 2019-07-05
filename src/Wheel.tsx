import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import useCanvas from "./hooks/useCanvas";
import useAudio from "./hooks/useAudio";

const h = 5000;

const Canvas = styled.canvas`
  position: absolute;
  left: 25vw;
  top: calc(50vh - 25vw);
  width: 50vw;
  height: 50vw;
`;

function getRandom(a: number, b: number) {
  return Math.floor(Math.random() * a + b);
}

function easeOut(
  current: number,
  start: number,
  change: number,
  duration: number
) {
  const x = (current /= duration) * current;
  return start + change * (x * current + -3 * x + 3 * current);
}

interface Props {
  candidates: any[];
  spin: boolean;
  onDone: (winner: any) => void;
}
export default function Wheel({ candidates, spin, onDone }: Props) {
  useAudio(`${process.env.PUBLIC_URL}/theme.mp3`, { loop: true, fade: 5000 });
  const spinning = useRef(spin);

  var startAngle = 0;
  var f = 0;
  var d = 10 + getRandom(17, 20);

  const ref = useCanvas((ctx, { width }) => {
    const arc = Math.PI / (candidates.length / 2);

    if (spinning.current) {
      f += 10;
      if (f >= h) {
        var i = (180 * startAngle) / Math.PI + 90;
        var j = (180 * arc) / Math.PI;
        var k = Math.floor((360 - (i % 360)) / j);
        onDone(candidates[k]);
        return;
      }
      const a = d - easeOut(f, 0, d, h);
      startAngle += (a * Math.PI) / 180;
    }

    var center = width / 2;

    var radius = center - 30;
    ctx.clearRect(0, 0, 1e3, 1e3);
    candidates.forEach((t, g) => {
      var h = startAngle + g * arc;
      ctx.fillStyle = t.color;
      ctx.beginPath();
      ctx.arc(center, center, radius, h, h + arc);
      ctx.arc(center, center, 0, h + arc, h, true);
      ctx.fill();
      ctx.save();
    });
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(center - 30, 15);
    ctx.lineTo(center + 30, 15);
    ctx.lineTo(center, 60);
    ctx.lineTo(center - 30, 15);
    ctx.fill();
  });

  useEffect(() => {
    const handle = setTimeout(() => {
      spinning.current = spin;
    }, 1100);
    return () => clearTimeout(handle);
  }, [spin]);

  return <Canvas ref={ref} />;
}
