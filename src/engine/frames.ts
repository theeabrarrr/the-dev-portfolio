export type FrameManifest = {
  w: number
  h: number
  count: number
  shots: Array<{ from: number; to: number; box: [number, number, number, number]; cx: number }>
}
