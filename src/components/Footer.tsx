import { contact } from '../data'

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/5 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="font-display text-sm text-white">
          <span className="text-[#22ff88]">$</span> tamilvanan<span className="text-[#00f0ff]">.gowran</span>
        </p>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
              className="font-display text-xs uppercase tracking-wider text-gray-400 hover:text-[#00f0ff]"
            >
              {link.label}
            </button>
          ))}
        </div>

        <a href={contact.githubUrl} target="_blank" rel="noreferrer" className="text-xs text-gray-500 hover:text-gray-300">
          {contact.email}
        </a>
      </div>

      <p className="mt-8 text-center text-xs text-gray-600">
        © {year} Tamilvanan Gowran
      </p>
    </footer>
  )
}
