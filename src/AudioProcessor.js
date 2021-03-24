class AudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
  }

  process(inputs, outputs) {
    let input = inputs[0];
    let output = outputs[0];
    let sum = 0.0

    for (let channel = 0; channel < input.length; channel++) {
      output[channel].set(input[channel]);
      for (let sample = 0; sample < input[channel].length(); sample++) {
        sum += input[channel][sample] * input[channel][sample];
      }
    }

    return true;
  }
}

registerProcessor('bypass', Bypass);