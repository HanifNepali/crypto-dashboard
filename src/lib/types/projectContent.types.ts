export interface ProjectContent {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: { label: string; href: string };
  };
  overview: {
    heading: string;
    paragraph: string;
  };
  techStack: {
    heading: string;
    items: { name: string; description: string }[];
  };
  decisions: {
    heading: string;
    items: { title: string; description: string }[];
  };
  scope: {
    heading: string;
    paragraphs: string[];
    breakpoint: string;
  };
  accessibility: {
    heading: string;
    items: string[];
  };
  finalCta: {
    heading: string;
    description: string;
    cta: { label: string; href: string };
  };
  disclaimer: string;
}
