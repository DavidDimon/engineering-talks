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
  localPath,
  presentations as catalogPresentations,
  topicOptions,
  yearOptions,
  type CatalogFilters,
} from './catalog.js';

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
        Pular para o conteúdo
      </a>
      <header className="site-header">
        <a className="brand" href={homePath} aria-label="David Dimon — Engineering Talks">
          <span className="brand__mark" aria-hidden="true">
            DD
          </span>
          <span>
            David Dimon
            <small>Engineering Talks</small>
          </span>
        </a>
        <button
          className="theme-toggle"
          type="button"
          aria-label={`Mudar para o tema ${darkMode ? 'claro' : 'escuro'}`}
          aria-pressed={darkMode}
          onClick={() => setDarkMode((current) => !current)}
        >
          <span aria-hidden="true">{darkMode ? '☀' : '☾'}</span>
          <span>{darkMode ? 'Tema claro' : 'Tema escuro'}</span>
        </button>
      </header>
      {children}
      <footer>
        <p>Um arquivo pessoal de ideias compartilhadas ao longo da carreira.</p>
        <a href="https://github.com/DavidDimon/engineering-talks">
          Ver repositório <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </>
  );
}

function PresentationCard({ presentation }: { presentation: PresentationCatalogItem }) {
  return (
    <article className="card presentation-card">
      <div className="card__topline">
        <span className="eyebrow">{formatLabel(presentation.format)}</span>
        <span>{formatDeliveredAt(presentation.deliveredAt)}</span>
      </div>
      <div>
        <h3>{presentation.title}</h3>
        <p>{presentation.description}</p>
      </div>
      <ul className="topic-list" aria-label={`Temas de ${presentation.title}`}>
        {presentation.topics.map((topic) => (
          <li key={topic}>{formatLabel(topic)}</li>
        ))}
      </ul>
      <div className="card__actions">
        {presentation.presentationUrl ? (
          <a className="button" href={localPath(presentation.presentationUrl)}>
            Abrir apresentação <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <span className="migration-note">Apresentação em migração</span>
        )}
        <a className="text-link" href={presentation.sourceUrl}>
          Ver código original <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}

function CourseCard({ course }: { course: CourseCatalogItem }) {
  return (
    <article className="course-card">
      <div>
        <p className="kicker">Curso · {course.provider}</p>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
      </div>
      <dl className="course-card__facts">
        <div>
          <dt>Período</dt>
          <dd>
            {course.period.startYear}–{course.period.endYear}
          </dd>
        </div>
        <div>
          <dt>Papel</dt>
          <dd>{course.role}</dd>
        </div>
        <div>
          <dt>Conteúdo</dt>
          <dd>{course.lessons.length} aulas</dd>
        </div>
      </dl>
      <div className="card__actions">
        {course.courseUrl ? (
          <a className="button" href={localPath(course.courseUrl)}>
            Ver aulas <span aria-hidden="true">→</span>
          </a>
        ) : null}
        <a className="text-link" href={course.sourceUrl}>
          Ver código original <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}

function HomePage() {
  usePageMetadata(
    'David Dimon — Engineering Talks',
    'Arquivo pessoal de apresentações técnicas e cursos criados e compartilhados por David Dimon.',
  );
  const [filters, setFilters] = useState<CatalogFilters>(() => {
    const parameters = new URLSearchParams(window.location.search);
    const rawYear = Number(parameters.get('ano'));
    return {
      query: parameters.get('busca') ?? '',
      topic: parameters.get('tema') ?? 'all',
      year: yearOptions.includes(rawYear) ? rawYear : 'all',
    };
  });
  const presentations = useMemo(
    () => filterPresentations(catalogPresentations, filters),
    [filters],
  );

  useEffect(() => {
    const parameters = new URLSearchParams();
    if (filters.query.trim()) parameters.set('busca', filters.query.trim());
    if (filters.year !== 'all') parameters.set('ano', String(filters.year));
    if (filters.topic !== 'all') parameters.set('tema', filters.topic);
    const query = parameters.toString();
    window.history.replaceState(null, '', `${homePath}${query ? `?${query}` : ''}`);
  }, [filters]);

  function updateFilter<Key extends keyof CatalogFilters>(key: Key, value: CatalogFilters[Key]) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <SiteFrame>
      <main id="conteudo">
        <section className="hero" aria-labelledby="page-title">
          <p className="kicker">Apresentações técnicas · 2019—2022</p>
          <h1 id="page-title">
            Ideias de engenharia,
            <br /> preservadas no tempo.
          </h1>
          <p className="hero__summary">
            Um acervo das apresentações e aulas que criei e compartilhei ao longo da minha carreira
            — mantidas com o contexto da época e abertas para consulta.
          </p>
          <div className="hero__stats" aria-label="Resumo do acervo">
            <span>
              <strong>{catalogPresentations.length}</strong> apresentações
            </span>
            <span>
              <strong>{courses.reduce((total, course) => total + course.lessons.length, 0)}</strong>{' '}
              aulas
            </span>
            <span>
              <strong>{catalog.items.length}</strong> coleções
            </span>
          </div>
        </section>

        <section className="collection" aria-labelledby="presentations-title">
          <div className="section-heading">
            <div>
              <p className="kicker">Arquivo de apresentações</p>
              <h2 id="presentations-title">Apresentações</h2>
            </div>
            <p className="result-count" aria-live="polite">
              {presentations.length} de {catalogPresentations.length}
            </p>
          </div>

          <form className="filters" role="search" onSubmit={(event) => event.preventDefault()}>
            <label className="search-field">
              <span>Buscar no acervo</span>
              <input
                type="search"
                value={filters.query}
                placeholder="Título, tema ou descrição"
                onChange={(event) => updateFilter('query', event.currentTarget.value)}
              />
            </label>
            <label>
              <span>Ano</span>
              <select
                value={filters.year}
                onChange={(event) =>
                  updateFilter(
                    'year',
                    event.currentTarget.value === 'all' ? 'all' : Number(event.currentTarget.value),
                  )
                }
              >
                <option value="all">Todos os anos</option>
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Tema</span>
              <select
                value={filters.topic}
                onChange={(event) => updateFilter('topic', event.currentTarget.value)}
              >
                <option value="all">Todos os temas</option>
                {topicOptions.map((topic) => (
                  <option key={topic} value={topic}>
                    {formatLabel(topic)}
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
              <p className="kicker">Nenhum resultado</p>
              <h3>Tente uma busca mais ampla.</h3>
              <p>Limpe um ou mais filtros para rever o acervo completo.</p>
              <button className="button" type="button" onClick={() => setFilters(defaultFilters)}>
                Limpar filtros
              </button>
            </div>
          )}
        </section>

        <section className="collection collection--courses" aria-labelledby="courses-title">
          <div className="section-heading">
            <div>
              <p className="kicker">Formação compartilhada</p>
              <h2 id="courses-title">Cursos</h2>
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
  usePageMetadata(
    `${course.title} — David Dimon`,
    `${course.description} Consulte o índice completo das ${course.lessons.length} aulas.`,
  );
  return (
    <SiteFrame>
      <main id="conteudo">
        <nav className="breadcrumbs" aria-label="Navegação estrutural">
          <a href={homePath}>Acervo</a>
          <span aria-hidden="true">/</span>
          <span>{course.title}</span>
        </nav>
        <header className="course-hero">
          <div>
            <p className="kicker">
              {course.provider} · {course.period.startYear}–{course.period.endYear}
            </p>
            <h1>{course.title}</h1>
            <p>{course.description}</p>
          </div>
          <dl className="course-summary">
            <div>
              <dt>Papel</dt>
              <dd>{course.role}</dd>
            </div>
            <div>
              <dt>Aulas</dt>
              <dd>{course.lessons.length}</dd>
            </div>
            <div>
              <dt>Idioma</dt>
              <dd>{course.language}</dd>
            </div>
          </dl>
        </header>

        <section className="lesson-index" aria-labelledby="lesson-index-title">
          <div className="section-heading">
            <div>
              <p className="kicker">Programa completo</p>
              <h2 id="lesson-index-title">Aulas</h2>
            </div>
          </div>
          <ol className="lesson-list">
            {course.lessons.map((lesson) => (
              <li key={lesson.slug}>
                <a href={lesson.presentationUrl ? localPath(lesson.presentationUrl) : undefined}>
                  <span className="lesson-number">{String(lesson.order).padStart(2, '0')}</span>
                  <span>
                    <strong>{lesson.title}</strong>
                    <small>{lesson.topics.map(formatLabel).join(' · ')}</small>
                  </span>
                  <span aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ol>
          {course.historicalNotice ? (
            <aside className="historical-note">
              <strong>Nota histórica</strong>
              <p>{course.historicalNotice}</p>
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
  const index = course.lessons.findIndex((item) => item.slug === lesson.slug);
  const previous = course.lessons[index - 1];
  const next = course.lessons[index + 1];
  usePageMetadata(`${lesson.title} — ${course.title}`, `Aula ${lesson.order}: ${lesson.title}.`);

  return (
    <SiteFrame>
      <main id="conteudo">
        <nav className="breadcrumbs" aria-label="Navegação estrutural">
          <a href={homePath}>Acervo</a>
          <span aria-hidden="true">/</span>
          <a href={course.courseUrl ? localPath(course.courseUrl) : homePath}>{course.title}</a>
          <span aria-hidden="true">/</span>
          <span>Aula {lesson.order}</span>
        </nav>
        <article className="lesson-page">
          <p className="lesson-number">Aula {String(lesson.order).padStart(2, '0')}</p>
          <h1>{lesson.title}</h1>
          <ul className="topic-list" aria-label="Temas da aula">
            {lesson.topics.map((topic) => (
              <li key={topic}>{formatLabel(topic)}</li>
            ))}
          </ul>
          <div className="migration-panel">
            <p className="kicker">Aula preservada</p>
            <h2>Os slides desta aula fazem parte do build final.</h2>
            <p>
              No artefato publicado, esta URL permanente carrega diretamente o deck histórico em
              Slidev, preservando seu contexto original.
            </p>
            <a className="text-link" href={course.sourceUrl}>
              Consultar o repositório original <span aria-hidden="true">↗</span>
            </a>
          </div>
          <nav className="lesson-navigation" aria-label="Navegação entre aulas">
            {previous?.presentationUrl ? (
              <a href={localPath(previous.presentationUrl)}>
                <span>← Aula anterior</span>
                <strong>{previous.title}</strong>
              </a>
            ) : (
              <span />
            )}
            {next?.presentationUrl ? (
              <a href={localPath(next.presentationUrl)}>
                <span>Próxima aula →</span>
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
  usePageMetadata('Página não encontrada — Engineering Talks', 'A página solicitada não existe.');
  return (
    <SiteFrame>
      <main id="conteudo" className="not-found">
        <p className="kicker">Erro 404</p>
        <h1>Página não encontrada.</h1>
        <a className="button" href={homePath}>
          Voltar ao acervo
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
