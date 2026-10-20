import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Locale = 'en' | 'pt-BR';

const messages = {
  en: {
    skipContent: 'Skip to content',
    changeTheme: 'Switch to {theme} theme',
    light: 'light',
    dark: 'dark',
    lightTheme: 'Light theme',
    darkTheme: 'Dark theme',
    language: 'Language',
    english: 'English',
    portuguese: 'Portuguese',
    footer: 'A personal archive of ideas shared throughout my career.',
    repository: 'View repository',
    openPresentation: 'Open presentation',
    migrating: 'Presentation being migrated',
    source: 'View original source',
    course: 'Course',
    period: 'Period',
    role: 'Role',
    content: 'Content',
    lessonsCount: '{count} lessons',
    viewLessons: 'View lessons',
    metaDescription:
      'A personal archive of technical presentations and courses created and shared by David Dimon.',
    heroKicker: 'Technical presentations · 2019—2022',
    heroTitle: 'Engineering ideas,\npreserved over time.',
    heroSummary:
      'An archive of the presentations and lessons I created and shared throughout my career — kept with their original context and open for reference.',
    archiveSummary: 'Archive summary',
    presentationsCount: 'presentations',
    lessons: 'lessons',
    collections: 'collections',
    presentationArchive: 'Presentation archive',
    presentations: 'Presentations',
    resultCount: '{shown} of {total}',
    searchArchive: 'Search the archive',
    searchPlaceholder: 'Title, topic, or description',
    year: 'Year',
    allYears: 'All years',
    topic: 'Topic',
    allTopics: 'All topics',
    noResults: 'No results',
    broaderSearch: 'Try a broader search.',
    clearHint: 'Clear one or more filters to see the complete archive.',
    clearFilters: 'Clear filters',
    sharedLearning: 'Shared learning',
    courses: 'Courses',
    archive: 'Archive',
    structuralNavigation: 'Breadcrumbs',
    completeProgram: 'Complete program',
    historicalNote: 'Historical note',
    courseMetaDescription: '{description} Browse the complete index of {count} lessons.',
    class: 'Lesson',
    languageLabel: 'Language',
    lessonTopics: 'Lesson topics',
    preservedLesson: 'Preserved lesson',
    lessonBuildTitle: 'This lesson’s slides are included in the final build.',
    lessonBuildDescription:
      'In the published artifact, this permanent URL loads the historical Slidev deck directly, preserving its original context.',
    originalRepository: 'View the original repository',
    lessonNavigation: 'Lesson navigation',
    previousLesson: '← Previous lesson',
    nextLesson: 'Next lesson →',
    notFoundTitle: 'Page not found — Engineering Talks',
    notFoundDescription: 'The requested page does not exist.',
    error404: 'Error 404',
    pageNotFound: 'Page not found.',
    backToArchive: 'Back to archive',
    approximateDate: 'approximate date',
    topicsOf: 'Topics in {title}',
  },
  'pt-BR': {
    skipContent: 'Pular para o conteúdo',
    changeTheme: 'Mudar para o tema {theme}',
    light: 'claro',
    dark: 'escuro',
    lightTheme: 'Tema claro',
    darkTheme: 'Tema escuro',
    language: 'Idioma',
    english: 'Inglês',
    portuguese: 'Português',
    footer: 'Um arquivo pessoal de ideias compartilhadas ao longo da carreira.',
    repository: 'Ver repositório',
    openPresentation: 'Abrir apresentação',
    migrating: 'Apresentação em migração',
    source: 'Ver código original',
    course: 'Curso',
    period: 'Período',
    role: 'Papel',
    content: 'Conteúdo',
    lessonsCount: '{count} aulas',
    viewLessons: 'Ver aulas',
    metaDescription:
      'Arquivo pessoal de apresentações técnicas e cursos criados e compartilhados por David Dimon.',
    heroKicker: 'Apresentações técnicas · 2019—2022',
    heroTitle: 'Ideias de engenharia,\npreservadas no tempo.',
    heroSummary:
      'Um acervo das apresentações e aulas que criei e compartilhei ao longo da minha carreira — mantidas com o contexto da época e abertas para consulta.',
    archiveSummary: 'Resumo do acervo',
    presentationsCount: 'apresentações',
    lessons: 'aulas',
    collections: 'coleções',
    presentationArchive: 'Arquivo de apresentações',
    presentations: 'Apresentações',
    resultCount: '{shown} de {total}',
    searchArchive: 'Buscar no acervo',
    searchPlaceholder: 'Título, tema ou descrição',
    year: 'Ano',
    allYears: 'Todos os anos',
    topic: 'Tema',
    allTopics: 'Todos os temas',
    noResults: 'Nenhum resultado',
    broaderSearch: 'Tente uma busca mais ampla.',
    clearHint: 'Limpe um ou mais filtros para rever o acervo completo.',
    clearFilters: 'Limpar filtros',
    sharedLearning: 'Formação compartilhada',
    courses: 'Cursos',
    archive: 'Acervo',
    structuralNavigation: 'Navegação estrutural',
    completeProgram: 'Programa completo',
    historicalNote: 'Nota histórica',
    courseMetaDescription: '{description} Consulte o índice completo das {count} aulas.',
    class: 'Aula',
    languageLabel: 'Idioma',
    lessonTopics: 'Temas da aula',
    preservedLesson: 'Aula preservada',
    lessonBuildTitle: 'Os slides desta aula fazem parte do build final.',
    lessonBuildDescription:
      'No artefato publicado, esta URL permanente carrega diretamente o deck histórico em Slidev, preservando seu contexto original.',
    originalRepository: 'Consultar o repositório original',
    lessonNavigation: 'Navegação entre aulas',
    previousLesson: '← Aula anterior',
    nextLesson: 'Próxima aula →',
    notFoundTitle: 'Página não encontrada — Engineering Talks',
    notFoundDescription: 'A página solicitada não existe.',
    error404: 'Erro 404',
    pageNotFound: 'Página não encontrada.',
    backToArchive: 'Voltar ao acervo',
    approximateDate: 'data aproximada',
    topicsOf: 'Temas de {title}',
  },
} as const;

export type MessageKey = keyof (typeof messages)['en'];

type I18nValue = string | number;
type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: MessageKey, values?: Record<string, I18nValue>) => string;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

function initialLocale(): Locale {
  const parameter = new URLSearchParams(window.location.search).get('lang');
  if (parameter === 'en' || parameter === 'pt-BR') return parameter;
  return window.localStorage.getItem('showcase-locale') === 'pt-BR' ? 'pt-BR' : 'en';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem('showcase-locale', locale);
    const url = new URL(window.location.href);
    if (locale === 'en') url.searchParams.delete('lang');
    else url.searchParams.set('lang', locale);
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  }, [locale]);

  const value = useMemo<I18nContextValue>(() => {
    const t = (key: MessageKey, values: Record<string, I18nValue> = {}) =>
      Object.entries(values).reduce(
        (message, [name, replacement]) => message.replaceAll(`{${name}}`, String(replacement)),
        messages[locale][key] as string,
      );
    return { locale, setLocale, t };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used inside I18nProvider');
  return context;
}

export function localeQuery(locale: Locale): string {
  return locale === 'pt-BR' ? '?lang=pt-BR' : '';
}
