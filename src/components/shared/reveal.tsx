import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in milliseconds */
  delay?: number;
};

/**
 * Lightweight entrance animation wrapper using tw-animate-css.
 * Server-friendly: no client JS, animation plays on mount/paint.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <div
      className={cn(
        "animate-in fade-in slide-in-from-bottom-6 fill-mode-both duration-700",
        className
      )}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
