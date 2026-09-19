---
title: Context engineering is the other half of prompt engineering
subtitle: What actually reaches the model matters as much as how you ask.
date: 2026-01-22
tags: RAG, Architecture
sample: true
---

Prompt engineering gets a lot of attention, but a well-crafted prompt can't compensate for irrelevant or missing context. Context engineering is the practice of deciding what information reaches the model in the first place — which documents get retrieved, how they're ordered, and how much of the token budget they consume.

One useful habit is separating "what could be relevant" from "what should be included." Retrieval often returns more candidates than you want to pass to the model; ranking and filtering those candidates before generation is where a lot of quality is won or lost.

Ordering matters too — models tend to weight information near the beginning and end of context more heavily than the middle, so the most load-bearing context shouldn't be buried.
