import * as apis from "../apis";

export async function post(req: any, res: any) {
  // console.log(req, req.params, req.query);
  const data = [] as any[];
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
