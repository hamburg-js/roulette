import React from "react";
import QRCode from "qrcode.react";
import styled from "styled-components";

const Hd = styled.h1`
  font-size: 7vh;
  font-weight: bold;
  text-decoration: underline;
  text-align: center;
  color: #333;
  transform: rotate(-10deg);
`;

const P = styled.p`
  max-width: 50vh;
  margin: 2em auto;
  font-size: 3vh;
  line-height: 1.3;
`;

const QR = styled(QRCode)`
  display: block;
  width: 50vh;
  height: 50vh;
  margin: auto;
`;

interface Props {
  link: string;
}

export default function HowTo({ link }: Props) {
  return (
    <>
      <Hd>
        README
        <br />
        Roulette
      </Hd>
      <P>
        Goto meetup.com and post a GitHub or NPM link as comment under today's
        event.
      </P>
      <QR
        value={link}
        renderAs="svg"
        bgColor="transparent"
        fgColor="#333"
        size={window.innerWidth}
      />
    </>
  );
}
