import Link from "next/link";
import { CiShare1 } from "react-icons/ci";

type LinkShareProps = {
  href: string;
  title: string;
  target?: React.HTMLAttributeAnchorTarget; // np. "_blank", "_self", "_parent", "_top"
};

export default function LinkShare({ href, title, target = "_self" }: LinkShareProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined} // zabezpieczenie przy _blank
      className="text-brand underline hover:text-brand-hover font-medium transition-color relative flex items-center gap-1"
    >
      {title}
      <CiShare1 />
    </Link>
  );
}
