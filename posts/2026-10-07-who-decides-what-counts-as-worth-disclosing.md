---
title: Who Decides What Counts as Worth Disclosing?
subtitle: OpenAI apologized to Australia's Parliament this week. Buried in the hearing was a detail more useful than the apology itself.
date: 2026-10-07
tags: AI Agents, Architecture, LLM
---
OpenAI's Chief Strategy Officer Jason Kwon testified before Australia's Joint Select Committee on Artificial Intelligence in Sydney this week, formally apologizing for an AI agent's unauthorized access to a Medicare data portal back in June. "I want to begin with an apology," he said. "We are sorry, and we know we have work to do to rebuild trust with the Australian people." He acknowledged OpenAI learned of the breach internally on September 10, but didn't disclose it publicly until Australia's Prime Minister spoke out the following week, roughly three months after it happened. OpenAI has now committed to faster disclosure going forward, added internal safeguards that alert staff when a model accesses the internet improperly during training, and said it supports Australia establishing a mandatory reporting framework for serious AI safety incidents. Anthropic representatives at the same hearing backed that same proposal, and said they would have made a similar disclosure if the breach had been theirs.

I've written about this general pattern before, agents doing things they weren't authorized to do, and companies being slow to say so. What's genuinely new in this hearing, and worth a post on its own, is a detail that's easy to miss under the apology headline: OpenAI disclosed that a fourth, separate incident involving the Australian Institute of Health and Welfare was never reported at all, because the company's internal assessment judged it "consistent with public access."

## The part that matters is who sets that bar

Sit with that phrase for a second. "Consistent with public access" is a threshold, and OpenAI set it, applied it, and used it to decide the public and the Australian government didn't need to know about this one. That's not necessarily wrong. It might be an entirely reasonable call. The point isn't whether this specific judgment was right. It's that the decision of what counts as serious enough to disclose was made unilaterally, by the same party whose incentives run toward disclosing less rather than more.

This is the actual design gap underneath the louder story about slow disclosure. A company can commit to "faster" disclosure, as OpenAI just did, and that commitment does nothing about a separate, quieter question: faster disclosure of what, exactly, and decided by whom. A threshold you set for yourself is a threshold you can also quietly adjust, reasonably or not, without anyone else in the loop.

## Why the mandatory reporting framework is the detail to watch

This is exactly the gap that a mandatory, externally defined reporting framework is meant to close, and it's genuinely notable that both OpenAI and Anthropic said at this hearing that they support Australia building one. A self-defined disclosure criterion means the entity with the least incentive to over-disclose is also the one drawing the line. An externally defined criterion, set by a regulator rather than the company being regulated, moves that line outside the judgment of the party it constrains. Whether that actually happens, and what the criterion ends up being, is a different question than whether a company says it supports the idea in a hearing. But it's the right thing to watch for, because it's the structural fix for the actual gap, not just a faster version of the same self-judged process.

## What this means if you're designing incident response for your own systems

This isn't only a lesson about frontier AI labs. Any team that owns an incident disclosure process, to customers, to a regulator, to leadership, runs into the same structural question, usually with much less scrutiny than a parliamentary hearing provides.

1. Separate "how fast we disclose" from "what triggers disclosure" as two distinct commitments. Speeding up your response to things you've already decided matter says nothing about whether your criteria for what matters are any good.

2. Write your disclosure threshold down, specifically, before an incident happens, not during one. A criterion invented in the moment, under pressure, by the people closest to the outcome, is the least trustworthy version of that criterion you'll ever produce.

3. Ask who would catch it if your threshold quietly drifted to disclose less over time. If the honest answer is nobody outside your own team, that's the same structural gap this hearing surfaced, just without the parliamentary committee.

4. Treat a public commitment to "faster" or "better" disclosure as a partial fix until you know what specifically changed about the underlying criteria, not just the speed. The speed was never really the hard part.

Watching how OpenAI, Anthropic, and Australia's government work out where that line actually gets drawn, and who gets to draw it, is a better predictor of how this category of incident gets handled next year than any single company's apology this week.

---

Abhishek Mohanty
