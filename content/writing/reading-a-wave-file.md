---
title: "Part 1: Reading A WAVE File"
date: "2026-06-01"
description: "Understanding the RIFF/WAVE format, opening the file, and reading the raw samples into buffers"
series: "Building An Audio Engine"
part: 1
---

Before I start building the engine, I need to be able to read a `.wav` file into memory so we have some data to pass around. There are plenty of libraries that could handle this for me, but I'd prefer to do everything by hand here. Let's start off by looking at the format of a `.wav` file and how it's laid out.

## The WAVE Format

The WAVE file format is a subset of Microsoft's `RIFF` format. A file starts out with a `RIFF` header, followed by a sequence of chunks, typically a `fmt` chunk that describes the format of the data, and a `data` chunk containing the actual audio data. There may be additional chunks present too to store things like album artwork, artist/album/track names, or tempo/MIDI data.

The `RIFF` header is 12 bytes, and each chunk after has a 4-byte `chunkName`, a 4-byte `chunkSize`, then the actual chunk's data.

```
       __
      | "RIFF"      (4 bytes)       // RIFF title
RIFF  |  File Size  (4 bytes)       // File size
      | "WAVE"      (4 bytes)       // File format
       ‾‾
       __
      | "fmt "      (4 bytes)       // Chunk name
      | Chunk Size  (4 bytes)       // Chunk size
      | PCM Flags   (2 bytes)       // 1, 2, 3 or 65534
      | Channels    (2 bytes)       // Channel count
      | Sample Rate (4 bytes)       // Samples/second
      | Byte Rate   (4 bytes)       // Bytes per second
FMT   | Block Align (2 bytes)       // One audio frame length
      | Bits Per Sample (2 bytes)   // Bit Depth
      |  __
      | | Extension Size     (2 bytes)  // Optional extension
      | | Valid Bits/Sample  (2 bytes)
      | | Channel Mask       (4 bytes)  // Surround config
      | | Sub Format GUID    (16 bytes) // If PCM Flags = 65534
      |  ‾‾
       ‾‾
       __
      | "data"      (4 bytes)      // Chunk name
DATA  | Chunk Size  (4 bytes)      // Chunk size
      | Audio Data  (Chunk Size bytes)
       ‾‾
```

## Opening and Validating the File

First, we have to open the file in raw binary mode `"rb"`, and validate the `"RIFF"` and `"WAVE"` headers.

```c++
FILE *file = fopen("./path_to_file.wav", "rb");
if (!file) {
  throw std::runtime_error("Error opening file");
}

std::string riff = readString(file, 4);    // (4 bytes) Riff Title
uint32_t fileSize = readU32(file);         // (4 bytes) File Size
std::string format = readString(file, 4);  // (4 bytes) File Format

if (riff != "RIFF" || format != "WAVE") {
  fclose(file);
  throw std::runtime_error("Only .wav files are supported");
};
```

## Looping the Chunks

We can loop over the chunks by first reading the `chunkName` and `chunkSize`, then seeking to the end of the chunk when we are done.

```c++
char chunkName[5] = {}; // 5 to include the string terminator \0
uint32_t chunkSize;
while (fread(&chunkName, 4, 1, file) && fread(&chunkSize, 4, 1, file)) {
  long chunkEnd = ftell(file) + chunkSize + (chunkSize & 1);
  // ...
  fseek(file, chunkEnd, SEEK_SET);
}
```

### The Format Chunk

The `fmt` chunk holds the main metadata for the file.

```c++
if (std::strcmp(chunkName, "fmt ") == 0) {
  uint16_t pcmFlags = readU16(file);        // (2 bytes) PcmFlags
  uint16_t channels = readU16(file);        // (2 bytes) Channel Count
  uint32_t sampleRate = readU32(file);      // (4 bytes) Sample Rate
  uint32_t byteRate = readU32(file);        // (4 bytes) Byte Rate
  uint16_t blockAlign = readU16(file);      // (2 bytes) Block Align
  uint16_t bitsPerSample = readU16(file);   // (2 bytes) Bits Per Sample

  // Extension if it exists
  if (chunkSize != 16) {
    uint16_t extensionSize = readU16(file); // (2 bytes) Extension Size

    // If wave format extensible
    if (pcmFlags == 65534) {
      uint16_t validBits = readU16(file);   // (2 bytes) Valid Bits/Sample
      uint32_t channelMask = readU32(file); // (4 bytes) Channel Mask
      uint32_t subFormat = readU32(file);           // (4 bytes) Sub Format
    }
  }
}
```

