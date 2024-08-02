export type SearchResult = {
  aid: number;
  artistName: string;
  artistMid: string;
  artistAvatar?: string;
  typeId?: string;
  bvid: string;
  title: string;
  description?: string;
  artwork: string;
  play?: number;
  danmu?: number;
  favorite?: number;
  like?: number;
  tag?: string;
  publishedAt: string;
  duration: string;
};