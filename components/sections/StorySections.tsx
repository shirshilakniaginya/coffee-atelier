"use client";

import type { PageSection } from "@/api/page-sections";
import StoryRow from "@/components/ui/StoryRow";

interface StorySectionsProps {
  sections: PageSection[];
}

export default function StorySections({ sections }: StorySectionsProps) {
  const getSectionBySlug = (slug: string) => sections.find((s) => s.slug === slug);

  const section1 = getSectionBySlug("about-coffee");
  const section2 = getSectionBySlug("about-coffee-2");

  if (!section1 && !section2) return null;

  return (
    <section className="story-grid" id="stories">
      {section1 && <StoryRow section={section1} reverse={false} />}
      {section2 && <StoryRow section={section2} reverse={true} />}
    </section>
  );
}
