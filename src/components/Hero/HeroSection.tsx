import { useHeroData } from '../../hooks/useHeroData'
import HeroContentPanel from './HeroContentPanel'
import styles from './HeroSection.module.css'
import MediaCard from './MediaCard'

function HeroSkeleton() {
  return (
    <section
      className="relative w-full max-w-full min-h-[calc(100svh-var(--header-height))] overflow-hidden bg-gradient-to-br from-[#0a1f4d] via-[#123272] to-[#1a4a9e] py-16 sm:py-20 lg:py-24"
      aria-busy="true"
      aria-label="Loading hero section"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <div className="h-12 w-full max-w-lg animate-pulse rounded-lg bg-white/10 sm:h-14" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-6 w-full max-w-md animate-pulse rounded bg-white/10"
                />
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="h-12 w-44 animate-pulse rounded-lg bg-white/10" />
              <div className="h-12 w-36 animate-pulse rounded-lg bg-white/10" />
            </div>
          </div>
          <div className="h-[320px] animate-pulse rounded-[2rem] bg-white/10 sm:h-[360px]" />
        </div>
      </div>
    </section>
  )
}

function HeroError({ message }: { message: string }) {
  return (
    <section
      className="relative w-full max-w-full min-h-[calc(100svh-var(--header-height))] overflow-hidden bg-gradient-to-br from-[#0a1f4d] via-[#123272] to-[#1a4a9e] py-16 sm:py-20 lg:py-24"
      role="alert"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-sm">
          <p className="text-lg font-semibold text-white">Unable to load hero content</p>
          <p className="mt-2 text-sm text-white/75">{message}</p>
        </div>
      </div>
    </section>
  )
}

export default function HeroSection() {
  const state = useHeroData()

  if (state.status === 'loading') {
    return <HeroSkeleton />
  }

  if (state.status === 'error') {
    return <HeroError message={state.message} />
  }

  const { data } = state

  return (
    <section className="relative w-full max-w-full min-h-[calc(100svh-var(--header-height))] overflow-hidden bg-gradient-to-br from-[#0a1f4d] via-[#123272] to-[#1a4a9e] py-14 sm:py-20 lg:py-20 xl:py-14">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_40%,rgba(59,111,217,0.25),transparent)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-[#2563eb]/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid w-full min-w-0 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-16">
          <div className="min-w-0">
            <HeroContentPanel content={data} />
          </div>
          <div className="min-w-0">
            <div className={styles.mediaStack}>
              {/* <div className={styles.mediaCardLayer}> */}
                {/* <div className={styles.mediaBackdrop} aria-hidden="true" /> */}
                <MediaCard
                  imageUrl={data.imageUrl}
                  videoUrl={data.videoUrl}
                  imageBadgeText={data.imageBadgeText}
                />
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
