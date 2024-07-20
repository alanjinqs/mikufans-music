import { SongDB } from "../db/db";
import { biliFetch } from "./biliFetch";
import { getArtistInfo } from "./userInfo";

export const fetchVideoCollection = async (seasonId: number) => {
  const songList: SongDB[] = [];

  const mid = "0";
  let collectionInfo = null;
  let hasNext = true;
  let page = 1;
  let artistAvatar = "";
  let artistName = "";
  let artistMid = -1;

  while (hasNext) {
    const res = await biliFetch(
      `https://api.bilibili.com/x/polymer/web-space/seasons_archives_list?mid=${mid}&season_id=${seasonId}&page_num=${page}&page_size=20`
    );
    const json = await res.json();
    hasNext =
      json.data.meta.total > json.data.meta.page * json.data.meta.pagesize;

    if (!collectionInfo) {
      collectionInfo = json.data.meta;
      artistMid = json.data.meta.mid;
      const artistInfo = await getArtistInfo(artistMid);
      artistAvatar = artistInfo.data.face.replace("http://", "https://");
      artistName = artistInfo.data.name;
    }

    for (const media of json.data.archives) {
      songList.push({
        bvid: media.bvid,
        title: media.title,
        artwork: media.pic.replace("http://", "https://"),
        id: media.aid,
        cid: null,
        artistMid,
        artistName,
        artistAvatar,
        addedAt: new Date(),
        color: "#9897E1",
        qqMusicMid: null,
        lyrics: null,
        translatedLyrics: null,
        lyricsOffset: null,
        downloadedMp3Duration: null,
        downloadedMp3Path: null,
        downloadedCoverPath: null,
      });
    }
    page += 1;
  }

  return { songList, collectionInfo };
};
