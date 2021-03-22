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

  isRecording: boolean;
  duration: number;
  volume: number;

  input!: MediaStreamAudioSourceNode
  /*
   TODO: Change ScriptProcessorNode to AudioWorkletProcessor
   See: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_AudioWorklet
   */
  processor!: AudioWorkletNode | null
  stream!: MediaStream

  audioSamples: Array<Float32Array>;

  constructor(options: IRecorderOptions) {
    this.beforeRecording = options.beforeRecording;
    this.pauseRecording = options.pauseRecording;
    this.afterRecording = options.afterRecording;
    this.micFailed = options.micFailed;
        
    this.format = options.format || "wav";
    this.encoder = new WavEncoder(options.encoderOptions);

    this.context = new window.AudioContext();
    this.isRecording = false;
    this.duration = 0;
    this.volume = 0;

    this.audioSamples = [];
    this.createMyAudioProcessor().then(node => {
      this.processor = node;
    });
  }

  createMyAudioProcessor = async () => {
    if (!this.context) {
      try {
        this.context = new AudioContext();
        await this.context.resume();
        await this.context.audioWorklet.addModule("AudioProcessor.js");
      } catch(e) {
        return null;
      }
    }
  
    return new AudioWorkletNode(this.context, "Bypass");
  }  

  async start() {
    const constraints = {
      video: false,
      audio: {
        channelCount: 1,
        echoCancellation: false,
      },
    };

    navigator.mediaDevices.getUserMedia(constraints)
        .then(this.captureMic.bind(this))
        .catch(this.micError.bind(this))

  }

  stop() : string {
    this.stream.getTracks().forEach((track) => { track.stop() })
    this.input.disconnect()
    this.processor!.disconnect()
    // this.context.close()

    console.log({samples: this.audioSamples})
    const encoded = this.encoder.encode(this.audioSamples)
    console.log({encoded})
    this.audioSamples = []

    return encoded.url;
  }

  private captureMic(stream: MediaStream) : void {
    this.stream = stream;
    this.input = this.context.createMediaStreamSource(stream)

    this.input.connect(this.processor)
    this.processor.connect(this.context.destination)
    this.isRecording = true
  }

  private micError(error: Error) {
    this.micFailed && this.micFailed(error)
  }
}
