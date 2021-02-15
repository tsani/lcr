import React, {
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import {
  Container,
  Header,
  Icon,
  Input,
  Button,
} from "semantic-ui-react";
import LcrHeader from "./components/lcr-header";
import { LCR_URL } from "./constants";
import Audio from "./components/audio";
import usePersistentState from "./hooks/use-persistent-state";

const Reset = () => {};

function App() {
  const getMetArt = async () => {
    //returns object with total. all valid object IDs
    const objectsResponse = await fetch(
      "https://collectionapi.metmuseum.org/public/collection/v1/objects",
      { method: "GET" }
    );
    const die = (): never => {
      throw new Error(
        "Couldn't get list of valid art IDs from the Met :("
      );
    };

    if (!objectsResponse.ok) die();

    const validIDs = await objectsResponse.json();
    const metCollectionSize = validIDs.total;

    while (true) {
      const randomIndex = Math.floor(
        Math.random() * metCollectionSize
      );
      const response = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${validIDs.objectIDs[randomIndex]}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) die();
      //this "json-ifies" the response from the server
      const JsonResponse = await response.json();
      if (JsonResponse.isPublicDomain) {
        console.log(JsonResponse);
        return JsonResponse;
      }
    }
  };

  const [volume, setVolume] = usePersistentState(
    "volume",
    0.0,
    {
      toString: (x) => x.toString(),
      fromString: (x) => parseFloat(x),
    }
  );
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
          onChange={(e) =>
            setVolume(parseInt(e.target.value))
          }
          type="range"
        />
        <Audio
          url={LCR_URL}
          audioRef={audioRef}
          volume={volume / 100}
        />
        <Button onClick={(e) => getMetArt()}>
          Met API Call
        </Button>
      </div>
    </Container>
  );
}

export default App;
