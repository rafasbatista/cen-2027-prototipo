// Direção visual: Identidade Solar do Cerrado, paleta pastoral, emblema oficial, curvas de comunidade e textura de papel.
import { FormEvent, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Church,
  CircleDot,
  Clock3,
  ExternalLink,
  HeartHandshake,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Send,
  Sparkles,
  X,
  Youtube,
} from "lucide-react";
import { toast } from "sonner";
import ShopPreview from "@/components/ShopPreview";
import ScheduleSection from "@/components/ScheduleSection";

// Todos os ativos são locais, servidos de `client/public/assets/`.
//
// Antes: o emblema vinha do storage privado do Manus (`/manus-storage/...`, que
// só resolvia com as credenciais da plataforma) e as quatro fotos faziam
// hotlink do WordPress da Arquidiocese, o que deixava o site dependente de um
// servidor de terceiros. As fotos foram baixadas da fonte oficial.
const assets = {
  hero: "/assets/congresso-banner.png",
  adoration: "/assets/congresso-banner.png",
  city: "/assets/cen-card-cidade.png",
  community: "/assets/cen-card-comunidade.png",
  lockup: "/assets/cen_lockup_marrom.png",
  lockupLight: "/assets/cen_lockup_branco.png",
};

const navItems = [
  { label: "O congresso", href: "#o-congresso" },
  { label: "Experiências", href: "#experiencias" },
  { label: "Programação", href: "#programacao" },
  { label: "Goiânia", href: "#goiania" },
  { label: "Novidades", href: "#novidades" },
  { label: "Loja", href: "#loja" },
];

const experiences = [
  {
    index: "01",
    title: "Celebrar",
    copy: "A Eucaristia como fonte e ápice de uma Igreja que se reúne, agradece e envia.",
    icon: Church,
    tone: "gold",
  },
  {
    index: "02",
    title: "Formar",
    copy: "Conferências e celebrações da Palavra para aprofundar o mistério que nos move.",
    icon: BookOpen,
    tone: "mist",
  },
  {
    index: "03",
    title: "Adorar",
    copy: "Tempo para silenciar, permanecer diante do Santíssimo e deixar a presença falar.",
    icon: CircleDot,
    tone: "blue",
  },
  {
    index: "04",
    title: "Cuidar",
    copy: "Testemunhos, procissões e iniciativas caritativas que fazem a fé tocar o mundo.",
    icon: HeartHandshake,
    tone: "green",
  },
];

const faqItems = [
  {
    question: "Quando acontece o congresso?",
    answer: "O 19º Congresso Eucarístico Nacional acontece de 3 a 7 de setembro de 2027, em Goiânia, Goiás.",
  },
  {
    question: "Qual é o tema desta edição?",
    answer: "“Hóstias vivas, no mundo, para a glória do Pai”. A frase inspira uma experiência de fé que sai da celebração e alcança a vida cotidiana.",
  },
  {
    question: "Onde serão as atividades?",
    answer: "Os locais e a programação detalhada estão em preparação e serão divulgados oficialmente pela organização do congresso.",
  },
  {
    question: "Como acompanhar as novidades?",
    answer: "Cadastre seu e-mail nesta página ou acompanhe os canais oficiais da Arquidiocese de Goiânia e do CEN 2027.",
  },
];

