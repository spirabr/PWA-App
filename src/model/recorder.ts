import { IEncoder, IEncoderOptions } from "./encoder";

export interface IRecorder {
    beforeRecording?: Function
    pauseRecording?: Function
    afterRecording?: Function

    micFailed?: Function

    format: string
    encoder: IEncoder

    isRecording: boolean
    duration: number

    start() : void
}

export interface IRecorderOptions {
    beforeRecording?: Function
    pauseRecording?: Function
    afterRecording?: Function
    micFailed?: Function
    format: string
    encoderOptions: IEncoderOptions
}