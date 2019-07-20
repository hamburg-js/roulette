import React, { useEffect } from "react";
import styled from "styled-components";

const TimeBar = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 20px;
  background: #fff;
`;

interface Props {
  url: string;
  percentRemaining: number;
  onClose?: () => void;
}
export default function ReadMe({ url, percentRemaining, onClose }: Props) {
  useEffect(() => {
    const win = window.open(
      url,
      "_blank",
      `height=${window.innerHeight + 32},width=${
        window.outerWidth
      },toolbar=0,location=0,menubar=0`,
      true
    );

    const handle = setInterval(() => {
      if (win && win.closed) {
        clearInterval(handle);
        if (onClose) onClose();
      }
    }, 1000);

    return () => {
      clearInterval(handle);
      if (win) win.close();
    };
  }, [url, onClose]);
  return <TimeBar style={{ maxWidth: `${percentRemaining}%` }} />;
}
