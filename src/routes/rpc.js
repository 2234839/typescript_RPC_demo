// 这个模板项目居然没有加载 rpc.ts 所以在这里用js写一份
import * as apis from "../apis";

export async function post(req, res) {
  // console.log(req, req.params, req.query);
  const data = [];
  req.on("data", function (chunk) {
    data.push(chunk);
  });
  req.on("end", async () => {
    const { method, data: _data } = JSON.parse(data.join(""));
    const result = await apis[method](..._data);
    res.writeHead(200, {
      "Content-Type": "application/json"
    });
    res.end(JSON.stringify(result));
  });
}
