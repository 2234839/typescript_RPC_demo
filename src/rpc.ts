/** ═════════🏳‍🌈 超轻量级的远程调用，完备的类型提示！ 🏳‍🌈═════════  */
import type * as apis from "./apis";
type apis = typeof apis;
type method = keyof apis;

/** Remote call ， 会就近的选择是远程调用还是使用本地函数 */
export function RC<K extends method>(
  method: K,
  data: Parameters<apis[K]>
): Promise<unPromise<ReturnType<apis[K]>>> {
  if (typeof window !== "undefined") {
    return fetch("/rpc", {
      method: "POST",
      body: JSON.stringify({ method, data }),
      headers: {
        "content-type": "application/json"
      }
    }).then((r) => r.json());
  } else {
    //@ts-ignore
    return import("./apis/index").then(async (r: any) => {
      return await r[method](...data);
    });
  }
}

/** 解开 promise 类型包装 */
declare type unPromise<T> = T extends Promise<infer R> ? R : T;

// 示例 1 直接使用 RC

RC("currentTime", []).then((r) => console.log("服务器当前时间", r));
RC("currentTime2", [true]).then((r) => console.log("服务器当前时间本地化", r));

/** 包装了一次的 RC 方便跳转到函数定义  */
export const API = new Proxy(
  {},
  {
    get(target, p: method) {
      return (...arg: any) => RC(p, arg);
    }
  }
) as apisPromiseify;

/** apis 中包含的方法可能不是返回 promise 的，但 RC 调用后的一定是返回 promsie */
type apisPromiseify = {
  readonly [K in keyof apis]: (
    ...arg: Parameters<apis[K]>
  ) => Promise<unPromise<ReturnType<apis[K]>>>;
};

// 示例 2 通过 API 对象调用对应方法，这里的优点是可以直接跳转到对应函数的源码处

API.currentTime().then((r) => console.log("服务器当前时间", r));
API.currentTime2(true).then((r) => console.log("服务器当前时间本地化", r));
