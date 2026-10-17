import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Privacy notice" };

export default function Page() {
  return (
    <LegalPage
      title="Privacy notice"
      intro="How the Ethiopian Seed Association collects, uses and protects personal information on this website."
      sections={[
        { h: "What we collect", p: ["When you use the contact form we collect your name, email, organisation and message. We do not use advertising trackers."] },
        { h: "How we use it", p: ["Only to reply to your enquiry and keep a record of correspondence. We never sell or share your details for marketing."] },
        { h: "Member and staff information", p: ["Names, photos, biographies and contact details of members, board and staff are published only with written consent, which can be withdrawn at any time."] },
        { h: "Retention", p: ["Enquiries are kept for no longer than needed to respond and for record-keeping, then deleted under ESA's retention schedule."] },
        { h: "Your rights", p: ["You can ask to see, correct or delete your information by contacting the secretariat."] },
      ]}
    />
  );
}
