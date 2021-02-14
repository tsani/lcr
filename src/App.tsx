import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Container, Header, Icon, Input } from "semantic-ui-react";
import LcrHeader from "./components/lcr-header";
import { LCR_URL } from "./constants";
import Audio from "./components/audio";
import usePersistentState from "./hooks/use-persistent-state";

const Reset = () => {};

function App() {
  const [volume, setVolume] = usePersistentState("volume", 0.0, {
    toString: (x) => x.toString(),
    fromString: (x) => parseFloat(x),
  });
  const audioRef = useRef<HTMLAudioElement>(null);

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
        <Audio url={LCR_URL} audioRef={audioRef} volume={volume / 100} />
      </div>
    </Container>
  );
}

export default App;
