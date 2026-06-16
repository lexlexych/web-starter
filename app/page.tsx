import { CosmicBackground } from "@/components/CosmicBackground";
import { Hero } from "@/components/Hero";
import { CommandCard } from "@/components/CommandCard";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20">
      <CosmicBackground />

      <section className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center">
        <Hero />

        {/* Command cards */}
        <div className="mt-14 grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
          <CommandCard
            command="/start"
            title="Посмотреть демо"
            description="Запускает эту страницу в окне предпросмотра справа, чтобы вы увидели, как всё работает вживую."
            accent="cyan"
            delay="240ms"
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
            }
          />
          <CommandCard
            command="/init-app"
            title="Создать своё приложение"
            description="Задаёт пару простых вопросов о вашей идее, составляет план и собирает приложение под вас."
            accent="violet"
            delay="320ms"
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 3v4" />
                <path d="M19 17v4" />
                <path d="M3 5h4" />
                <path d="M17 19h4" />
                <path d="M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3z" />
              </svg>
            }
          />
        </div>

        {/* CTA hint */}
        <div
          className="animate-fade-up mt-12 flex items-center gap-2 text-sm text-[var(--text-dim)]"
          style={{ animationDelay: "420ms" }}
        >
          <span>Начните прямо сейчас — напишите в чате</span>
          <code className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-aurora-violet">
            /init-app
          </code>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="animate-fade-up absolute bottom-6 z-10 text-xs text-[var(--text-dim)]/70"
        style={{ animationDelay: "520ms" }}
      >
        Powered by Claude Code
      </footer>
    </main>
  );
}
