import { useEffect } from "react";

/**
 * Hook that plays an audio file
 */
export default function useAudio(
  src: string | false,
  { delay = 0, loop = false, fade = 0 } = {}
) {
  useEffect(() => {
    const a = document.createElement("audio");
    a.loop = loop;
    document.body.appendChild(a);
    setTimeout(() => a.play(), delay);
    if (src) a.src = src;

    const decay = fade ? (1 / fade) * 100 : 1;
    function fadeOut() {
      if (a.volume <= 0) document.body.removeChild(a);
      else {
        a.volume = Math.max(0, a.volume - decay);
        setTimeout(fadeOut, 100);
      }
    }
    return fadeOut;
  }, [src, delay, loop, fade]);
}
