import * as React from "react"
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect"
import Container from "../Container"
import { MapStateFn } from "../types"

export default function useTrackState<T>({
  container,
  mapStateFn,
}: {
  container: Container<T>
  mapStateFn: MapStateFn<T>
}) {
  const [, forceRender] = React.useReducer((s) => s + 1, 0)

  useIsomorphicLayoutEffect(() => {
    const res = container.tryToTrackEffect({
      mapFn: mapStateFn,
      effectHook: forceRender,
    })

    return () => {
      if (typeof res?.trackId === "number") container.cleanUpEffect(res.trackId)
    }
  }, [])
}