### The Data Chunk

The audio data is stored as a bunch of samples one after another on disc. They are raw signed integers, 16, 24, or 32-bits wide. A 24-bit sample, for example, spans the range `-8388608` to `8388607`. The engine will be expecting 32-bit floats in the `-1` to `1` range, so for each sample we need to copy it into a 32-bit container, fix the sign, and normalize it to a float. Now that we know `bitsPerSample` from the `fmt` chunk, we know where one sample ends and the next starts.

```
     16-bit sample       16-bit sample      16-bit sample
   ________________    ________________    ________________
  |                |  |                |  |                |
  00000000, 00000000, 00000000, 00000000, 00000000, 00000000


          24-bit sample                24-bit sample
   __________________________    __________________________
  |                          |  |                          |
  00000000, 00000000, 00000000, 00000000, 00000000, 00000000


                         32-bit sample
             ____________________________________
            |                                    |
            00000000, 00000000, 00000000, 00000000
```

#### Initializing Vectors and Looping

First, we need to create a vector of floats to store the final samples. We can calculate the total number of samples from `bitsPerSample` and `chunkSize`.

```c++
if (std::strcmp(chunkName, "data") == 0) {
  int bytesPerSample = bitsPerSample / 8;
  int numberOfSamples = chunkSize / bytesPerSample;
  auto samples = std::vector<float>(numberOfSamples);

  // ...
}
```

Now we can loop over each sample and process it. We will read all the bytes from the file into memory first, so that we are not doing a file read for each individual one, then we can start by copying each sample into a 4-byte integer.

```c++
std::vector<uint8_t> rawBytes(chunkSize);
fread(rawBytes.data(), 1, chunkSize, file);

for (int i = 0; i < numberOfSamples; i++) {
  uint32_t rawValue = 0; // 4 bytes
  memcpy(&rawValue, rawBytes.data() + (i * bytesPerSample), bytesPerSample);
  // ...
}
```

#### Copying the Sign

