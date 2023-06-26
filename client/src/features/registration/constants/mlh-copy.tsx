import Link from "next/link";


export const MLH_CODE_OF_CONDUCT = (
  <span>I have read and agree to the <Link href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" target="_blank" className="underline">MLH Code of Conduct</Link>.</span>
);

export const MLH_PRIVACY_POLICY = (
  <span>
    I authorize you to share my application/registration information with Major League Hacking
    for event administration, ranking, and MLH administration in-line with the MLH Privacy Policy.
    I further agree to the terms of both the&nbsp;
    <Link href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md" target="_blank" className="underline">MLH Contest Terms and Conditions</Link>
    &nbsp;and the&nbsp;
    <Link href="https://mlh.io/privacy" target="_blank" className="underline">MLH Privacy Policy</Link>.
  </span>
);

export const MLH_EMAILS = (
  <span>
    (Optional) I authorize MLH to send me occasional emails about relevant events,
    career opportunities, and community announcements.
  </span>
);