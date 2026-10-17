import type { Metadata } from "next";
import { members, regions } from "@/lib/content";
import { PageHero, SourceNote } from "@/components/ui";
import { MemberDirectory } from "@/components/member-directory";

export const metadata: Metadata = {
  title: "Member directory",
  description: "Search and filter ESA's member seed companies, enterprises and cooperative unions by type, region and seed focus.",
};

export default function DirectoryPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/membership", label: "Membership" }, { label: "Member directory" }]}
        eyebrow="Find a member"
        title="Member directory"
        intro={`${members.length} seed producers, enterprises, importers and cooperative unions across ${regions.length - 1} regions and nationwide.`}
        image="/images/members/field-2025.jpg"
      />
      <section className="container-x relative z-10 -mt-10 pb-20">
        <MemberDirectory />
        <SourceNote>
          Source: ESA &ldquo;List of Members&rdquo;, checked October 2026. ESA reports 60 members; the published list names 58. Contact details appear only for members who have given
          consent to publish (C4). Seed focus is derived from member category.
        </SourceNote>
      </section>
    </>
  );
}
