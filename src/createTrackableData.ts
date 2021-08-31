interface Option<T> {
  proxies: any[]
  getHook: ({ target, prop }: { target: T; prop: PropertyKey }) => void
}

export default function createTrackableData<T extends object>(
  target: T,
  option: Option<T>
) {
  const { proxies, getHook } = option
  const handler = {
    get: (obj: object, prop: PropertyKey) => {
      const value = Reflect.get(obj, prop)
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        getHook?.({
          target,
          prop,
        })
        return typeof value === "object" && value !== null
          ? createTrackableData<typeof value>(value, option)
          : value
      }
      return value
    },
  }
  const revocable: any = Proxy.revocable<T>(target, handler)
  proxies?.push(revocable)
  return revocable.proxy
}
