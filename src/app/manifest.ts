import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "わんness｜那覇市の出張トリミング・犬のボディケア",
    short_name: "わんness",
    description:
      "那覇市を中心に沖縄本島全域へ訪問する出張トリミング＆ボディケア",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFDF8",
    theme_color: "#F39A28",
    icons: [
      {
        src: "/images/logo/logo-mark.jpg",
        sizes: "1280x1280",
        type: "image/jpeg",
      },
    ],
  };
}
