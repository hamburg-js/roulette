import { useRef, useLayoutEffect } from "react";

export default function useCanvas(
  draw: (
    ctx: CanvasRenderingContext2D,
    dimensions: { width: number; height: number }
  ) => void
) {
  const ref = useRef<HTMLCanvasElement>(null);
  useLayoutEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    var dpr = window.devicePixelRatio || 1;
    var { width, height } = canvas.getBoundingClientRect();

    //canvas.style.width = width + "px";
    //canvas.style.height = height + "px";

    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(dpr, dpr);

    const dimensions = { width, height };
    let animationFrameId = requestAnimationFrame(renderFrame);
    function renderFrame() {
      animationFrameId = requestAnimationFrame(renderFrame);
      if (ctx) draw(ctx, dimensions);
    }
    return () => cancelAnimationFrame(animationFrameId);
  });
  return ref;
}
