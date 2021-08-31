import { enablePatches, produceWithPatches, setAutoFreeze } from "immer"
import Container from "./Container"
import useTrackState from "./hooks/useTrackState"
import { Updater, MapStateFn, WrappedDataRef } from "./types"

enablePatches()

setAutoFreeze(false)

export default function createContainer<T>(initialData: T) {
  const container = new Container(initialData)

  const getData = () => container.wrappedDataRef.current

  const commit = (updater: Updater<T>) => {
    try {
      const [dataRef, changedPatches] = produceWithPatches(
        container.wrappedDataRef,
        updater
      )
      const nextWrappedDataRef = dataRef as WrappedDataRef<T>

      container.addPendingEffectsByPatches(changedPatches, nextWrappedDataRef)
      container.wrappedDataRef = nextWrappedDataRef
      container.batchTriggerPendingEffects()

      return nextWrappedDataRef.current
    } catch (error) {
      console.error(`Error: `, error)
      return container.wrappedDataRef
    }
  }

  function useMapDataToState(): T
  function useMapDataToState<M extends MapStateFn<T>>(
    mapStateFn: M
  ): ReturnType<M>
  function useMapDataToState(mapStateFn?: any) {
    useTrackState({
      container,
      mapStateFn,
    })
    const data = container.wrappedDataRef.current
    return typeof mapStateFn === "function" ? mapStateFn(data) : data
  }

  return {
    getData,
    commit,
    useMapDataToState,
  }
}
