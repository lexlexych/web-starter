import type { ReactNode } from "react";

type CommandCardProps = {
  command: string;
  title: string;
  description: string;
  icon: ReactNode;
  accent: "violet" | "cyan";
  delay?: string;
};

const accentRing: Record<CommandCardProps["accent"], string> = {
  violet: "group-hover:shadow-glow group-hover:border-aurora-violet/50",
  cyan: "group-hover:shadow-glow-cyan group-hover:border-aurora-cyan/50",
};

const accentChip: Record<CommandCardProps["accent"], string> = {
  violet: "text-aurora-violet bg-aurora-violet/10 border-aurora-violet/20",
  cyan: "text-aurora-cyan bg-aurora-cyan/10 border-aurora-cyan/20",
};

export function CommandCard({
  command,
  title,
  description,
  icon,
  accent,
  delay = "0ms",
}: CommandCardProps) {
  return (
    <div
      className="group animate-fade-up"
      style={{ animationDelay: delay }}
    >
      <div
        className={`glass relative flex h-full flex-col gap-4 rounded-2xl p-6 transition-all duration-500 ease-out group-hover:-translate-y-1.5 ${accentRing[accent]}`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl border ${accentChip[accent]}`}
          >
            {icon}
          </div>
          <code
            className={`rounded-lg border px-2.5 py-1 font-mono text-sm ${accentChip[accent]}`}
          >
            {command}
          </code>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-dim)]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
