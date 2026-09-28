export interface PersonDetails {
  name: string;

  // short summary used for the page description and link previews
  description: string;
  year?: number;
  location: string;
  school: string;

  // e.g. "Bachelor in …, 2008"; shown on its own line under the school
  degree?: string;
  languages: string[];
  repoHref?: string;
  linkedinHref?: string;
  githubHref?: string;
}
