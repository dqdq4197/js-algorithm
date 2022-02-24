const API_PREFIX =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

const cache = {};

export async function request(nodeId) {
  const url = `${API_PREFIX}/${nodeId ? nodeId : ""}`;
  if (cache[url]) {
    return cache[url];
  }
  try {
    const data = await fetch(url);

    if (!data.ok) {
      throw new Error("서버가 이상합니다.");
    }

    const parsingData = await data.json();
    cache[url] = parsingData;

    return parsingData;
  } catch (e) {
    throw new Error(`Error 발생! ${e}`);
  }
}
