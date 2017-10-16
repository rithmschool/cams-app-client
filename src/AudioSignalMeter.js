import React, { Component } from "react";

class AudioSignalMeter extends Component {
  constructor(props) {
    super(props);

    this.audioContext = new AudioContext();
    this.analyserNode = this.audioContext.createAnalyser();
    this.source = null;
    this.ctx = null;
    this.animationId = null;

    this.connectAudio = this.connectAudio.bind(this);
    this.animateVolumeMeter = this.animateVolumeMeter.bind(this);
  }

  componentDidMount() {
    this.connectAudio();
    this.ctx = this.canvas.getContext("2d");
    this.animationId = requestAnimationFrame(this.animateVolumeMeter);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.animationId);
  }

  connectAudio() {
    this.source = this.audioContext.createMediaElementSource(this.props.audio);
    this.source.connect(this.analyserNode);
    this.analyserNode.connect(this.audioContext.destination);
  }

  animateVolumeMeter() {
    this.animationId = requestAnimationFrame(this.animateVolumeMeter);

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
    return <canvas id="volumeMeter" ref={canvas => (this.canvas = canvas)} />;
  }
}

export default AudioSignalMeter;
