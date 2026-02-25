export const getThumbnailByTag = (tag: string | undefined): string => {
  if (!tag) return './images/restaurant.png';

  const mapping: { [key: string]: { regexp: RegExp; file: string } } = {
    kr_rice_bibim: { regexp: /비빔밥/i, file: 'korea/kr-rice-bibim.png' },
    kr_soup_boodae: {
      regexp: /부대찌개|찌개/i,
      file: 'korea/kr-soup-boodae.png',
    },
    kr_soup_jeongol: { regexp: /전골/i, file: 'korea/kr-soup-jeongol.png' },
    kr_soup_soondae: {
      regexp: /순대국|순대국밥/i,
      file: 'korea/kr-soup-soondae.png',
    },
    kr_soup_soondoobu: {
      regexp: /순두부/i,
      file: 'korea/kr-soup-soondoobu.png',
    },
    kr_meat_gogi: { regexp: /고기|육류/i, file: 'korea/kr-meat-gogi.png' },
    kr_meat_bossam: { regexp: /보쌈/i, file: 'korea/kr-meat-bossam.png' },
    kr_meat_dakgalbi: { regexp: /닭갈비/i, file: 'korea/kr-meat-dakgalbi.png' },
    kr_noodle_cold: { regexp: /냉면/i, file: 'korea/kr-noodle-cold.png' },
    kr_noodle_cal: { regexp: /칼국수|국수/i, file: 'korea/kr-noodle-cal.png' },
    kr_fish: {
      regexp: /생선|해물/i,
      file: 'korea/kr-fish.png',
    },
    kr_fish_grilled: {
      regexp: /생선구이/i,
      file: 'korea/kr-fish-grilled.png',
    },
    kr_special: { regexp: /한정식|한식/i, file: 'korea/kr-special.png' },

    // cn 중식
    cn_meat_sheep: {
      regexp: /양고기|양꼬치/i,
      file: 'chinese/cn-meat-sheep.png',
    },
    cn_noodle_jjajang: {
      regexp: /짜장|자장|중국요리|중식/i,
      file: 'chinese/cn-noodle-jjajang.png',
    },

    // jp 일식
    jp_default: { regexp: /일식|일본/i, file: 'japanese/jp-default.png' },
    jp_meat_tonkatsu: {
      regexp: /돈까스|돈가스/i,
      file: 'japanese/jp-meat-tonkatsu.png',
    },
    jp_soup_ramen: { regexp: /라멘/i, file: 'japanese/jp-soup-ramen.png' },
    jp_noodle_udon: { regexp: /우동/i, file: 'japanese/jp-noodle-udon.png' },
    jp_fish_shushi: {
      regexp: /초밥|스시|참치회|회/i,
      file: 'japanese/jp-fish-shushi.png',
    },

    // west 양식
    west_default: { regexp: /양식/i, file: 'western/west-default.png' },
    west_pizza: { regexp: /피자/i, file: 'western/west-pizza.png' },
    west_meat: { regexp: /스테이크|고기/i, file: 'western/west-meat.png' },
    west_italian: {
      regexp: /파스타|이탈리안/i,
      file: 'western/west-italian.png',
    },

    // etc 기타
    etc_buffet: { regexp: /뷔페/i, file: 'etc/etc-buffet.png' },
    etc_snack_gimbab: { regexp: /김밥/i, file: 'etc/etc-snack-gimbab.png' },
    etc_snack_ddeokbokki: {
      regexp: /떡볶이|분식/i,
      file: 'etc/etc-snack-ddeokbokki.png',
    },
    etc_snack_dosirock: {
      regexp: /도시락/i,
      file: 'etc/etc-snack-dosirock.png',
    },
    etc_snack_soondae: { regexp: /순대/i, file: 'etc/etc-snack-soondae.png' },
    etc_fastfood: {
      regexp: /패스트푸드/i,
      file: 'etc/etc-fastfood.png',
    },
    etc_fastfood_hamburger: {
      regexp: /햄버거|버거/i,
      file: 'etc/etc-fastfood-hamburger.png',
    },
    etc_bar: { regexp: /술집|바|호프/i, file: 'etc/etc-bar.png' },
    etc_mexican: { regexp: /멕시칸|멕시코/i, file: 'etc/etc-mexican.png' },
    etc_salad: { regexp: /샐러드/i, file: 'etc/etc-salad.png' },
  };

  for (const { regexp, file } of Object.values(mapping)) {
    if (regexp.test(tag)) return `./images/restaurantThumbnail/${file}`;
  }
  return './images/restaurant.png';
};
