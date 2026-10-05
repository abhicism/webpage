---
title: Gemini's Unreleased "Full Access" Mode Is a Useful Template for Agent Permissions
subtitle: A hidden setting spotted in Gemini Desktop shows exactly where Google is choosing to keep a human in the loop, and where it is not. That line is worth studying before this even ships.
date: 2026-10-30
tags: AI Agents, Architecture, LLM
featured: true
---
A researcher tracking unreleased Google features spotted a hidden setting inside the Gemini Desktop app this week called "Additional sandbox options." The interface text, visible in the app but not yet turned on for users, reads: "By enabling additional sandbox options, you will be able to expand what Gemini can do and access on your Mac." Depending on which settings someone enables, Gemini would be able to access any file, open any app, browse the web, and act across multiple applications in a single workflow, without asking for permission at every step. It is currently macOS only, still in testing, and there's no announced timeline for release.

I want to flag upfront what this is and isn't. This is a discovered, unreleased setting, not a shipped feature or an official announcement, and some of the framing above comes from a single source tracking pre-release builds. Treat the specifics as provisional. What makes it worth writing about anyway is not the leak itself, it's the specific shape of the permission model it reveals, because that shape is a genuinely useful thing to study regardless of exactly when or whether Google ships it this way.

## The line Google appears to be drawing

According to the reporting around this setting, Gemini would still ask for explicit confirmation before a specific list of actions: buying something, transferring money, creating an online account, accepting legal terms, or modifying sensitive information about the user. Everything else, reading files anywhere on the machine, launching arbitrary applications, navigating the web, chaining actions across apps, would reportedly be allowed to proceed without a prompt once the broader permission is turned on.

That's a real design decision, and it's a more specific one than "ask before anything risky." It's a bet about which categories of action are hard to undo and which are not. A file read is reversible, in the sense that reading a file doesn't change anything. Buying a product, agreeing to a contract, or opening an account in someone's name is not reversible in any practical sense, no undo button gets you out of it cleanly. Drawing the consent boundary around reversibility rather than around some vaguer sense of what "feels risky" is a defensible, legible rule, and it's the kind of rule that's much easier to reason about, implement correctly, and explain to a user than a model trying to judge risk case by case.

## Why this is worth studying even as an unreleased feature

If you're building anything with agent permissions of your own, this is a useful worked example regardless of what Google ultimately ships. A few things about the apparent design are worth taking seriously as a starting point.

**The gated list is short, specific, and about consequences, not categories.** It's not "ask before touching money" as a vague theme, it's purchases, transfers, account creation, legal agreement, and sensitive data changes, named individually. A short, explicit list is auditable in a way a fuzzy principle isn't. You can test against it. You can tell whether an implementation actually honors it.

**Everything not on the gated list is implicitly high trust, which is the part worth scrutinizing hardest.** "Read any file, run any app" is an enormous grant of access sitting on the ungated side of that line, justified presumably because none of it is individually irreversible. But irreversibility isn't the only thing that matters. A file read is reversible in isolation and can still expose something sensitive the moment it happens. The reversibility framing is a good organizing principle. It is not automatically a complete one, and worth pressure testing against cases where the harm is in exposure rather than in an action you can't take back.

**A binary toggle is a simpler mental model than it is a safe one.** Turning on "Full Access" moves an entire category of action from gated to ungated at once. That's easy to explain to a user, which has real value. It also means there's no room between "ask every time" and "never ask for this entire class of things," no way to say yes to broad file access while still wanting a prompt before a particularly unusual action inside that category. Simplicity and precision are in tension here, and it's worth being honest with yourself about which one your own system actually needs.

## What I'd take from this into my own designs

1. Build your consent boundaries around consequence, specifically reversibility, rather than a vague notion of riskiness. It produces a shorter, more testable rule.

2. Name the gated actions explicitly rather than describing them thematically. A list you can enumerate is a list you can verify an implementation against.

3. Treat "ungated" as a category you revisit, not a category you set once. The things that don't need a prompt today may need one once your system's capabilities or your users' usage patterns change.

4. Consider whether your permission model needs more than two states. A single on/off toggle is easier to build and explain. Whether that's the right trade-off depends entirely on how much harm sits inside the broad category you're leaving ungated.

Google hasn't shipped this, and the exact rules may well change before it does. What's useful right now isn't the feature, it's the permission model's shape: a short, specific, reversibility-based list of what still needs a human, and an explicit decision about everything else. That's a cleaner starting point than most agent permission systems ship with today, discovered or not.

---

Abhishek Mohanty
