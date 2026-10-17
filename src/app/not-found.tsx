import Link from "next/link";
import { Sprout } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <Sprout className="size-14 text-leaf-500" aria-hidden />
      <h1 className="mt-6 font-display text-5xl font-semibold text-forest-900">Page not found</h1>
      <p className="mt-3 max-w-md text-muted">This page hasn&apos;t sprouted yet, or it has moved. Try one of these instead.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="inline-flex min-h-12 items-center rounded-full bg-forest-900 px-6 font-bold text-cream">
          Home
        </Link>
        <Link href="/membership/directory" className="inline-flex min-h-12 items-center rounded-full border border-line px-6 font-bold">
          Find a member
        </Link>
        <Link href="/publications" className="inline-flex min-h-12 items-center rounded-full border border-line px-6 font-bold">
          Publications
        </Link>
      </div>
    </section>
  );
}
