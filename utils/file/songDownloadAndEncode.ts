import { SongCardItem } from "@/components/song/SongCard";
import { biliCoverImgDownload, biliVideoDownload } from "./download";
import {
  addSongDownloadedCoverPath,
  addSongDownloadedPath,
  cidBvToSong,
} from "../db/song";
import { getBiliBsetAudioDash } from "../bili/biliVideo";
import { mmkvStorage } from "../storage/storage";
import { bv2Cid } from "../bili/avBvCid";
import { db, schema } from "../db/db";
import { eq } from "drizzle-orm";

export const songDownloadAndEncode = async ({
  song,
}: {
  song: SongCardItem;
}) => {
  console.log("songDownloadAndEncode", song);
  if (!song.bvid) return;
  if (!song.cid) {
    const [{ cid }] = await bv2Cid(song.bvid);
    song.cid = cid;

    const originalSong = await db.query.song.findFirst({
      where: eq(schema.song.bvid, song.bvid),
    });

    if (!originalSong) {
      await cidBvToSong(cid, song.bvid);
    } else {
      db.update(schema.song)
        .set({ cid })
        .where(eq(schema.song.id, originalSong.id));
    }
  }
  biliCoverImgDownload({
    url: song.artwork + "@500w",
    fileName: `${song.bvid}_cover`,
  }).then((path) => {
    addSongDownloadedCoverPath(path, song.id);
  });

  let downloadingTask: { [key: string]: boolean } = {};
  const downloadingTaskStr = mmkvStorage.getString("isDownloading");
  if (downloadingTaskStr) {
    downloadingTask = JSON.parse(downloadingTaskStr);
  }
  downloadingTask[song.bvid] = true;
  mmkvStorage.set("isDownloading", JSON.stringify(downloadingTask));

  getBiliBsetAudioDash(song.cid, song.bvid).then((dash) => {
    console.log(dash.id);

    biliVideoDownload({
      url: dash.base_url,
      fileName: `${song.bvid}_${song.cid}`,
      isFlac: dash.id == 30251,
      callback: (res) => {
        console.log(res);
        mmkvStorage.set(
          `download_${song.bvid}`,
          JSON.stringify({
            status: "downloading",
            progress: {
              totalBytesWritten: res.totalBytesWritten,
              totalBytesExpectedToWrite: res.totalBytesExpectedToWrite,
            },
          })
        );
      },
    })
      .then((path) => {
        addSongDownloadedPath(path, song.id, dash.duration);
        mmkvStorage.set(
          `download_${song.bvid}`,
          JSON.stringify({
            status: "done",
          })
        );
        const downloadingTaskStr = mmkvStorage.getString("isDownloading");
        if (downloadingTaskStr) {
          downloadingTask = JSON.parse(downloadingTaskStr);
        }
        downloadingTask[song.bvid || ""] = false;
        mmkvStorage.set("isDownloading", JSON.stringify(downloadingTask));
      })
      .catch((e) => {
        mmkvStorage.set(
          `download_${song.bvid}`,
          JSON.stringify({
            status: "error",
          })
        );
      });
  });
};
