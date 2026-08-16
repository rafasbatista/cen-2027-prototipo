import { useMemo, useState } from "react";
import { CalendarDays, Check, Clock3, ExternalLink, MapPin, SlidersHorizontal } from "lucide-react";

type DayKey = "03" | "04" | "05" | "06" | "07";
type TimeFilter = "all" | "morning" | "afternoon" | "evening";

type ScheduleEvent = {
  id: string;
  days: DayKey[];
  start: string;
  end: string;
  title: string;
  type: string;
  description: string;
  location: string;
  speaker?: string;
  source: string;
};

const days: { key: DayKey; weekday: string; label: string }[] = [
  { key: "03", weekday: "sex", label: "03 set." },
  { key: "04", weekday: "sáb", label: "04 set." },
  { key: "05", weekday: "dom", label: "05 set." },
  { key: "06", weekday: "seg", label: "06 set." },
  { key: "07", weekday: "ter", label: "07 set." },
];

const timeFilters: { key: TimeFilter; label: string }[] = [
  { key: "all", label: "Todos os horários" },
  { key: "morning", label: "Manhã · 6h–12h" },
  { key: "afternoon", label: "Tarde · 12h–18h" },
  { key: "evening", label: "Noite · após 18h" },
];

export const schedule: ScheduleEvent[] = [
  {
    id: "congresso-principal",
    days: ["03", "04", "05", "06", "07"],
    start: "08:00",
    end: "18:00",
    title: "19º Congresso Eucarístico Nacional",
    type: "Congresso",
    description: "Programação marcada por celebrações, espiritualidade, formação e convivência.",
    location: "Centro de Convenções PUC Goiás",
    source: "https://cen2027goiania.org.br/event/19o-congresso-eucaristico-nacional-2027-5/register",
  },
  {
    id: "simposio-04",
    days: ["04"],
    start: "09:00",
    end: "12:00",
    title: "A Eucaristia: sacramento do amor-doação",
    type: "Simpósio Teológico · abertura",
    description: "“Fazei isto em memória de mim” (Lc 22,19). Abertura oficial e primeira conferência.",
    location: "Centro de Convenções PUC Goiás",
    speaker: "Dom Paulo Cezar Costa",
    source: "https://cen2027goiania.org.br/event/19o-congresso-eucaristico-nacional-2027-simposio-teologico-9/register",
  },
  {
    id: "simposio-05",
    days: ["05"],
    start: "09:00",
    end: "12:00",
    title: "Hóstias vivas no mundo",
    type: "Simpósio Teológico · 2ª conferência",
    description: "“E o pão que eu darei é a minha carne, entregue pela vida do mundo” (Jo 6,51).",
    location: "Centro de Convenções PUC Goiás",
    speaker: "Dom Leonardo Ulrich Steiner",
    source: "https://cen2027goiania.org.br/event/19o-congresso-eucaristico-nacional-2027-simposio-teologico-9/register",
  },
  {
    id: "simposio-06",
    days: ["06"],
    start: "09:00",
    end: "12:00",
    title: "A Eucaristia: ação de graças e louvor",
    type: "Simpósio Teológico · 3ª conferência",
    description: "“Estareis proclamando a morte do Senhor, até que ele venha” (1Cor 11,26).",
    location: "Centro de Convenções PUC Goiás",
    speaker: "Dom Armando Bucciol",
    source: "https://cen2027goiania.org.br/event/19o-congresso-eucaristico-nacional-2027-simposio-teologico-9/register",
  },
];

function toMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function matchesTime(event: ScheduleEvent, filter: TimeFilter) {
  if (filter === "all") return true;
  const start = toMinutes(event.start);
  if (filter === "morning") return start < 12 * 60;
  if (filter === "afternoon") return start >= 12 * 60 && start < 18 * 60;
  return start >= 18 * 60;
}

export function filterScheduleEvents(selectedDay: DayKey | "all", timeFilter: TimeFilter) {
  return schedule.filter((event) => (selectedDay === "all" || event.days.includes(selectedDay)) && matchesTime(event, timeFilter));
}