When we copy a 16-bit or 24-bit signed integer into a 32-bit container, the signed bit will end up in the wrong place. Computers represent negative numbers with [two's complement](https://en.wikipedia.org/wiki/Two%27s_complement) so when we copy 2 or 3 bytes into a 4-byte container, we need to populate the new empty leading bytes with the sign.

```
            signed bit
                  ↓
                  00000000 00000000 10000000
                  |________________________|
                          3 bytes

          gets copied here
                 ↓
               ______
              |      |
              00000000 00000000 00000000 10000000
              |_________________________________|
                              4 bytes
```

We can do this with a bit shift. `<<` shifts every digit left one digit in binary. So we can shift everything left by the number of extra bits until the sign bit is all the way to the left, then shift it back right. When shifting right on a signed int, the CPU automatically fills the new leftmost bits with the sign.

```c++
int numExtraBits = 32 - bitsPerSample;
int32_t sample = (int32_t)(rawValue << numExtraBits) >> numExtraBits;
```

#### Normalization

Now we have to normalize the values to be within the `-1` to `1` range instead of the raw integer representation. To make sure we end up with the same ratio between the values after conversion, we need to multiply each value by a `normalizationScale` that captures the ratio of `newMax / oldMax`.

The `newMax` will be `1`, and we can calculate the `oldMax` with `2^(bitsPerSample - 1)`. We subtract one bit to account for the signed bit which is only used to determine `+` or `-`. We also need to account for there being one more possible negative value in the integer range. We can do this by adding `1` to our old `oldMax` so it's an even ratio.

The best way to compute `2^anything` is actually with a bit shift as well. Since the `<<` operator shifts everything left one digit in binary, it's the same as multiplying by 2 each time. So `1 << 3` goes from `0001` to `1000` or `(1 × 2 * 2 * 2)` = `8`.

```c++
uint32_t maxValue = 1u << (bitsPerSample - 1);
float normalizationScale = 1.0f / (1 + maxValue);
```

Finally we can apply the normalization, add it to the final vector, and return the samples.

```c++
float normalizedValue = sample * normalizationScale;
samples[i] = normalizedValue;
return samples;
```

### Conclusion

That's the gist of it. There is also the possibility of audio already being stored as 32-bit floats, but it's not as common. It's easy enough to handle though — if the `fmt` chunk indicates `pcmFlags == 3` (IEEE Float), we can just copy the samples straight across and return early. We can also return an `AudioFile` struct instead of just the samples so the engine has access to metadata like `channelCount` and `sampleRate`.

Here is what the code ends up looking like at the end.

```c++
// Final struct to return
struct AudioFile {
  std::vector<float> samples;
  uint32_t sampleRate;
  uint16_t channels;
  uint16_t bitsPerSample;
};

// Main function
AudioFile readAudioFile(std::string path) {
  FILE *file = fopen(path.c_str(), "rb");
  if (!file) {
    throw std::runtime_error("Error opening file: " + path);
  }

  // Riff validation
  std::string riff = readString(file, 4);   // 4 bytes - Riff Title
  uint32_t fileSize = readU32(file) + 8;    // 4 bytes - File Size
  std::string format = readString(file, 4); // 4 bytes - File Format

  if (riff != "RIFF" || format != "WAVE") {
    fclose(file);
    throw std::runtime_error("Only .wav files are supported");
  };

  bool isFloatData = false;

  // Chunks
  char chunkName[5] = {};
  uint32_t chunkSize;
  while (fread(&chunkName, 4, 1, file) && fread(&chunkSize, 4, 1, file)) {
    long chunkEnd = ftell(file) + chunkSize + (chunkSize & 1);

    // Format Chunk
    if (std::strcmp(chunkName, "fmt ") == 0) {
      uint16_t pcmFlags = readU16(file);   // 2 bytes - PcmFlags
      uint16_t channels = readU16(file);   // 2 bytes - Channel Count
      uint32_t sampleRate = readU32(file); // 4 bytes - SampleRate
      uint32_t byteRate = readU32(file);   // 4 bytes - ByteRate
      uint16_t blockAlign = readU16(file); // 2 bytes - BlockAlign
      uint16_t bitDepth = readU16(file);   // 2 bytes - BitDepth

      audioFile.bitsPerSample = bitDepth;
      audioFile.sampleRate = sampleRate;
      audioFile.channels = channels;

      if (pcmFlags == 3) {
        isFloatData = true;
      }

      if (chunkSize != 16) {
        uint16_t extensionSize = readU16(file); // 2 bytes - Extension Size

        // Wave Format Extensible
        if (pcmFlags == 65534) {
          uint16_t validBits = readU16(file);   // 2 bytes - Valid Bits
          uint32_t channelMask = readU32(file); // 4 bytes - Channel Mask
          uint32_t subFormat = readU32(file);   // 4 bytes - Sub Format

          audioFile.bitsPerSample = validBits;
          if (subFormat == 3) {
            isFloatData = true;
          }
        }
      }
    }

    // Data Chunk
    if (std::strcmp(chunkName, "data") == 0) {
      uint16_t bitsPerSample = audioFile.bitsPerSample;

      // Final Vector
      int bytesPerSample = bitsPerSample / 8;
      int numberOfSamples = chunkSize / bytesPerSample;
      audioFile.samples = std::vector<float>(numberOfSamples);

      if (isFloatData) {
        fread(audioFile.samples.data(), sizeof(float), numberOfSamples, file);
      } else {

        // Normalization scale
        float maxValue = 1u << (bitsPerSample - 1);
        float normalizationScale = 1.0f / (1.0 + maxValue);

        // All raw bytes
        std::vector<uint8_t> rawBytes(chunkSize);
        fread(rawBytes.data(), 1, chunkSize, file);

        // Construct each sample
        for (int i = 0; i < numberOfSamples; i++) {
          uint32_t rawValue = 0;
          memcpy(&rawValue, rawBytes.data() + (i * bytesPerSample),
                 bytesPerSample);

          // Shift signed bit
          int unusedBits = 32 - bitsPerSample;
          int32_t sample = (int32_t)(rawValue << unusedBits) >> unusedBits;

          // Normalize
          float normalizedValue = sample * normalizationScale;
          audioFile.samples[i] = normalizedValue;
        }
      }

      fclose(file);
      return audioFile;
    }
    fseek(file, chunkEnd, SEEK_SET);
  }

  fclose(file);
  throw std::runtime_error("Could not locate audio data from file: " + path);
}

// Helpers
std::string readString(FILE *file, uint32_t length) {
  std::string name(length, '\0');
  fread(&name[0], length, 1, file);
  return name;
}

uint32_t readU32(FILE *file) {
  uint32_t value;
  fread(&value, 4, 1, file);
  return value;
}

uint16_t readU16(FILE *file) {
  uint16_t value;
  fread(&value, 2, 1, file);
  return value;
}


```

Here is a link to [the code](https://github.com/westonclark/audio-engine/blob/main/source/file/file.cpp) in its current state.
