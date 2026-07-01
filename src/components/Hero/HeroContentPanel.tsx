import type { HeroContent } from '../../types/wordpress'
import FeatureItem from './FeatureItem'
import HeroButton from './HeroButton'
import { InfoPopoverProvider } from './InfoPopoverContext'
import { RocketIcon } from './icons'

interface HeroContentPanelProps {
  content: HeroContent
}

export default function HeroContentPanel({ content }: HeroContentPanelProps) {
  return (
    <div className="flex flex-col gap-8 lg:gap-10">
      <div className="space-y-6">
        <h1 className="max-w-xl text-[2rem] leading-[1.15] font-bold tracking-tight text-white sm:text-[2.5rem] lg:text-[3.75rem] lg:leading-[1.1]">
          {content.title}
        </h1>

        {content.features.length > 0 ? (
          <InfoPopoverProvider>
            <ul className="flex max-w-xl flex-col gap-3.5 sm:gap-4">
              {content.features.map((feature, index) => (
                <FeatureItem
                  key={`${feature}-${index}`}
                  text={feature}
                  showInfo={index === 1}
                  infoId={`hero-feature-info-${index}`}
                />
              ))}
            </ul>
          </InfoPopoverProvider>
        ) : null}
      </div>

      <div className="flex flex-col gap-5 sm:gap-6">
        {content.badgeText ? (
          <HeroButton
            href={content.badgeLink || '#'}
            variant="badge"
            icon={<RocketIcon className="text-[#f26522]" />}
            showArrow
          >
            {content.badgeText}
          </HeroButton>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          {content.primaryButtonText ? (
            <HeroButton
              href={content.primaryButtonLink || '#'}
              variant="primary"
              showArrow
            >
              {content.primaryButtonText}
            </HeroButton>
          ) : null}

          {content.secondaryButtonText ? (
            <HeroButton
              href={content.secondaryButtonLink || '#'}
              variant="secondary"
              showArrow
            >
              {content.secondaryButtonText}
            </HeroButton>
          ) : null}
        </div>
      </div>
    </div>
  )
}
