import type { ButtonHTMLAttributes, ReactNode } from "react";
export const asset = (name: string) =>
  new URL(
    location.pathname
      .replace(/design-system\/(?:index\.html)?$/, "")
      .replace(/index\.html$/, "") +
      "assets/" +
      name,
    location.origin,
  ).href;
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "text";
  children: ReactNode;
}
export function Button({
  variant = "primary",
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`button button-${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
export function Logo({
  dark = false,
  className = "",
}: {
  dark?: boolean;
  className?: string;
}) {
  return (
    <img
      className={`logo ${className}`}
      src={asset(`itcs-logo-${dark ? "dark" : "white"}.png`)}
      width="837"
      height="462"
      alt="ITCS"
    />
  );
}
const paths = [
  <>
    <rect x="3" y="4" width="18" height="13" rx="2" />
    <path d="M8 21h8m-4-4v4" />
  </>,
  <>
    <path d="M12 2 3 6v6c0 5 9 10 9 10s9-5 9-10V6Z" />
    <path d="m8 12 3 3 5-6" />
  </>,
  <path d="M7 3H4a1 1 0 0 0-1 1c0 10 7 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a13 13 0 0 1-7-7l2-2Z" />,
  <>
    <rect x="8" y="2" width="8" height="6" rx="1" />
    <rect x="2" y="16" width="7" height="6" rx="1" />
    <rect x="15" y="16" width="7" height="6" rx="1" />
    <path d="M12 8v5H5v3m7-3h7v3" />
  </>,
  <path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18" />,
  <path d="M3 3v18h18M7 16l5-6 4 3 5-7" />,
];
export function Icon({ index = 0 }: { index?: number }) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[index]}
    </svg>
  );
}
export function Plus() {
  return (
    <span className="plus" aria-hidden="true">
      +
    </span>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}
export function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: ReactNode;
  copy?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
      </div>
      {copy && <div className="section-copy">{copy}</div>}
    </div>
  );
}
