/*
  # Create articles table for privacy resources

  1. New Tables
    - `articles`
      - `id` (uuid, primary key)
      - `title` (text) - article title
      - `url` (text) - article URL
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `articles` table
    - Add policy for public read access (articles are public content)
*/

CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  url text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read articles"
  ON articles
  FOR SELECT
  TO public
  USING (true);

INSERT INTO articles (title, url) VALUES
  ('Programmable Privacy: The Next Multi-Billion Dollar Infrastructure Layer', 'https://a1research.io/blog/programmable-privacy-the-next-multi-billion-dollar-infrastructure-layer'),
  ('Privacy 2.0: The Present State of the Programmable Privacy Stack', 'https://www.archetype.fund/media/privacy-2-0-the-present-state-of-the-programmable-privacy-stack'),
  ('6 Myths About Privacy Blockchains', 'https://a16zcrypto.com/posts/article/6-myths-privacy-blockchains/'),
  ('The Four Levels of Blockchain Privacy', 'https://www.inco.org/blog/the-four-levels-of-blockchain-privacy'),
  ('TEE and FHE Comparison', 'https://www.inco.org/blog/tee-fhe-comparison'),
  ('Privacy is Web3s 0 to 1 Moment', 'https://hackernoon.com/privacy-is-web3s-0-to-1-moment'),
  ('The Significance of Privacy in Web3', 'https://cointelegraph.com/learn/articles/the-significance-of-privacy-in-web3'),
  ('Vitalik on Privacy', 'https://vitalik.eth.limo/general/2025/04/14/privacy.html'),
  ('Privacy - Ethereum.org', 'https://ethereum.org/privacy/')
ON CONFLICT (url) DO NOTHING;