export default function ScheduleSection() {
  const [selectedDay, setSelectedDay] = useState<DayKey | "all">("all");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");

  const filteredEvents = useMemo(() => filterScheduleEvents(selectedDay, timeFilter), [selectedDay, timeFilter]);

  return (
    <section id="programacao" className="schedule-section section-paper" aria-labelledby="schedule-title">
      <div className="section-seal seal-schedule" aria-hidden="true"><span>CEN</span><strong>27</strong></div>
      <div className="container">
        <div className="schedule-heading-row">
          <div>
            <div className="eyebrow eyebrow-dark"><span className="eyebrow-line" /><span>Programação oficial publicada</span></div>
            <h2 id="schedule-title">Organize sua<br /><em>caminhada.</em></h2>
          </div>
          <div className="schedule-heading-copy">
            <p>Filtre por dia e horário para encontrar os momentos já divulgados. A programação detalhada do Congresso será atualizada pela organização conforme for publicada.</p>
            <a href="https://cen2027goiania.org.br/event/19o-congresso-eucaristico-nacional-2027-5/register" target="_blank" rel="noreferrer" className="text-link dark-link"><span>Ver fonte oficial</span><ExternalLink size={17} /></a>
          </div>
        </div>

        <div className="schedule-controls" aria-label="Filtros da programação">
          <div className="schedule-control-label"><SlidersHorizontal size={18} /><span>Filtrar programação</span></div>
          <div className="schedule-day-tabs" role="group" aria-label="Filtrar por data">
            <button type="button" className={selectedDay === "all" ? "is-active" : ""} onClick={() => setSelectedDay("all")} aria-pressed={selectedDay === "all"}>Todos</button>
            {days.map((day) => <button type="button" key={day.key} className={selectedDay === day.key ? "is-active" : ""} onClick={() => setSelectedDay(day.key)} aria-pressed={selectedDay === day.key}><strong>{day.label}</strong><small>{day.weekday}</small></button>)}
          </div>
          <label className="schedule-time-select"><span className="sr-only">Filtrar por horário</span><Clock3 size={18} /><select value={timeFilter} onChange={(event) => setTimeFilter(event.target.value as TimeFilter)}>{timeFilters.map((filter) => <option key={filter.key} value={filter.key}>{filter.label}</option>)}</select></label>
        </div>

        <div className="schedule-summary" role="status"><span><CalendarDays size={18} /> {filteredEvents.length} {filteredEvents.length === 1 ? "momento encontrado" : "momentos encontrados"}</span><span>Horário local · Goiânia / America/Sao_Paulo</span></div>

        {filteredEvents.length > 0 ? (
          <div className="schedule-list">
            {filteredEvents.map((event) => (
              <article key={event.id} className="schedule-card">
                <div className="schedule-time"><strong>{event.start}</strong><span>até {event.end}</span></div>
                <div className="schedule-card-content"><div className="schedule-card-topline"><span>{event.type}</span><span className="schedule-confirmed"><Check size={15} /> Confirmado</span></div><h3>{event.title}</h3><p>{event.description}</p><div className="schedule-card-meta"><span><MapPin size={16} /> {event.location}</span>{event.speaker && <span><span className="schedule-meta-dot" /> {event.speaker}</span>}</div></div>
                <a className="schedule-source" href={event.source} target="_blank" rel="noreferrer" aria-label={`Ver fonte oficial de ${event.title}`}><ExternalLink size={18} /></a>
              </article>
            ))}
          </div>
        ) : (
          <div className="schedule-empty"><Clock3 size={24} /><h3>Nenhum momento neste filtro ainda.</h3><p>A organização ainda não publicou eventos nessa faixa de data e horário. Experimente outro filtro ou acompanhe as atualizações oficiais.</p></div>
        )}

        <div className="schedule-notice"><span className="schedule-notice-dot" /><p><strong>Importante:</strong> o Congresso acontece de 3 a 7 de setembro de 2027, das 8h às 18h, no Centro de Convenções PUC Goiás. O Simpósio Teológico ocorre de 4 a 6 de setembro, das 9h às 12h.</p></div>
      </div>
    </section>
  );
}
