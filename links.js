// Clickable hotspots over specific images on specific pages.
// `page` is the page number as it appears in the book (matches the
// counter in the UI). x/y/w/h are percentages of that page's own
// width/height — not the whole spread — so they work the same in
// single-page and two-page-spread view.
//
// Leave `url` empty ("") to skip rendering a hotspot for that image
// until a real link is ready.

const LINKS = [
  // page 66 — "1. Nuarrr"
  { page: 66, x: 55, y: 17, w: 32, h: 24, url: "https://on.soundcloud.com/QYVHAiVDz7DlOIVrtx" }, // victor.b – 31.12, MK-1 [album]
  { page: 66, x: 7,  y: 39, w: 38, h: 27, url: "https://soundcloud.com/moskalus/premiere-vitya-payalnik-the-wired-system-error" }, // The Wired – Vitya Payalnik, Sign Language [EP]
  { page: 66, x: 60, y: 69, w: 32, h: 23, url: "https://soundcloud.com/sequalog/seqg011-a1-ofortyfour-sly-1" }, // O'FortyFour – Sly Wizzard [snippet]

  // page 67 — "2. Dmytro and Serafima" / "3. Anya"
  { page: 67, x: 8,  y: 12, w: 33, h: 23, url: "https://m.soundcloud.com/d016-music/zrobimo-cze-tut" }, // D016, Kova97 – Зробимо це тут
  { page: 67, x: 57, y: 36, w: 35, h: 25, url: "https://bejenec.bandcamp.com/track/schemat" }, // Bejenec – Schemat [snippet]
  { page: 67, x: 8,  y: 70, w: 33, h: 22, url: "https://dissontiya.bandcamp.com/track/another" }, // Costa – Another

  // page 68 — "4. Ilona"
  { page: 68, x: 55, y: 8,  w: 35, h: 25, url: "https://20ftrecords.bandcamp.com/track/vechirniy-kyiv" }, // Tofudj – Vechirniy Kyiv
  { page: 68, x: 8,  y: 37, w: 36, h: 26, url: "https://siprocess.bandcamp.com/track/rukh" }, // Rukh – SI Process
  { page: 68, x: 51, y: 70, w: 35, h: 25, url: "https://polygon.bandcamp.com/track/qualia" }, // Sominaryst – Qualia

  // page 69 — "5. Vera Logdanidi" (outside the original 66-68 range, added on request)
  { page: 69, x: 9,  y: 8,  w: 33, h: 24, url: "https://standard-deviation.bandcamp.com/track/maryana-klochko-babusia" }, // Maryana Klochko – Babusia Intermission
  { page: 69, x: 57, y: 38, w: 34, h: 24, url: "https://imaginalis.bandcamp.com/track/feat-julinoza-2" }, // Комахи feat Julinoza / Salon Imaginalis – Koloah
  { page: 69, x: 11, y: 67, w: 33, h: 23, url: "https://heinali.bandcamp.com/track/kyiv-eternal" }, // Heinali – Kyiv Eternal
];
