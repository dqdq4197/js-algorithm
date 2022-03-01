const API_PREFIX =
  "https://uikt6pohhh.execute-api.ap-northeast-2.amazonaws.com/dev/products";

async function request(productId) {
  try {
    const data = await fetch(
      `${API_PREFIX}${productId ? `/${productId}` : ""}`
    );

    if (!data.ok) {
      throw new Error(`서버에 Error 발생!`);
    }

    return await data.json();
  } catch (e) {
    console.log(e);
    throw new Error(`Error 발생: ${e}`);
  }
}

export default request;
