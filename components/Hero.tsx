export function Hero() {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Badge */}
      <div
        className="glass animate-fade-up mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-[var(--text-dim)]"
        style={{ animationDelay: "0ms" }}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aurora-cyan opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-aurora-cyan" />
        </span>
        Конструктор приложений на Claude Code
      </div>

      {/* Headline */}
      <h1
        className="animate-fade-up max-w-4xl text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        style={{ animationDelay: "80ms" }}
      >
        <span className="gradient-text">Опишите идею —</span>
        <br />
        <span className="text-white">получите приложение</span>
      </h1>

      {/* Subheadline */}
      <p
        className="animate-fade-up mt-6 max-w-xl text-pretty text-base leading-relaxed text-[var(--text-dim)] sm:text-lg"
        style={{ animationDelay: "160ms" }}
      >
        Никакого кода. Просто расскажите Claude, что хотите создать, отвечайте на
        короткие вопросы — и ваше веб-приложение появится прямо здесь.
      </p>
    </div>
  );
}
