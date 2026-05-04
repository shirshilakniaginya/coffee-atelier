import { getFileUrl } from "@/lib/pocketbase";
import type { PageSection } from "@/api/page-sections";

interface StoryRowProps {
  section: PageSection;
  reverse: boolean;
}

export default function StoryRow({ section, reverse }: StoryRowProps) {
  const rowClass = reverse ? "story-row story-row--reverse" : "story-row";

  const sectionImage = section.image
    ? getFileUrl(
        { id: section.id, collectionId: section.collectionId, collectionName: section.collectionName },
        section.image
      )
    : "";

  return (
    <div className={rowClass}>
      <div className="story-row__copy">
        {section.subtitle && <span className="section-kicker">{section.subtitle}</span>}
        <h3>{section.title}</h3>
        {section.body && <p className="story-row__body" dangerouslySetInnerHTML={{ __html: section.body }} />}
      </div>
      {sectionImage && (
        <div className="story-row__visual">
          <div className="story-row__frame">
            <img
              src={sectionImage}
              alt={section.image_alt || section.title}
              className="story-row__image"
              style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
