import { useId } from "react";
import { asset } from "./UI";
export function PrinterIllustration({
  printing = false,
}: {
  printing?: boolean;
}) {
  const id = useId().replaceAll(":", "");
  return (
    <svg
      className="printer-illustration"
      viewBox="0 0 540 60"
      preserveAspectRatio="none"
      role="img"
      aria-label="ITCS service printer"
    >
      <defs>
        <linearGradient id={`${id}-housing`} x1="0" y1="0" x2=".08" y2="1">
          <stop stopColor="#F1454C" />
          <stop offset=".46" stopColor="#DD1824" />
          <stop offset="1" stopColor="#A81019" />
        </linearGradient>
        <linearGradient id={`${id}-slot`} x2="0" y2="1">
          <stop stopColor="#080204" />
          <stop offset="1" stopColor="#270B0E" />
        </linearGradient>
      </defs>
      <path
        d="M19 0H521Q540 0 540 19V47Q540 60 527 60H13Q0 60 0 47V19Q0 0 19 0Z"
        fill={`url(#${id}-housing)`}
      />
      <path
        d="M19 1H521Q539 1 539 19"
        fill="none"
        stroke="#FFB8B8"
        strokeOpacity=".8"
      />
      <path
        d="M1 47Q1 59 13 59H527Q539 59 539 47"
        fill="none"
        stroke="#6B030B"
        strokeWidth="3"
        strokeOpacity=".35"
      />
      <text
        x="26"
        y="25"
        fill="#fff"
        fillOpacity=".8"
        fontFamily="ui-monospace,Consolas,monospace"
        fontSize="10"
        letterSpacing="1.2"
      >
        ITCS / SERVICE DESK
      </text>
      <circle
        className={printing ? "ready-light printing" : "ready-light"}
        cx="510"
        cy="22"
        r="3"
        fill="#FFEADB"
      />
      <rect
        x="22"
        y="42"
        width="496"
        height="10"
        rx="5"
        fill={`url(#${id}-slot)`}
      />
      <path
        d="M27 53H513"
        stroke="#FA6873"
        strokeWidth="1"
        strokeOpacity=".65"
      />
    </svg>
  );
}
export function ConnectedIllustration() {
  const id = useId().replaceAll(":", "");
  return (
    <svg
      className="connected-illustration"
      viewBox="0 0 640 470"
      role="img"
      aria-label="Digital illustration of IT support, cyber security and connectivity working together"
    >
      <defs>
        <pattern
          id={`${id}-grid`}
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r=".7" fill="#c8c8c3" />
        </pattern>
        <linearGradient id={`${id}-screen`} x2="0" y2="1">
          <stop stopColor="#38383d" />
          <stop offset="1" stopColor="#202024" />
        </linearGradient>
        <filter id={`${id}-s`}>
          <feDropShadow dx="0" dy="12" stdDeviation="10" floodOpacity=".1" />
        </filter>
      </defs>
      <rect width="640" height="470" rx="12" fill="#eeeee8" />
      <rect x="20" y="20" width="600" height="430" fill={`url(#${id}-grid)`} />
      <path
        d="M135 158V330Q135 359 165 359H447Q480 359 480 327V195M317 293V378"
        fill="none"
        stroke="#d3d3cd"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M135 158V330Q135 359 165 359H447Q480 359 480 327V195M317 293V378"
        fill="none"
        stroke="#e72a35"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <g filter={`url(#${id}-s)`}>
        <rect x="207" y="141" width="224" height="149" rx="10" fill="#18181b" />
        <rect
          x="217"
          y="151"
          width="204"
          height="125"
          rx="3"
          fill={`url(#${id}-screen)`}
        />
        <path
          d="M300 291v22h38v-22m-62 24h86"
          stroke="#53535a"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <image
          href={asset("itcs-logo-white.png")}
          x="275"
          y="176"
          width="88"
          height="49"
        />
        <path d="M249 248h140" stroke="#61616a" />
        <circle cx="249" cy="248" r="3" fill="#ef3a45" />
      </g>
      <g filter={`url(#${id}-s)`}>
        <rect
          x="78"
          y="81"
          width="112"
          height="112"
          rx="18"
          fill="#fff"
          stroke="#d7d7d2"
        />
        <path
          d="m134 106-31 12v20c0 20 31 36 31 36s31-16 31-36v-20Z"
          fill="#fce9ea"
          stroke="#d71927"
          strokeWidth="2"
        />
        <path
          d="m120 137 10 10 20-23"
          fill="none"
          stroke="#d71927"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g filter={`url(#${id}-s)`}>
        <rect x="443" y="114" width="112" height="112" rx="18" fill="#f12b37" />
        <path
          d="M480 146h-9q-3 0-3 3c0 28 19 47 47 47q3 0 3-3v-9l-14-6-5 6a39 39 0 0 1-18-18l6-6Z"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>
      <g filter={`url(#${id}-s)`}>
        <rect
          x="266"
          y="357"
          width="102"
          height="62"
          rx="9"
          fill="#fff"
          stroke="#d7d7d2"
        />
        <rect x="285" y="377" width="14" height="14" rx="3" fill="#e82733" />
        <path
          d="M309 379h39m-39 10h28"
          stroke="#a0a0a4"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <rect x="210" y="66" width="162" height="29" rx="14.5" fill="#e3e3dc" />
      <text
        x="291"
        y="85"
        textAnchor="middle"
        fill="#696970"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="9"
        letterSpacing="1"
      >
        ONE CONNECTED TEAM
      </text>
      <circle
        cx="135"
        cy="254"
        r="7"
        fill="#eeeee8"
        stroke="#ed1c24"
        strokeWidth="3"
      />
      <circle
        cx="480"
        cy="283"
        r="7"
        fill="#eeeee8"
        stroke="#ed1c24"
        strokeWidth="3"
      />
    </svg>
  );
}
