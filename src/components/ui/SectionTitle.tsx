import Reveal from "@/components/ui/Reveal";

type SectionTitleProps = {
  /** 小さく添えるラベル */
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionTitle({
  label,
  title,
  description,
  align = "center",
}: SectionTitleProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";
  return (
    <Reveal className={`${alignClass} mb-10 md:mb-14`}>
      {label && (
        <p className="mb-2 text-sm font-medium tracking-widest text-brand">
          {label}
        </p>
      )}
      <h2 className="font-serif text-2xl font-semibold leading-relaxed text-cocoa md:text-3xl">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-sm leading-loose text-ink/80 md:text-base ${
            align === "center" ? "mx-auto max-w-2xl" : ""
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
