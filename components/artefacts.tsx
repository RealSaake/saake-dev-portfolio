import type { ReactNode } from 'react'
import { Label } from './primitives'

/* ============================================================
   ARTEFACTS — drawn evidence

   Every figure in this file is built from the site's own tokens
   and ships as server-rendered HTML plus a little SVG. There is
   no image dependency, no chart library, no canvas, and no
   client JavaScript in any of it.

   Three rules held throughout:

     1. SVG draws marks — traces, ticks, connectors, arrowheads.
        Every word a reader needs is HTML, so it is selectable,
        translatable, searchable and reachable by a screen reader.
     2. Nothing animates on its own. The only motion is the
        site-wide entrance, which is a transition and therefore
        already neutered under prefers-reduced-motion.
     3. Coordinates are literal arrays. No randomness, so the
        same figure renders identically on every build.
   ============================================================ */

/* ── Plate — the frame every artefact sits in ────────────────
 *
 * The head states what the reader is looking at, which matters
 * most for the critique figures: a diagram of somebody else's
 * shipped interface has to say so, or it reads as a portfolio
 * piece claiming authorship of the thing being criticised.
 */
export function Plate({
  kind,
  title,
  provenance,
  children,
  className = '',
}: {
  kind: string
  title: string
  provenance?: string
  children: ReactNode
  className?: string
}) {
  return (
    <figure className={`plate ${className}`}>
      <div className="plate__head">
        <Label>{kind}</Label>
        {/* A real <h2>, styled down to the label register. The figure is
            a section of the document and the title is its name, so it
            belongs in the outline — and without it the <h3> subheads
            inside the critique register skipped a level straight from
            the page <h1>. A visual size is not a document level. */}
        <h2 className="label text-muted-2">{title}</h2>
      </div>
      {children}
      {provenance && (
        <figcaption className="plate__foot">
          <span className="text-s text-muted-2">{provenance}</span>
        </figcaption>
      )}
    </figure>
  )
}

/* ── Arrow — one orthogonal connector ────────────────────────
 *
 * preserveAspectRatio="none" plus a fixed viewBox lets the cell
 * be any width; non-scaling-stroke keeps the hairline a hairline
 * instead of stretching it into a wedge.
 */
function Arrow({ vertical = false }: { vertical?: boolean }) {
  if (vertical) {
    return (
      <svg
        aria-hidden="true"
        width="14"
        height="22"
        viewBox="0 0 14 22"
        fill="none"
        className="text-accent-fill"
      >
        <path
          d="M7 0V17"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <path d="M3 14l4 7 4-7" fill="currentColor" />
      </svg>
    )
  }
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="14"
      viewBox="0 0 22 14"
      fill="none"
      className="text-accent-fill"
    >
      <path d="M0 7H17" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <path d="M14 3l7 4-7 4" fill="currentColor" />
    </svg>
  )
}

/* ============================================================
   1 · DECISION FIELD

   The hero proof. One content row per decision category, carried
   through three aligned layers: the raw requirement, the rule
   that resolves it, and the interface state that results.

   The row ID is the spine. It stays visible at every width,
   because once the three layers stack on a narrow screen the ID
   is the only thing left tying them together.
   ============================================================ */

type Decision = {
  id: string
  category: string
  requirement: string
  rule: string
  render: ReactNode
}

