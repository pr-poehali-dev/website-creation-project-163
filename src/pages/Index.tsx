import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/79b2cb14-d377-48e0-9127-e0e2cc0c80a4/files/7f7e8e44-5d98-4b51-a942-1e67fb15890a.jpg";
const CATALOG_IMG = "https://cdn.poehali.dev/projects/79b2cb14-d377-48e0-9127-e0e2cc0c80a4/files/7c8cf032-223b-4bfb-bccf-855cb61a7f31.jpg";
const PORTFOLIO_IMG = "https://cdn.poehali.dev/projects/79b2cb14-d377-48e0-9127-e0e2cc0c80a4/files/f9f3ace1-857b-4210-8275-c4b28035b5de.jpg";

const NAV_ITEMS = [
  { label: "Главная", href: "#home" },
  { label: "Каталог", href: "#catalog" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Доставка", href: "#delivery" },
  { label: "Блог", href: "#blog" },
  { label: "Контакты", href: "#contacts" },
];

const SOFAS = [
  {
    name: "РОКСЕН",
    desc: "Угловой диван с мягкими округлыми формами и велюровой обивкой цвета терракота. Просторный шезлонг, глубокие подушки — создан для тех, кто ценит стиль и комфорт.",
    price: "111 500 ₽",
    tag: "ХИТ",
    img: "https://cdn.poehali.dev/projects/79b2cb14-d377-48e0-9127-e0e2cc0c80a4/bucket/e2812f14-e568-4f29-aba1-5e929250d68d.jpg",
  },
  {
    name: "МАНЧЕСТЕР",
    desc: "Угловой диван в сине-бежевой гамме с фигурной стёжкой сидений. Благородный стальной синий велюр в сочетании с бежевыми подлокотниками — классика в современном прочтении.",
    price: "103 700 ₽",
    tag: "НОВИНКА",
    img: "https://cdn.poehali.dev/projects/79b2cb14-d377-48e0-9127-e0e2cc0c80a4/bucket/584e97ff-e699-4f6d-8efa-13260d83eb64.jpg",
  },
  { name: "ЛОФТ", desc: "Урбан-стиль для смелых интерьеров", price: "от 76 500 ₽", tag: "", img: "" },
  { name: "КЛАССИК", desc: "Вечная элегантность на каждый день", price: "от 98 000 ₽", tag: "", img: "" },
  { name: "МОДЕРН", desc: "Диван-трансформер: раскладывается за 10 секунд", price: "от 112 000 ₽", tag: "АКЦИЯ", img: "" },
  { name: "УЮТ", desc: "Семейный формат с вместительным бельевым ящиком", price: "от 67 000 ₽", tag: "", img: "" },
];

const PORTFOLIO_ITEMS = [
  { title: "Студия на Арбате", area: "42 м²", tag: "Жилой" },
  { title: "Офис LUMA Group", area: "180 м²", tag: "Коммерческий" },
  { title: "Загородный дом", area: "220 м²", tag: "Жилой" },
];

const BLOG_POSTS = [
  {
    date: "12 апр 2026",
    title: "Как выбрать диван под интерьер",
    desc: "Разбираем главные ошибки при выборе мягкой мебели и рассказываем, как не ошибиться.",
    img: HERO_IMG,
  },
  {
    date: "5 апр 2026",
    title: "Тренды 2026: модульные диваны",
    desc: "Модульность — главный тренд года. Собирайте диван как конструктор под любое пространство.",
    img: CATALOG_IMG,
  },
  {
    date: "28 мар 2026",
    title: "Уход за бархатом: инструкция",
    desc: "Бархатные обивки требуют особого ухода. Рассказываем всё, что нужно знать.",
    img: PORTFOLIO_IMG,
  },
];

interface ChatMsg {
  from: "user" | "bot";
  text: string;
}

const BOT_REPLIES: Record<string, string> = {
  default: "Понимаю! Расскажите подробнее — какой размер комнаты и какой стиль интерьера вас интересует?",
  цена: "Наши диваны начинаются от 67 000 ₽. Есть варианты в рассрочку 0% на 12 месяцев!",
  доставка: "Бесплатная доставка по Москве при заказе от 80 000 ₽. В регионы — рассчитываем индивидуально.",
  размер: "Замерим вашу комнату бесплатно! Наш специалист приедет и поможет выбрать идеальный вариант.",
  цвет: "У нас более 200 вариантов тканей и цветов. Можем прислать образцы бесплатно!",
};

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    { from: "bot", text: "Привет! Я помогу выбрать диван. Что вас интересует?" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: ChatMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const lower = input.toLowerCase();
    let reply = BOT_REPLIES.default;
    if (lower.includes("цен") || lower.includes("стоит") || lower.includes("сколько")) reply = BOT_REPLIES.цена;
    else if (lower.includes("доставк")) reply = BOT_REPLIES.доставка;
    else if (lower.includes("размер") || lower.includes("замер")) reply = BOT_REPLIES.размер;
    else if (lower.includes("цвет") || lower.includes("ткань") || lower.includes("обивк")) reply = BOT_REPLIES.цвет;

    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    }, 700);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div
          className="mb-4 w-80 rounded-2xl overflow-hidden shadow-2xl"
          style={{ background: "#1A1A20", border: "1px solid rgba(255,92,26,0.2)" }}
        >
          <div className="flex items-center gap-3 px-4 py-3" style={{ background: "#FF5C1A" }}>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold text-white font-oswald">
              М
            </div>
            <div>
              <p className="text-white font-semibold font-oswald text-sm">Консультант Мягкого Дома</p>
              <p className="text-white/70 text-xs">Онлайн сейчас</p>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto text-white/70 hover:text-white transition-colors">
              <Icon name="X" size={16} />
            </button>
          </div>

          <div className="h-64 overflow-y-auto p-4 space-y-3 font-golos">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[80%] rounded-xl px-3 py-2 text-sm"
                  style={{
                    background: m.from === "user" ? "#FF5C1A" : "#22222A",
                    color: "#F5EDD6",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="p-3" style={{ borderTop: "1px solid rgba(255,92,26,0.2)" }}>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Напишите вопрос..."
                className="flex-1 rounded-lg px-3 py-2 text-sm outline-none font-golos"
                style={{ background: "#22222A", color: "#F5EDD6", border: "1px solid rgba(255,92,26,0.2)" }}
              />
              <button
                onClick={send}
                className="rounded-lg px-3 py-2 transition-transform hover:scale-105"
                style={{ background: "#FF5C1A", color: "#fff" }}
              >
                <Icon name="Send" size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-110"
        style={{ background: "#FF5C1A", color: "#fff", animation: "pulse-glow 2s ease-in-out infinite" }}
      >
        <Icon name={open ? "X" : "MessageCircle"} size={24} fallback="MessageCircle" />
      </button>
    </div>
  );
}

