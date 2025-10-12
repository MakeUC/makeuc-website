import Image from "next/image";


export function MLHBanner() {
  return (
    <a
      id="mlh-trust-badge"
      className="block max-w-[100px] min-w-[60px] absolute right-0 w-[10vw]"
      href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=white"
      target="_blank"
      style={{ marginTop: "3.5px" }}
    >
      <Image
        src="https://s3.amazonaws.com/logged-assets/trust-badge/2026/mlh-trust-badge-2026-white.svg"
        alt="Major League Hacking 2026 Hackathon Season"
        className="w-full"
        width={100}
        height={173}
      />
    </a>
  );
}
