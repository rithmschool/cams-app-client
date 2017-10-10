import React from "react";
import count from "./images/count_to_ten.mp3";

const AudioPlayer = () => (
  <div className="lg">
    <audio src={count} autoPlay />
    <p>
      Please adjust the volume on your computer until you can clearly hear the
      sound playing on this page.
    </p>
  </div>
);

export default AudioPlayer;
