import { Link } from "@tanstack/react-router";
import { ArrowRight, GitBranch } from "lucide-react";

export function CompatibilityBridge({
  title,
  description,
  to,
  cta,
}: {
  title: string;
  description: string;
  to: string;
  cta: string;
}) {
  return (
    <div className="vm-page">
      <section className="rounded-[2rem] vm-glass p-8 text-center md:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl vm-orb">
          <GitBranch className="h-7 w-7 text-white" />
        </div>
        <h1 className="mt-6 text-4xl font-extrabold">{title}</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          {description}
        </p>
        <Link to={to} className="vm-primary-btn mt-6">
          {cta}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
