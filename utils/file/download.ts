import * as FileSystem from "expo-file-system";
import { FFmpegKit } from "ffmpeg-kit-react-native";

export const biliCoverImgDownload = async ({
  url,
  fileName,
}: {
  url: string;
  fileName: string;
}) => {
  // if do not have that dir, create it
  const dir = FileSystem.documentDirectory + "cover/";
  if (!(await FileSystem.getInfoAsync(dir)).exists) {
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  }
  const downloadResumable = FileSystem.createDownloadResumable(
    url,
    FileSystem.documentDirectory + "cover/" + fileName + ".jpg",
    {
      headers: {
        Origin: "https://www.bilibili.com",
        Referer: "https://www.bilibili.com",
      },
    }
  );

  const { uri } =
    (await downloadResumable.downloadAsync()) as FileSystem.FileSystemDownloadResult;

  return uri;
};

export const biliVideoDownload = async ({
  url,
  fileName,
  callback,
}: {
  url: string;
  fileName: string;
  callback: (downloadProgress: {
    totalBytesWritten: number;
    totalBytesExpectedToWrite: number;
  }) => void;
}) => {
  const downloadResumable = FileSystem.createDownloadResumable(
    url,
    FileSystem.cacheDirectory + fileName + ".m4s",
    {
      headers: {
        Origin: "https://www.bilibili.com",
        Referer: "https://www.bilibili.com",
      },
    },
    callback
  );

  const { uri } =
    (await downloadResumable.downloadAsync()) as FileSystem.FileSystemDownloadResult;

  // if do not have that dir, create it
  const dir = FileSystem.documentDirectory + "video/";
  if (!(await FileSystem.getInfoAsync(dir)).exists) {
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  }

  const resultUri = FileSystem.documentDirectory + "video/" + fileName + ".mp4";
  await ffmpegToMp3(uri, resultUri);

  return resultUri;
};

const ffmpegToMp3 = async (input: string, output: string) => {
  await FFmpegKit.executeAsync(`-i ${input} -c copy ${output}`, (session) => {
    // CALLED WHEN SESSION IS EXECUTED
    console.log(
      "FFmpeg process started with sessionId " + session.getSessionId()
    );
  });
};
