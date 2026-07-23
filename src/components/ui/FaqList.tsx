import Reveal from "@/components/ui/Reveal";
import type { FaqItem } from "@/data/faq";

/** FAQアコーディオン（details/summary によるJS不要のアクセシブルな実装） */
export default function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <Reveal key={item.question} delay={Math.min(i * 0.05, 0.3)}>
          <details className="faq-item group rounded-2xl border border-cocoa/10 bg-white px-5 py-4 md:px-7">
            <summary className="flex items-start justify-between gap-4 text-sm font-medium leading-relaxed text-cocoa md:text-base">
              <span className="flex gap-3">
                <span aria-hidden="true" className="font-serif font-semibold text-brand">
                  Q
                </span>
                {item.question}
              </span>
              <span
                aria-hidden="true"
                className="faq-icon mt-1 shrink-0 text-lg leading-none text-brand"
              >
                ＋
              </span>
            </summary>
            <div className="mt-3 flex gap-3 border-t border-cocoa/10 pt-3 text-sm leading-loose text-ink/85 md:text-base">
              <span aria-hidden="true" className="font-serif font-semibold text-sage">
                A
              </span>
              <p>{item.answer}</p>
            </div>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
