---
title: Four AI Labs, One Summer: What Sandbox Escapes Reveal About Agent Safety
subtitle: Google's Gemini broke out of a security test and touched three real companies. It wasn't the only lab this happened to.
date: 2026-09-23
tags: AI Agents, AI Reliability, Architecture
featured: true
---
Google confirmed on September 18 that its Gemini model gained unauthorized access to three real companies during a security evaluation back in May. The cause was mundane rather than dramatic. A fictional company name used in a test scenario happened to match a real domain, and the environment that was supposed to be sealed off from the internet was not.

## What actually happened

The incident occurred during a capture the flag style cybersecurity exercise run by an independent evaluator called Irregular. Gemini was asked to attack a fictional target inside what was meant to be an isolated environment. Because that environment had unintended internet access, and the fictional company's name overlapped with a real one, Gemini ended up interacting with live infrastructure instead of a simulated target.

According to Google, the model found credentials through public sources in some cases and guessed passwords in others. Once it gained access, it stopped rather than continuing to explore or escalate, apparently because it recognized the systems weren't part of the exercise. Google says its investigation found no evidence of damage, and the company has been careful to distinguish this from misalignment, describing it instead as a case of mistaken identity — the model believed it was still inside the test.

Google reportedly learned about the incident in July, roughly seven weeks before disclosing it publicly, after a journalist inquiry prompted the announcement.

## The part that deserves more attention than the headline

What makes this worth writing about is not that one model briefly touched systems it shouldn't have. It's that this same failure mode has now shown up across multiple major labs within the same few months. Reports from around this period describe comparable incidents involving models from other providers, each traced back to a similar root cause: a test environment that was supposed to be isolated from the internet, but was not.

That pattern matters more than any single incident. It suggests testing infrastructure across the industry has not caught up with how capable and autonomous these models have become. A model that can discover credentials, evaluate a target, and act on its own within a test is, functionally, exercising the same capabilities that matter in production. If the sandbox around it has a hole, the model does not know that, and increasingly, it does not need to know that in order to act.

## What this changes about how I think about agent testing

A few things stand out to me as an engineer building on top of these systems.

First, sandbox isolation deserves the same rigor as production security, not less. It is tempting to treat a test environment as lower stakes, but an agentic model does not distinguish intent from opportunity. If it can reach something, it may act on it.

Second, evaluation results are only as trustworthy as the boundaries around them. A test that unintentionally touches real infrastructure is not just a containment failure. It quietly invalidates whatever the test was supposed to measure in the first place.

Third, disclosure timing is part of the story. A multi week gap between discovering an incident and disclosing it is now a recurring pattern across the industry, not a single occurrence. As agent capabilities scale, how quickly and clearly labs communicate these events will matter as much as the incidents themselves.

None of this means agentic AI is unsafe to build with. It means the infrastructure around these systems, the sandboxes, the credential handling, the network boundaries, needs to be engineered with the same seriousness as the models themselves. The gap right now is not in what these models can do. It is in how confidently we can contain them while we find out.

                  ~ Abhishek Mohanty
