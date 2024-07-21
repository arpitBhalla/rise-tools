## Rise Start

> Smoothly start development using file-based model routing.


- [Rise Start](#rise-start)
- [Usage](#usage)
- [Example](#example)
    - [Structure of model](#structure-of-model)
- [More Examples](#more-examples)
  - [`models/index.tsx → /`](#modelsindextsx--)
  - [`models/org/[orgId].tsx → /org/{orgId}`](#modelsorgorgidtsx--orgorgid)
  - [`models/org/[orgId]/index.tsx → /org/{orgId}/`](#modelsorgorgidindextsx--orgorgid)
  - [`models/org/[orgId]/project/[projectId].tsx → /org/{orgId}/project/{projectId}`](#modelsorgorgidprojectprojectidtsx--orgorgidprojectprojectid)



## Usage

```tsx
import { createWSServer, InferModel } from '@rise-tools/server'

const models = createRouter()

createWSServer(models, port)
```

## Example

<table>
<tr>
<td>the file structure
<td>the model object during runtime
<tr>
<td>
<img src='./dir.png'>
<td>

```tsx
const models = {
  org: {
    '': lookup((origId) => ({
      project: lookup((projectId) => ({
        '': () => {},
        member: () => {},
      })),
      projects: () => {},
    })),
    new: () => {},
  },
  profile: lookup((userId) => ({
    account: () => {},
    followers: () => {},
    followings: () => {},
  })),
}
```




</td>
</tr>
</table>


#### Structure of model

```tsx
// models/[userId]/
export const query = createQuery((param) => {
  await db.getUser(param)
})

export default function UserProfileModel({ query, param: userId }) {
  return view((get) => {
    // const ... = get(query)
    return <JSX />
  })
}
```


## More Examples

### `models/index.tsx → /`

```tsx
const models={
  "": () => <JSX/>
}
```


### `models/org/[orgId].tsx → /org/{orgId}`


```tsx
const models = {
  org: lookup((orgId) =>
    view(() => {
      return <JSX />
    })
  ),
}
```


### `models/org/[orgId]/index.tsx → /org/{orgId}/`


```tsx
const models = {
  org: lookup((orgId) => ({
    '': view(() => {
      return <JSX />
    }),
  })),
}
```

### `models/org/[orgId]/project/[projectId].tsx → /org/{orgId}/project/{projectId}`


```tsx
const models = {
  org: lookup((orgId) => {
    return {
      project: lookup((orgId) => {
        return view(() => {
          return <JSX />
        })
      }),
    }
  }),
}
```



