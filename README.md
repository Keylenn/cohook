# cohook

React数据缓存和跨级组件通信的轻量级方案

<table>
  <thead>
    <tr>
      <th colspan="3">🎯 案例🎯</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://codesandbox.io/s/cohook-counter-kef07" rel="nofollow">Counter</a></td>
      <td><a href="https://codesandbox.io/s/cohook-i18n-dgecj" rel="nofollow">I18n</a></td>
      <td><a href="https://codesandbox.io/s/cohook-todos-epl9l" rel="nofollow">Todos</a></td>
    </tr>
  </tbody>
</table>
<br />

## ✨特性
+ 支持数据缓存和共享
+ 支持数据状态化，自动跟踪变化并更新，精准定位作用区间
+ 读写分离，自定义Action去处理数据，灵活化组装实现逻辑复用
+ 轻量，API简单化，类型提示友好
+ 无this，数据不可变
## 📦 安装

```sh
pnpm add cohook
```

```sh
yarn add cohook
```

```sh
npm i cohook
```

## ⚡快速开始

#### 1. 定义一个Container
```tsx
import createContainer from "cohook"

const container = createContainer(0)
```
#### 2. 定义Action
```tsx
const inc = () => container.commit((draft) => void (draft.current += 1)
const dec = () => container.commit((draft) => void (draft.current -= 1)
```

#### 3. 数据状态化和修改

```tsx
function Counter() {
  const count = container.useMapDataToState()
  return (
    <div>
      count:{count}
      <button onClick={inc}>+</button>
      <button onClick={dec}>-</button>
    </div>
  )
}
```
## 💡API

### ```createContainer(initialData)```
createContainer接收初始数据initialData，返回一个容器对象。


### ```container.getData()```
用于获取当前的容器数据，就像是一个内置的action，可在任何地方使用。

### ```container.useMapDataToState(...overloads)```
用于将数据状态化，被状态化后的数据会自动跟踪变化并更新，和React Hooks一样，该API必须在[Function Component](https://reactjs.org/docs/hooks-state.html#hooks-and-function-components)中使用。

+ ```const state = container.useMapDataToState()```
  <p style="margin-bottom: .5em;"></p>

  + 不带参数，直接将data状态化，
  + 容器内任意数据变化时直接更新


+ ```const derivedState = container.useMapDataToState(mapStateFn)```
  <p style="margin-bottom: .5em;"></p>

  + mapStateFn以data作为参数，可自定义返回的需要状态化的数据
  + 容器内对应状态化数据变化时才会更新，精准定位更新区间

### ```container.commit(updater)```
commit 接受一个函数updater（immer中的[produce](https://immerjs.github.io/immer/produce)的第二个参数保持一致）作为参数，用来创建修改数据的Action，可灵活组合容器对象提供的方法来组装Action。
```tsx
/**
 * 1️⃣ Action
 */
const dec = () => {
  const count = container.getData()
  if(count < 0) return
  container.commit((draft) => void (draft.current -= 1)
}

/**
 * 2️⃣ Custom Hooks
 */
function useFilter() {
  const  visibilityFilter = todosContainer.useMapDataToState(data => data.filter)
  const setFilter = (filter: VisibilityFilters) => {
    todosContainer.commit((draft) => {
      draft.current.filter = filter
    })
  }
  
  return {
    filter: visibilityFilter,
    setFilter
  }
}

```

