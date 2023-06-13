import type { HttpOptions, HttpResponse } from "@capacitor/core"
import { CapacitorHttp } from "@capacitor/core"
import { installedAsync } from "boot/installed-extension"
import { i18n } from "src/boot/i18n"
import { C_URL, isNative } from "src/constants"

import { base64ToArrayBuffer } from "./base64ToArrayBuffer"

async function getNative(
  url: string | HttpOptions,
  headers?: Record<string, string>
) {
  const response = await (!isNative ? window.Http : CapacitorHttp)
    .get(
      typeof url === "object"
        ? url
        : {
            url: url.includes("://")
              ? url
              : C_URL + url + (!isNative ? "#animevsub-vsub_uafirefox" : ""),
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
              [String.fromCharCode(
                117,
                115,
                101,
                114,
                45,
                97,
                103,
                101,
                110,
                116
              )]: String.fromCharCode(
                77,
                111,
                122,
                105,
                108,
                108,
                97,
                47,
                53,
                46,
                48,
                32,
                40,
                76,
                105,
                110,
                117,
                120,
                59,
                32,
                65,
                110,
                100,
                114,
                111,
                105,
                100,
                32,
                54,
                46,
                48,
                59,
                32,
                78,
                101,
                120,
                117,
                115,
                32,
                53,
                32,
                66,
                117,
                105,
                108,
                100,
                47,
                77,
                82,
                65,
                53,
                56,
                78,
                41,
                32,
                65,
                112,
                112,
                108,
                101,
                87,
                101,
                98,
                75,
                105,
                116,
                47,
                53,
                51,
                55,
                46,
                51,
                54,
                32,
                40,
                75,
                72,
                84,
                77,
                76,
                44,
                32,
                108,
                105,
                107,
                101,
                32,
                71,
                101,
                99,
                107,
                111,
                41,
                32,
                67,
                104,
                114,
                111,
                109,
                101,
                47,
                49,
                49,
                51,
                46,
                48,
                46,
                48,
                46,
                48,
                32,
                77,
                111,
                98,
                105,
                108,
                101,
                32,
                83,
                97,
                102,
                97,
                114,
                105,
                47,
                53,
                51,
                55,
                46,
                51,
                54
              ),
              ...(!isNative && !url.includes("://")
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

async function postNative(
  url: string,
  data: Record<string, string>,
  headers?: Record<string, string>
) {
  const response = await (!isNative ? window.Http : CapacitorHttp).post({
    url: C_URL + url + (!isNative ? "#animevsub-vsub_uafirefox" : ""),
    headers: !isNative
      ? {}
      : {
          [String.fromCharCode(117, 115, 101, 114, 45, 97, 103, 101, 110, 116)]:
            String.fromCharCode(
              77,
              111,
              122,
              105,
              108,
              108,
              97,
              47,
              53,
              46,
              48,
              32,
              40,
              87,
              105,
              110,
              100,
              111,
              119,
              115,
              32,
              78,
              84,
              32,
              49,
              48,
              46,
              48,
              59,
              32,
              87,
              105,
              110,
              54,
              52,
              59,
              32,
              120,
              54,
              52,
              41,
              32,
              65,
              112,
              112,
              108,
              101,
              87,
              101,
              98,
              75,
              105,
              116,
              47,
              53,
              51,
              55,
              46,
              51,
              54,
              32,
              40,
              75,
              72,
              84,
              77,
              76,
              44,
              32,
              108,
              105,
              107,
              101,
              32,
              71,
              101,
              99,
              107,
              111,
              41,
              32,
              67,
              104,
              114,
              111,
              109,
              101,
              47,
              49,
              48,
              53,
              46,
              48,
              46,
              48,
              46,
              48,
              32,
              83,
              97,
              102,
              97,
              114,
              105,
              47,
              53,
              51,
              55,
              46,
              51,
              54
            ),
          "content-type": "application/x-www-form-urlencoded",
          ...(!isNative
            ? {}
            : {
                referer: C_URL,
              }),
          ...headers,
        },
    data: !isNative ? data : new URLSearchParams(data).toString(),
  })

  // eslint-disable-next-line functional/no-throw-statement
  if (response.status !== 200 && response.status !== 201) throw response

  return response
}

async function getPWA<
  ResponseType extends "arraybuffer" | undefined = undefined
>(url: string | GetOptions<ResponseType>, headers?: Record<string, string>) {
  console.log("get: ", url)

  await installedAsync.value

  if (!window.Http)
    // eslint-disable-next-line functional/no-throw-statement
    throw Object.assign(
      new Error(
        i18n.global.t(
          "trang-web-can-extension-animevsub-helper-de-hoat-dong-binh-thuong"
        )
      ),
      { extesionNotExists: true }
    )

  const response = (await window.Http.get(
    typeof url === "object"
      ? url
      : {
          url: url.includes("://")
            ? url
            : C_URL + url + "#animevsub-vsub_uafirefox",
          headers: {
            accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            // "accept-encoding": "deflate, br",F
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

            ...headers,
          },
        }
  ).then((response) => {
    if (response.status === 403 || response.status === 520) {
      console.log("response fail")
    }

    return response
  })) as HttpResponse

  console.log("get-result: ", response)
  // eslint-disable-next-line functional/no-throw-statement
  if (response.status !== 200 && response.status !== 201) throw response

  return response
}

async function postPWA(
  url: string,
  data: Record<string, number | string | boolean>,
  headers?: Record<string, string>
) {
  console.log("post: ", {
    url: C_URL + url,
    data,
    headers,
  })

  await installedAsync.value

  if (!window.Http)
    // eslint-disable-next-line functional/no-throw-statement
    throw Object.assign(
      new Error(
        i18n.global.t(
          "trang-web-can-extension-animevsub-helper-de-hoat-dong-binh-thuong"
        )
      ),
      { extesionNotExists: true }
    )

  const response = (await window.Http.post({
    url: C_URL + url + "#animevsub-vsub_uafirefox",
    headers,
    data,
  })) as HttpResponse

  console.log("post-result: ", response)
  // eslint-disable-next-line functional/no-throw-statement
  if (response.status !== 200 && response.status !== 201) throw response

  return response
}

const get = !isNative ? getPWA : getNative
const post = !isNative ? postPWA : postNative

export { get, post }
