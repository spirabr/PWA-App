export interface IEncoder {
    bufferSize: number;
    sampleRate: number;
    headerSize: number;
    channelCount: number
    encode(samples: Array<Float32Array>): IEncodedSample
}

export interface IEncodedSample {
    id: string,
    blob: Blob,
    url: string,
    format: string
}

export interface IEncoderOptions {
    bufferSize: number,
    sampleRate: number,
    channelCount: number
}