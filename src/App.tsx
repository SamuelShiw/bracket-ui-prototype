import { useMemo, useState, type ReactNode } from 'react'
import {
  Activity,
  Armchair,
  Bell,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  Clock3,
  FileImage,
  LayoutDashboard,
  Menu,
  PackageOpen,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Stethoscope,
  UserRound,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react'
import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'

type NavItem = {
  to: string
  label: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/agenda', label: 'Agenda', icon: CalendarDays },
  { to: '/pacientes', label: 'Pacientes', icon: Users },
  { to: '/clinica', label: 'Atención clínica', icon: Stethoscope },
  { to: '/odontograma', label: 'Odontograma', icon: Activity },
]

const pageTitles: Record<string, string> = {
  '/dashboard': 'Operación de hoy',
  '/agenda': 'Agenda',
  '/pacientes': 'Pacientes',
  '/clinica': 'Atención clínica',
  '/odontograma': 'Odontograma',
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-bracket-red text-white shadow-soft">
        <span className="text-lg font-bold tracking-[-.05em]">B</span>
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-bracket-warm bg-bracket-gold" />
      </div>
      {!compact && (
        <div className="leading-tight">
          <div className="text-sm font-bold tracking-[.18em] text-bracket-ink">BRACKET</div>
          <div className="mt-1 text-[11px] font-medium text-bracket-secondary">Centro Odontológico</div>
        </div>
      )}
    </div>
  )
}

function PrototypeBadge() {
  return (
    <div className="hidden items-center gap-2 rounded-full border border-[#E8DCC6] bg-[#FFF9ED] px-3 py-1.5 text-[11px] font-semibold text-[#8D6A2D] sm:flex">
      <span className="h-1.5 w-1.5 rounded-full bg-bracket-gold" />
      Prototipo UI · Datos demostrativos
    </div>
  )
}