const DECISIONS: Decision[] = [
  {
    id: 'R-03',
    category: 'Hierarchy',
    requirement: 'A form with nineteen fields has one that blocks submission.',
    rule: 'Rank by consequence, not by source order.',
    render: (
      <div className="spec">
        <div className="label text-muted-2">Step 2 of 4</div>
        <div className="mt-2 text-s text-ink">Billing country</div>
        <div className="mt-2 h-6 border border-rule-strong bg-surface" />
        <div className="mt-2 text-s text-muted-2">17 other fields, collapsed</div>
      </div>
    ),
  },
  {
    id: 'R-05',
    category: 'State',
    requirement: 'The operation takes longer than a person will wait quietly.',
    rule: 'Report progress in the unit the user cares about.',
    render: (
      <div className="spec">
        <div className="text-s text-ink">Importing — 24 of 40 rows</div>
        <div className="spec__bar mt-3">
          <span className="spec__fill" style={{ width: '60%' }} />
        </div>
        <div className="label mt-2 text-muted-2">Est. 12s remaining</div>
      </div>
    ),
  },
  {
    id: 'R-06',
    category: 'Action',
    requirement: 'One action in this menu cannot be undone.',
    rule: 'Weight follows consequence. Colour is not the only cue.',
    render: (
      <div className="spec">
        <div className="flex flex-wrap items-center gap-3">
          <span className="label border border-rule-strong px-3 py-1 text-ink-2">Duplicate</span>
          <span className="label border border-rule-strong px-3 py-1 text-ink-2">Archive</span>
        </div>
        <div className="mt-3 border-t border-rule pt-3">
          <span className="label border border-signal px-3 py-1 text-ink">Delete — permanent</span>
        </div>
      </div>
    ),
  },
  {
    id: 'R-07',
    category: 'Recovery',
    requirement: 'The import fails halfway with the user’s work in the buffer.',
    rule: 'Preserve the work, name the cause, expose the retry.',
    render: (
      <div className="spec spec--fault">
        <div className="text-s text-ink">Import stopped at row 24</div>
        <div className="mt-1 text-s text-muted">
          Column <span className="font-mono">postal_code</span> was empty. Rows 1–23 are saved.
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="label border border-accent-fill bg-accent-fill px-3 py-1 text-on-accent">
            Retry from row 24
          </span>
          <span className="label text-muted-2">Edit the file</span>
        </div>
      </div>
    ),
  },
]

/* The bar thickens as the decisions compound: four segments,
   1px through 8px. Thickness is the only variable, and it is
   carrying real information rather than decorating the row. */
const SEGMENTS = ['h-px', 'h-1', 'h-2', 'h-3'] as const

export function DecisionField() {
  return (
    <Plate
      kind="Working method"
      title="Requirement → rule → rendered state"
      provenance="Four decisions from real interface problems, carried through to the state each one produces. The specimens are drawn in this page's own tokens — they are the argument, not screenshots of it."
    >
      {/* the compounding rule */}
      <div className="flex items-end gap-px px-4 pt-4" aria-hidden="true">
        {DECISIONS.map((d, i) => (
          <span key={d.id} className={`dseg ${SEGMENTS[i]}`} />
        ))}
      </div>
      <div className="flex px-4 pb-4">
        {DECISIONS.map((d) => (
          <span key={d.id} className="label flex-1 pt-2 text-muted-2">
            {d.category}
          </span>
        ))}
      </div>

      {/* column heads — only meaningful once the layers sit side by side */}
      <div className="proof hidden md:block">
        <div className="proof__row" role="presentation">
          <span className="label">Requirement</span>
          <span />
          <span className="label">Rule</span>
          <span />
          <span className="label">Rendered</span>
        </div>
      </div>

      <div className="proof md:border-t-0">
        {DECISIONS.map((d) => (
          <div key={d.id} className="proof__row">
            <div className="proof__cell">
              <div className="flex items-baseline gap-3">
                <span className="label text-accent-text">{d.id}</span>
                <span className="label text-muted-2 md:hidden">Requirement</span>
              </div>
              <p className="mt-2 text-s text-ink-2">{d.requirement}</p>
            </div>

            <div className="proof__arrow">
              <Arrow />
            </div>

            <div className="proof__cell">
              <span className="label text-muted-2 md:hidden">Rule</span>
              <p className="mt-2 text-s text-ink md:mt-0">{d.rule}</p>
            </div>

            <div className="proof__arrow">
              <Arrow />
            </div>

            <div className="proof__cell">
              <span className="label mb-2 block text-muted-2 md:hidden">Rendered</span>
              {d.render}
            </div>
          </div>
        ))}
      </div>
    </Plate>
  )
}

/* ============================================================
   2 · CRITIQUE PLATE — Waveline

   A forensic reading of a deployed interface, including my own.
   The trace plots interface signal against task clarity: the
   further right, the more decoration is carrying weight that
   the task should be carrying.

   The purple band is the criticised system, drawn flat and
   labelled. It is evidence, not styling.
   ============================================================ */

