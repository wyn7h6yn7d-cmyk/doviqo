export type Meeting = {
  id: string;
  title: string;
  source: "Notes" | "Transcript";
  snippet: string;
  actionItems: Array<{
    text: string;
    owner: string;
    due: string;
    status: "Draft" | "Queued" | "In progress" | "Ready";
  }>;
  owners: Array<{ name: string; focus: string; due: string }>;
  recap: string;
  followUp: string;
};

export const demoMeetings: Meeting[] = [
  {
    id: "kickoff",
    title: "Sprint kickoff",
    source: "Transcript",
    snippet:
      "We agreed to ship the onboarding refresh next week. Nina owns the checklist. Sam confirms rollout date with Support. I’ll post the recap and tag owners.",
    actionItems: [
      {
        text: "Finalize onboarding checklist and share for review",
        owner: "Nina Park",
        due: "Fri",
        status: "Ready",
      },
      {
        text: "Confirm rollout date with Support and update timeline",
        owner: "Sam Chen",
        due: "Thu",
        status: "In progress",
      },
      {
        text: "Send recap to #product and tag owners",
        owner: "Alex (you)",
        due: "Today",
        status: "Draft",
      },
    ],
    owners: [
      { name: "Nina Park", focus: "Checklist + onboarding copy", due: "Fri" },
      { name: "Sam Chen", focus: "Rollout date + support readiness", due: "Thu" },
      { name: "Alex (you)", focus: "Recap + follow-ups", due: "Today" },
    ],
    recap:
      "Decisions: ship onboarding refresh next week; Support needs a final rollout date.\nNext check-in: Thursday.\nActions: 3 items, all owned, deadlines explicit.",
    followUp:
      "Subject: Next steps — onboarding refresh\n\nThanks for the sync. Here are the next steps:\n- Nina: share the onboarding checklist by Friday\n- Sam: confirm rollout date with Support by Thursday\n- Me: post the recap to #product today and tag owners\n\nNext check-in: Thursday.",
  },
  {
    id: "customer",
    title: "Customer escalation",
    source: "Notes",
    snippet:
      "Customer is blocked on permissions. We need a short-term workaround + a permanent fix. Assign an owner, set an SLA, and send an update within 2 hours.",
    actionItems: [
      {
        text: "Reproduce the permissions issue and capture logs",
        owner: "Sam Chen",
        due: "Today",
        status: "In progress",
      },
      {
        text: "Draft customer update with workaround + timeline",
        owner: "Nina Park",
        due: "2h",
        status: "Draft",
      },
      {
        text: "Ship a permanent fix behind a flag",
        owner: "Alex (you)",
        due: "Mon",
        status: "Queued",
      },
    ],
    owners: [
      { name: "Sam Chen", focus: "Root cause + logs", due: "Today" },
      { name: "Nina Park", focus: "Customer update + clarity", due: "2h" },
      { name: "Alex (you)", focus: "Fix + rollout plan", due: "Mon" },
    ],
    recap:
      "Situation: customer blocked on permissions.\nPlan: Sam reproduces + logs today. Nina sends an update within 2 hours. Fix ships behind a flag Monday.",
    followUp:
      "Subject: Update on permissions issue\n\nThanks for your patience — here’s our plan. We have a short-term workaround available today, and we’re shipping a permanent fix behind a flag on Monday.\n\nNext update in ~2 hours with a confirmed timeline.",
  },
];

