import { IEncodedSample, IEncoder, IEncoderOptions } from "../model/encoder";

export default class WavEncoder implements IEncoder {
    bufferSize: number;
    sampleRate: number;
    headerSize: number;
    channelCount: number

    constructor(options : IEncoderOptions) {
        this.bufferSize = options.bufferSize || 4096
        this.sampleRate = options.sampleRate
        this.headerSize = 44 // Consider only 44-byte header for now
        this.channelCount = options.channelCount || 1 // leave at 1 for now (check number of channels supported on device. Do we need more than 1?)
    }

    encode = (samples: Array<Float32Array>) : IEncodedSample => {
        const joinedSamples = this.joinSamples(samples)
        
        const buffer = new ArrayBuffer(this.headerSize + joinedSamples.length * 2)
        const view = new DataView(buffer)

        this.writeHeader(view, samples)

        // write actual samples
        this.floatTo16BitPCM(view, this.headerSize, joinedSamples)

        const blob = new Blob([view], { type: 'audio/wav' })
        
        return {
            id: Date.now().toString(),
            blob: blob,
            url: URL.createObjectURL(blob),
            format: 'wav'
        }
    }

    // Writes header info. Reference: http://www.topherlee.com/software/pcm-tut-wavformat.html
    private writeHeader = (view: DataView, samples: Array<Float32Array>) => {
        // RIFF identifier
        this.writeStringToFile(view, 0, 'RIFF')

        // RIFF chunk length
        view.setUint32(4, 36 + samples.length * 2, true)

        // RIFF type
        this.writeStringToFile(view, 8, 'WAVE')

        // format chunk identifier
        this.writeStringToFile(view, 12, 'fmt ')

        // format chunk length
        view.setUint32(16, 16, true)

        // sample format (raw)
        view.setUint16(20, 16, true)

        // channel count
        view.setUint16(22, this.channelCount, true)

        // sample rate
        view.setUint32(28, this.sampleRate, true)

        // byte rate (sample rate * block align)
        view.setUint32(28, this.sampleRate * 4, true)

        // block align (channel count * bytes per sample)
        view.setUint16(32, this.channelCount * 4, true)

        // bits per sample
        view.setUint16(34, 16, true)

        // data chunk identifier
        this.writeStringToFile(view, 36, 'data')

        // data chunk length
        view.setUint32(40, samples.length * 2, true)
        
    }

    private joinSamples = (samples: Array<Float32Array>) : Float64Array => {
        const recordLength = samples.length * this.bufferSize
        const joinedSamples = new Float64Array(recordLength)
        let offset = 0

        samples.forEach(sample => {
            joinedSamples.set(sample, offset)
            offset += sample.length
        })

        return joinedSamples
    }

    private floatTo16BitPCM(output: DataView, offset: number, input: Float64Array) {
        console.log({
            output,
            offset,
            input
        })
        for (let i = 0; i < input.length; i++, offset += 2) {
            let s = Math.max(-1, Math.min(1, input[i]))
            output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true)
        }
    }

    private writeStringToFile = (view: DataView, offset: number, string: string) => {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i))
        }
    }
}