function scrollToSection(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
    toast.success("Seu lugar na caminhada foi reservado.", {
      description: "Em breve, você receberá as novidades do CEN 2027.",
    });
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <main className="site-shell overflow-x-hidden">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      {/* O header precisa ficar FORA de `.hero-section`: aquela seção tem
          `overflow: hidden`, que recorta descendentes `position: fixed` assim
          que a página rola além dela. Dentro do hero, a nav fixa do mobile
          simplesmente sumia da tela. */}
      <header className="site-nav" aria-label="Navegação principal">
          <div className="container nav-inner">
            {/* O emblema completo espremido num círculo de 40px ficava
                ilegível. O lockup horizontal oficial já traz símbolo e
                assinatura na proporção para que foi desenhado. */}
            <a className="brand-lockup" href="#topo" aria-label="19º Congresso Eucarístico Nacional, início">
              <img src={assets.lockup} alt="" className="brand-lockup-image" width={351} height={134} />
            </a>

            <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`}>
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={closeMenu}>
                  {item.label}
                </a>
              ))}
              {/* No mobile o `.nav-cta` do cabeçalho fica display:none, então o
                  CTA principal desaparecia por completo. Esta cópia vive dentro
                  do menu e só aparece abaixo de 720px. */}
              <button
                className="nav-cta-mobile"
                type="button"
                onClick={() => {
                  closeMenu();
                  scrollToSection("#novidades");
                }}
              >
                <span>Receber novidades</span>
                <ArrowUpRight size={16} strokeWidth={1.7} />
              </button>
            </nav>

            <button className="nav-cta" type="button" onClick={() => scrollToSection("#novidades")}>
              <span>Receber novidades</span>
              <ArrowUpRight size={16} strokeWidth={1.7} />
            </button>

            <button
              className="mobile-menu-button"
              type="button"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((current) => !current)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
      </header>

      <section className="hero-section relative isolate min-h-[760px] overflow-hidden" aria-labelledby="hero-title">
        <img className="hero-image" src={assets.hero} alt="Paisagem noturna de Goiânia reinterpretada com um halo dourado" />
        <div className="hero-vignette" aria-hidden="true" />
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />

        <div className="container hero-content" id="topo">
          <div className="hero-copy">
            <div className="eyebrow eyebrow-light">
              <span className="eyebrow-line" />
              <span>Goiânia · Goiás · Brasil</span>
            </div>
            <h1 id="hero-title">
              Hóstias vivas,
              <em> no mundo,</em>
              <span>para a glória do Pai.</span>
            </h1>
            <p className="hero-description">
              Uma cidade inteira se prepara para receber a Igreja do Brasil em um encontro de presença, adoração e envio.
            </p>
            <div className="hero-actions">
              <button className="primary-button" type="button" onClick={() => scrollToSection("#novidades")}>
                <span>Quero caminhar com vocês</span>
                <ArrowUpRight size={18} strokeWidth={1.7} />
              </button>
              <a className="text-link light-link" href="#o-congresso">
                <span>Descobrir o encontro</span>
                <ChevronRight size={17} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div className="hero-date-panel" aria-label="Data do congresso">
            <span className="date-label">19º CEN · 2027</span>
            <span className="date-number">03-07</span>
            <span className="date-month">setembro</span>
            <span className="date-place">Goiânia / GO</span>
          </div>
        </div>

        <div className="container hero-footer">
          <div className="hero-scroll-note">
            <ArrowDown size={15} strokeWidth={1.4} />
            <span>Desça para entrar</span>
          </div>
          <div className="hero-meta">
            <span>Um encontro nacional</span>
            <span className="meta-dot" />
            <span>Uma presença que nos envia</span>
          </div>
        </div>
      </section>

      <div id="conteudo" className="main-content">
        <section id="o-congresso" className="manifesto-section section-light" aria-labelledby="manifesto-title">
          <div className="section-seal seal-manifesto" aria-hidden="true"><span>CEN</span><strong>27</strong></div>
          <div className="ritual-line ritual-line-light" aria-hidden="true" />
          <div className="container manifesto-layout">
            <div className="manifesto-aside">
              <div className="eyebrow eyebrow-dark">
                <span className="eyebrow-line" />
                <span>O congresso</span>
              </div>
              <p className="aside-number">01<span>/04</span></p>
              <p className="aside-note">Uma convocação para viver a fé como presença no mundo.</p>
            </div>
            <div className="manifesto-copy">
              <h2 id="manifesto-title">
                Receber é apenas o começo.
                <span>Ser presença é o chamado.</span>
              </h2>
              <p className="body-large">
                O Congresso Eucarístico Nacional chega a Goiânia como um itinerário de comunhão. Em torno do pão partilhado, a Igreja se reúne para celebrar, aprofundar, adorar e transformar a fé em gesto concreto.
              </p>
              <div className="quote-block">
                <span className="quote-mark">“</span>
                <p>Ao receber Jesus na comunhão, o cristão é transformado em uma hóstia viva para continuar a presença de Jesus agindo no mundo.</p>
                <span className="quote-source">Inspiração do tema do CEN 2027</span>
              </div>
            </div>
            <div className="manifesto-image-wrap">
              <img src={assets.adoration} alt="Detalhe dourado sobre um altar em luz baixa" className="manifesto-image" />
              <span className="image-caption">A presença que permanece</span>
              <div className="image-halo" aria-hidden="true" />
            </div>
          </div>
        </section>

        <section id="experiencias" className="experience-section section-ink" aria-labelledby="experience-title">
          <div className="section-orbit-dial" aria-hidden="true"><span /><span /><span /></div>
          <div className="container">
            <div className="section-heading-row">
              <div>
                <div className="eyebrow eyebrow-light">
                  <span className="eyebrow-line" />
                  <span>Quatro movimentos</span>
                </div>
                <h2 id="experience-title" className="section-title light-title">
                  Uma experiência que <em>se move</em> com você.
                </h2>
              </div>
              <p className="heading-note">O CEN é encontro, mas também é caminho. Cada gesto abre espaço para o próximo.</p>
            </div>

            <div className="experience-grid">
              {experiences.map((experience) => {
                const Icon = experience.icon;
                return (
                  <article key={experience.index} className={`experience-card tone-${experience.tone}`}>
                    <div className="card-topline">
                      <span>{experience.index}</span>
                      <Icon size={24} strokeWidth={1.3} />
                    </div>
                    <h3>{experience.title}</h3>
                    <p>{experience.copy}</p>
                    <span className="card-arrow" aria-hidden="true">
                      <ArrowUpRight size={18} strokeWidth={1.4} />
                    </span>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="calendar-section section-paper" aria-labelledby="calendar-title">
          <div className="section-seal seal-calendar" aria-hidden="true"><span>CEN</span><strong>27</strong></div>
          <div className="container calendar-layout">
            <div className="calendar-intro">
              <div className="eyebrow eyebrow-dark">
                <span className="eyebrow-line" />
                <span>Reserve a data</span>
              </div>
              <h2 id="calendar-title">Cinco dias para guardar no coração.</h2>
              <p>A programação completa está em preparação. A data, porém, já é um convite: de 3 a 7 de setembro de 2027, Goiânia será casa para a fé que se faz pública.</p>
              <div className="calendar-note"><Clock3 size={16} strokeWidth={1.5} /><span>Detalhes de horários e locais serão divulgados em breve.</span></div>
            </div>
            <div className="date-rail" aria-label="Dias do congresso">
              {/* 3 de setembro de 2027 cai numa sexta. Os dias estavam todos
                  deslocados em um, e contradiziam o ScheduleSection, que já
                  trazia a semana correta. */}
              {[
                ["03", "sex"],
                ["04", "sáb"],
                ["05", "dom"],
                ["06", "seg"],
                ["07", "ter"],
              ].map(([day, weekday], index) => (
                <div className={`date-stop ${index === 0 ? "is-first" : ""}`} key={day}>
                  <span className="date-stop-point" />
                  <span className="date-stop-day">{day}</span>
                  <span className="date-stop-weekday">{weekday}</span>
                </div>
              ))}
              <span className="date-rail-line" aria-hidden="true" />
            </div>
          </div>
        </section>

        <ScheduleSection />

        <section id="goiania" className="city-section section-light" aria-labelledby="city-title">
          <div className="section-seal seal-city" aria-hidden="true"><span>GOI</span><strong>27</strong></div>
          <div className="container city-layout">
            <div className="city-image-frame">
              <img src={assets.city} alt="Goiânia vista ao entardecer com um ipê em destaque" className="city-image" />
              <div className="city-image-label"><MapPin size={14} strokeWidth={1.5} /><span>Goiânia · GO</span></div>
            </div>
            <div className="city-copy">
              <div className="eyebrow eyebrow-dark">
                <span className="eyebrow-line" />
                <span>A cidade-sede</span>
              </div>
              <h2 id="city-title">Goiânia abre seus braços, e suas ruas.</h2>
              <p className="body-large">Entre avenidas largas, ipês e o horizonte do Cerrado, a capital goiana se prepara para acolher o maior encontro católico do país dedicado à adoração e à reflexão sobre o mistério eucarístico.</p>
              <div className="city-facts">
                <div><span className="fact-symbol">70</span><p>anos da Arquidiocese celebrados em 2027</p></div>
                <div><span className="fact-symbol">27</span><p>municípios que formam a Arquidiocese de Goiânia</p></div>
              </div>
              <a className="text-link dark-link" href="https://arquidiocesedegoiania.org.br/congresso/" target="_blank" rel="noreferrer">
                <span>Conhecer a fonte oficial</span>
                <ExternalLink size={16} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </section>

        <section className="confirmed-section section-paper" aria-labelledby="confirmed-title">
          <div className="ritual-line ritual-line-paper" aria-hidden="true" />
          <div className="container confirmed-layout">
            <div>
              <div className="eyebrow eyebrow-dark">
                <span className="eyebrow-line" />
                <span>Em preparação</span>
              </div>
              <h2 id="confirmed-title">O que já está aceso.</h2>
              <p className="confirmed-lead">Este é um primeiro mapa do caminho. À medida que a organização publicar novas informações, este espaço pode crescer com a programação oficial.</p>
            </div>
            <div className="confirmed-list">
              <div className="confirmed-item"><span className="status-dot confirmed" /><span className="confirmed-label">Confirmado</span><span>3 a 7 de setembro de 2027</span><Check size={17} /></div>
              <div className="confirmed-item"><span className="status-dot confirmed" /><span className="confirmed-label">Confirmado</span><span>Goiânia · Goiás</span><Check size={17} /></div>
              <div className="confirmed-item"><span className="status-dot confirmed" /><span className="confirmed-label">Tema</span><span>Hóstias vivas, no mundo, para a glória do Pai</span><Check size={17} /></div>
              <div className="confirmed-item is-pending"><span className="status-dot pending" /><span className="confirmed-label">Em breve</span><span>Locais, horários e inscrições definitivas</span><Clock3 size={17} /></div>
            </div>
          </div>
        </section>

        <ShopPreview />

        <section id="novidades" className="newsletter-section section-ink" aria-labelledby="newsletter-title">
          <div className="container newsletter-shell">
            <div className="newsletter-copy">
              <div className="eyebrow eyebrow-light"><span className="eyebrow-line" /><span>Acompanhe a caminhada</span></div>
              <h2 id="newsletter-title">O próximo passo começa com uma mensagem.</h2>
              <p>Deixe seu e-mail para receber as novidades do congresso, os próximos anúncios e os sinais de que a nossa casa em Goiânia está ficando pronta.</p>
              {submitted ? (
                <div className="success-message"><Check size={18} /><span>Inscrição recebida. Obrigado por caminhar conosco.</span></div>
              ) : (
                <form className="newsletter-form" onSubmit={handleSubscribe}>
                  <label className="sr-only" htmlFor="newsletter-email">Seu melhor e-mail</label>
                  <div className="input-wrap"><Mail size={17} strokeWidth={1.5} /><input id="newsletter-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Seu melhor e-mail" required /></div>
                  <button type="submit" className="primary-button"><span>Receber novidades</span><Send size={16} strokeWidth={1.5} /></button>
                </form>
              )}
              <span className="form-note">Sem excesso de mensagens. Apenas o que for importante para a caminhada.</span>
            </div>
            <div className="newsletter-image-wrap">
              <img src={assets.community} alt="Mãos organizando uma composição circular sobre uma mesa azul" className="newsletter-image" />
              <div className="newsletter-image-stamp"><Sparkles size={16} strokeWidth={1.4} /><span>Uma presença que nos envia</span></div>
            </div>
          </div>
        </section>

        <section className="faq-section section-light" aria-labelledby="faq-title">
          <div className="section-seal seal-faq" aria-hidden="true"><span>FAQ</span><strong>27</strong></div>
          <div className="container faq-layout">
            <div className="faq-intro">
              <div className="eyebrow eyebrow-dark"><span className="eyebrow-line" /><span>Primeiras respostas</span></div>
              <h2 id="faq-title">O que você quer saber antes de chegar?</h2>
              <p>Reunimos o essencial a partir das informações oficiais já publicadas. O restante será construído com você.</p>
            </div>
            <div className="faq-list">
              {faqItems.map((item) => (
                <details key={item.question} className="faq-item">
                  <summary><span>{item.question}</span><ChevronDown size={19} strokeWidth={1.4} /></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>

      <footer className="site-footer section-ink">
        <div className="container footer-top">
          <a className="brand-lockup footer-brand" href="#topo" aria-label="19º Congresso Eucarístico Nacional, voltar ao início">
            <img src={assets.lockupLight} alt="" className="brand-lockup-image" width={351} height={134} />
          </a>
          <div className="footer-phrase">Uma cidade.<br /><em>Um só pão.</em><br />Uma presença.</div>
          <div className="footer-contact"><span>Fale com a organização</span><a href="mailto:cen2027@arquidiocesedegoiania.org.br">cen2027@arquidiocesedegoiania.org.br</a><a href="tel:+5562991274961">(62) 99127-4961</a></div>
        </div>
        <div className="container footer-bottom">
          <span>© 2027 CEN · Arquidiocese de Goiânia</span>
          <span className="footer-location"><MapPin size={14} strokeWidth={1.4} /> Goiânia / GO</span>
          <div className="footer-socials"><a href="https://www.instagram.com/cen2027goiania/" target="_blank" rel="noreferrer" aria-label="Instagram do CEN 2027"><Instagram size={17} strokeWidth={1.4} /></a><a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube size={17} strokeWidth={1.4} /></a></div>
        </div>
      </footer>

      <button className="back-to-top" type="button" onClick={() => scrollToSection("#topo")} aria-label="Voltar ao topo"><ArrowDown size={16} strokeWidth={1.5} /></button>
    </main>
  );
}
