---
title: "Introduction: The Audio Engine"
date: "2026-05-01"
description: "Some background behind the project and the design decisions"
series: "Building An Audio Engine"
part: 0
---

Welcome! In this series I'm building an audio engine from scratch in C++. Almost zero dependencies, everything by hand. The engine will handle the audio samples end-to-end. I'll start off supporting macOS with CoreAudio integration, then add Windows and Linux later.

## About the Engine

This will be a channel-based engine, much like a digital mixer. Each channel strip has a static set of processing effects, starting with just gain. Each channel has a selectable input source — an audio file or a hardware device — and all channels sum into a stereo output bus. Eventually there will be more busses than just the master.

```
       ___________________       _____________________
      | Input Node (File) |     | Input Node (Device) |
       ‾‾‾‾‾‾‾‾‾|‾‾‾‾‾‾‾‾‾       ‾‾‾‾‾‾‾‾‾‾|‾‾‾‾‾‾‾‾‾‾
         _______|_______            _______|_______
        | Channel Strip |          | Channel Strip |
         ‾‾‾‾‾‾‾|‾‾‾‾‾‾‾            ‾‾‾‾‾‾‾|‾‾‾‾‾‾‾
                |__________________________|
                             |
                        _____|______
                       | Master Bus |
                        ‾‾‾‾‾|‾‾‾‾‾‾
                      _______|_______
                     | Output Device |
                      ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
```

I'll start with a few different threads. One for audio processing, one for GUI input, one for reading audio samples from disc into a temp buffer. Planning on keeping the audio thread real time safe with `std::atomic` values. CoreAudio passes buffers of samples through audio callback functions, so the input nodes are designed around that same pattern for file input.
