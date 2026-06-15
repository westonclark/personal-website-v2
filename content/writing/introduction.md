---
title: "Introduction: The Audio Engine"
date: "2026-05-01"
description: "Some background behind the project and the design decisions"
series: "Building An Audio Engine"
part: 0
---

Welcome! In this series I will be writing an audio engine from scratch in C++. The goal is to use zero dependencies or external libraries and do everything by hand. I want to handle the audio samples all the way from the input source through the engine to the output device. I will start out only supporting MacOS with CoreAudio, but I will eventually support Windows and Linux in the future.

## About the Engine

This will be a channel-based engine, much like a digital mixer. There will be a static set of processing effects for each "channel strip", starting out with just gain. Each channel will have a selectable input source (either audio file or hardware device) and all the channels will sum together into a stereo output bus, though eventually we will support more busses than just the master. We will start off with one thread for the audio processing layer and one for the GUI user input layer. We will use `std::atomic` values to safely update values across the two. CoreAudio operates by passing buffers of samples through audio callback functions, so we will try to design the input nodes to the engine to be consistent with this pattern.

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
