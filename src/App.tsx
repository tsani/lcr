import React, { useRef, useState } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Button, Container, Input } from "semantic-ui-react";
import LcrHeader from "./components/lcr-header";
import { LCR_URL } from "./constants";
import LcrAudio from "./components/lcr-audio";
import { usePersistentNumber } from "./hooks/use-persistent-state";
import { timeout, useOnceAsync } from "./util";

interface ResetProps {
  handleClick: () => void;
}

const Reset = ({ handleClick }: ResetProps) => {
  return <Button onClick={() => handleClick()}>Reset</Button>;
};

const useResetAudioElement = (
  ref: React.RefObject<HTMLAudioElement>
): (() => Promise<void>) => {
  const f = useOnceAsync(async () => {
    const a = ref.current;
    if (!a) return;
    const oldSrc = a.currentSrc;
    a.src = "";
    await timeout(500);
    a.src = oldSrc;
    await a.play();
  });
  return async () => {
    await f();
  };
};

function App() {
  const [volume, setVolume] = usePersistentNumber("volume", 0.0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const handleReset = useResetAudioElement(audioRef);
  return (
    <Container textAlign="center">
      <LcrHeader />
      <div>
        <Input
          label="Volume"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(parseInt(e.target.value))}
          type="range"
        />
        <LcrAudio url={LCR_URL} audioRef={audioRef} volume={volume / 100} />
      </div>
      <div>
        <Reset handleClick={handleReset} />
      </div>
    </Container>
  );
}

export default App;
