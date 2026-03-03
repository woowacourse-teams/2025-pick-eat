type Category = '한식' | '일식' | '중식' | '양식' | '기타';

type Mapping = {
  regexp: RegExp;
  file: string;
};

const THUMBNAIL_MAPPINGS: Record<Category, Mapping[]> = {
  한식: [
    { regexp: /비빔밥/i, file: 'korea/kr-rice-bibim.png' },
    { regexp: /부대찌개|찌개/i, file: 'korea/kr-soup-boodae.png' },
    { regexp: /전골/i, file: 'korea/kr-soup-jeongol.png' },
    { regexp: /순대국|순대국밥/i, file: 'korea/kr-soup-soondae.png' },
    { regexp: /순두부/i, file: 'korea/kr-soup-soondoobu.png' },
    { regexp: /고기|육류/i, file: 'korea/kr-meat-gogi.png' },
    { regexp: /보쌈/i, file: 'korea/kr-meat-bossam.png' },
    { regexp: /닭갈비/i, file: 'korea/kr-meat-dakgalbi.png' },
    { regexp: /냉면/i, file: 'korea/kr-noodle-cold.png' },
    { regexp: /칼국수|국수/i, file: 'korea/kr-noodle-cal.png' },
    { regexp: /생선|해물/i, file: 'korea/kr-fish.png' },
    { regexp: /생선구이/i, file: 'korea/kr-fish-grilled.png' },
    { regexp: /한정식|한식/i, file: 'korea/kr-special.png' },
  ],
  중식: [
    { regexp: /양고기|양꼬치/i, file: 'chinese/cn-meat-sheep.png' },
    {
      regexp: /짜장|자장|중국요리|중식/i,
      file: 'chinese/cn-noodle-jjajang.png',
    },
  ],
  일식: [
    { regexp: /일식|일본/i, file: 'japanese/jp-default.png' },
    { regexp: /돈까스|돈가스/i, file: 'japanese/jp-meat-tonkatsu.png' },
    { regexp: /라멘/i, file: 'japanese/jp-soup-ramen.png' },
    { regexp: /우동/i, file: 'japanese/jp-noodle-udon.png' },
    { regexp: /초밥|스시|참치회|회/i, file: 'japanese/jp-fish-shushi.png' },
  ],
  양식: [
    { regexp: /양식/i, file: 'western/west-default.png' },
    { regexp: /피자/i, file: 'western/west-pizza.png' },
    { regexp: /스테이크|고기/i, file: 'western/west-meat.png' },
    { regexp: /파스타|이탈리안/i, file: 'western/west-italian.png' },
  ],
  기타: [
    { regexp: /뷔페/i, file: 'etc/etc-buffet.png' },
    { regexp: /김밥/i, file: 'etc/etc-snack-gimbab.png' },
    { regexp: /떡볶이|분식/i, file: 'etc/etc-snack-ddeokbokki.png' },
    { regexp: /도시락/i, file: 'etc/etc-snack-dosirock.png' },
    { regexp: /순대/i, file: 'etc/etc-snack-soondae.png' },
    { regexp: /패스트푸드/i, file: 'etc/etc-fastfood.png' },
    { regexp: /햄버거|버거/i, file: 'etc/etc-fastfood-hamburger.png' },
    { regexp: /술집|바|호프/i, file: 'etc/etc-bar.png' },
    { regexp: /멕시칸|멕시코/i, file: 'etc/etc-mexican.png' },
    { regexp: /샐러드/i, file: 'etc/etc-salad.png' },
  ],
};

export const restaurantThumbnail = (category: Category) => ({
  get: (tag: string | undefined): string => {
    const match = THUMBNAIL_MAPPINGS[category].find(({ regexp }) =>
      regexp.test(tag || category)
    );

    return match
      ? `./images/restaurantThumbnail/${match.file}`
      : './images/restaurant.png';
  },
});
