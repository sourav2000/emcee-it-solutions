type HeaderNavLinkProps = {
  href: string
  children: string
  isActive: boolean
  variant?: 'desktop' | 'mobile'
  onClick?: () => void
}

const linkBase =
  'relative inline-block font-medium no-underline transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1c3c8c] focus-visible:outline-offset-2'

const underline =
  "after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:origin-left after:scale-x-0 after:bg-[#1c3c8c] after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100"

export default function HeaderNavLink({
  href,
  children,
  isActive,
  variant = 'desktop',
  onClick,
}: HeaderNavLinkProps) {
  const stateClasses = isActive
    ? 'text-[#1c3c8c] after:scale-x-100'
    : 'text-[#374151] hover:text-[#1c3c8c]'

  const variantClasses =
    variant === 'desktop'
      ? 'px-3 py-2 text-[0.9375rem] leading-snug whitespace-nowrap'
      : 'block w-full px-4 py-3.5 text-base leading-snug'

  return (
    <a
      href={href}
      className={`${linkBase} ${underline} ${stateClasses} ${variantClasses}`}
      aria-current={isActive ? 'page' : undefined}
      onClick={onClick}
    >
      {children}
    </a>
  )
}
