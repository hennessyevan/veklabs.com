import styles from './header.module.css'

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.wrapper}>
        <div className={styles.menu}>
          <a className={styles.anchor} href="/" title="Vek Labs">
            <svg className={styles.logo} viewBox="160 74 63.731 40">
              <use href="/images/logo.svg#logo" />
            </svg>
          </a>

          <nav className={styles.nav}>
            <ul className={styles.list}>
              {NAV_ITEMS.map((item) => (
                <li key={item.href} className={styles.item}>
                  <a className={styles.menuItem} href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="right">
            <a className="top menu-link" href="#contact">
              Contact
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
