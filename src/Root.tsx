import React from "react";
import styled from "styled-components";
import App from "./App";
import logo from "./logo.svg";

const Stage = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  background: #f7f0ee;
`;

const Logo = styled.img`
  position: absolute;
  top: 0;
  right: 20px;
  width: 100px;
`;

export default function Root() {
  return (
    <Stage>
      <App />
      <Logo src={logo} />
    </Stage>
  );
}
