---
title: Annualized Revenue Is a Definition, Not a Fact
subtitle: A $20 billion gap in reports about OpenAI moved tech stocks last week. The gap traces back to how the number was counted.
date: 2026-10-13
tags: LLM, Architecture
---
On October 8, the Financial Times reported that OpenAI had told investors its annualized revenue was approaching $50 billion at the end of September. That was about $20 billion below the roughly $70 billion figure that had circulated in the press in late September. Tech stocks fell that Thursday, and AI infrastructure names with exposure to the buildout were hit hardest. Many of them bounced back the next day, which tells you the market was reacting to uncertainty as much as to the number itself.

The reaction deserves a closer look, because by the reporting, the gap is mostly a story about definitions.

## The same word, two methods

According to Axios and the Financial Times, OpenAI and Anthropic calculate annualized revenue differently. Anthropic counts sales made through its cloud partners, and the cloud provider's cut is then recorded as an expense. OpenAI records only its share of certain partner sales. Axios reports that both companies are GAAP compliant and simply account for partner sales differently.

The $70 billion figure, as Axios tells it, came from an attempt to "gross up" OpenAI's number so investors could compare it with Anthropic's on equal terms. A source told CNN the figure did not come from OpenAI itself. The FT reports that OpenAI's annualized revenue was close to $30 billion in July and that it told investors growth had been more than 70% since then, which lines up with the roughly $50 billion figure.

I'm not going to argue about which method is the right one. Both are defensible, and which one fits depends on what question you are asking. What matters for anyone who builds or reads metrics is that "annualized revenue" is not one number. It is a family of numbers that depend on a set of choices.

## How a number turns into a fact

Look at the path this figure took. It started in investor materials, it was adjusted to make a comparison easier, it was reported as OpenAI's revenue, and it was repeated across outlets until it read as settled. Then a correction arrived, and a large part of the correction was about the method, not about the business.

That chain is familiar to anyone who has watched an internal dashboard number get pasted into a slide, then into a memo, then into a decision. Each hop drops a little context. By the end, "gross revenue under a comparison methodology" has become "revenue."

There is also a second layer to be careful with. Annualized revenue is a run rate: one period's sales projected out over a year. Axios points out that this is a common startup metric, but that public market investors usually prefer actual reported revenue. I made a similar point in an earlier post about Cognition's run rate. A run rate describes pace, and the choices behind it describe what the pace includes.

## Why a definitional gap still moved markets

If the difference is largely accounting, why did stocks drop? One strategist quoted by CNN gave the logic: if OpenAI is earning less than people expected, that could ripple through the supply chain for the AI buildout. OpenAI is a major customer for chips, cloud capacity, and data center infrastructure, so expectations about its revenue feed into expectations about everyone who sells to it.

Context matters too. OpenAI raised $122 billion in March, its leaked 2025 financials showed about $13 billion in revenue against much larger spending, and Sam Altman said in September the company would postpone its IPO until at least next year. When a company is carrying that much investment, any revision to its headline number gets scrutinized hard, even when the revision is mostly a matter of method. That is a reasonable thing for a market to do. It is not the same as a finding that demand has weakened, and the reporting does not establish that.

## What I take from this for metrics I build or read

1. Write down what a metric includes before you share it. Gross or net, which partners, which period, which currency, which exclusions. Two teams can both be correct and still produce numbers $20 billion apart.

2. Compare like with like, or say loudly that you are not. If you adjust a number so it matches a competitor's method, label the adjusted version as adjusted every time it travels.

3. Keep the definition attached to the number as it moves. A figure forwarded without its method is a figure waiting to be misread.

4. Treat a run rate as a statement about pace and ask what it is made of. Annualizing one strong period can say more about that period than about the year.

5. When a correction arrives, ask what changed: the business, or the counting. They need different responses, and the first headline rarely tells you which one you are looking at.

The AI industry is spending at a scale that makes every revenue figure matter to many people at once. That makes careful definitions less of an accounting footnote and more of a basic requirement for anyone trying to understand what is actually happening.

---

Abhishek Mohanty
