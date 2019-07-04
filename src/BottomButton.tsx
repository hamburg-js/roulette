import styled from "styled-components";

const BottomButton = styled.button`
  font-size: 5vw;
  position: absolute;
  z-index: 1;
  display: block;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0.2em;
  background: #fff;
  border: none;
  text-align: center;
  font-style: italic;
  margin: 0 auto;
  color: #000;
  transition: all 0.2s;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  :hover {
    padding: 0.5em;
  }
`;

export default BottomButton;
