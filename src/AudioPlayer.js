import React, { Component } from "react";
import count from "./images/count_to_ten.mp3";
import "./AudioPlayer.css";

class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.audioContext = new AudioContext();
    this.analyserNode = this.audioContext.createAnalyser();
    this.audio = null;
    this.source = null;
    this.canvas = null;
    this.ctx = null;

    this.connectAudio = this.connectAudio.bind(this);
    this.animateVolumeMeter = this.animateVolumeMeter.bind(this);
  }

  componentDidMount() {
    this.connectAudio();

    this.canvas = document.querySelector("#volumeMeter");
    this.ctx = this.canvas.getContext("2d");

    this.animateVolumeMeter();
  }

  connectAudio() {
    this.audio = document.querySelector("audio");
    this.source = this.audioContext.createMediaElementSource(this.audio);
    this.source.connect(this.analyserNode);
    this.analyserNode.connect(this.audioContext.destination);
  }

  animateVolumeMeter() {
    window.requestAnimationFrame(this.animateVolumeMeter);

    let bars = 100,
      barX,
      barWidth,
      barHeight;
    let freqBinCount = new Uint8Array(this.analyserNode.frequencyBinCount);

    this.analyserNode.getByteFrequencyData(freqBinCount);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "#00c5cc";

    for (let i = 0; i < bars; i++) {
      barX = i * 3;
      barWidth = 2;
      barHeight = -(freqBinCount[i] / 2);
      this.ctx.fillRect(barX, this.canvas.height, barWidth, barHeight);
    }
  }

  render() {
    return (
      <div className="lg">
        <p>
          Please adjust the volume on your computer until you can clearly hear
          the sound playing on this page.
        </p>
        <audio src={count} autoPlay />
        <canvas id="volumeMeter" />
      </div>
    );
  }
}

export default AudioPlayer;
