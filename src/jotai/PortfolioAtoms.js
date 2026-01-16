import { atom } from "jotai";

const tickersArrayAtoms = atom([]);
const portfolioNameAtoms = atom("Kit Wei Moomoo Portfolio");
const portfolioLoadingAtoms = atom(false);
const portfolioPieChartDataAtoms = atom();
export {
  tickersArrayAtoms,
  portfolioNameAtoms,
  portfolioLoadingAtoms,
  portfolioPieChartDataAtoms,
};
