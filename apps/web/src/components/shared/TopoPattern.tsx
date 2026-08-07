interface TopoPatternProps {
  className?: string;
}

/** Decorative topographic contour lines — reinforces the "land" identity on dark forest surfaces. */
export default function TopoPattern({ className = "" }: TopoPatternProps) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full opacity-[0.07] ${className}`}
      viewBox="0 0 680 400"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 55Q100 35 200 60Q300 85 400 50Q500 15 600 45Q645 60 680 50"
        fill="none"
        stroke="white"
        strokeWidth="1.4"
      />
      <path
        d="M0 38Q110 22 220 44Q330 66 440 35Q550 4 660 32Q670 35 680 36"
        fill="none"
        stroke="white"
        strokeWidth="1"
      />
      <path
        d="M0 70Q90 58 180 72Q270 86 360 62Q450 38 540 58Q620 76 680 65"
        fill="none"
        stroke="white"
        strokeWidth=".8"
      />
      <path
        d="M0 20Q120 10 240 28Q360 46 480 20Q580 0 680 18"
        fill="none"
        stroke="white"
        strokeWidth=".6"
      />
      <path
        d="M0 150Q100 130 200 155Q300 180 400 145Q500 110 600 140Q645 155 680 145"
        fill="none"
        stroke="white"
        strokeWidth="1.2"
      />
      <path
        d="M0 250Q110 234 220 256Q330 278 440 247Q550 216 660 244Q670 247 680 248"
        fill="none"
        stroke="white"
        strokeWidth="1"
      />
      <path
        d="M0 340Q90 328 180 342Q270 356 360 332Q450 308 540 328Q620 346 680 335"
        fill="none"
        stroke="white"
        strokeWidth=".8"
      />
    </svg>
  );
}
