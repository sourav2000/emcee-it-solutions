import { useState } from 'react'
import { PlayIcon } from './icons'
import VideoModal from './VideoModal'

interface MediaCardProps {
  imageUrl: string | null
  videoUrl: string | null
  imageBadgeText: string
}

export default function MediaCard({
  imageUrl,
  videoUrl,
  imageBadgeText,
}: MediaCardProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const hasMedia = Boolean(imageUrl || videoUrl)
  const hasVideo = Boolean(videoUrl)

  return (
    <>
      <div className="w-full min-w-0 max-w-[540px] justify-self-center lg:max-w-none lg:justify-self-end">
        {/* Blue Background Card */}
        <div className="relative rounded-[8px] bg-[#152d68] p-2 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">

          {/* Badge */}
          {imageBadgeText ? (
            <div className="absolute -top-4 right-0 z-20">
              <span className="inline-flex h-8 items-center whitespace-nowrap rounded-full bg-[#f26522] px-6 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(242,101,34,0.35)]">
                {imageBadgeText}
              </span>
            </div>
          ) : null}

          {/* White Video Card */}
          <div className="overflow-hidden rounded-[8px] bg-white ring-1 ring-white/10">
            <div className="flex min-h-[280px] flex-col sm:min-h-[320px] sm:flex-row">
              <div className="relative min-h-[200px] flex-1 bg-[#0f2d6e] sm:min-h-[320px]">
                {hasMedia ? (
                  <img
                    src={imageUrl ?? undefined}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a7a] to-[#0c1f4d]" />
                )}

                {hasVideo ? (
                  <button
                    type="button"
                    className="absolute left-1/2 top-1/2 flex h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#f26522] text-white shadow-[0_12px_32px_rgba(242,101,34,0.5)] transition-transform duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4"
                    aria-label="Play video"
                    onClick={() => setIsVideoOpen(true)}
                  >
                    <PlayIcon />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      {hasVideo && videoUrl ? (
        <VideoModal
          videoUrl={videoUrl}
          isOpen={isVideoOpen}
          onClose={() => setIsVideoOpen(false)}
        />
      ) : null}
    </>
  )
}