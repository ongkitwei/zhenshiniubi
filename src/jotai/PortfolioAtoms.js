import { atom } from "jotai";

const tickersArrayAtoms = atom([]);
const portfolioNameAtoms = atom("Moomoo Portfolio");
const portfolioLoadingAtoms = atom(false);
const portfolioPieChartDataAtoms = atom();
export {
  tickersArrayAtoms,
  portfolioNameAtoms,
  portfolioLoadingAtoms,
  portfolioPieChartDataAtoms,
};
