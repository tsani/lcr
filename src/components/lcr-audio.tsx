import React, { MutableRefObject } from "react";
import useAudioVolume from "../hooks/use-audio-volume";

export interface AudioProps {
  volume: number;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  url: string;
}

const LcrAudio = ({ url, volume, audioRef }: AudioProps) => {
  useAudioVolume(volume, audioRef);

  return (
    <audio ref={audioRef} autoPlay>
      <source src={url} />
    </audio>
  );
};
export default LcrAudio;
