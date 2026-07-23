import Reveal from "@/components/ui/Reveal";
import LeafDecoration from "@/components/ui/LeafDecoration";

type PageHeroProps = {
  title: string;
  description?: string;
};

/** 下層ページ共通のページタイトル部 */
export default function PageHero({ title, description }: PageHeroProps) {
  return (
    <div className="relative overflow-hidden bg-surface">
      <LeafDecoration className="pointer-events-none absolute -right-6 top-4 h-28 w-28 text-sage/40 md:right-8 md:h-36 md:w-36" />
      <div className="mx-auto w-full max-w-6xl px-4 py-14 md:py-20">
        <Reveal>
          <h1 className="font-serif text-2xl font-semibold leading-relaxed text-cocoa md:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-3xl text-sm leading-loose text-ink/80 md:text-base">
              {description}
            </p>
          )}
        </Reveal>
      </div>
      <WaveBottom />
    </div>
  );
}

/** セクション下端の柔らかな曲線 */
export function WaveBottom({ fill = "var(--color-cream)" }: { fill?: string }) {
  return (
    <svg
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      className="block h-8 w-full md:h-12"
      aria-hidden="true"
    >
      <path
        d="M0,24 C240,48 480,0 720,12 C960,24 1200,48 1440,20 L1440,48 L0,48 Z"
        fill={fill}
      />
    </svg>
  );
}
