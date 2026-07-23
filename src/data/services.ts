/** わんnessの提供サービス */

export type Service = {
  slug: string;
  name: string;
  href: string;
  catch: string;
  description: string;
  target: string[];
  image: { src: string; alt: string };
};

export const services: Service[] = [
  {
    slug: "basic-care-trimming",
    name: "ベーシックケアトリミング",
    href: "/basic-care",
    catch: "身体と皮膚の状態まで考えたケアが、わんnessの基本。",
    description:
      "カウンセリングと身体の左右差・可動域の確認から始め、その子に合わせたスキンケア、シャンプー、犬種に応じたカットまでを一つの基本コースとして行います。",
    target: [
      "見た目だけでなく身体のケアも相談したい子",
      "皮膚の乾燥・赤み・かゆみが気になる子",
      "シニアの子・トリミングが苦手な子",
    ],
    image: {
      src: "/images/trimming/ear-trim.jpg",
      alt: "自宅でのトリミングでビションフリーゼの耳まわりをハサミで丁寧に整える様子",
    },
  },
  {
    slug: "body-conditioning",
    name: "ボディコンディショニング",
    href: "/body-care",
    catch: "シニア犬や、身体の使い方が気になる子の日常ケアに。",
    description:
      "身体の左右差や関節の動かしやすさを確認しながら、背筋を伸ばすやさしいケアや簡単な整体・コンディショニングケアを行います。30分3,500円～、トリミングと同日は2,500円～。",
    target: [
      "シニア犬・以前より動く時間が減った子",
      "歩き方・姿勢・身体の左右差が気になる子",
      "日常的な身体ケアを取り入れたい子",
    ],
    image: {
      src: "/images/care/golden-back-care.jpg",
      alt: "芝生の上でゴールデンレトリバーの背中にやさしく手を当てるボディコンディショニングの様子",
    },
  },
  {
    slug: "walk-support",
    name: "お散歩代行サポート",
    href: "/body-care#walk-support",
    catch: "歩き方を見ながらのお散歩＋身体を緩める簡単なケア。",
    description:
      "歩き方や身体の使い方を確認しながらお散歩し、終了後に身体を緩めて整える簡単なケアを行います。30分＋ケアで3,500円～。",
    target: [
      "お散歩の時間を確保しにくいご家庭",
      "歩き方や身体の使い方が気になる子",
      "運動と身体ケアをまとめて任せたい方",
    ],
    image: {
      src: "/images/care/golden-stretch.jpg",
      alt: "屋外でゴールデンレトリバーの前足をやさしく支えて動きを確認する様子",
    },
  },
];
