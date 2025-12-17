export type Article = {
  title: string;
  url: string;
};

export const ARTICLES: Article[] = [
  {
    title: 'Programmable Privacy: The Next Multi-Billion Dollar Infrastructure Layer',
    url: 'https://a1research.io/blog/programmable-privacy-the-next-multi-billion-dollar-infrastructure-layer',
  },
  {
    title: 'Privacy 2.0: The Present State of the Programmable Privacy Stack',
    url: 'https://www.archetype.fund/media/privacy-2-0-the-present-state-of-the-programmable-privacy-stack',
  },
  {
    title: '6 Myths About Privacy Blockchains',
    url: 'https://a16zcrypto.com/posts/article/6-myths-privacy-blockchains/',
  },
  {
    title: 'The Four Levels of Blockchain Privacy',
    url: 'https://www.inco.org/blog/the-four-levels-of-blockchain-privacy',
  },
  {
    title: 'TEE and FHE Comparison',
    url: 'https://www.inco.org/blog/tee-fhe-comparison',
  },
  {
    title: 'Privacy is Web3s 0 to 1 Moment',
    url: 'https://hackernoon.com/privacy-is-web3s-0-to-1-moment',
  },
  {
    title: 'The Significance of Privacy in Web3',
    url: 'https://cointelegraph.com/learn/articles/the-significance-of-privacy-in-web3',
  },
  {
    title: 'Vitalik on Privacy',
    url: 'https://vitalik.eth.limo/general/2025/04/14/privacy.html',
  },
  {
    title: 'Privacy - Ethereum.org',
    url: 'https://ethereum.org/privacy/',
  },
];

export function getRandomArticle(): Article {
  return ARTICLES[Math.floor(Math.random() * ARTICLES.length)];
}
