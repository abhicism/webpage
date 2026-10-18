---
title: When the Insurer Won't Cover It: The Next Constraint on AI Agents
subtitle: Insurers are writing AI out of standard policies, and specialist coverage tops out around $50 million. Here is what that means for anyone shipping AI features.
date: 2026-10-18
tags: AI Agents, Architecture
featured: true
---
A recent Wall Street Journal report, as summarized by several outlets, says insurers who specialize in AI risk believe the biggest AI companies are accumulating potential legal liabilities in the tens of billions of dollars, and possibly hundreds of billions. Meanwhile, the insurance available to cover that kind of loss is small. Specialist AI liability policies from providers such as AIUC, Armilla, and others typically top out at $25 million to $50 million per customer, and some reports say many underwriters have only $5 million to $25 million of capacity available right now.

That mismatch is worth understanding even if you never work at a frontier lab, because the risk does not disappear when insurers step back. It moves to someone else, and often that someone is the company that deployed the AI, not the one that built it.

## The gap is quiet, which makes it dangerous

Research led by the Artificial Intelligence Underwriting Company found that as of March 2026, more than 90% of insurers' exposure to AI agents was sitting inside conventional policies, such as cyber, directors and officers, general liability, and tech errors and omissions, without any explicit AI pricing or wording. The industry calls this silent coverage. Nobody decided to insure AI agents. The exposure was simply inherited from older policies written before agents existed.

Now insurers are working to remove it. Major carriers have been seeking to exclude AI from standard coverage, and regulators have approved some of those requests. A small specialist market is forming to fill the gap, much as insurers carved cyber risk out of standard policies a decade ago and then built separate cyber products.

## Why insurers hesitate

The issue is not that any single AI failure is too big to cover. An executive at the brokerage Aon told the Financial Times that insurers can absorb a loss of $400 million to $500 million from one company's AI deployment going wrong. What they cannot absorb is a thousand or ten thousand correlated losses at once. The same model, the same vendor, or the same flaw can sit underneath thousands of deployments, so one problem can become thousands of claims on the same day.

That correlation point matters for engineers too, because it is the same shape as the vendor concentration problem I wrote about after the Sora shutdown. When everyone builds on the same few models, a shared failure is a shared loss.

## Who ends up holding the risk

Two details from the coverage are worth pausing on. AI developers generally disclaim most liability in their terms of service. And in the best known court example, an airline was held responsible for its chatbot's wrong answer rather than the vendor that supplied the technology. Put together, the practical picture for a company shipping an AI feature is uncomfortable: the party closest to the customer tends to be the party that answers for the output.

The Financial Times also reports that insurers are preparing for claims tied to AI agents acting outside their intended controls, with liability possibly reaching senior executives, and that OpenAI and Anthropic have both looked at using investor capital to fund settlements where commercial insurance falls short. I would not read more into that than the reporting says. It does show that even the best funded companies see a gap between what they might owe and what they can insure.

## What I take from this as someone who builds with these models

This is not legal or insurance advice, just an engineering reading of the situation.

1. Assume you hold the risk for the AI features you ship. A vendor's terms and a model's accuracy do not change who the customer will blame.

2. Ask your insurer in writing whether your AI use is covered. Many companies are likely to find that it is neither clearly included nor clearly excluded, which is the silent coverage problem in practice.

3. Build the evidence trail now. Logs of what an agent did, scoped permissions, evaluation results, and a written disclosure threshold are the kinds of records that help you in an incident, in an audit, and in a conversation with an underwriter. Whether or not an insurer ever asks, they are worth having.

4. Treat concentration as a risk you can measure. If your product depends on one model from one vendor, note it, and know what your fallback is. Correlated failure is exactly what the insurance market says it struggles to price.

5. Read coverage limits as information. When the largest policy you can buy is around $50 million and the exposure being discussed is in the billions, the difference is being carried by someone. It helps to know who.

The insurance market works as a quiet regulator because it puts a price on risk that regulation has not yet addressed. For now, the signal it is sending is that AI risk is real, it is hard to measure, and a lot of it still has no owner. Engineers who can show what their systems did and what they were allowed to do will be in a better position than those who cannot.

---

Abhishek Mohanty
