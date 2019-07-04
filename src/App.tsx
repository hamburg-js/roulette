import React, { useState } from "react";
import Arm from "./Arm";
import Wheel from "./Wheel";
import Confetti from "./Confetti";
import styled from "styled-components";
import BottomButton from "./BottomButton";
import useCandidates from "./hooks/useCandidates";

const Stage = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  background: #f7f0ee;
`;

export default function App() {
  const [spin, setSpin] = useState(false);
  const [winner, setWinner] = useState<Candidate>();
  const [candidates, removeCandidate] = useCandidates();
  if (!candidates || !candidates.length) return null;
  const candidate = candidates.length === 1 ? candidates[0] : winner;
  if (candidate)
    return (
      <Confetti
        {...candidate}
        onClick={() => {
          removeCandidate(candidate);
          setWinner(undefined);
          setSpin(false);
        }}
      />
    );
  return (
    <Stage>
      <Wheel spin={spin} onDone={setWinner} candidates={candidates} />
      {spin && <Arm />}
      {!spin && <BottomButton onClick={() => setSpin(true)}>GO!</BottomButton>}
    </Stage>
  );
}
