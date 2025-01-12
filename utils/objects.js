import { setFeasts } from "./functions.js";

const yearZero = 1678204800757; //Tue 07 Mar 2023 18:00:00 GMT+0200 (South Africa Standard Time);
const msPerDay = 86400000;

const feastsObj = [
  {
    position: "1",
    name: "Passover",
    day: "14",
    month: "Month 1",

    description: `The Israelites were enslaved in Egypt for centuries. 
      God instructed Moses to tell Pharaoh to release the Israelites, 
      but Pharaoh refused. As a result, God sent ten plagues upon Egypt. 
      The tenth and final plague was the death of every firstborn son. 
      To spare the Israelites, God instructed them to mark their doorposts 
      with the blood of a lamb. This marked the Israelites' homes, and the 
      angel of death "passed over" them, sparing their firstborn sons.`,

    url: "https://www.gotquestions.org/what-is-Passover.html",
    modernDate: setFeasts(yearZero, msPerDay, 14),
  },
  {
    position: "2",
    name: "Unleavened Bread",
    day: "15-21",
    month: "Month 1",

    description: `The purpose was to commemorate the Israelites' hasty departure from Egypt, 
      and to remember the hardships they endured during which 
      they didn't have time to let their dough rise.`,

    url: "https://www.gotquestions.org/unleavened-bread.html",
    modernDate: setFeasts(yearZero, msPerDay, 15),
  },
  {
    position: "3",
    name: "First Fruits",
    day: "26",
    month: "Month 1",

    description: `The purpose was to dedicate the first portion of the 
    harvest to God, acknowledging His provision and sovereignty.`,

    url: "https://www.gotquestions.org/firstfruits-offering.html",
    modernDate: setFeasts(yearZero, msPerDay, 26),
  },
  {
    position: "4",
    name: "Feast of Weeks",
    alt_name: "Pentacost",
    day: "15",
    month: "Month 3",

    description: `The purpose was to celebrate the completion of the grain 
    harvest and commemorate the giving of the Torah (God's law) to the Israelites.`,

    url: "https://www.gotquestions.org/Feast-of-Weeks.html",
    modernDate: setFeasts(yearZero, msPerDay, 75),
  },
  {
    position: "5",
    name: "Day of Trumpets",
    day: "1",
    month: "Month 7",

    description: `The Biblical Day of Trumpets, also known as Rosh Hashanah, 
    is described in Leviticus 23:23-25 and Numbers 29:1-6. And it is a time 
    of repentance, reflection, and preparation for the Day of Atonement.
`,

    url: "https://www.gotquestions.org/Feast-of-Trumpets.html",
    modernDate: setFeasts(yearZero, msPerDay, 182),
  },
  {
    position: "6",
    name: "Day of Atonement",
    alt_name: "Yom Kippur",
    day: "9-10",
    month: "Month 7",

    description: `To provide a means for the Israelites to atone for 
    their sins, purify themselves, and reconcile with God. Observed 
    on the 10th day of the seventh month (Tishrei) in the Hebrew calendar.`,

    url: "https://www.gotquestions.org/Day-Atonement-Yom-Kippur.html",
    modernDate: setFeasts(yearZero, msPerDay, 190),
  },
  {
    position: "7",
    name: "Feast of Tabernacles",
    alt_name: "Feast of Booths",
    day: "15-21",
    month: "Month 7",

    description: `To commemorate the Israelites' wilderness journey, 
    where they lived in temporary shelters (sukkot), and to express 
    gratitude for God's provision and protection. Observed for 7 days 
    (8 days outside Israel), starting on the 15th day of the seventh 
    month (Tishrei) in the Hebrew calendar.`,

    url: "https://www.gotquestions.org/Feast-of-Tabernacles.html",
    modernDate: setFeasts(yearZero, msPerDay, 196),
  },
];

export { feastsObj };