import { IEncoder } from "../model/encoder";
import { IRecorder, IRecorderOptions } from "../model/recorder";
import WavEncoder from "./wav-encoder";

export class AudioRecorder implements IRecorder {
  beforeRecording?: Function;
  pauseRecording?: Function;
  afterRecording?: Function;

  micFailed?: Function;

  format: string;
  encoder: IEncoder;
  context: AudioContext;

  isRecodring: boolean;
  duration: number;
  volume: number;

  input!: MediaStreamAudioSourceNode
  /*
   TODO: Change ScriptProcessorNode to AudioWorkletProcessor
   See: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_AudioWorklet
   */
  processor: ScriptProcessorNode | undefined
  stream!: MediaStream

  audioSamples: Array<Float32Array>;

  constructor(options: IRecorderOptions) {
    this.beforeRecording = options.beforeRecording;
    this.pauseRecording = options.pauseRecording;
    this.afterRecording = options.afterRecording;
    this.micFailed = options.micFailed;

    this.format = options.format || "wav";
    this.encoder = new WavEncoder(options.encoderOptions);

    this.context = new (window.AudioContext || window.webkitAudioContext)()

    this.isRecodring = false;
    this.duration = 0;
    this.volume = 0;

    this.audioSamples = [];
  }

  start() {
    const constraints = {
      video: false,
      audio: {
        channelCount: 1,
        echoCancellation: false,
      },
    };

    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(this.captureMic.bind(this))
        .catch(this.micError.bind(this))
    
  }

  stop() {
    this.stream.getTracks().forEach((track) => { track.stop() })
    this.input.disconnect()
    this.processor!.disconnect()
    this.context.close()

    const encoded = this.encoder.encode(this.audioSamples)
    console.log({encoded})
    this.audioSamples = []

  }

  private captureMic(stream: MediaStream) : void {
    this.input = this.context.createMediaStreamSource(stream)

    this.processor = this.context.createScriptProcessor(this.encoder.bufferSize, 1, 1)
    this.processor.onaudioprocess = (event) => {
        const sample = event.inputBuffer.getChannelData(0)
        let sum = 0.0
        this.audioSamples.push(new Float32Array(sample))

        for (let i = 0; i < sample.length; ++i) {
            sum += sample[i] * sample[i]
        }

        this.duration += parseFloat(this.context.currentTime.toFixed(2))
        this.volume = Math.sqrt(sum / sample.length)
    }

    this.input.connect(this.processor)
    this.processor.connect(this.context.destination)
    this.isRecodring = true
  }

  private micError(error: Error) {
    this.micFailed && this.micFailed(error)
  }
}
