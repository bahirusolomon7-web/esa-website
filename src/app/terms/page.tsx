import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Terms of use" };

export default function Page() {
  return (
    <LegalPage
      title="Terms of use"
      intro="The conditions for using the Ethiopian Seed Association website and its content."
      sections={[
        { h: "Use of content", p: ["You may download and share publications for non-commercial purposes with proper acknowledgement of the authors and sources."] },
        { h: "Accuracy", p: ["We check facts against official documents before publishing. If you spot an error, please let us know."] },
        { h: "Member listings", p: ["Listing in the directory confirms membership of ESA. It is not an endorsement of a member's products or a guarantee of seed quality."] },
        { h: "External links", p: ["We link to partner and government sites for convenience and are not responsible for their content."] },
      ]}
    />
  );
}
