type Variant = "primary" | "secondary" | "light" | "ghost";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] px-6 text-[15px] font-semibold tracking-[0.01em] transition-[transform,background-color,box-shadow,color] duration-200 ease-[var(--ease-brand)] active:scale-[0.98] disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-night text-on-night shadow-soft hover:-translate-y-0.5 hover:shadow-float",
  secondary: "border border-line bg-paper text-ink hover:-translate-y-0.5 hover:border-ink/40",
  light: "bg-paper text-ink hover:-translate-y-0.5 hover:shadow-float",
  ghost: "text-ink underline-offset-4 hover:text-fox-ink hover:underline",
};

type Props = {
  href?: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  onMouseEnter?: () => void;
  onFocus?: () => void;
  disabled?: boolean;
};

export function Button({ href, variant = "primary", className = "", children, type = "button", ...rest }: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (href) {
    return (
      <a href={href} className={cls} onMouseEnter={rest.onMouseEnter} onFocus={rest.onFocus} onClick={rest.onClick}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={cls} {...rest}>
      {children}
    </button>
  );
}