/* Deterministic coordinates. Three series, plotted left to right
   across a 760×300 plot area, disciplined at the start and
   dispersing after the crossover at x=340. */
const TRACE = [
  '40,196 100,188 160,200 220,182 280,196 340,170 400,124 460,208 520,96 580,224 640,88 700,232 760,104',
  '40,206 100,214 160,202 220,218 280,204 340,222 400,150 460,250 520,128 580,262 640,116 700,266 760,140',
  '40,186 100,178 160,192 220,172 280,184 340,158 400,104 460,186 520,74 580,198 640,66 700,206 760,84',
]

const CROSSOVER = 340

export function CritiquePlate() {
  return (
    <Plate
      kind="Design critique of a deployed UI"
      title="Waveline — signal against task clarity"
      provenance="Observed in the live deployment and reconstructed here as analysis. It is a reading of what shipped, not a claim of authored excellence — and the interface being criticised is my own."
    >
      <div className="grid gap-0 lg:grid-cols-12">
        {/* ── the trace ── */}
        <div className="border-b border-rule p-4 lg:col-span-8 lg:border-b-0 lg:border-r">
          <div className="flex items-baseline justify-between gap-4">
            <span className="label">Interface signal ↑</span>
            <span className="label text-muted-2">noise ↓</span>
          </div>

          <svg
            viewBox="0 0 800 320"
            className="mt-3 w-full"
            role="img"
            aria-labelledby="wl-t wl-d"
          >
            <title id="wl-t">
              Waveline critique: three signal traces against task clarity
            </title>
            <desc id="wl-d">
              A critique visualisation, not a screenshot. Three traces run left to right. On
              the left they are narrow and disciplined. After the midpoint they swell into a
              wide band, marked as the region where visual effect outruns product meaning. A
              fault marker at the right edge records that the upload route returns a 404.
            </desc>

            {/* axes */}
            <path
              d="M40 300H780"
              stroke="var(--rule-strong)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M40 20V300"
              stroke="var(--rule-strong)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />

            {/* ticks — 8px scale, four steps */}
            {[300, 230, 160, 90].map((y) => (
              <path
                key={y}
                d={`M34 ${y}H40`}
                stroke="var(--rule-strong)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {/* the criticised region, drawn flat — no gradient, no glow */}
            <path
              d={`M${CROSSOVER} 300H760V64H${CROSSOVER}Z`}
              fill="var(--evidence-wash)"
            />
            <path
              d={`M${CROSSOVER} 64V300`}
              stroke="var(--evidence)"
              strokeWidth="1"
              strokeDasharray="4 4"
              vectorEffect="non-scaling-stroke"
            />

            {/* disciplined half — ink */}
            {TRACE.map((pts, i) => (
              <polyline
                key={`a${i}`}
                points={pts
                  .split(' ')
                  .filter((p) => Number(p.split(',')[0]) <= CROSSOVER)
                  .join(' ')}
                fill="none"
                stroke="var(--muted)"
                strokeWidth={i === 2 ? 1.5 : 1}
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {/* dispersed half — evidence purple */}
            {TRACE.map((pts, i) => (
              <polyline
                key={`b${i}`}
                points={pts
                  .split(' ')
                  .filter((p) => Number(p.split(',')[0]) >= CROSSOVER)
                  .join(' ')}
                fill="none"
                stroke="var(--evidence)"
                strokeWidth={i === 2 ? 1.5 : 1}
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {/* the fault */}
            <path
              d="M760 20V300"
              stroke="var(--signal)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <rect x="754" y="40" width="12" height="12" fill="var(--signal)" />
          </svg>

          {/* every label a reader needs is HTML, not SVG text */}
          <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <span className="label text-muted-2">Task clarity →</span>
            <span className="label text-evidence">
              Visual effect outruns product meaning
            </span>
            <span className="label text-signal">Upload → 404</span>
          </div>

          <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-3 border-t border-rule pt-4">
            {[
              ['bg-muted', 'Task-carrying signal'],
              ['bg-evidence', 'Decoration carrying weight'],
              ['bg-signal', 'Fault'],
            ].map(([swatch, term]) => (
              <div key={term} className="flex items-center gap-3">
                <dt aria-hidden="true" className={`h-2 w-6 ${swatch}`} />
                <dd className="label text-muted-2">{term}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── the register ── */}
        <div className="lg:col-span-4">
          {[
            {
              head: 'What shipped',
              tone: 'text-ink-2',
              items: [
                'A saturated visual treatment applied across the whole surface',
                'An upload entry point on the primary route',
                'Minimal framing of what the user is meant to do first',
              ],
            },
            {
              head: 'What breaks',
              tone: 'text-signal',
              items: [
                'The upload route returns 404 — the entry point leads nowhere',
                'Decorative hierarchy competes with the task for attention',
                'Translucent rounded surfaces blur the boundary between states',
              ],
            },
            {
              head: 'What I would change',
              tone: 'text-accent-text',
              items: [
                'Restore task-first hierarchy; decoration sits behind the task',
                'Make upload status explicit at every step',
                'Add recovery states for the failure paths that already exist',
                'Reserve the accent for state, not for atmosphere',
              ],
            },
          ].map((block) => (
            <div key={block.head} className="border-b border-rule p-4 last:border-b-0">
              <h3 className={`label ${block.tone}`}>{block.head}</h3>
              <ul className="mt-3 flex flex-col gap-3">
                {block.items.map((it) => (
                  <li key={it} className="text-s text-muted">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Plate>
  )
}

/* ============================================================
   3 · PIPELINE — SkillBridge

   Repository evidence in, roadmap out, with the inference step
   visible in the middle. The connectors are borders and small
   fixed SVG arrows on real grid cells, so the whole thing
   reflows at any width with no measurement and no observer.

   Confidence is text plus tick marks. Never a glossy bar.
   ============================================================ */

const TREE = [
  ['src/auth/session.ts', 'TypeScript, auth pattern'],
  ['src/auth/refresh.ts', 'Token handling'],
  ['tests/session.test.ts', 'Happy-path coverage'],
  ['package.json', 'Dependency use'],
  ['README.md', 'Stated intent'],
]

const MATRIX: [string, string, string, number][] = [
  ['Auth patterns', 'Session handling read', 'Refresh failure path', 3],
  ['Type safety', 'Strict mode on', 'No runtime validation', 3],
  ['Testing', 'Unit tests present', 'Error-path + integration', 1],
  ['Dependencies', 'Versions pinned', 'No audit trail', 2],
]

const LANES: [string, string[]][] = [
  ['Now', ['Implement refresh failure tests', 'Add integration fixtures']],
  ['Next', ['Runtime schema validation at boundaries', 'Error-path coverage across auth']],
  ['Later', ['Dependency audit in CI', 'Contract tests for the function layer']],
]

const LINEAGE: [string, string, string, string][] = [
  [
    'src/auth/session.ts',
    'Refresh handling is referenced but never exercised',
    'Token refresh gap',
    'Implement refresh failure tests → Now',
  ],
  [
    'tests/session.test.ts',
    'Every assertion follows the success path',
    'Error-path testing gap',
    'Error-path coverage across auth → Next',
  ],
  [
    'package.json',
    'Versions are pinned with no record of why',
    'No audit trail',
    'Dependency audit in CI → Later',
  ],
]

function Ticks({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center gap-1" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={`inline-block h-2 w-2 border ${
            i < n ? 'border-accent-fill bg-accent-fill' : 'border-rule-strong'
          }`}
        />
      ))}
    </span>
  )
}

export function Pipeline() {
  return (
    <Plate
      kind="Transformation model"
      title="SkillBridge — repository evidence to sequenced roadmap"
      provenance="A model of how the application reasons, reconstructed from its own source. The current deployment gives insufficient guidance and no empty-state direction; that is an observation about what is live, not a description of this model."
    >
      <div className="pipe p-4">
        {/* in */}
        <div className="border border-rule bg-paper">
          <div className="border-b border-rule p-3">
            <Label>Repository</Label>
          </div>
          <ul>
            {TREE.map(([file, tag]) => (
              <li key={file} className="border-b border-rule p-3 last:border-b-0">
                <span className="block font-mono text-s text-ink">{file}</span>
                <span className="label mt-1 block text-muted-2">{tag}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pipe__link">
          <span className="hidden lg:block">
            <Arrow />
          </span>
          <span className="lg:hidden">
            <Arrow vertical />
          </span>
        </div>

        {/* transform */}
        <div className="border border-rule bg-paper">
          <div className="flex items-baseline justify-between gap-4 border-b border-rule p-3">
            <Label>Extraction</Label>
            <span className="label text-muted-2">parse · group · compare</span>
          </div>
          <table className="w-full text-left">
            <caption className="sr-only">
              What the analysis observed, what it could not find, and how confident it is
            </caption>
            <thead>
              <tr className="border-b border-rule">
                <th scope="col" className="label p-3">
                  Signal
                </th>
                <th scope="col" className="label p-3">
                  Observed
                </th>
                <th scope="col" className="label p-3">
                  Missing
                </th>
                <th scope="col" className="label p-3">
                  Conf.
                </th>
              </tr>
            </thead>
            <tbody>
              {MATRIX.map(([signal, observed, missing, conf]) => (
                <tr key={signal} className="border-b border-rule last:border-b-0">
                  <th scope="row" className="p-3 text-s font-normal text-ink">
                    {signal}
                  </th>
                  <td className="p-3 text-s text-muted">{observed}</td>
                  <td className="p-3 text-s text-signal">{missing}</td>
                  <td className="whitespace-nowrap p-3">
                    <span className="label text-muted-2">{conf}/4</span>
                    <span className="mt-1 block">
                      <Ticks n={conf} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pipe__link">
          <span className="hidden lg:block">
            <Arrow />
          </span>
          <span className="lg:hidden">
            <Arrow vertical />
          </span>
        </div>

        {/* out */}
        <div className="border border-rule bg-paper">
          <div className="border-b border-rule p-3">
            <Label>Roadmap</Label>
          </div>
          {LANES.map(([lane, items]) => (
            <div key={lane} className="border-b border-rule p-3 last:border-b-0">
              <span className="label text-accent-text">{lane}</span>
              <ul className="mt-2 flex flex-col gap-2">
                {items.map((it) => (
                  <li key={it} className="text-s text-ink-2">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── lineage — the claim that makes the diagram checkable ──
          A real <details>, so it is keyboard-operable, works with
          no JavaScript, and needs no overlay on a narrow screen. */}
      <div className="border-t border-rule px-4 pb-4 pt-4">
        <Label className="mb-3">Trace one line of reasoning</Label>
        <div className="lin">
          {LINEAGE.map(([file, why, gap, action]) => (
            <details key={file}>
              {/* The dash is real, announced text. A flex gap separates
                  these two spans visually but contributes no character,
                  so the accessible name came out as
                  "session.tsToken refresh gap" — one word. */}
              <summary>
                <span className="font-mono text-s text-ink">{file}</span>
                <span className="text-muted-2">—</span>
                <span className="label text-muted-2">{gap}</span>
              </summary>
              <ol className="px-4 pb-4">
                {[
                  ['Evidence', file],
                  ['Reading', why],
                  ['Inferred gap', gap],
                  ['Roadmap action', action],
                ].map(([k, v], i) => (
                  <li key={k} className="flex gap-4 border-t border-rule py-3">
                    <span className="label shrink-0 text-accent-text">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>
                      <span className="label block text-muted-2">{k}</span>
                      <span className="mt-1 block text-s text-ink-2">{v}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </details>
          ))}
        </div>
      </div>
    </Plate>
  )
}

/* ============================================================
   4 · SPECIMEN — observed against rebuilt

   A fixed datum, not a draggable handle. Both panes carry the
   same content IDs so the comparison is registered rather than
   impressionistic.

   The "observed" pane honestly reproduces the traits being
   rejected — heavy rounding, a translucent stack, a vague error
   with no way out. It is written in CSS in globals.css rather
   than as utility classes, because the point is to depict those
   traits, not to make them available as house style.
   ============================================================ */

const LEDGER: [string, string, string][] = [
  ['Radius', '20px everywhere', '0 — boundaries are edges'],
  ['Surface depth', '4 translucent layers', '2 opaque planes'],
  ['Accent roles', 'Decoration, brand, state, action', 'State and action only'],
  ['Error copy', '“Something went wrong”', 'Cause, scope, and a retry'],
  ['Spacing', 'Ad hoc', 'One 4px scale'],
]

export function Specimen() {
  return (
    <Plate
      kind="Visual system specimen"
      title="Observed system / rebuilt system"
      provenance="The same upload flow under two systems. The left pane reproduces the traits being rejected so the comparison has something real in it; it is a depiction, not a style available anywhere else on this site."
    >
      <div className="cmp">
        {/* control — narrow widths only; above 900px both panes show */}
        <fieldset className="cmp__ctl border-b border-rule p-4">
          <legend className="label mb-3">Show</legend>
          <div className="flex flex-wrap gap-2">
            {[
              ['cmp-observed', 'observed', 'Observed'],
              ['cmp-both', 'both', 'Side by side'],
              ['cmp-rebuilt', 'rebuilt', 'Rebuilt'],
            ].map(([id, value, text]) => (
              <span key={id} className="contents">
                <input
                  type="radio"
                  name="cmp"
                  id={id}
                  value={value}
                  defaultChecked={value === 'both'}
                  className="sr-only"
                />
                <label
                  htmlFor={id}
                  className="label cursor-pointer border border-rule-strong px-3 py-2 text-ink-2"
                >
                  {text}
                </label>
              </span>
            ))}
          </div>
        </fieldset>

        <div className="cmp__panes">
          {/* ---- observed ---- */}
          <div className="cmp__pane--before p-4">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <Label>Observed system</Label>
              <span className="label text-evidence">as deployed</span>
            </div>

            <div className="obs">
              <div className="obs__chip label">Upload</div>
              <div className="mt-4 flex flex-col gap-2">
                <span className="obs__ghost" style={{ width: '80%' }} />
                <span className="obs__ghost" style={{ width: '55%' }} />
              </div>
              <div className="mt-4 text-s" style={{ color: 'var(--evidence)' }}>
                Something went wrong
              </div>
              <div className="label mt-1 text-muted-2">no cause, no retry, no state</div>
            </div>

            <ul className="mt-4 flex flex-col gap-2">
              {[
                'Accent colour does four jobs at once',
                'Translucency stands in for hierarchy',
                'Failure is announced but not explained',
                'No visible progress or status',
              ].map((t) => (
                <li key={t} className="text-s text-muted-2">
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="cmp__datum" aria-hidden="true" />

          {/* ---- rebuilt ---- */}
          <div className="cmp__pane--after p-4">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <Label>Rebuilt system</Label>
              <span className="label text-accent-text">proposed</span>
            </div>

            <div className="border border-rule-strong bg-paper p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-s text-ink">Import contacts.csv</span>
                <span className="label text-signal">Failed</span>
              </div>

              {/* status is a named sequence, and the name is text */}
              <ol className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                {[
                  ['Ready', false],
                  ['Uploading', false],
                  ['Failed', true],
                  ['Retry available', true],
                ].map(([state, active]) => (
                  <li
                    key={String(state)}
                    className={`label ${active ? 'text-ink' : 'text-muted-2'}`}
                  >
                    {active ? '● ' : '○ '}
                    {state}
                  </li>
                ))}
              </ol>

              <div className="spec__bar mt-3">
                <span className="spec__fill" style={{ width: '60%' }} />
              </div>

              <p className="mt-3 text-s text-muted">
                Stopped at row 24 of 40. Column <span className="font-mono">postal_code</span> was
                empty. Rows 1–23 are saved.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="label border border-accent-fill bg-accent-fill px-3 py-2 text-on-accent">
                  Retry from row 24
                </span>
                <span className="label border border-rule-strong px-3 py-2 text-ink-2">
                  Download error report
                </span>
              </div>
            </div>

            <ul className="mt-4 flex flex-col gap-2">
              {[
                'One accent, reserved for state and action',
                'Two opaque planes instead of four translucent ones',
                'Failure states its cause and its scope',
                'Recovery is an action, not a refresh',
              ].map((t) => (
                <li key={t} className="text-s text-muted">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ---- token ledger ----
           `table-fixed` rather than auto: with auto layout the widest
           cell sets the column, and at 320px the three columns add up
           to more than the viewport, which stretches the plate and
           gives the whole document a horizontal scrollbar. Fixed
           layout divides the available width instead, so the table
           wraps rather than pushes. */}
      <div className="border-t border-rule">
        <table className="w-full table-fixed text-left">
          <caption className="label p-4 text-left">What changed, as tokens</caption>
          <thead>
            <tr className="border-y border-rule">
              <th scope="col" className="label p-3">
                Token
              </th>
              <th scope="col" className="label p-3">
                Observed
              </th>
              <th scope="col" className="label p-3">
                Rebuilt
              </th>
            </tr>
          </thead>
          <tbody>
            {LEDGER.map(([token, before, after]) => (
              <tr key={token} className="border-b border-rule last:border-b-0">
                <th scope="row" className="p-3 text-s font-normal text-ink">
                  {token}
                </th>
                <td className="p-3 text-s text-muted-2">{before}</td>
                <td className="p-3 text-s text-ink-2">{after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="border-t border-rule p-4 text-body text-ink-2">
        Atmosphere cannot substitute for state.
      </p>
    </Plate>
  )
}

/* ── Per-case artefact ──────────────────────────────────────
 *
 * A lookup rather than a component with internal branching, so a
 * page can ask whether an artefact exists before it commits to
 * rendering a section heading for one.
 *
 * Not every case study has a figure. The firmware
 * design and the unfinished experiment do not, and they get
 * nothing rather than an empty frame — a placeholder in an
 * evidence slot is a claim about work that is not there, which
 * is the exact failure this site was rebuilt to remove.
 */
/* ── IndexPlate — the work index row's right-hand cell ───────
 *
 * This slot held an unlabelled texture panel: three columns of
 * decoration in the widest part of the row. It now carries the
 * three things a reader wants before deciding whether to click —
 * is it running, is the source readable, and does it have a
 * drawn figure — pulled from the case study's own fields rather
 * than restated by hand.
 */
export function IndexPlate({
  year,
  kind,
  deployed,
  source,
  hasArtefact,
}: {
  year: string
  kind: string
  deployed: boolean
  source: boolean
  hasArtefact: boolean
}) {
  const states: [string, boolean][] = [
    ['Deployed', deployed],
    ['Source public', source],
    ['Figure drawn', hasArtefact],
  ]

  return (
    <div className="border border-rule bg-surface-2">
      {/* year and kind are already stated in the left cell of this row,
          so this header is the duplicate and it is the part that hides.
          The states below are not stated anywhere else, so they stay
          readable — hiding the whole plate would have deleted the only
          new information in it. */}
      <div
        aria-hidden="true"
        className="flex items-baseline justify-between gap-3 border-b border-rule px-3 py-2"
      >
        <span className="label text-muted-2">{year}</span>
        <span className="label text-muted-2">{kind}</span>
      </div>
      <dl className="p-3">
        {states.map(([term, on]) => (
          <div key={term} className="flex items-baseline justify-between gap-3 py-1">
            <dt className={`label ${on ? 'text-ink-2' : 'text-muted-2'}`}>{term}</dt>
            <dd className={`label ${on ? 'text-accent-text' : 'text-muted-2'}`}>
              {on ? 'yes' : 'no'}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export const CASE_ARTEFACTS: Record<string, { caption: string; render: () => ReactNode }> = {
  waveline: {
    caption: 'A critique of the deployed interface, drawn from what is live',
    render: () => <CritiquePlate />,
  },
  skillbridge: {
    caption: 'How repository evidence becomes a sequenced roadmap',
    render: () => <Pipeline />,
  },
  'rebuilding-this-site': {
    caption: 'The system that was removed, against the one that replaced it',
    render: () => <Specimen />,
  },
}
