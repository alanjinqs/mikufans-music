export type QQMusicSong = {
  mid: string;
  title: string;
  subtitle: string;
  singer: string;
};

export const qqMusicSearchSong = async (keyword: string) => {
  const data = {
    comm: {
      ct: "19",
      cv: "1859",
      uin: "0",
    },
    req: {
      method: "DoSearchForQQMusicDesktop",
      module: "music.search.SearchCgiService",
      param: {
        grp: 1,
        num_per_page: 10,
        page_num: 1,
        query: keyword,
        search_type: 0,
      },
    },
  };

  const request: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const res = await fetch("https://u.y.qq.com/cgi-bin/musicu.fcg", request);
  const json = await res.json();
  const songs: QQMusicSong[] = json.req.data.body.song.list.map((song: any) => {
    return {
      mid: song.mid,
      title: song.title,
      subtitle: song.subtitle,
      singer: song.singer.map((singer: any) => singer.name).join(", "),
    };
  });
  return songs;
};

export const qqMusicMidToLrc = async (mid: string) => {
  const url = `https://i.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?songmid=${mid}&g_tk=5381&format=json&inCharset=utf8&outCharset=utf-8&nobase64=1`;
  const res = await fetch(url, {
    headers: {
      Referer: "https://y.qq.com/",
    },
  });
  const json = await res.json();

  return {
    lyric: json.lyric,
    transLyric: json.trans,
  };
};
