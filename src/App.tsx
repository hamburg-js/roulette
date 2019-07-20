import React, { useState } from "react";
import Arm from "./Arm";
import Wheel from "./Wheel";
import HowTo from "./HowTo";
import Confetti from "./Confetti";
import BottomButton from "./BottomButton";
import useCandidates from "./hooks/useCandidates";
import useLatestMeetup from "./hooks/useLatestMeetup";

export default function App() {
  const [spin, setSpin] = useState(false);
  const [winner, setWinner] = useState<Candidate>();
  const meetup = useLatestMeetup();
  const [candidates, removeCandidate] = useCandidates(meetup && meetup.id);
  if (!meetup) return null;
  if (!candidates || !candidates.length) return <HowTo {...meetup} />;
  const candidate = candidates.length === 1 ? candidates[0] : winner;
  if (candidate) {
    return (
      <Confetti
        {...candidate}
        onDone={() => {
          setSpin(false);
          removeCandidate(candidate);
          setWinner(undefined);
        }}
      />
    );
  }
  return (
    <>
      <Wheel spin={spin} onDone={setWinner} candidates={candidates} />
      {spin && <Arm />}
      {!spin && <BottomButton onClick={() => setSpin(true)}>GO!</BottomButton>}
    </>
  );
}
