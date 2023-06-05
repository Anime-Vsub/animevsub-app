import type { PhimIdChapReturns } from "src/apis/types/phim/[id]/[chap]"

export interface Season {
  name: string
  value: string
}

export type ProgressWatchStore = Map<
  string,
  | {
      status: "pending"
    }
  | {
      status: "success"
      response: Map<
        string,
        {
          cur: number
          dur: number
        }
      > | null
    }
  | {
      status: "error"
      error: Error
    }
  | {
      status: "queue"
    }
>

export interface ResponseDataSeasonPending {
  status: "pending"
}
export interface ResponseDataSeasonSuccess<PropsGetStreams> {
  status: "success"
  response:PhimIdChapReturns<PropsGetStreams> & {
    ssSibs?: Season[]
  }
}
export interface ResponseDataSeasonError {
  status: "error"
  response: {
    status: number
  }
}

export interface ConfigPlayer {
  readonly link: {
    readonly file: string
    readonly label?: "HD" | "FHD" | `${720 | 360 | 340}p`
    readonly preload?: string
    readonly type:
      | "hls"
      | "aac"
      | "f4a"
      | "mp4"
      | "f4v"
      | "m3u"
      | "m4v"
      | "mov"
      | "mp3"
      | "mpeg"
      | "oga"
      | "ogg"
      | "ogv"
      | "vorbis"
      | "webm"
      | "youtube"
  }[]
  readonly playTech: "api" | "trailer"
}
