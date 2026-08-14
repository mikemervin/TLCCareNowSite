const wix = (path: string) =>
  `https://static.wixstatic.com/media/${path}`;

export const images = {
  logo: wix(
    "66ee93_87ae01871be54cc6b72b926aa95dd697~mv2.png/v1/crop/x_0,y_183,w_563,h_206/fill/w_594,h_218,al_c,lg_1,q_85,usm_0.66_1.00_0.01/66ee93_87ae01871be54cc6b72b926aa95dd697~mv2.png",
  ),
  hero: "/hero.jpg",
  campusCare: wix(
    "5d905dad01d24eeea6f4ba5f39b68667.jpg/v1/fill/w_1200,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Examining%20New%20Tablet.jpg",
  ),
  featureSlides: [
    wix(
      "5d905dad01d24eeea6f4ba5f39b68667.jpg/v1/fill/w_800,h_1000,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Examining%20New%20Tablet.jpg",
    ),
    wix(
      "d20898_d805d632a8294cc8aa108b727fd73782~mv2.jpg/v1/fill/w_800,h_1000,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/d20898_d805d632a8294cc8aa108b727fd73782~mv2.jpg",
    ),
    wix(
      "d20898_fd6eb7e184254eddb12cb42408790ccb~mv2.jpg/v1/fill/w_800,h_1000,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/d20898_fd6eb7e184254eddb12cb42408790ccb~mv2.jpg",
    ),
  ],
  blogPost: wix(
    "d20898_d805d632a8294cc8aa108b727fd73782~mv2.jpg/v1/fill/w_600,h_400,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/d20898_d805d632a8294cc8aa108b727fd73782~mv2.jpg",
  ),
  /** Distinct thumbnails for blog / guides index cards. */
  blogGuides: {
    communities: wix(
      "5d905dad01d24eeea6f4ba5f39b68667.jpg/v1/fill/w_600,h_400,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Examining%20New%20Tablet.jpg",
    ),
    families: wix(
      "d20898_fd6eb7e184254eddb12cb42408790ccb~mv2.jpg/v1/fill/w_600,h_400,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/d20898_fd6eb7e184254eddb12cb42408790ccb~mv2.jpg",
    ),
    caregiving: wix(
      "d20898_d805d632a8294cc8aa108b727fd73782~mv2.jpg/v1/fill/w_600,h_400,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/d20898_d805d632a8294cc8aa108b727fd73782~mv2.jpg",
    ),
    /** Local free stock photos (Pexels / Unsplash) — one unique image per guide. */
    stayIndependent: "/blog/guide-stay-independent.jpg",
    dayToDay: "/blog/guide-day-to-day.jpg",
    scheduling: "/blog/guide-scheduling.jpg",
    onDemandFamilies: "/blog/guide-on-demand-families.jpg",
    depression: "/blog/guide-depression.jpg",
    afterHospital: "/blog/guide-after-hospital-v2.jpg",
    healthyEating: "/blog/guide-healthy-eating.jpg",
    physicalActivity: "/blog/guide-physical-activity-v2.jpg",
    stayInCommunity: "/blog/guide-stay-in-community-v2.jpg",
    changingLives: "/blog/guide-changing-lives-v2.jpg",
    stayConnected: "/blog/guide-stay-connected-v2.jpg",
  },
  favicon: wix(
    "66ee93_a609c772766f4d4cbdb94b761c1bd596%7Emv2.png/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/66ee93_a609c772766f4d4cbdb94b761c1bd596%7Emv2.png",
  ),
} as const;
