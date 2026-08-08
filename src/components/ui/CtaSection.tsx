import Reveal from "@/components/ui/Reveal";
import { LineButton, TelButton } from "@/components/ui/Buttons";
import { site } from "@/config/site";

type CtaSectionProps = {
  title?: string;
  message?: string;
};

/** ページ下部共通のご相談CTA */
export default function CtaSection({
  title = "いつものお家で、その子に合ったケアを。",
  message = "愛犬ちゃんの年齢、性格、身体の状態、ご家庭の事情も含めてご相談ください。",
}: CtaSectionProps) {
  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="mx-auto w-full max-w-4xl px-4 py-16 text-center md:py-24">
        <Reveal>
          <h2 className="whitespace-pre-line font-serif text-2xl font-semibold leading-relaxed text-cocoa md:text-3xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-loose text-ink/80 md:text-base">
            {message}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LineButton />
            <TelButton />
          </div>
          <p className="mt-4 text-xs text-ink/60">
            営業時間 {site.businessHours.text}（{site.businessHours.note}）
          </p>
        </Reveal>
      </div>
    </section>
  );
}
