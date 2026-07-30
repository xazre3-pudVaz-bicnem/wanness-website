import { site, siteUrl } from "@/config/site";
import type { FaqItem } from "@/data/faq";

/**
 * 構造化データ（JSON-LD）ビルダー
 *
 * 注意：わんnessは出張型サービス。
 * LocalBusiness の所在地は「事業所情報」であり、来店型店舗ではない。
 * 医療系（MedicalBusiness / VeterinaryCare 等）のタイプは使用しない。
 */

const orgId = `${siteUrl}/#organization`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    alternateName: site.nameReading,
    url: siteUrl,
    logo: `${siteUrl}/images/logo/logo-full.jpg`,
    telephone: site.tel,
    address: {
      "@type": "PostalAddress",
      postalCode: site.address.postalCode,
      addressRegion: site.address.prefecture,
      addressLocality: site.address.city,
      streetAddress: site.address.street,
      addressCountry: "JP",
    },
    sameAs: [site.instagram.url],
    founder: { "@type": "Person", name: site.representative.name },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#localbusiness`,
    name: site.name,
    description:
      "沖縄県那覇市を拠点に沖縄本島全域へ訪問する出張トリミング・犬のボディケアサービス。掲載の所在地は事業所情報であり、店舗への来店型サービスではありません。",
    url: siteUrl,
    telephone: site.tel,
    image: `${siteUrl}/images/logo/logo-full.jpg`,
    address: {
      "@type": "PostalAddress",
      postalCode: site.address.postalCode,
      addressRegion: site.address.prefecture,
      addressLocality: site.address.city,
      streetAddress: site.address.street,
      addressCountry: "JP",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...site.businessHours.openDays],
      opens: "09:00",
      closes: "22:00",
    },
    areaServed: areaServed(),
    parentOrganization: { "@id": orgId },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: site.representative.name,
    jobTitle: site.representative.role,
    worksFor: { "@id": orgId },
    knowsAbout: [
      "犬のトリミング",
      "犬のボディコンディショニング",
      "犬のスキンケア",
    ],
  };
}

function areaServed() {
  return [
    { "@type": "Place", name: "沖縄本島" },
    { "@type": "City", name: "那覇市" },
    { "@type": "City", name: "浦添市" },
    { "@type": "City", name: "宜野湾市" },
    { "@type": "City", name: "豊見城市" },
    { "@type": "City", name: "糸満市" },
    { "@type": "City", name: "南城市" },
    { "@type": "City", name: "沖縄市" },
    { "@type": "City", name: "うるま市" },
    { "@type": "Place", name: "南風原町" },
    { "@type": "Place", name: "西原町" },
    { "@type": "Place", name: "北谷町" },
  ];
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: `${siteUrl}${input.path}`,
    serviceType: input.name,
    provider: { "@id": orgId },
    areaServed: areaServed(),
  };
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: site.name,
    url: siteUrl,
    inLanguage: "ja",
    publisher: { "@id": orgId },
  };
}

export function itemListJsonLd(input: {
  name: string;
  items: { name: string; url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: input.name,
    itemListElement: input.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  thumbnail?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: `${siteUrl}/column/${input.slug}`,
    datePublished: input.publishedAt,
    dateModified: input.updatedAt ?? input.publishedAt,
    inLanguage: "ja",
    image: input.thumbnail ? `${siteUrl}${input.thumbnail}` : undefined,
    author: {
      "@type": "Person",
      name: site.representative.name,
      "@id": `${siteUrl}/#person`,
    },
    publisher: { "@id": orgId },
  };
}
