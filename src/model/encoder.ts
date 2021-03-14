export interface IEncodedSample {
    id: string,
    blob: Blob,
    url: string
    format: string
}

export interface IEncoderOptions {
    bufferSize: number,
    sampleRate: number,
    channelCount: number
}