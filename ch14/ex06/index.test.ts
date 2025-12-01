import { makeProxyAndLogs } from "./index.ts";

test("makeProxyAndLogs Test", () => {
  const a = {
    p: 1,
    f: (x: number, y: number) => {
      return x + y;
    },
  };
    const [proxy, logs] = makeProxyAndLogs(a);
    expect(logs).toStrictEqual([]);
    expect(proxy.p).toBe(1);
    expect(proxy.f(1, 2)).toBe(3);
    expect(logs.length).toBe(1);
    expect(logs[0].name).toBe("f");
    expect(logs[0].args).toStrictEqual([1, 2]);
    expect(typeof logs[0].timestamp).toBe("number");
});