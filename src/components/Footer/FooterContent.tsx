import { memo } from 'react'
import type { FooterContent, FooterListItem } from '../../types/wordpress'
import styles from './Footer.module.css'
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  NaicsIcon,
  VeteranOwnedIcon,
  WomanOwnedIcon,
  XTwitterIcon,
  YouTubeIcon,
} from './FooterIcons'

const EXTERNAL_LINK_PROPS = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const

type FooterLinkListProps = {
  items: FooterListItem[]
}

const FooterLinkList = memo(function FooterLinkList({ items }: FooterLinkListProps) {
  return (
    <ul className={styles.linkList}>
      {items.map((item) => (
        <li key={item.label} className={styles.linkItem}>
          <a
            href={item.href}
            className={`${styles.footerLink} ${item.bold ? styles.footerLinkBold : ''}`}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  )
})

type SocialLinksProps = {
  links: FooterContent['socialLinks']
}

const SocialLinks = memo(function SocialLinks({ links }: SocialLinksProps) {
  const socialItems = [
    { label: 'Facebook', href: links.facebook, Icon: FacebookIcon },
    { label: 'X (Twitter)', href: links.xTwitter, Icon: XTwitterIcon },
    { label: 'Instagram', href: links.instagram, Icon: InstagramIcon },
    { label: 'LinkedIn', href: links.linkedin, Icon: LinkedInIcon },
    { label: 'YouTube', href: links.youtube, Icon: YouTubeIcon },
  ]

  return (
    <ul className={styles.socialList}>
      {socialItems.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            className={styles.socialLink}
            aria-label={label}
            {...EXTERNAL_LINK_PROPS}
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  )
})

type FooterContentViewProps = {
  content: FooterContent
}

export const FooterContentView = memo(function FooterContentView({
  content,
}: FooterContentViewProps) {
  return (
    <>
      <div className={styles.grid}>
        <div>
          <h2 className={styles.columnHeading}>{content.companyName}</h2>
          <p className={styles.companyDescription}>{content.companyDescription}</p>
          <SocialLinks links={content.socialLinks} />
        </div>

        <div>
          <h3 className={styles.columnHeading}>AI Solutions</h3>
          <FooterLinkList items={content.aiSolutions} />
        </div>

        <div>
          <h3 className={styles.columnHeading}>Services</h3>
          <FooterLinkList items={content.services} />
        </div>

        <div>
          <h3 className={styles.columnHeading}>Company</h3>
          <FooterLinkList items={content.companyLinks} />
        </div>
      </div>

      <hr className={styles.divider} aria-hidden="true" />

      <section className={styles.citiesSection} aria-labelledby="footer-cities-heading">
        <h3 id="footer-cities-heading" className={styles.citiesHeading}>
          Popular Cities We Serve
        </h3>
        <p className={styles.citiesText}>{content.popularCities.join(' • ')}</p>
      </section>

      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          © 2026 Emcee IT Solutions LLC. All rights reserved.
        </p>

        <div className={styles.badges}>
          <span className={styles.badge}>
            <VeteranOwnedIcon className={styles.badgeIcon} />
            Veteran Owned
          </span>
          <span className={styles.badge}>
            <WomanOwnedIcon className={styles.badgeIcon} />
            Woman Owned
          </span>
          <span className={styles.badge}>
            <NaicsIcon className={styles.badgeIcon} />
            NAICS: 541511, 541512, 541519
          </span>
        </div>
      </div>
    </>
  )
})

export function FooterSkeleton() {
  return (
    <>
      <div className={styles.grid} aria-hidden="true">
        <div>
          <div className={`${styles.skeletonBlock} mb-5 h-6 w-56`} />
          <div className={`${styles.skeletonBlock} mb-3 h-4 w-full max-w-sm`} />
          <div className={`${styles.skeletonBlock} mb-3 h-4 w-full max-w-sm`} />
          <div className={`${styles.skeletonBlock} mb-6 h-4 w-4/5 max-w-sm`} />
          <div className="flex gap-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className={`${styles.skeletonBlock} h-8 w-8 rounded-full`} />
            ))}
          </div>
        </div>

        {Array.from({ length: 3 }).map((_, columnIndex) => (
          <div key={columnIndex}>
            <div className={`${styles.skeletonBlock} mb-5 h-6 w-28`} />
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((__, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`${styles.skeletonBlock} h-4 ${rowIndex % 2 === 0 ? 'w-44' : 'w-36'}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <hr className={styles.divider} aria-hidden="true" />

      <section className={styles.citiesSection} aria-hidden="true">
        <div className={`${styles.skeletonBlock} mb-4 h-4 w-48`} />
        <div className={`${styles.skeletonBlock} mb-2 h-3 w-full`} />
        <div className={`${styles.skeletonBlock} mb-2 h-3 w-full`} />
        <div className={`${styles.skeletonBlock} h-3 w-4/5`} />
      </section>

      <div className={styles.bottomBar} aria-hidden="true">
        <div className={`${styles.skeletonBlock} h-4 w-72 max-w-full`} />
        <div className="flex flex-wrap gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className={`${styles.skeletonBlock} h-4 w-32`} />
          ))}
        </div>
      </div>
    </>
  )
}
