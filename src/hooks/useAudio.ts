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
    if (src) a.src = src;
    setTimeout(() => a.play(), delay);
    const volume = fade ? 1 / fade / 10 : 1;
    function fadeOut() {
      if (fade <= 0) document.body.removeChild(a);
      else {
        fade -= 100;
        a.volume -= volume;
        setTimeout(fadeOut, 100);
      }
    }
    return fadeOut;
  }, [src]);
}
