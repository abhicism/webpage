---
title: Local AI Is a Memory Problem, and This Week Showed Two Ways to Solve It
subtitle: Microsoft is selling up to 128 GB of unified memory for AI work. A solo developer streams an 80 billion parameter model from an SSD on a 32 GB laptop. Same constraint, very different answers.
date: 2026-10-14
tags: LLM, Architecture, Developer Productivity
---
Running a large language model on your own machine comes down to one constraint: memory. The model's weights have to be somewhere the processor can reach quickly, and the bigger the model, the more room that takes. Two announcements this week attacked that constraint from opposite directions, and reading them side by side is a useful way to understand where local AI actually stands.

## Answer one: buy more memory

On October 7, Microsoft and Nvidia unveiled the Surface Laptop Ultra, built on Nvidia's RTX Spark platform. It pairs a Blackwell GPU with up to 6,144 cores and an Nvidia Grace CPU with up to 20 cores, and the two share one pool of up to 128 GB of unified memory. Microsoft says it can run models above 120 billion parameters locally and reach up to one petaflop of AI performance. Preorders opened October 7, it ships October 16, and it starts at $2,599.

Two details matter here. First, those are maximums. The base configuration reportedly has 24 GB of unified memory, and the top configuration with 128 GB is reported at about $5,900. Second, unified memory means the CPU and GPU draw on the same pool, so 128 GB is not 128 GB of dedicated GPU memory. Microsoft also showed a 137 billion parameter coding model running locally and plugging into GitHub Copilot with no inference charge for local calls. Per coverage of the event, it peaked at about 75.5 GB of memory with a full 256,000 token context.

## Answer two: use the memory you have more cleverly

The same week, a project called Janas reached the front page of Hacker News. Janas is an experimental inference engine written in C by Maurizio Cammalleri, released under the GPL. Its claim is that a 48 GB model can run on a laptop with 32 GB of RAM.

The trick is that many modern models are mixture of experts models. They contain many specialist sub networks, but only a few activate for each token. Janas keeps the weights on a fast NVMe SSD, streams in the experts each token needs, and keeps the frequently reused ones cached in memory. On a laptop with an Intel Core Ultra 9 185H, 32 GB of DDR5, and an SSD reading at about 5.7 GB/s, the author reports roughly 24 tokens per second writing with Qwen3-Next-80B, and up to 37 with draft token speedups. For comparison, the author reports llama.cpp managing 2.8 tokens per second on the same machine and configuration.

## What to be careful about

I want to be fair to both answers, because both come with caveats.

The Janas numbers are self reported, measured on one laptop, from a project its own documentation calls experimental. Skeptics in the Hacker News discussion noted that llama.cpp has supported disk backed streaming through memory mapping for years, and that other projects work the same territory. The technique also depends on the model being a mixture of experts design, and on having a fast SSD. A dense model, where every parameter is used for every token, would not benefit the same way.

The Surface route has its own limits. The headline capacity needs the most expensive configuration, and the context is a market where memory is getting costlier. Coverage of the launch notes that memory makers have shifted output toward AI data center chips, and that Nvidia raised the price of its DGX Spark desktop by about 75 percent to $6,950. Buying memory is the simple answer, but not a cheap one right now.

## What I take from this

1. Look at a model's total parameters and its active parameters separately. A mixture of experts model can be far larger on disk than the compute it uses per token, and that gap is exactly what clever engines exploit.

2. Treat memory bandwidth as seriously as memory capacity. Janas works because a modern SSD can feed experts quickly enough to keep generation usable. The bottleneck moves depending on the design.

3. Read benchmarks as one data point from one setup. A claim measured on a single laptop is a reason to test, not a reason to plan.

4. Weigh the reasons for running locally honestly. Privacy, latency, and avoiding per token charges are real advantages. Cost of hardware, setup effort, and slower speeds than a data center are real costs.

5. Remember that local does not automatically mean safe. Microsoft paired this launch with new controls for AI agents, which is a reminder that an agent running on your own machine still needs boundaries around what it can touch.

Local AI used to mean small models and big compromises. This week suggests two routes to relax that, one by spending on hardware and one by engineering. Which one wins for any given developer depends on budget, model choice, and how much tinkering they are willing to do, so the sensible move is to test on your own machine rather than trust anyone's chart, including this post's.

---

Abhishek Mohanty
