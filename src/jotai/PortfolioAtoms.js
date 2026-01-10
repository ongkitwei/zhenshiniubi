import { atom } from "jotai";

const tickersArrayAtoms = atom([]);
const portfolioNameAtoms = atom("Moomoo Portfolio");
const portfolioLoadingAtoms = atom(false);

export { tickersArrayAtoms, portfolioNameAtoms, portfolioLoadingAtoms };
