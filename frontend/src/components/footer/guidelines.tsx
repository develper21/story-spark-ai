
import {
    Sparkles,
    Lightbulb,
    MessageCircle,
    GitPullRequestArrow,
    Code2,
    Accessibility,
    Bug,
    HeartHandshake,
    type LucideIcon,
} from "lucide-react";

type GuidelineSection = {
  title: string;
  description: string;
  icon: LucideIcon;
  points: string[];
};

const guidelineSections: GuidelineSection[] = [
  {
    title: "Community Values",
    description:
      "StorySparkAI is an open-source creative space for writers, builders, and AI enthusiasts to learn, inspire, and create together.",
    icon: Sparkles,
    points: [
      "Welcome contributions of every size and experience level.",
      "Focus on what helps the overall community and product.",
      "Give credit when building on another person's ideas, prompts, or work.",
    ],
  },
  {
    title: "Respectful Communication",
    description:
      "Keep every discussion constructive, patient, and professional across issues, pull requests, reviews, and community spaces.",
    icon: MessageCircle,
    points: [
      "Use empathetic language and respect different viewpoints.",
      "Offer actionable feedback without personal criticism.",
      "Avoid spam, harassment, private information sharing, and hostile behavior.",
    ],
  },
  {
    title: "Contribution Workflow",
    description:
      "Follow the documented fork, branch, commit, and pull request process so maintainers can review changes smoothly.",
    icon: GitPullRequestArrow,
    points: [
      "Fork the repository, clone your fork, and add the upstream remote.",
      "Pull from upstream main before starting new work.",
      "Create a focused feature branch for each issue or improvement.",
    ],
  },
  {
    title: "Pull Request & Issue Guidelines",
    description:
      "Issues and PRs should be easy for maintainers to understand, reproduce, and review.",
    icon: Lightbulb,
    points: [
      "Open or claim an issue before starting larger feature work.",
      "Use clear titles, descriptions, screenshots, and relevant context.",
      "Keep pull requests focused on one feature, fix, or improvement.",
    ],
  },
  {
    title: "Code Quality Expectations",
    description:
      "The app should remain maintainable, readable, and consistent with the existing React, TypeScript, and Tailwind patterns.",
    icon: Code2,
    points: [
      "Self-review your code before requesting review.",
      "Comment only where the implementation is hard to understand.",
      "Preserve existing routing, component boundaries, and design conventions.",
    ],
  },
  {
    title: "Accessibility & Inclusivity",
    description:
      "The community and product should be usable and welcoming for people with different abilities, backgrounds, and experience levels.",
    icon: Accessibility,
    points: [
      "Use readable text hierarchy, contrast, and keyboard-friendly interactions.",
      "Write inclusive copy and avoid assumptions about contributors.",
      "Report accessibility concerns with enough context to reproduce them.",
    ],
  },
  {
    title: "Reporting Bugs & Feature Requests",
    description:
      "Good reports help contributors move faster and reduce back-and-forth during triage.",
    icon: Bug,
    points: [
      "Describe the problem, expected behavior, and actual behavior.",
      "Include steps to reproduce, screenshots, or environment details when useful.",
      "Avoid duplicate or spammy comments while waiting for assignment or review.",
    ],
  },
  {
    title: "Collaboration & Review Etiquette",
    description:
      "Reviews work best when contributors and maintainers treat them as shared problem-solving.",
    icon: HeartHandshake,
    points: [
      "Respond to feedback gracefully and ask clarifying questions when needed.",
      "Accept responsibility for mistakes and update the PR with care.",
      "Respect maintainers' moderation and review decisions.",
    ],
  },
];

const workflowSteps = [
  "Fork the repository and clone your copy.",
  "Create a branch for the issue or feature.",
  "Make focused changes and self-review them.",
  "Commit with a clear message and push your branch.",
  "Open a pull request with context, screenshots, and testing notes.",
];

const Guidelines = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Guidelines</h1>
          <p className="text-xl text-gray-600">Building a welcoming and productive community together</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {guidelineSections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <section.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
              </div>
              <p className="text-gray-600 mb-4">{section.description}</p>
              <ul className="space-y-2">
                {section.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="text-purple-500 mt-1">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contribution Workflow</h2>
          <ol className="space-y-3">
            {workflowSteps.map((step, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-700">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;

