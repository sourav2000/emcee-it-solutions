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
            <div className="absolute -top-4 right-3 z-20 sm:right-4 lg:right-5">
              <span className="inline-flex h-8 items-center whitespace-nowrap rounded-full bg-[#f26522] px-4 text-xs font-semibold text-white shadow-[0_10px_30px_rgba(242,101,34,0.35)] sm:h-9 sm:px-5 sm:text-sm">
                {imageBadgeText}
              </span>
            </div>
          ) : null}

          {/* White Video Card */}
          <div className="overflow-hidden rounded-[8px] bg-white ring-1 ring-white/10">

            {/* Fixed 16:9 Ratio */}
            <div className="relative aspect-video w-full">

              {hasMedia ? (
                <img
                  src={imageUrl ?? undefined}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a7a] to-[#0c1f4d]" />
              )}

              {hasVideo && (
                <button
                  type="button"
                  className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#f26522] text-white shadow-[0_12px_32px_rgba(242,101,34,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_18px_45px_rgba(242,101,34,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4 sm:h-[4.5rem] sm:w-[4.5rem]"
                  aria-label="Play video"
                  onClick={() => setIsVideoOpen(true)}
                >
                  <PlayIcon />
                </button>
              )}

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