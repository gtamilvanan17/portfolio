export default function Badge({
  icon,
  label,
  subtitle,
}: {
  icon: string
  label: string
  subtitle?: string
}) {
  return (
    <div className="group relative flex w-28 flex-col items-center gap-2 text-center sm:w-32">
      <div className="relative grid h-20 w-20 place-items-center rounded-full glass glass-hover overflow-hidden sm:h-24 sm:w-24">
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 transition-all duration-300 group-hover:ring-[#00f0ff]/50" />
        <span className="relative text-3xl sm:text-4xl">{icon}</span>
      </div>
      <div>
        <p className="font-display text-xs font-semibold leading-tight text-white">{label}</p>
        {subtitle && <p className="mt-0.5 text-[10px] uppercase tracking-wider text-gray-400">{subtitle}</p>}
      </div>
    </div>
  )
}
