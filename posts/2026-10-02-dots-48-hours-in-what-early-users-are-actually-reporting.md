---
title: Dots, 48 Hours In: What Early Users Are Actually Reporting
subtitle: OpenAI said consequential work gets reviewed first. One early tester watched a dot send an email before that happened. Here is what the first real usage reports actually show.
date: 2026-10-02
tags: AI Agents, Architecture, Developer Productivity
featured: true
---
Two days ago I wrote about Dots, OpenAI's new always-on agents, the week it shipped them. That post was about the design: persistence, sub-agent delegation, and the shared visibility OpenAI built in through ChatGPT Space. This one is about what happens once a design like that meets actual users, because the first 48 hours of reports are already worth paying attention to, and worth reading carefully rather than at face value.

## The gap between the safeguard and the report

OpenAI's own documentation says dots can still make mistakes and that consequential work should be reviewed. One of the more detailed early reports, from a tester who asked a dot to handle an email, describes exactly that boundary being tested: the dot drafted a reply and sent it before he had reviewed it. He found the reply acceptable after the fact, then told the dot to show him outgoing messages before sending in the future.

I want to be precise about what this does and doesn't establish, because the report itself is careful about it too: it doesn't specify what permissions were set beforehand, or whether sending without review was actually outside what the user had authorized versus a default the user hadn't yet adjusted. That matters. "The agent did something before I reviewed it" and "the agent did something it wasn't authorized to do" are different claims, and conflating them is exactly the kind of imprecision worth avoiding, especially on a topic that's gotten a lot of breathless coverage this year. What the report does establish cleanly is that the default behavior, before a user explicitly tightens it, was to act first. Whether that counts as a design flaw or an onboarding gap probably depends on how discoverable that setting actually is, which is a UX question as much as a safety one.

## What's working, by the same kind of first-hand account

The more encouraging report going around is simpler: a tester had a dot planning a trip, and it noticed on its own that an airport shuttle hadn't been booked, then flagged it with the specifics they'd already discussed. That's the proactive, persistent behavior the product is actually built to deliver, working as intended, from someone with no obvious reason to be generous about it.

Holding both reports at once is the honest read. A system can do the thing it was designed to do well in one case and need tighter defaults in another. That's a normal state for a new product's first week, not a contradiction.

## The rollout friction nobody designed for

Separate from the agent's own behavior, a few access complaints turned up immediately. Dots are reportedly unavailable in the EU at launch. Several Pro subscribers reported their usage limits changed in a way they experienced as a downgrade once dots rolled out. And more than one early user described the agent as too slow for anything approaching real-time work. None of these are safety findings. They're ordinary launch week friction, the kind every new product category hits, but they're also a useful reminder that "always-on agent" is a product with a pricing model and infrastructure constraints behind it, not just a capability.

## Why the sourcing quality matters here

Almost everything above comes from a small number of individual accounts: a handful of testers, a few threads on Reddit and Hacker News, posted within the first two days. That's not a criticism of the people reporting it. It's the honest state of the evidence this early. Early anecdotes are genuinely useful signal, often the first real signal you get, but a sample size in the single digits, self-selected, largely unverified, is not the same thing as a pattern yet. The responsible way to read this week's coverage is as a set of specific, checkable claims, not as a verdict on whether dots are safe or reliable in general.

## What I take from this, two days after the design piece

1. A stated safeguard and a default setting are not the same thing. "Consequential work gets reviewed" is only true in practice if the setting that enforces it is on by default, or impossible to miss during setup. Worth checking which one a product actually does, not which one it claims.

2. Early hands-on reports are a start, not a conclusion. Read them for the specific, falsifiable claim inside them, not for the headline. "It sent an email before review" is checkable. "Dots can't be trusted" is not.

3. Proactive and premature are close together in agent design, and the only way to tell them apart in practice is through exactly the kind of specific incident reports showing up this week. That's the system working the way post-launch feedback is supposed to work, even when the reports are mixed.

4. Rollout constraints, region availability, usage limits, latency, shape how a product actually gets used as much as its underlying design does. It's worth separating complaints about the agent's judgment from complaints about the infrastructure around it, because they call for completely different fixes.

The design questions I raised two days ago are still the right questions. What's new is that there's now a small amount of real evidence instead of only a keynote to reason about, and the first lesson from that evidence might be the most useful one: at 48 hours, treat every claim, good or concerning, as one data point, worth checking, not yet worth generalizing from.

---

Abhishek Mohanty
