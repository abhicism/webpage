---
title: What an Invisible Watermark Actually Proves, and What It Does Not
subtitle: OpenAI is watermarking ChatGPT text in the EU starting this week. The company's own limitations list is more useful than the announcement itself.
date: 2026-10-06
tags: LLM, Architecture, RAG
---
OpenAI said on October 5 that it will add an invisible, machine-readable watermark called textGrain to eligible ChatGPT and Codex text output for users in the European Union, rolling out over the coming weeks across all plans. API customers anywhere can opt in for select models starting immediately, though it stays off by default outside the EU. The driver is Article 50 of the EU AI Act, in effect since August 2, which requires generative AI providers to mark their output in a machine readable format that other systems can detect.

OpenAI isn't first here. Google DeepMind shipped a comparable approach, SynthID-Text, years earlier, and Anthropic rolled out its own version in August, also built on a SynthID-derived method, with detector access similarly limited to regulators, researchers, and media at launch. The pattern across all three is close to identical: embed a statistical signal in word choice during generation, keep a detector that can read that signal, and keep that detector away from the general public.

## How the method actually works

Textgrain embeds its signal through the model's token choices. At each step of generating text, there are usually several reasonable next words, and the watermarking process nudges that choice slightly, repeatedly, across a passage. No single word choice is unusual enough to notice. Add enough of those small nudges together across a long passage, and a detector holding the right key can measure whether the statistical pattern is present. It's a property of the whole passage, not of any individual sentence, which is exactly why short passages are one of the cases OpenAI flags as harder to detect reliably.

## The limitations list is the actually useful part

What I'd read closely in OpenAI's announcement isn't the rollout plan, it's the list of things the company says the watermark cannot do. Short passages, math answers, and translated text are harder to detect. Heavy editing or rewriting degrades or removes the signal entirely. And OpenAI states plainly that a missing watermark does not prove human authorship, because the text could be too short, too heavily edited, generated before watermarking existed, or produced by a different provider's model entirely.

That last point is worth sitting with, because it inverts how people tend to intuitively reach for this technology. A watermark can sometimes tell you text came from a specific model. Its absence tells you almost nothing. If you're building anything that treats "no detected watermark" as evidence of human origin, filtering submissions, flagging suspicious content, verifying authorship, that's not a safe inference to build on, by the vendor's own account.

## Why this shipped now, and not sooner

There's a detail worth including for context: OpenAI had reportedly built a text watermarking system before, and held off releasing it, partly over concern that users would simply switch to a competing model that didn't watermark its output. That's a believable business reason to hesitate, and it's also exactly the dynamic that makes a voluntary, non-universal approach to content provenance structurally fragile: the moment marking your own output honestly becomes a competitive disadvantage, you'd expect adoption to stall until something external forces it. Regulation is now functioning as that external force, and OpenAI watermarking only where the law currently requires it, while leaving it opt-in everywhere else, is a fairly direct illustration of that dynamic rather than an exception to it.

## What this means if you're building with these models

1. Don't build a pipeline that treats watermark absence as a positive signal of human authorship. The vendors themselves say this isn't a valid inference, across every lab currently shipping this.

2. If content provenance matters to what you're building, plan for a fragmented landscape, not a universal standard. Different labs, different regions, different defaults, and detector access that's currently restricted to approved researchers and regulators rather than open to developers generally.

3. Treat a watermark as evidence a specific model was involved in producing specific text, at best, not as a tool for classifying arbitrary text as AI generated or human written in general. Those are very different claims, and the narrower one is the one the technology can actually support right now.

4. Expect regulatory requirements to keep arriving ahead of voluntary industry consensus in this area. Three major labs now ship broadly similar watermarking schemes, and all three shipped them in response to the same external pressure rather than in advance of it. That's a reasonable baseline expectation for how AI content provenance keeps evolving for the next while.

The honest state of text watermarking in October 2026 is that it's a real, working piece of engineering that answers a narrower question than most people assume it does. Reading what a vendor says the tool can't do is usually more useful than reading what they say it can.

---

Abhishek Mohanty
