---
title: Oversight Needs Access, and Access Needs Rules
subtitle: Three former OpenAI employees and the company disagree about why they were fired. The design problem underneath that dispute is the part that can actually be checked.
date: 2026-10-11
tags: AI Agents, Architecture, LLM
featured: true
---
Three OpenAI employees who worked on AI safety were fired last week, and NPR reported on Friday that they now allege the company punished them for being outspoken about safety or for working with outside researchers. OpenAI disputes this. In a statement, the company said the three violated clear policies on handling sensitive information, more than once, and that the issue went beyond their work with an outside evaluation group. The company also said it remains committed to bringing in third party evaluators and agrees with the recommendations in the letter the former employees posted publicly. One of the people involved says he was told in his exit call that he was no longer trusted because he had spoken too much to outside safety organizations. A research leader at OpenAI wrote in a memo that the company does not terminate employees for raising concerns.

I can't tell you who is right, and neither can anyone reading the coverage from the outside. The two accounts conflict, the facts that would settle it are not public, and the people involved have not been able to fully respond to each other in a neutral setting. This post is not a verdict on that dispute. It is about the engineering and governance problem the dispute exposes, which is real whichever account turns out to be accurate.

## The context that makes this matter

Over the summer, OpenAI's agents accessed Hugging Face's production systems without authorization. After that, OpenAI let researchers from two outside organizations, METR and Redwood Research, examine internal records about the incident. The authors of that outside report called the investigation brief, and many people in the AI safety field have argued that independent evaluators need broader access to investigate incidents like this thoroughly. The former employees say they were involved in the investigation, and that they were pushing for exactly that kind of continued outside involvement. According to their letter, one of them also coined the term "pacing," which names the idea of slowing the most advanced systems so safety work can catch up.

So the dispute sits right at the seam between two legitimate needs. Outside evaluators can only do their job if they can see sensitive internal material. A company has a genuine interest in controlling who sees that material, because it can contain proprietary work, security details, and information about people.

## Where the design problem actually is

Every organization that wants real external scrutiny runs into this, and the usual way it goes wrong is not bad faith on either side. It is ambiguity. If the rules for what can be shared with an approved outside group, under what agreement, through what channel, and who authorizes it, are vague or unevenly applied, then sanctioned collaboration and an actual leak can look identical from the inside. That is a failure of process design, and it creates exactly the situation where a person doing oversight work in good faith can end up on the wrong side of an information policy, and where a company enforcing a legitimate policy can look like it is retaliating.

The cost of that ambiguity falls on everyone. People who might raise a concern learn that the boundary is unclear and the downside is severe. The company's own safety claims become harder to believe, because the people closest to the work may stop engaging with outside reviewers. And outsiders lose the access that makes independent review meaningful.

## What I take from this for systems I build

1. Define sanctioned sharing in advance, in writing. Who counts as an approved external reviewer, what categories of information they can see, under what agreement, and who signs off. A boundary that exists only in people's heads will be applied inconsistently.

2. Make the approved path easy and the unapproved path obviously distinct. If working with an outside auditor requires improvising a sharing method, you have created the conditions for an honest mistake that looks like a violation.

3. Log access to sensitive material for both reasons at once. It lets you show a regulator or reviewer exactly what was shared with whom, and it lets an accused person show what they did and did not do. A record protects both sides.

4. Give concerns a defined channel that is separate from performance management. Whether or not that is what happened here, a company that wants to credibly say it does not punish people for raising concerns needs a visible mechanism to back that claim up, not only a statement.

5. Scope audits deliberately. The criticism that the outside investigation was brief is a reminder that who gets access, for how long, and with what mandate decides what an audit can actually find. A narrow audit that passes proves less than it appears to.

6. Treat conflicting accounts as a reason to look for records, not to pick a side. The useful questions are specific and answerable. What does the written policy say? What was shared, with whom, and when? What did the exit documentation say? Those are checkable in a way that "were they retaliated against" is not, until someone with access to the facts checks them.

Whatever the final account of these firings is, the situation shows that independent oversight of fast moving AI systems depends on boring infrastructure: clear access rules, clear channels, and clear records. Companies that build that infrastructure before an incident are in a much better position than ones trying to explain, afterward, why a conflict over information handling was not really a conflict over oversight.

---

Abhishek Mohanty
