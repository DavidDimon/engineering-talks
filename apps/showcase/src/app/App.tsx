import { useEffect, useMemo, useState, type ReactNode } from 'react';
import type {
  CourseCatalogItem,
  CourseCatalogLesson,
  PresentationCatalogItem,
} from '@engineering-talks/content-schema';

import {
  catalog,
  courses,
  filterPresentations,
  formatDeliveredAt,
  formatLabel,
  lessonPath,
  localPath,
  presentationPath,
  presentations as catalogPresentations,
  yearOptions,
  type CatalogFilters,
} from './catalog.js';
import {
  localizeCourse,
  localizeLesson,
  localizePresentation,
  localizeTopic,
} from './content-translations.js';
import { localeQuery, useI18n } from './i18n.js';

const homePath = '/engineering-talks/';
const defaultFilters: CatalogFilters = { query: '', topic: 'all', year: 'all' };

type Route =
  | { page: 'home' }
  | { course: CourseCatalogItem; page: 'course' }
  | { course: CourseCatalogItem; lesson: CourseCatalogLesson; page: 'lesson' }
  | { page: 'not-found' };

function currentRoute(): Route {
  const segments = window.location.pathname.split('/').filter(Boolean);
  const coursesIndex = segments.indexOf('courses');
  if (coursesIndex === -1) return { page: 'home' };

  const course = courses.find((item) => item.slug === segments[coursesIndex + 1]);
  if (!course) return { page: 'not-found' };
  if (segments[coursesIndex + 2] !== 'aulas') return { page: 'course', course };

  const lesson = course.lessons.find((item) => item.slug === segments[coursesIndex + 3]);
  return lesson ? { page: 'lesson', course, lesson } : { page: 'not-found' };
}

function usePageMetadata(title: string, description: string) {
  useEffect(() => {
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
    document.title = title;
    document
      .querySelector<HTMLMetaElement>('meta[name="description"]')
      ?.setAttribute('content', description);
    document
      .querySelector<HTMLMetaElement>('meta[property="og:title"]')
      ?.setAttribute('content', title);
    document
      .querySelector<HTMLMetaElement>('meta[property="og:description"]')
      ?.setAttribute('content', description);
    document
      .querySelector<HTMLMetaElement>('meta[property="og:url"]')
      ?.setAttribute('content', canonicalUrl);
    document
      .querySelector<HTMLMetaElement>('meta[name="twitter:title"]')
      ?.setAttribute('content', title);
    document
      .querySelector<HTMLMetaElement>('meta[name="twitter:description"]')
      ?.setAttribute('content', description);
    document
      .querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.setAttribute('href', canonicalUrl);
  }, [description, title]);
}

