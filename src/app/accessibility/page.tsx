import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Accessibility statement" };

export default function Page() {
  return (
    <LegalPage
      title="Accessibility statement"
      intro="We want everyone to be able to use this website, including people with low vision, limited dexterity or low digital literacy."
      sections={[
        { h: "Our standard", p: ["This site aims to meet WCAG 2.2 level AA. Text contrast is at least 4.5:1, every function works by keyboard, and pages can be zoomed to 200% without losing content."] },
        { h: "What we have done", p: ["The organisational chart is real text with a list view on phones. Every chart has a table view. Images have text alternatives, and downloads show file size before you open them."] },
        { h: "Known limitations", p: ["Some older PDF publications were not created with accessibility in mind. Contact us and we will provide the content in another format."] },
        { h: "Feedback", p: ["If you find a barrier, please tell us through the contact page and we will respond within 5 working days."] },
      ]}
    />
  );
}