export default function Index() {
  const [activeNav, setActiveNav] = useState("#home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (href: string) => {
    setActiveNav(href);
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-golos" style={{ background: "#0D0D0F", color: "#F5EDD6" }}>

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-40"
        style={{ background: "rgba(13,13,15,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,92,26,0.13)" }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-oswald font-bold text-xl tracking-widest">
            <span style={{ color: "#FF5C1A" }}>МЯГКИЙ</span>
            <span style={{ color: "#F5EDD6" }}>ДОМ</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="font-oswald text-sm tracking-wider transition-all duration-200 hover:text-orange-400"
                style={{ color: activeNav === item.href ? "#FF5C1A" : "#6B6B7B" }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full font-oswald text-sm tracking-wider transition-all hover:opacity-90"
            style={{ background: "#FF5C1A", color: "#fff" }}
          >
            <Icon name="Phone" size={14} />
            Заказать звонок
          </button>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: "#F5EDD6" }}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden px-6 pb-4 space-y-3" style={{ background: "#0D0D0F" }}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="block w-full text-left font-oswald text-sm tracking-wider py-2"
                style={{ color: "#F5EDD6" }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})`, filter: "brightness(0.28)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(255,92,26,0.12) 0%, transparent 50%, rgba(13,13,15,0.85) 100%)" }}
        />

        <div className="absolute top-1/4 right-0 w-px h-64 opacity-20" style={{ background: "linear-gradient(to bottom, transparent, #FF5C1A, transparent)" }} />
        <div className="absolute bottom-1/3 left-0 w-px h-48 opacity-20" style={{ background: "linear-gradient(to bottom, transparent, #FF5C1A, transparent)" }} />

        <div className="relative max-w-7xl mx-auto px-6 w-full pb-24">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-oswald tracking-widest mb-8"
              style={{ background: "rgba(255,92,26,0.13)", border: "1px solid rgba(255,92,26,0.27)", color: "#FF5C1A", opacity: 0, animation: "fade-up 0.6s 0.1s ease-out forwards" }}
            >
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: "#FF5C1A" }} />
              ПРОИЗВОДСТВО · МОСКВА · С 2010 ГОДА
            </div>

            <h1
              className="font-oswald font-bold leading-none mb-6"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "#F5EDD6", opacity: 0, animation: "fade-up 0.7s 0.2s ease-out forwards" }}
            >
              ДИВАНЫ
              <br />
              <span style={{ color: "#FF5C1A" }}>С ХАРАКТЕРОМ</span>
            </h1>

            <p
              className="text-lg mb-10 max-w-lg font-golos"
              style={{ color: "#6B6B7B", lineHeight: 1.7, opacity: 0, animation: "fade-up 0.7s 0.4s ease-out forwards" }}
            >
              Производим мягкую мебель, которая живёт в вашем доме десятилетиями. Собственное производство, 200+ вариантов обивки, доставка по всей России.
            </p>

            <div className="flex flex-wrap gap-4" style={{ opacity: 0, animation: "fade-up 0.7s 0.6s ease-out forwards" }}>
              <button
                onClick={() => scrollTo("#catalog")}
                className="flex items-center gap-2 px-8 py-4 rounded-full font-oswald tracking-wider text-sm transition-all hover:scale-105 hover:opacity-90"
                style={{ background: "#FF5C1A", color: "#fff" }}
              >
                Смотреть каталог
                <Icon name="ArrowRight" size={16} />
              </button>
              <button
                onClick={() => scrollTo("#contacts")}
                className="flex items-center gap-2 px-8 py-4 rounded-full font-oswald tracking-wider text-sm transition-all hover:scale-105"
                style={{ border: "1px solid rgba(255,92,26,0.4)", color: "#F5EDD6", background: "transparent" }}
              >
                Получить консультацию
              </button>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 grid grid-cols-3"
          style={{ background: "rgba(26,26,32,0.92)", borderTop: "1px solid rgba(255,92,26,0.13)", opacity: 0, animation: "fade-up 0.7s 0.8s ease-out forwards" }}
        >
          {[
            { num: "2 000+", label: "Довольных клиентов" },
            { num: "15 лет", label: "На рынке" },
            { num: "200+", label: "Видов обивки" },
          ].map((s, i) => (
            <div key={i} className="py-5 px-6 text-center" style={{ borderRight: i < 2 ? "1px solid rgba(255,92,26,0.13)" : "none" }}>
              <p className="font-oswald font-bold text-2xl" style={{ color: "#FF5C1A" }}>{s.num}</p>
              <p className="text-xs font-golos mt-1" style={{ color: "#6B6B7B" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <div className="py-4 overflow-hidden" style={{ background: "#FF5C1A" }}>
        <div className="flex" style={{ animation: "marquee 22s linear infinite", whiteSpace: "nowrap" }}>
          {Array(6).fill(null).map((_, ri) => (
            <span key={ri} className="font-oswald font-bold text-sm tracking-widest" style={{ color: "#0D0D0F" }}>
              {["ДИВАНЫ", "·", "КРЕСЛА", "·", "ПУФЫ", "·", "УГЛОВЫЕ", "·", "ПРЯМЫЕ", "·", "ТРАНСФОРМЕРЫ", "·"].map((t, ti) => (
                <span key={ti} className="mx-8">{t}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* CATALOG */}
      <section id="catalog" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="font-oswald text-sm tracking-widest mb-3" style={{ color: "#FF5C1A" }}>02 / КАТАЛОГ</p>
              <h2 className="font-oswald font-bold" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#F5EDD6" }}>НАШИ МОДЕЛИ</h2>
            </div>
            <button className="hidden md:flex items-center gap-2 font-oswald text-sm tracking-wider transition-all hover:gap-4" style={{ color: "#FF5C1A" }}>
              Все модели <Icon name="ArrowRight" size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOFAS.map((sofa, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                style={{ background: "#1A1A20", border: "1px solid rgba(255,92,26,0.07)" }}
              >
                <div
                  className="h-52 bg-cover bg-center relative overflow-hidden"
                  style={{ backgroundImage: `url(${sofa.img || CATALOG_IMG})`, filter: sofa.img ? "brightness(0.92)" : `hue-rotate(${i * 18}deg) brightness(${0.45 + i * 0.06})` }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(255,92,26,0.18)" }} />
                  {sofa.tag && (
                    <div className="absolute top-3 left-3 px-2 py-1 rounded font-oswald text-xs tracking-widest" style={{ background: "#FF5C1A", color: "#fff" }}>
                      {sofa.tag}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-oswald font-bold text-xl tracking-widest mb-1" style={{ color: "#F5EDD6" }}>{sofa.name}</h3>
                  <p className="text-sm mb-4" style={{ color: "#6B6B7B" }}>{sofa.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-oswald font-semibold" style={{ color: "#FF5C1A" }}>{sofa.price}</span>
                    <button className="flex items-center gap-1 text-xs font-oswald tracking-wider transition-colors hover:text-orange-400" style={{ color: "#6B6B7B" }}>
                      Подробнее <Icon name="ArrowRight" size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 px-6" style={{ background: "#0A0A0C" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="font-oswald text-sm tracking-widest mb-3" style={{ color: "#FF5C1A" }}>03 / ПОРТФОЛИО</p>
            <h2 className="font-oswald font-bold" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#F5EDD6" }}>НАШИ РАБОТЫ</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:row-span-2 rounded-2xl overflow-hidden relative group cursor-pointer" style={{ minHeight: "400px" }}>
              <img src={PORTFOLIO_IMG} alt="portfolio" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ objectPosition: "center" }} />
              <div className="absolute inset-0 flex flex-col justify-end p-8" style={{ background: "linear-gradient(to top, rgba(13,13,15,0.92) 0%, transparent 60%)" }}>
                <span className="font-oswald text-xs tracking-widest px-2 py-1 rounded mb-3 inline-block w-fit" style={{ background: "rgba(255,92,26,0.13)", color: "#FF5C1A", border: "1px solid rgba(255,92,26,0.27)" }}>Премиум</span>
                <h3 className="font-oswald font-bold text-2xl mb-1" style={{ color: "#F5EDD6" }}>Пентхаус Сити</h3>
                <p className="text-sm" style={{ color: "#6B6B7B" }}>95 м²</p>
              </div>
            </div>

            {PORTFOLIO_ITEMS.map((p, i) => (
              <div key={i} className="rounded-2xl overflow-hidden relative group cursor-pointer h-48">
                <img
                  src={i === 1 ? CATALOG_IMG : HERO_IMG}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ filter: `brightness(${0.38 + i * 0.12})` }}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-5" style={{ background: "linear-gradient(to top, rgba(13,13,15,0.92) 0%, transparent 60%)" }}>
                  <span className="font-oswald text-xs tracking-widest px-2 py-1 rounded mb-2 inline-block w-fit" style={{ background: "rgba(255,92,26,0.13)", color: "#FF5C1A", border: "1px solid rgba(255,92,26,0.27)" }}>{p.tag}</span>
                  <h3 className="font-oswald font-bold text-lg" style={{ color: "#F5EDD6" }}>{p.title}</h3>
                  <p className="text-xs" style={{ color: "#6B6B7B" }}>{p.area}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="font-oswald text-sm tracking-widest mb-3" style={{ color: "#FF5C1A" }}>04 / ДОСТАВКА</p>
            <h2 className="font-oswald font-bold" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#F5EDD6" }}>КАК МЫ ДОСТАВЛЯЕМ</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: "Package", title: "Бережная упаковка", desc: "Каждый диван упакован в защитную плёнку и мягкие уголки. Доставляем в идеальном состоянии." },
              { icon: "Truck", title: "Доставка за 1–7 дней", desc: "Москва и МО — 1–2 рабочих дня. Регионы России — до 7 дней. Возможна экспресс-доставка." },
              { icon: "Wrench", title: "Подъём и сборка", desc: "Наши специалисты занесут диван в квартиру и соберут его. Бесплатно при заказе от 100 000 ₽." },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl transition-all duration-300 hover:border-orange-500"
                style={{ background: "#1A1A20", border: "1px solid rgba(255,92,26,0.07)" }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(255,92,26,0.13)" }}>
                  <Icon name={item.icon as "Package" | "Truck" | "Wrench"} size={22} fallback="Box" />
                </div>
                <h3 className="font-oswald font-bold text-lg mb-3" style={{ color: "#F5EDD6" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B6B7B" }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div
            className="rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ background: "linear-gradient(135deg, rgba(255,92,26,0.13), rgba(255,92,26,0.07))", border: "1px solid rgba(255,92,26,0.2)" }}
          >
            <div>
              <h3 className="font-oswald font-bold text-xl mb-2" style={{ color: "#F5EDD6" }}>Бесплатная доставка по Москве</h3>
              <p className="text-sm" style={{ color: "#6B6B7B" }}>При заказе от 80 000 ₽ доставим и соберём бесплатно</p>
            </div>
            <button
              className="whitespace-nowrap px-8 py-4 rounded-full font-oswald tracking-wider text-sm transition-all hover:opacity-90 hover:scale-105"
              style={{ background: "#FF5C1A", color: "#fff" }}
            >
              Рассчитать доставку
            </button>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-24 px-6" style={{ background: "#0A0A0C" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="font-oswald text-sm tracking-widest mb-3" style={{ color: "#FF5C1A" }}>05 / БЛОГ</p>
            <h2 className="font-oswald font-bold" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#F5EDD6" }}>СОВЕТЫ И ТРЕНДЫ</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post, i) => (
              <div
                key={i}
                className="group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                style={{ background: "#1A1A20", border: "1px solid rgba(255,92,26,0.07)" }}
              >
                <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${post.img})`, filter: "brightness(0.5)" }} />
                <div className="p-6">
                  <p className="font-oswald text-xs tracking-widest mb-3" style={{ color: "#FF5C1A" }}>{post.date}</p>
                  <h3 className="font-oswald font-bold text-lg mb-2 leading-tight" style={{ color: "#F5EDD6" }}>{post.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#6B6B7B" }}>{post.desc}</p>
                  <button className="flex items-center gap-1 text-xs font-oswald tracking-wider transition-all group-hover:gap-3" style={{ color: "#FF5C1A" }}>
                    Читать далее <Icon name="ArrowRight" size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="font-oswald text-sm tracking-widest mb-3" style={{ color: "#FF5C1A" }}>06 / КОНТАКТЫ</p>
            <h2 className="font-oswald font-bold" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#F5EDD6" }}>СВЯЖИТЕСЬ С НАМИ</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              {[
                { icon: "Phone", label: "Телефон", val: "+7 (495) 000-00-00" },
                { icon: "Mail", label: "Email", val: "info@myagkidom.ru" },
                { icon: "MapPin", label: "Адрес", val: "Москва, ул. Мебельная, 1" },
                { icon: "Clock", label: "Режим работы", val: "Пн–Сб: 10:00–20:00, Вс: 11:00–18:00" },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,92,26,0.13)" }}>
                    <Icon name={c.icon as "Phone" | "Mail" | "MapPin" | "Clock"} size={18} fallback="Info" />
                  </div>
                  <div>
                    <p className="text-xs font-oswald tracking-widest mb-1" style={{ color: "#6B6B7B" }}>{c.label}</p>
                    <p className="font-golos" style={{ color: "#F5EDD6" }}>{c.val}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-8" style={{ background: "#1A1A20", border: "1px solid rgba(255,92,26,0.13)" }}>
              <h3 className="font-oswald font-bold text-xl mb-6" style={{ color: "#F5EDD6" }}>Оставить заявку</h3>
              <div className="space-y-4">
                <input
                  placeholder="Ваше имя"
                  className="w-full rounded-xl px-4 py-3 text-sm font-golos outline-none"
                  style={{ background: "#22222A", color: "#F5EDD6", border: "1px solid rgba(255,92,26,0.13)" }}
                />
                <input
                  placeholder="Телефон"
                  className="w-full rounded-xl px-4 py-3 text-sm font-golos outline-none"
                  style={{ background: "#22222A", color: "#F5EDD6", border: "1px solid rgba(255,92,26,0.13)" }}
                />
                <textarea
                  placeholder="Комментарий"
                  rows={3}
                  className="w-full rounded-xl px-4 py-3 text-sm font-golos outline-none resize-none"
                  style={{ background: "#22222A", color: "#F5EDD6", border: "1px solid rgba(255,92,26,0.13)" }}
                />
                <button
                  className="w-full py-4 rounded-xl font-oswald tracking-wider text-sm transition-all hover:opacity-90"
                  style={{ background: "#FF5C1A", color: "#fff" }}
                >
                  Отправить заявку
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6" style={{ background: "#0A0A0C", borderTop: "1px solid rgba(255,92,26,0.13)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-oswald font-bold text-lg tracking-widest">
            <span style={{ color: "#FF5C1A" }}>МЯГКИЙ</span>
            <span style={{ color: "#F5EDD6" }}>ДОМ</span>
          </div>
          <p className="text-xs font-golos" style={{ color: "#6B6B7B" }}>© 2026 МягкийДом. Все права защищены.</p>
          <div className="flex gap-6">
            {NAV_ITEMS.slice(0, 4).map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-xs font-oswald tracking-wider hover:text-orange-400 transition-colors"
                style={{ color: "#6B6B7B" }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}