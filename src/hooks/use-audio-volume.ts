import { MutableRefObject } from "react";

/**
 * This hook sets the volume of the audio element to the given number, if they don't agree.
 * @param volume The volume to set to.
 * @param ref The audio element to control.
 */
const useAudioVolume = (
  volume: number,
  ref: MutableRefObject<HTMLAudioElement | null>
) => {
  console.log(ref);
  if (null !== ref.current && ref.current.volume) {
    ref.current.volume = volume;
  }
};
export default useAudioVolume;
