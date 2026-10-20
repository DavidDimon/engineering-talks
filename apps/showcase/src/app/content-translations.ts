import type {
  CourseCatalogItem,
  CourseCatalogLesson,
  PresentationCatalogItem,
} from '@engineering-talks/content-schema';

import type { Locale } from './i18n.js';

type PresentationTranslation = Pick<PresentationCatalogItem, 'title' | 'description'>;

const presentationTranslations: Record<string, PresentationTranslation> = {
  'mdx-deck': {
    title: 'MDX Deck',
    description: 'A presentation about creating slides with MDX Deck.',
  },
  flutter: {
    title: 'Flutter',
    description: 'A historical introduction to Flutter and cross-platform application development.',
  },
  'software-testing': {
    title: 'Software testing',
    description: 'A presentation about software testing practices and strategies.',
  },
  'state-management': {
    title: 'State management',
    description: 'A presentation about state management strategies and tools.',
  },
  'monorepos-and-core-components': {
    title: 'Monorepos and core components',
    description: 'A presentation about monorepos and sharing core components.',
  },
};

const topicTranslations: Record<string, string> = {
  apresentacoes: 'presentations',
  arquitetura: 'architecture',
  componentes: 'components',
  estado: 'state',
  'engenharia-de-software': 'software-engineering',
  qualidade: 'quality',
  testes: 'testing',
};

export function localizeTopic(topic: string, locale: Locale): string {
  if (locale === 'en') return topicTranslations[topic] ?? topic;
  return Object.entries(topicTranslations).find(([, english]) => english === topic)?.[0] ?? topic;
}

const courseTranslation = {
  title: 'Awari front-end course',
  description: 'A 23-lesson front-end development course taught at Awari.',
  role: 'Instructor',
  historicalNotice:
    'This content reflects the state of the technology when the course was produced.',
};

const lessonTranslations: Record<string, string> = {
  '01-introducao-ao-desenvolvimento-web': 'Introduction to web development',
  '02-introducao-ao-terminal-e-git': 'Introduction to the terminal and Git',
  '03-introducao-ao-html': 'Introduction to HTML',
  '04-introducao-a-estilizacao-e-css': 'Introduction to styling and CSS',
  '05-introducao-a-estilizacao-e-css-parte-2': 'Introduction to styling and CSS — part 2',
  '06-introducao-a-programacao': 'Introduction to programming',
  '07-introducao-ao-javascript': 'Introduction to JavaScript',
  '08-o-javascript-contra-ataca': 'JavaScript strikes back',
  '09-javascript-contra-ataca-parte-2': 'JavaScript strikes back — part 2',
  '10-objetos-classes-e-muito-mais': 'Objects, classes, and much more!',
  '11-errors-promises-regex-e-dom': 'Errors, Promises, Regex, and DOM',
  '12-introducao-ao-react': 'Introduction to React',
  '13-introducao-ao-react-parte-2': 'Introduction to React — part 2',
  '14-functional-component': 'Functional Component',
  '15-componentes-parte-2': 'Components — part 2',
  '16-componentes-parte-3': 'Components — part 3',
  '17-gerenciamento-de-estados': 'State management',
  '18-gerenciamento-de-estados-parte-2': 'State management — part 2',
  '19-formularios': 'Forms',
  '20-typescript': 'TypeScript',
  '21-integracoes-com-api-rest': 'REST API integrations',
  '22-graphql-e-arquitetura-de-software': 'GraphQL and software architecture',
  '23-seo-e-ssr': 'SEO and SSR',
};

export function localizePresentation(
  presentation: PresentationCatalogItem,
  locale: Locale,
): PresentationCatalogItem {
  if (locale === 'pt-BR') return presentation;
  const translation = presentationTranslations[presentation.slug];
  return {
    ...presentation,
    ...(translation ?? {}),
    topics: presentation.topics.map((topic) => localizeTopic(topic, locale)),
    language: 'en',
    historicalNotice: presentation.historicalNotice
      ? 'This content reflects the state of the technology when it was produced.'
      : undefined,
  };
}

export function localizeLesson(lesson: CourseCatalogLesson, locale: Locale): CourseCatalogLesson {
  if (locale === 'pt-BR') return lesson;
  return { ...lesson, title: lessonTranslations[lesson.slug] ?? lesson.title };
}

export function localizeCourse(course: CourseCatalogItem, locale: Locale): CourseCatalogItem {
  if (locale === 'pt-BR') return course;
  return {
    ...course,
    ...courseTranslation,
    lessons: course.lessons.map((lesson) => localizeLesson(lesson, locale)),
  };
}
