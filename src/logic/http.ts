import type { HttpOptions, HttpResponse } from "@capacitor/core"
import { CapacitorHttp } from "@capacitor/core"
import { C_URL } from "src/constants"

import { base64ToArrayBuffer } from "./base64ToArrayBuffer"

const isSpa = process.env.MODE === "spa"

export async function get(
  url: string | HttpOptions,
  headers?: Record<string, string>
) {
  const response = await (isSpa ? window.Http : CapacitorHttp)
    .get(
      typeof url === "object"
        ? url
        : {
            url: url.includes("://")
              ? url
              : C_URL + url + (isSpa ? "#animevsub-vsub" : ""),
            headers: {
              accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
              // "accept-encoding": "deflate, br",
              "accept-language": "vi-VN,vi;q=0.9,en;q=0.8,ja;q=0.7",
              "cache-control": "max-age=0",
              dnt: "1",
              "sec-ch-ua":
                '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "Windows",
              "sec-fetch-dest": "document",
              "sec-fetch-mode": "navigate",
              "sec-fetch-site": "none",
              "sec-fetch-user": "?1",
              "sec-gpc": "1",
              "upgrade-insecure-requests": "1",
              "user-agent":
                "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Mobile Safari/537.36",
              ...(isSpa && !url.includes("://")
                ? {}
                : {
                    referer: C_URL,
                  }),
              ...headers,
            },
          }
    )
    .then((response) => {
      if (response.status === 403 || response.status === 520) {
        console.log("response fail")
      }

      return response
    })

  // eslint-disable-next-line functional/no-throw-statement
  if (response.status !== 200 && response.status !== 201) throw response

  if (typeof url !== "string" && url.responseType === "arraybuffer")
    response.data =
      typeof response.data === "object"
        ? response.data
        : base64ToArrayBuffer(response.data)
  return response as HttpResponse
}

export async function post(
  url: string,
  data: Record<string, string>,
  headers?: Record<string, string>
) {
  const response = await (isSpa ? window.Http : CapacitorHttp).post({
    url: url.startsWith("https://")
      ? url
      : C_URL + url + (isSpa ? "#animevsub-vsub" : ""),
    headers: {...isSpa
      ? {}
      : {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
          "content-type": "application/x-www-form-urlencoded",
          ...(isSpa
            ? {}
            : {
                referer: C_URL,
              }),
        },
          ...headers,
      },
    data: isSpa ? data : new URLSearchParams(data).toString(),
  })

  // eslint-disable-next-line functional/no-throw-statement
  if (response.status !== 200 && response.status !== 201) throw response

  return response
}
