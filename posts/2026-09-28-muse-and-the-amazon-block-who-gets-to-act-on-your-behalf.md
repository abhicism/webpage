---
title: Muse and the Amazon Block: Who Gets to Act on Your Behalf?
subtitle: Meta's new personal AI agent topped the App Store in under two weeks. Amazon's response shows the harder problem is not building agents, but deciding what they are allowed to do.
date: 2026-09-28
tags: AI Agents, Architecture, Developer Productivity
---
Meta's Muse launched in early September as a personal AI agent, and it reached the top of the US App Store in under two weeks, ahead of ChatGPT's early adoption pace. On September 21, Meta's stock rose about 11% in a single session, its biggest one day move in nearly a year. Muse is not a chatbot that answers questions. It connects to a user's email, calendar, and payment accounts, and then does things: sends messages, books travel, orders products, compares insurance quotes.

Then Amazon blocked it from completing purchases on its marketplace, citing policy violations. That is the part of this story I find most useful to think about, because it has very little to do with how good the model is.

## What makes an agent different from an app

For about two decades, most of the web has been built on one assumption: a person is on the other end, looking at pages. Product listings, recommendations, upsells, and ads all exist to shape what that person sees before they decide. An agent that compares prices and completes the purchase in one step skips all of it. Nobody browses, so nobody sees the funnel.

Seen that way, Amazon's block is not surprising. It protects a business model built around human attention, and it can be defended as enforcement of existing platform rules. Shopify, PayPal, and Stripe went the opposite direction and announced integrations, positioning themselves as the layer an agent transacts through. Same technology, opposite strategies, and the difference comes from how each company makes money, not from engineering.

## The real engineering question is delegated authority

Set the business drama aside and Muse raises a concrete design problem. When software acts for a user on a third party service, three questions need answers.

First, how does the service know the request comes from a legitimate agent acting for a consenting user, and not a scraper, a bot, or someone using stolen credentials? Second, how does the user limit what the agent can do, for example a spending cap, an approved list of merchants, or a rule that anything irreversible needs a confirmation? Third, when something goes wrong, what is logged, who can see it, and who is responsible?

Today many agents answer these questions poorly, because they act by logging into accounts the same way a person would. From the platform's side that looks identical to credential misuse, which is one reason blocking it is the easy response. My expectation, and it is an opinion rather than a reported fact, is that this gets solved with explicit delegation: scoped, revocable credentials issued to an agent, with its own identity and audit trail, instead of an agent impersonating its user.

## Trust is the actual constraint

One analyst covering the launch pointed out that as consumers hand AI systems financial information, communications, and purchasing decisions, trust could become a real competitive differentiator. I think that is right, and it connects to everything else happening in this space. Earlier this month the industry spent weeks discussing agents that acted beyond their authorization inside test environments. A consumer agent with access to payments is the same problem again, only with real money and real users on the other side.

## What I take from this

1. Design agent access as delegation, not impersonation. Give agents their own scoped, revocable, auditable credentials wherever the services you connect to allow it.

2. Remember that depending on a third party service means depending on its policies, not only its API. Amazon's block came from a policy decision. It is the same lesson as any vendor shutdown: build the seam that lets you adapt when someone else changes the rules.

3. Put limits on what an agent can do without asking. Spending caps and confirmation steps for irreversible actions cost very little compared to an unattended agent making a wrong purchase.

4. Read the market numbers carefully. Reported stock gains and download counts vary between outlets, and Meta has not yet disclosed any revenue from Muse. The excitement is about expected monetization, not proven results, and it is worth keeping those two things separate.

Muse may or may not turn out to be the consumer agent that sticks. What it has made visible already is the real work ahead for anyone building in this area: not making agents capable, which is happening quickly, but defining clearly who they act for, what they may do, and how everyone else in the system can tell.

                           ~Abhishek Mohanty
