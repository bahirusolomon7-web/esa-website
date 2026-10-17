import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { NewsTabs } from "@/components/news-tabs";

export const metadata: Metadata = {
  title: "News and events",
  description: "Latest news, forums, workshops and training from the Ethiopian Seed Association.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "News and events" }]}
        eyebrow="News and events"
        title="What's happening in Ethiopia's seed sector"
        intro="Forums, training, workshops and policy news from ESA and its partners, newest first."
        image="/images/news/forum-2024-4.jpg"
      />
      <section className="container-x py-16">
        <NewsTabs />
      </section>
    </>
  );
}