function Rail({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <aside className="flex h-full flex-col border-r border-bracket-border bg-bracket-warm px-3 py-4">
      <div className="mb-7 flex justify-center">
        <BrandMark compact />
      </div>

      <nav className="flex flex-1 flex-col gap-1.5">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            title={label}
            onClick={onNavigate}
            className={({ isActive }) =>
              [
                'focus-ring group relative flex min-h-12 items-center justify-center rounded-xl transition',
                isActive
                  ? 'bg-bracket-soft text-bracket-red'
                  : 'text-[#747477] hover:bg-[#F1EEE8] hover:text-bracket-ink',
              ].join(' ')
            }
          >
            <Icon size={21} strokeWidth={1.8} />
            <span className="pointer-events-none absolute left-[58px] z-50 hidden whitespace-nowrap rounded-lg bg-[#242426] px-2.5 py-1.5 text-xs font-medium text-white shadow-soft group-hover:block">
              {label}
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="space-y-1.5">
        <button className="focus-ring flex min-h-12 w-full items-center justify-center rounded-xl text-[#747477] transition hover:bg-[#F1EEE8] hover:text-bracket-ink" title="Configuración">
          <Settings size={20} strokeWidth={1.8} />
        </button>
        <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-[#ECE6DD] text-xs font-bold text-bracket-red">
          NF
        </div>
      </div>
    </aside>
  )
}

function Topbar({ onOpenMenu }: { onOpenMenu: () => void }) {
  const location = useLocation()
  const title = pageTitles[location.pathname] ?? 'BRACKET'

  return (
    <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between border-b border-bracket-border bg-[rgba(251,250,247,.88)] px-5 backdrop-blur-xl lg:px-7">
      <div className="flex items-center gap-3">
        <button
          className="focus-ring grid h-11 w-11 place-items-center rounded-xl text-bracket-secondary hover:bg-[#F1EEE8] md:hidden"
          onClick={onOpenMenu}
          aria-label="Abrir navegación"
        >
          <Menu size={21} />
        </button>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[.14em] text-bracket-gold">BRACKET</div>
          <h1 className="mt-0.5 text-[17px] font-semibold tracking-[-.02em] text-bracket-ink">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <PrototypeBadge />
        <button className="focus-ring grid h-11 w-11 place-items-center rounded-xl text-bracket-secondary transition hover:bg-[#F1EEE8]" aria-label="Buscar">
          <Search size={19} strokeWidth={1.8} />
        </button>
        <button className="focus-ring relative grid h-11 w-11 place-items-center rounded-xl text-bracket-secondary transition hover:bg-[#F1EEE8]" aria-label="Notificaciones">
          <Bell size={19} strokeWidth={1.8} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-bracket-red ring-2 ring-bracket-warm" />
        </button>
      </div>
    </header>
  )
}

function Shell() {
  const [mobileNav, setMobileNav] = useState(false)

  return (
    <div className="min-h-screen bg-bracket-bone text-bracket-ink">
      <div className="fixed inset-y-0 left-0 z-30 hidden w-[72px] md:block">
        <Rail />
      </div>

      {mobileNav && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" onClick={() => setMobileNav(false)} aria-label="Cerrar navegación" />
          <div className="absolute inset-y-0 left-0 w-[88px] shadow-float">
            <Rail onNavigate={() => setMobileNav(false)} />
          </div>
          <button
            className="absolute left-[100px] top-4 grid h-11 w-11 place-items-center rounded-full bg-white shadow-soft"
            onClick={() => setMobileNav(false)}
            aria-label="Cerrar navegación"
          >
            <X size={20} />
          </button>
        </div>
      )}

      <div className="md:pl-[72px]">
        <Topbar onOpenMenu={() => setMobileNav(true)} />
        <main className="mx-auto w-full max-w-[1500px] p-4 sm:p-5 lg:p-7">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/agenda" element={<AgendaPage />} />
            <Route path="/pacientes" element={<PatientsPage />} />
            <Route path="/clinica" element={<ClinicalPage />} />
            <Route path="/odontograma" element={<OdontogramPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

const agendaDemo = [
  { time: '09:00', patient: 'Ana Torres', procedure: 'Profilaxis', status: 'Confirmada', chair: 'Sillón 1' },
  { time: '10:00', patient: 'Carlos Medina', procedure: 'Control de ortodoncia', status: 'En atención', chair: 'Sillón 2' },
  { time: '11:30', patient: 'Lucía Ramos', procedure: 'Curación simple', status: 'Por llegar', chair: 'Sillón 1' },
  { time: '12:30', patient: 'Mateo Quispe', procedure: 'Diagnóstico', status: 'Confirmada', chair: 'Sillón 3' },
]

function StatusBadge({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'success' | 'info' | 'warning' }) {
  const tones = {
    neutral: 'bg-[#F0EFEC] text-[#656568]',
    success: 'bg-[#E8F4EE] text-[#287354]',
    info: 'bg-[#E9F2F6] text-[#326F8C]',
    warning: 'bg-[#FBF2E1] text-[#9B6927]',
  }

  return <span className={`inline-flex min-h-7 items-center rounded-full px-2.5 text-[11px] font-semibold ${tones[tone]}`}>{children}</span>
}

function DashboardPage() {
  return (
    <div className="space-y-5">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-bracket-secondary">Lunes, 22 de septiembre</p>
          <h2 className="mt-1 text-[28px] font-semibold tracking-[-.035em]">Buenos días, Nataly</h2>
          <p className="mt-1 text-sm text-bracket-secondary">Este es el pulso operativo de la clínica para hoy.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary"><Users size={17} /> Registrar paciente</button>
          <button className="btn-primary"><Plus size={17} /> Nueva cita</button>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <Metric label="Citas de hoy" value="12" detail="Jornada programada" icon={CalendarDays} />
        <Metric label="Por llegar" value="4" detail="Próximas 2 horas" icon={Clock3} />
        <Metric label="En atención" value="2" detail="Ahora mismo" icon={Stethoscope} accent />
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(280px,.75fr)]">
        <div className="surface overflow-hidden">
          <div className="flex items-center justify-between border-b border-bracket-border px-5 py-4">
            <div>
              <h3 className="font-semibold">Agenda de hoy</h3>
              <p className="mt-0.5 text-xs text-bracket-secondary">Próximas atenciones programadas</p>
            </div>
            <NavLink to="/agenda" className="focus-ring flex min-h-10 items-center gap-1 rounded-lg px-2 text-sm font-semibold text-bracket-red">
              Ver agenda <ChevronRight size={16} />
            </NavLink>
          </div>
          <div className="divide-y divide-bracket-border">
            {agendaDemo.map((item) => (
              <div key={item.time + item.patient} className="grid min-h-[72px] grid-cols-[58px_1fr_auto] items-center gap-3 px-5 transition hover:bg-[#FCFBF8]">
                <span className="text-sm font-semibold tabular-nums">{item.time}</span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{item.patient}</p>
                  <p className="mt-1 truncate text-xs text-bracket-secondary">{item.procedure} · {item.chair}</p>
                </div>
                <StatusBadge tone={item.status === 'En atención' ? 'info' : item.status === 'Por llegar' ? 'warning' : 'success'}>{item.status}</StatusBadge>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="surface p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Sillones</h3>
              <Armchair size={18} className="text-bracket-gold" />
            </div>
            <div className="mt-5 space-y-3">
              <OperationalLine label="Sillón 1" value="Ocupado" tone="info" />
              <OperationalLine label="Sillón 2" value="Ocupado" tone="info" />
              <OperationalLine label="Sillón 3" value="Disponible" tone="success" />
            </div>
          </div>

          <div className="surface p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Caja</h3>
              <CircleDollarSign size={18} className="text-bracket-gold" />
            </div>
            <p className="mt-4 text-2xl font-semibold tracking-[-.03em] tabular-nums">S/ 1,240.00</p>
            <p className="mt-1 text-xs text-bracket-secondary">Ingresos registrados hoy</p>
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#287354]">
              <span className="status-dot bg-[#27845B]" /> Turno abierto
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function Metric({ label, value, detail, icon: Icon, accent = false }: { label: string; value: string; detail: string; icon: LucideIcon; accent?: boolean }) {
  return (
    <div className="surface p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.08em] text-bracket-secondary">{label}</p>
          <p className="mt-3 text-[30px] font-semibold tracking-[-.04em] tabular-nums">{value}</p>
        </div>
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${accent ? 'bg-bracket-soft text-bracket-red' : 'bg-[#F3F1EC] text-bracket-secondary'}`}>
          <Icon size={19} strokeWidth={1.8} />
        </div>
      </div>
      <p className="mt-2 text-xs text-bracket-secondary">{detail}</p>
    </div>
  )
}

function OperationalLine({ label, value, tone }: { label: string; value: string; tone: 'success' | 'info' }) {
  return (
    <div className="flex min-h-10 items-center justify-between border-b border-bracket-border last:border-0">
      <span className="text-sm font-medium">{label}</span>
      <span className={`text-xs font-semibold ${tone === 'success' ? 'text-[#287354]' : 'text-[#326F8C]'}`}>{value}</span>
    </div>
  )
}

const chairAppointments: Record<string, Array<{ time: string; patient: string; procedure: string; status: string }>> = {
  'Sillón 1': [
    { time: '09:00', patient: 'Ana Torres', procedure: 'Profilaxis · 30 min', status: 'Confirmada' },
    { time: '11:30', patient: 'Lucía Ramos', procedure: 'Curación simple · 45 min', status: 'Por llegar' },
  ],
  'Sillón 2': [
    { time: '10:00', patient: 'Carlos Medina', procedure: 'Control ortodoncia · 45 min', status: 'En atención' },
    { time: '12:00', patient: 'Sara Paredes', procedure: 'Consulta · 45 min', status: 'Confirmada' },
  ],
  'Sillón 3': [
    { time: '09:30', patient: 'José Flores', procedure: 'Diagnóstico · 45 min', status: 'Atendida' },
    { time: '12:30', patient: 'Mateo Quispe', procedure: 'Diagnóstico · 45 min', status: 'Confirmada' },
  ],
}

function AgendaPage() {
  const [view, setView] = useState('Día')

  return (
    <div className="space-y-4">
      <section className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
        <div>
          <h2 className="text-[26px] font-semibold tracking-[-.035em]">Agenda</h2>
          <div className="mt-2 flex items-center gap-2 text-sm text-bracket-secondary">
            <button className="focus-ring grid h-9 w-9 place-items-center rounded-lg hover:bg-white"><ChevronLeft size={17} /></button>
            <strong className="font-semibold text-bracket-ink">Hoy · lunes 22 septiembre</strong>
            <button className="focus-ring grid h-9 w-9 place-items-center rounded-lg hover:bg-white"><ChevronRight size={17} /></button>
          </div>
        </div>
        <button className="btn-primary self-start lg:self-auto"><Plus size={17} /> Nueva cita</button>
      </section>

      <section className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex rounded-xl bg-[#EDEBE6] p-1">
          {['Día', 'Semana', 'Mes', 'Lista'].map((item) => (
            <button
              key={item}
              onClick={() => setView(item)}
              className={`focus-ring min-h-10 rounded-[9px] px-3.5 text-sm font-semibold transition ${view === item ? 'bg-white text-bracket-ink shadow-sm' : 'text-bracket-secondary'}`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary">Sillones</button>
          <button className="btn-secondary">Filtros</button>
        </div>
      </section>

      <section className="surface overflow-hidden">
        <div className="overflow-x-auto">
          <div className="grid min-w-[820px] grid-cols-[72px_repeat(3,minmax(220px,1fr))]">
            <div className="border-b border-r border-bracket-border bg-[#FBFAF7]" />
            {Object.keys(chairAppointments).map((chair, idx) => (
              <div key={chair} className={`border-b border-bracket-border bg-[#FBFAF7] px-4 py-3 ${idx < 2 ? 'border-r' : ''}`}>
                <p className="text-sm font-semibold">{chair}</p>
                <p className="mt-0.5 text-[11px] text-bracket-secondary">{idx === 1 ? 'En atención' : 'Operativo'}</p>
              </div>
            ))}

            {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'].map((time) => (
              <AgendaRow key={time} time={time} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function AgendaRow({ time }: { time: string }) {
  const chairs = Object.keys(chairAppointments)
  return (
    <>
      <div className="min-h-[92px] border-r border-t border-bracket-border px-3 py-3 text-xs font-semibold text-bracket-secondary tabular-nums">{time}</div>
      {chairs.map((chair, idx) => {
        const items = chairAppointments[chair].filter((item) => item.time.startsWith(time.slice(0, 2)))
        return (
          <div key={chair + time} className={`min-h-[92px] border-t border-bracket-border p-2 ${idx < 2 ? 'border-r' : ''}`}>
            {items.map((item) => (
              <div key={item.patient} className="rounded-xl border border-[#E4D8D8] bg-[#FCF5F6] p-3 shadow-[0_1px_2px_rgba(29,29,31,.04)]">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-bold tabular-nums">{item.time}</p>
                  <span className="h-2 w-2 rounded-full bg-bracket-red" />
                </div>
                <p className="mt-1.5 text-sm font-semibold">{item.patient}</p>
                <p className="mt-1 text-[11px] text-bracket-secondary">{item.procedure}</p>
              </div>
            ))}
          </div>
        )
      })}
    </>
  )
}

const patients = [
  { name: 'Ana Torres', doc: 'DNI 74581236', contact: '987 654 321', last: '18 Sep', next: '24 Sep · 09:00' },
  { name: 'Carlos Medina', doc: 'DNI 48123675', contact: '951 023 884', last: '12 Sep', next: 'Hoy · 10:00' },
  { name: 'Lucía Ramos', doc: 'DNI 73128945', contact: '932 840 177', last: '05 Sep', next: 'Hoy · 11:30' },
  { name: 'Mateo Quispe', doc: 'DNI 70841235', contact: '980 113 427', last: '28 Ago', next: 'Hoy · 12:30' },
]

function PatientsPage() {
  return (
    <div className="space-y-4">
      <section className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-[26px] font-semibold tracking-[-.035em]">Pacientes</h2>
          <p className="mt-1 text-sm text-bracket-secondary">Directorio clínico y administrativo.</p>
        </div>
        <button className="btn-primary"><Plus size={17} /> Registrar paciente</button>
      </section>

      <div className="surface overflow-hidden">
        <div className="border-b border-bracket-border p-4">
          <label className="relative block max-w-[620px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-bracket-secondary" size={18} />
            <input
              className="focus-ring h-12 w-full rounded-xl border border-[#D4CEC3] bg-white pl-10 pr-4 text-[15px] placeholder:text-[#9A9896]"
              placeholder="Buscar por nombre, apellido o DNI"
            />
          </label>
        </div>

        <div className="hidden grid-cols-[1.2fr_.8fr_1fr_1fr_44px] border-b border-bracket-border bg-[#FBFAF7] px-5 py-3 text-[11px] font-bold uppercase tracking-[.08em] text-bracket-secondary md:grid">
          <span>Paciente</span><span>Documento</span><span>Contacto</span><span>Atención</span><span />
        </div>

        <div className="divide-y divide-bracket-border">
          {patients.map((patient) => (
            <NavLink
              key={patient.name}
              to="/clinica"
              className="focus-ring grid min-h-[72px] grid-cols-[1fr_auto] items-center gap-3 px-5 transition hover:bg-[#FCFBF8] md:grid-cols-[1.2fr_.8fr_1fr_1fr_44px]"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#F1ECE6] text-xs font-bold text-bracket-red">
                  {patient.name.split(' ').map((p) => p[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-semibold">{patient.name}</p>
                  <p className="mt-1 text-xs text-bracket-secondary md:hidden">{patient.doc} · {patient.contact}</p>
                </div>
              </div>
              <span className="hidden text-sm text-bracket-secondary md:block">{patient.doc}</span>
              <span className="hidden text-sm text-bracket-secondary md:block">{patient.contact}</span>
              <div className="hidden md:block">
                <p className="text-xs font-medium">Próxima: {patient.next}</p>
                <p className="mt-1 text-[11px] text-bracket-secondary">Última: {patient.last}</p>
              </div>
              <ChevronRight size={18} className="text-[#A7A49F]" />
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

const clinicalTabs = ['Resumen', 'Historia', 'Anamnesis', 'Odontograma', 'Tratamientos', 'Radiografías', 'Consentimientos']

function PatientContext({ section = 'Atención clínica' }: { section?: string }) {
  return (
    <div className="surface overflow-hidden">
      <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-[#F1ECE6] font-bold text-bracket-red">AT</div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold">Ana Torres</h2>
              <StatusBadge tone="info">En atención</StatusBadge>
            </div>
            <p className="mt-1 text-xs text-bracket-secondary">HC-00124 · DNI 74581236 · 27 años</p>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xs font-semibold text-bracket-secondary">{section}</p>
          <p className="mt-1 text-sm font-semibold">Dra. Nataly Frías · 10:00</p>
        </div>
      </div>
    </div>
  )
}

function ClinicalPage() {
  const [tab, setTab] = useState('Resumen')

  return (
    <div className="space-y-4">
      <PatientContext />

      <div className="scrollbar-none overflow-x-auto border-b border-bracket-border">
        <div className="flex min-w-max gap-1">
          {clinicalTabs.map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`focus-ring relative min-h-11 px-3 text-sm font-semibold transition ${tab === item ? 'text-bracket-red' : 'text-bracket-secondary hover:text-bracket-ink'}`}
            >
              {item}
              {tab === item && <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-bracket-red" />}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.45fr_.7fr]">
        <section className="surface p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.1em] text-bracket-gold">Atención actual</p>
              <h3 className="mt-1 text-xl font-semibold tracking-[-.025em]">{tab}</h3>
            </div>
            <button className="btn-secondary">Editar</button>
          </div>

          {tab === 'Resumen' ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <ClinicalTile icon={ClipboardList} title="Motivo de consulta" text="Control clínico programado." />
              <ClinicalTile icon={ShieldCheck} title="Anamnesis" text="Revisada · 18 Sep 2026" />
              <ClinicalTile icon={Activity} title="Odontograma" text="Inicial registrado · 2 evoluciones" />
              <ClinicalTile icon={FileImage} title="Estudios" text="1 radiografía panorámica" />
            </div>
          ) : (
            <div className="mt-6">
              <div className="rounded-xl border border-dashed border-[#D4CEC3] bg-[#FBFAF7] p-8 text-center">
                <p className="text-sm font-semibold">Vista conceptual de {tab}</p>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-bracket-secondary">Esta sección forma parte del prototipo de experiencia clínica y se conectará al backend después de su validación.</p>
              </div>
            </div>
          )}
        </section>

        <aside className="space-y-4">
          <div className="surface p-5">
            <h3 className="text-sm font-semibold">Contexto</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <Meta label="Cita relacionada" value="Hoy · 10:00" />
              <Meta label="Profesional" value="Dra. Nataly Frías" />
              <Meta label="Estado" value="En atención" />
            </dl>
          </div>

          <NavLink to="/odontograma" className="surface focus-ring flex min-h-[82px] items-center justify-between p-5 transition hover:border-[#CCB8BA] hover:bg-[#FCF8F8]">
            <div>
              <p className="text-sm font-semibold">Abrir odontograma</p>
              <p className="mt-1 text-xs text-bracket-secondary">Vista esquemática FDI</p>
            </div>
            <ChevronRight size={19} className="text-bracket-red" />
          </NavLink>
        </aside>
      </div>
    </div>
  )
}

function ClinicalTile({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="rounded-xl border border-bracket-border bg-[#FCFBF8] p-4">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-bracket-soft text-bracket-red">
        <Icon size={17} strokeWidth={1.8} />
      </div>
      <p className="mt-4 text-sm font-semibold">{title}</p>
      <p className="mt-1 text-xs leading-5 text-bracket-secondary">{text}</p>
    </div>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-bracket-border pb-3 last:border-0 last:pb-0">
      <dt className="text-bracket-secondary">{label}</dt>
      <dd className="text-right font-semibold">{value}</dd>
    </div>
  )
}

const upperTeeth = ['18','17','16','15','14','13','12','11','21','22','23','24','25','26','27','28']
const lowerTeeth = ['48','47','46','45','44','43','42','41','31','32','33','34','35','36','37','38']

function Tooth({ number, selected, marked, onClick }: { number: string; selected: boolean; marked?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={`Pieza dentaria ${number}`}
      className={`focus-ring group flex min-h-[70px] min-w-[54px] flex-col items-center justify-center rounded-xl border transition active:scale-[.985] ${selected ? 'border-bracket-red bg-bracket-soft' : 'border-transparent hover:bg-[#F5F2EC]'}`}
    >
      <span className={`mb-1 text-[10px] font-bold tabular-nums ${selected ? 'text-bracket-red' : 'text-bracket-secondary'}`}>{number}</span>
      <span className="relative block h-10 w-10 rounded-full border-[1.5px] border-[#6D6B68] bg-white">
        <span className="absolute inset-[7px] rounded-[9px] border border-[#8E8B87]" />
        <span className="absolute left-1/2 top-[3px] h-[34px] w-px -translate-x-1/2 bg-[#D7D2C9]" />
        <span className="absolute left-[3px] top-1/2 h-px w-[34px] -translate-y-1/2 bg-[#D7D2C9]" />
        {marked && <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bracket-red/85 ring-2 ring-white" />}
      </span>
    </button>
  )
}

function OdontogramPage() {
  const [selected, setSelected] = useState('16')
  const selectedName = useMemo(() => `Pieza ${selected}`, [selected])

  return (
    <div className="space-y-4">
      <PatientContext section="Odontograma" />

      <section className="surface overflow-hidden">
        <div className="flex flex-col justify-between gap-3 border-b border-bracket-border px-5 py-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[.1em] text-bracket-gold">Odontograma inicial</p>
            <h3 className="mt-1 text-lg font-semibold">Registro esquemático FDI</h3>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary">Leyenda</button>
            <button className="btn-primary"><Plus size={17} /> Registrar hallazgo</button>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[.08em] text-bracket-secondary">
            <span>Derecha del paciente</span>
            <span>Izquierda del paciente</span>
          </div>

          <div className="scrollbar-none overflow-x-auto pb-2">
            <div className="mx-auto min-w-[900px]">
              <p className="mb-1 text-center text-[11px] font-bold uppercase tracking-[.12em] text-bracket-secondary">Arcada superior</p>
              <div className="grid grid-cols-[repeat(16,minmax(0,1fr))] gap-0.5">
                {upperTeeth.map((number) => (
                  <Tooth key={number} number={number} selected={selected === number} marked={['16','24'].includes(number)} onClick={() => setSelected(number)} />
                ))}
              </div>

              <div className="my-5 h-px bg-bracket-border" />

              <div className="grid grid-cols-[repeat(16,minmax(0,1fr))] gap-0.5">
                {lowerTeeth.map((number) => (
                  <Tooth key={number} number={number} selected={selected === number} marked={['36'].includes(number)} onClick={() => setSelected(number)} />
                ))}
              </div>
              <p className="mt-1 text-center text-[11px] font-bold uppercase tracking-[.12em] text-bracket-secondary">Arcada inferior</p>
            </div>
          </div>
        </div>

        <div className="border-t border-bracket-border bg-[#FBFAF7] p-4 sm:p-5">
          <div className="grid gap-5 lg:grid-cols-[180px_1fr_auto] lg:items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.08em] text-bracket-secondary">Pieza seleccionada</p>
              <p className="mt-1 text-lg font-semibold">{selectedName}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="grid grid-cols-3 grid-rows-3 gap-1">
                <span />
                <SurfaceButton label="V" />
                <span />
                <SurfaceButton label="M" />
                <SurfaceButton label="O" active />
                <SurfaceButton label="D" />
                <span />
                <SurfaceButton label="L" />
                <span />
              </div>
              <div>
                <p className="text-xs font-semibold text-bracket-secondary">Hallazgo</p>
                <p className="mt-1 text-sm font-semibold">Caries oclusal</p>
                <p className="mt-1 text-xs text-bracket-secondary">Ejemplo visual sujeto a validación clínica.</p>
              </div>
            </div>

            <button className="btn-primary lg:justify-self-end">Registrar hallazgo</button>
          </div>
        </div>
      </section>
    </div>
  )
}

function SurfaceButton({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <button className={`focus-ring grid h-10 w-10 place-items-center rounded-lg border text-xs font-bold transition ${active ? 'border-bracket-red bg-bracket-soft text-bracket-red' : 'border-[#D4CEC3] bg-white text-bracket-secondary'}`}>
      {label}
    </button>
  )
}

export default function App() {
  return <Shell />
}
