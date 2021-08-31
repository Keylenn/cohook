import { Draft } from "immer"

export type DraftDataRef<T = any> = Draft<{ current: T }>

export type Updater<T = any> = (draftDataRef: DraftDataRef<T>) => void

export type AnyFn = (...args: any) => any

export type MapStateFn<D> = (data: D) => any

export interface PropEffect {
  trackId: number
  pathId?: number // track Proxy data like: data.xxxx ✔
  hasSubProp: boolean
  triggerHook: AnyFn
}

export type TargetMap = Map<PropertyKey, Set<PropEffect>>

interface PathIdItem {
  updateUpperPropEffectHasSubPropHook: () => void
}
export interface TrackIdItem {
  isDataRefCurrPropEffHasSubPropChanged: boolean
  pathIdMap: Map<number, Set<PathIdItem>>
  clearEffectSet: Set<() => void>
}

export type WrappedDataRef<T> = { current: T }
