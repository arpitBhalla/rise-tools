// import { lookup } from '@rise-tools/server'
// // import chokidar from 'chokidar'

// // export const WATCH_PATH = '../router'
// // export const IGNORED_PATH = ['**/_*']

// // async function start() {
// //   const watcher = chokidar.watch(WATCH_PATH, {
// //     persistent: true,
// //     followSymlinks: true,
// //     ignored: IGNORED_PATH,
// //   })

// //   const models: any[] = []

// //   await new Promise((resolve) =>
// //     watcher
// //       .on('add', (path) => {
// //         const key = path.replace(WATCH_PATH, '')

// //         models.push({ key, model: require(path) })
// //       })
// //       .on('ready', () => {
// //         resolve('')
// //       })
// //   )
// //   console.log(models)
// // }

// const paths: PathModel[] = [
//   { key: 'profile/[userId]/account.tsx', model: {} }, // profile.account
//   { key: 'profile/[userId]/followers.tsx', model: {} }, // profile.followers
//   { key: 'profile/[userId]/followings.tsx', model: {} }, // profile.followings
//   { key: 'org/new.tsx', model: {} }, // org/new
//   { key: 'org/[orgId]/projects.tsx', model: {} }, // org.projects
//   { key: 'org/[orgId]/project/[projectId]/info.tsx', model: {} }, // org.project.info
//   { key: 'org/[orgId]/project/[projectId]/member.tsx', model: {} }, // org.project.member
// ]

// const SLUG = /\[.+?\]/g

// function convertPathToObjectFormat(path: string): string {
//   if (/\[[^\]]+\]/.test(path)) {
//     let cleanedPath = path.replace(/\.[^/.]+$/, '')
//     cleanedPath = cleanedPath.replace(/\[[^\]]+\]/g, '')
//     const parts = cleanedPath.split('/').filter((part) => part !== '')
//     return parts.join('.')
//   } else {
//     return path.replace(/\.[^/.]+$/, '') // Remove file extension if it exists
//   }
// }

// function buildModelsObject(entries: ModelEntry[]): any {
//   const models: any = {}

//   entries.forEach((entry) => {
//     const formattedKey = convertPathToObjectFormat(entry.key)

//     if (formattedKey.includes('.')) {
//       const keys = formattedKey.split('.')
//       let currentLevel = models

//       keys.forEach((key, index) => {
//         if (index === keys.length - 1) {
//           currentLevel[key] = entry.model
//         } else {
//           if (!currentLevel[key]) {
//             currentLevel[key] = {}
//           }
//           currentLevel = currentLevel[key]
//         }
//       })
//     } else {
//       models[formattedKey] = entry.model
//     }
//   })

//   return models
// }

// // Example usage:
const entries = [
  { key: 'profile/[userId]/account.tsx', model: {} },
  { key: 'profile/[userId]/followers.tsx', model: {} },
  { key: 'profile/[userId]/followings.tsx', model: {} },
  { key: 'org/new.tsx', model: {} },
  { key: 'org/[orgId]/projects.tsx', model: {} },
  { key: 'org/[orgId]/project/[projectId]/info.tsx', model: {} },
  { key: 'org/[orgId]/project/[projectId]/member.tsx', model: {} },
] as const

// const models = buildModelsObject(entries)
// console.log(models)

const r = entries.map((e) => e.key)

type R = (typeof r)[0]

export type SingleRoutePart<S extends string> = S extends `${string}/${string}`
  ? never
  : S extends ''
    ? never
    : S extends `[${string}]`
      ? never
      : S

type IsParameter<Part> = Part extends `[${infer ParamName}]` ? ParamName : never

type ParameterNames<Path> = Path extends `${infer PartA}/${infer PartB}`
  ? PartA extends '.' // Skip relative paths
    ? ParameterNames<PartB>
    : IsParameter<PartA> | ParameterNames<PartB>
  : IsParameter<Path>

export type StrictRouteParamsInputs<Path> = {
  [Key in ParameterNames<Path> as Key extends `...${infer Name}`
    ? Name
    : Key]: Key extends `...${string}` ? (string | number)[] : string | number
}

export const s: R = 'org/[orgId]/project/[projectId]/member.tsx'

export const sa: StrictRouteParamsInputs<typeof s> = { orgId: '', projectId: '' }