function SiteFrame({ children }: { children: ReactNode }) {
  const { locale, setLocale, t } = useI18n();
  const [darkMode, setDarkMode] = useState(() => {
    const saved = window.localStorage.getItem('showcase-theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    window.localStorage.setItem('showcase-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <>
      <a className="skip-link" href="#conteudo">
        {t('skipContent')}
      </a>
      <header className="site-header">
        <a
          className="brand"
          href={`${homePath}${localeQuery(locale)}`}
          aria-label="David Dimon — Engineering Talks"
        >
          <span className="brand__mark" aria-hidden="true">
            DD
          </span>
          <span>
            David Dimon
            <small>Engineering Talks</small>
          </span>
        </a>
        <div className="header-actions">
          <div className="language-switcher" role="group" aria-label={t('language')}>
            <button type="button" aria-pressed={locale === 'en'} onClick={() => setLocale('en')}>
              EN
            </button>
            <button
              type="button"
              aria-pressed={locale === 'pt-BR'}
              onClick={() => setLocale('pt-BR')}
            >
              PT
            </button>
          </div>
          <button
            className="theme-toggle"
            type="button"
            aria-label={t('changeTheme', { theme: darkMode ? t('light') : t('dark') })}
            aria-pressed={darkMode}
            onClick={() => setDarkMode((current) => !current)}
          >
            <span aria-hidden="true">{darkMode ? '☀' : '☾'}</span>
            <span>{darkMode ? t('lightTheme') : t('darkTheme')}</span>
          </button>
        </div>
      </header>
      {children}
      <footer>
        <p>{t('footer')}</p>
        <a href="https://github.com/DavidDimon/engineering-talks">
          {t('repository')} <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </>
  );
}

function PresentationCard({ presentation }: { presentation: PresentationCatalogItem }) {
  const { locale, t } = useI18n();
  const localized = localizePresentation(presentation, locale);
  return (
    <article className="card presentation-card">
      <div className="card__topline">
        <span className="eyebrow">{formatLabel(localized.format, locale)}</span>
        <span>{formatDeliveredAt(localized.deliveredAt, locale)}</span>
      </div>
      <div>
        <h3>{localized.title}</h3>
        <p>{localized.description}</p>
      </div>
      <ul className="topic-list" aria-label={t('topicsOf', { title: localized.title })}>
        {localized.topics.map((topic) => (
          <li key={topic}>{formatLabel(topic, locale)}</li>
        ))}
      </ul>
      <div className="card__actions">
        {localized.presentationUrl ? (
          <a className="button" href={presentationPath(localized.presentationUrl, locale)}>
            {t('openPresentation')} <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <span className="migration-note">{t('migrating')}</span>
        )}
        <a className="text-link" href={localized.sourceUrl}>
          {t('source')} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}

function CourseCard({ course }: { course: CourseCatalogItem }) {
  const { locale, t } = useI18n();
  const localized = localizeCourse(course, locale);
  return (
    <article className="course-card">
      <div>
        <p className="kicker">
          {t('course')} · {localized.provider}
        </p>
        <h3>{localized.title}</h3>
        <p>{localized.description}</p>
      </div>
      <dl className="course-card__facts">
        <div>
          <dt>{t('period')}</dt>
          <dd>
            {course.period.startYear}–{course.period.endYear}
          </dd>
        </div>
        <div>
          <dt>{t('role')}</dt>
          <dd>{localized.role}</dd>
        </div>
        <div>
          <dt>{t('content')}</dt>
          <dd>{t('lessonsCount', { count: localized.lessons.length })}</dd>
        </div>
      </dl>
      <div className="card__actions">
        {course.courseUrl ? (
          <a className="button" href={localPath(course.courseUrl)}>
            {t('viewLessons')} <span aria-hidden="true">→</span>
          </a>
        ) : null}
        <a className="text-link" href={course.sourceUrl}>
          {t('source')} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}

function HomePage() {
  const { locale, t } = useI18n();
  usePageMetadata('David Dimon — Engineering Talks', t('metaDescription'));
  const [filters, setFilters] = useState<CatalogFilters>(() => {
    const parameters = new URLSearchParams(window.location.search);
    const rawYear = Number(parameters.get('ano'));
    return {
      query: parameters.get('busca') ?? '',
      topic: parameters.get('tema') ?? 'all',
      year: yearOptions.includes(rawYear) ? rawYear : 'all',
    };
  });
  const localizedPresentations = useMemo(
    () => catalogPresentations.map((presentation) => localizePresentation(presentation, locale)),
    [locale],
  );
  const localizedTopicOptions = useMemo(
    () =>
      Array.from(
        new Set(localizedPresentations.flatMap((presentation) => presentation.topics)),
      ).sort((left, right) => left.localeCompare(right, locale)),
    [locale, localizedPresentations],
  );
  const presentations = useMemo(
    () => filterPresentations(localizedPresentations, filters),
    [filters, localizedPresentations],
  );

  useEffect(() => {
    const parameters = new URLSearchParams();
    if (filters.query.trim()) parameters.set('busca', filters.query.trim());
    if (filters.year !== 'all') parameters.set('ano', String(filters.year));
    if (filters.topic !== 'all') parameters.set('tema', filters.topic);
    if (locale === 'pt-BR') parameters.set('lang', locale);
    const query = parameters.toString();
    window.history.replaceState(null, '', `${homePath}${query ? `?${query}` : ''}`);
  }, [filters, locale]);

  useEffect(() => {
    if (filters.topic === 'all' || localizedTopicOptions.includes(filters.topic)) return;
    const translatedTopic = localizeTopic(filters.topic, locale);
    updateFilter(
      'topic',
      localizedTopicOptions.includes(translatedTopic) ? translatedTopic : 'all',
    );
  }, [filters.topic, locale, localizedTopicOptions]);

  function updateFilter<Key extends keyof CatalogFilters>(key: Key, value: CatalogFilters[Key]) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <SiteFrame>
      <main id="conteudo">
        <section className="hero" aria-labelledby="page-title">
          <p className="kicker">{t('heroKicker')}</p>
          <h1 id="page-title">
            {t('heroTitle')
              .split('\n')
              .map((line, index) => (
                <span key={line}>
                  {index > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
          </h1>
          <p className="hero__summary">{t('heroSummary')}</p>
          <div className="hero__stats" aria-label={t('archiveSummary')}>
            <span>
              <strong>{catalogPresentations.length}</strong> {t('presentationsCount')}
            </span>
            <span>
              <strong>{courses.reduce((total, course) => total + course.lessons.length, 0)}</strong>{' '}
              {t('lessons')}
            </span>
            <span>
              <strong>{catalog.items.length}</strong> {t('collections')}
            </span>
          </div>
        </section>

        <section className="collection" aria-labelledby="presentations-title">
          <div className="section-heading">
            <div>
              <p className="kicker">{t('presentationArchive')}</p>
              <h2 id="presentations-title">{t('presentations')}</h2>
            </div>
            <p className="result-count" aria-live="polite">
              {t('resultCount', {
                shown: presentations.length,
                total: catalogPresentations.length,
              })}
            </p>
          </div>

          <form className="filters" role="search" onSubmit={(event) => event.preventDefault()}>
            <label className="search-field">
              <span>{t('searchArchive')}</span>
              <input
                type="search"
                value={filters.query}
                placeholder={t('searchPlaceholder')}
                onChange={(event) => updateFilter('query', event.currentTarget.value)}
              />
            </label>
            <label>
              <span>{t('year')}</span>
              <select
                value={filters.year}
                onChange={(event) =>
                  updateFilter(
                    'year',
                    event.currentTarget.value === 'all' ? 'all' : Number(event.currentTarget.value),
                  )
                }
              >
                <option value="all">{t('allYears')}</option>
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>{t('topic')}</span>
              <select
                value={filters.topic}
                onChange={(event) => updateFilter('topic', event.currentTarget.value)}
              >
                <option value="all">{t('allTopics')}</option>
                {localizedTopicOptions.map((topic) => (
                  <option key={topic} value={topic}>
                    {formatLabel(topic, locale)}
                  </option>
                ))}
              </select>
            </label>
          </form>

          {presentations.length > 0 ? (
            <div className="card-grid">
              {presentations.map((presentation) => (
                <PresentationCard key={presentation.slug} presentation={presentation} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p className="kicker">{t('noResults')}</p>
              <h3>{t('broaderSearch')}</h3>
              <p>{t('clearHint')}</p>
              <button className="button" type="button" onClick={() => setFilters(defaultFilters)}>
                {t('clearFilters')}
              </button>
            </div>
          )}
        </section>

        <section className="collection collection--courses" aria-labelledby="courses-title">
          <div className="section-heading">
            <div>
              <p className="kicker">{t('sharedLearning')}</p>
              <h2 id="courses-title">{t('courses')}</h2>
            </div>
          </div>
          <div className="course-grid">
            {courses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}

function CoursePage({ course }: { course: CourseCatalogItem }) {
  const { locale, t } = useI18n();
  const localized = localizeCourse(course, locale);
  usePageMetadata(
    `${localized.title} — David Dimon`,
    t('courseMetaDescription', {
      description: localized.description,
      count: localized.lessons.length,
    }),
  );
  return (
    <SiteFrame>
      <main id="conteudo">
        <nav className="breadcrumbs" aria-label={t('structuralNavigation')}>
          <a href={`${homePath}${localeQuery(locale)}`}>{t('archive')}</a>
          <span aria-hidden="true">/</span>
          <span>{localized.title}</span>
        </nav>
        <header className="course-hero">
          <div>
            <p className="kicker">
              {localized.provider} · {localized.period.startYear}–{localized.period.endYear}
            </p>
            <h1>{localized.title}</h1>
            <p>{localized.description}</p>
          </div>
          <dl className="course-summary">
            <div>
              <dt>{t('role')}</dt>
              <dd>{localized.role}</dd>
            </div>
            <div>
              <dt>{t('lessons')}</dt>
              <dd>{localized.lessons.length}</dd>
            </div>
            <div>
              <dt>{t('languageLabel')}</dt>
              <dd>{localized.language}</dd>
            </div>
          </dl>
        </header>

        <section className="lesson-index" aria-labelledby="lesson-index-title">
          <div className="section-heading">
            <div>
              <p className="kicker">{t('completeProgram')}</p>
              <h2 id="lesson-index-title">{t('lessons')}</h2>
            </div>
          </div>
          <ol className="lesson-list">
            {localized.lessons.map((lesson) => (
              <li key={lesson.slug}>
                <a
                  href={
                    lesson.presentationUrl ? lessonPath(lesson.presentationUrl, locale) : undefined
                  }
                >
                  <span className="lesson-number">{String(lesson.order).padStart(2, '0')}</span>
                  <span>
                    <strong>{lesson.title}</strong>
                    <small>
                      {lesson.topics.map((topic) => formatLabel(topic, locale)).join(' · ')}
                    </small>
                  </span>
                  <span aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ol>
          {localized.historicalNotice ? (
            <aside className="historical-note">
              <strong>{t('historicalNote')}</strong>
              <p>{localized.historicalNotice}</p>
            </aside>
          ) : null}
        </section>
      </main>
    </SiteFrame>
  );
}

function LessonPage({
  course,
  lesson,
}: {
  course: CourseCatalogItem;
  lesson: CourseCatalogLesson;
}) {
  const { locale, t } = useI18n();
  const localizedCourse = localizeCourse(course, locale);
  const localizedLesson = localizeLesson(lesson, locale);
  const index = course.lessons.findIndex((item) => item.slug === lesson.slug);
  const previous = localizedCourse.lessons[index - 1];
  const next = localizedCourse.lessons[index + 1];
  usePageMetadata(
    `${localizedLesson.title} — ${localizedCourse.title}`,
    `${t('class')} ${localizedLesson.order}: ${localizedLesson.title}.`,
  );

  return (
    <SiteFrame>
      <main id="conteudo">
        <nav className="breadcrumbs" aria-label={t('structuralNavigation')}>
          <a href={`${homePath}${localeQuery(locale)}`}>{t('archive')}</a>
          <span aria-hidden="true">/</span>
          <a href={course.courseUrl ? localPath(course.courseUrl) : homePath}>
            {localizedCourse.title}
          </a>
          <span aria-hidden="true">/</span>
          <span>
            {t('class')} {localizedLesson.order}
          </span>
        </nav>
        <article className="lesson-page">
          <p className="lesson-number">
            {t('class')} {String(localizedLesson.order).padStart(2, '0')}
          </p>
          <h1>{localizedLesson.title}</h1>
          <ul className="topic-list" aria-label={t('lessonTopics')}>
            {localizedLesson.topics.map((topic) => (
              <li key={topic}>{formatLabel(topic, locale)}</li>
            ))}
          </ul>
          <div className="migration-panel">
            <p className="kicker">{t('preservedLesson')}</p>
            <h2>{t('lessonBuildTitle')}</h2>
            <p>{t('lessonBuildDescription')}</p>
            <a className="text-link" href={course.sourceUrl}>
              {t('originalRepository')} <span aria-hidden="true">↗</span>
            </a>
          </div>
          <nav className="lesson-navigation" aria-label={t('lessonNavigation')}>
            {previous?.presentationUrl ? (
              <a href={lessonPath(previous.presentationUrl, locale)}>
                <span>{t('previousLesson')}</span>
                <strong>{previous.title}</strong>
              </a>
            ) : (
              <span />
            )}
            {next?.presentationUrl ? (
              <a href={lessonPath(next.presentationUrl, locale)}>
                <span>{t('nextLesson')}</span>
                <strong>{next.title}</strong>
              </a>
            ) : null}
          </nav>
        </article>
      </main>
    </SiteFrame>
  );
}

function NotFoundPage() {
  const { locale, t } = useI18n();
  usePageMetadata(t('notFoundTitle'), t('notFoundDescription'));
  return (
    <SiteFrame>
      <main id="conteudo" className="not-found">
        <p className="kicker">{t('error404')}</p>
        <h1>{t('pageNotFound')}</h1>
        <a className="button" href={`${homePath}${localeQuery(locale)}`}>
          {t('backToArchive')}
        </a>
      </main>
    </SiteFrame>
  );
}

export function App() {
  const route = currentRoute();
  if (route.page === 'course') return <CoursePage course={route.course} />;
  if (route.page === 'lesson') return <LessonPage course={route.course} lesson={route.lesson} />;
  if (route.page === 'not-found') return <NotFoundPage />;
  return <HomePage />;
}
