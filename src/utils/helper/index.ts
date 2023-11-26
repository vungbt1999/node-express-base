import { IPaginationReq } from '@types'
import _ from 'lodash'

export type OptionStrGenerate = {
  length?: number
  prefix?: string
  suffix?: string
  upCase?: boolean
  lowerCase?: boolean
}

export const strGenerate = (options?: OptionStrGenerate): string => {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < (options?.length || 10); i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  if (options?.prefix) {
    result = `${options?.prefix}${result}`
  }
  if (options?.suffix) {
    result = `${result}${options?.suffix}`
  }
  if (options?.upCase && !options?.lowerCase) {
    result = result.toUpperCase()
  }
  if (options?.lowerCase && !options?.upCase) {
    result = result.toLowerCase()
  }
  return result
}

export type ObjectMultiDepth = {
  [key: string]:
    | boolean
    | string
    | number
    | ObjectMultiDepth
    | Array<number | string | boolean | ObjectMultiDepth>
}
export type ObjectOneDepth = {
  [key: string]: boolean | string | number | Array<number | string | boolean>
}

export const objectMultiToOneDepth = (data: ObjectMultiDepth, prefix = '') => {
  const dataRaw = { ...data }
  let newData: ObjectOneDepth = {}
  // eslint-disable-next-line guard-for-in
  for (const key in dataRaw) {
    if (typeof dataRaw[key] === 'object') {
      newData = _.merge(
        newData,
        objectMultiToOneDepth(
          dataRaw[key] as ObjectMultiDepth,
          `${prefix}${key}.`,
        ),
      )
    } else {
      newData[`${prefix}${key}`] = dataRaw[key] as ObjectOneDepth['key']
    }
  }
  return newData
}

export const objectOneToMultiDepth = (data: ObjectOneDepth) => {
  const dataRaw = { ...data }
  let newData: ObjectMultiDepth = {}

  function fnHelper(
    keys: string[],
    value: boolean | string | number | Array<number | string | boolean>,
  ) {
    const newObject: ObjectMultiDepth = {}
    if (keys.length > 0) {
      const keyFirst = keys.shift()
      if (keyFirst) {
        if (keys.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          newObject[keyFirst] = fnHelper(keys, value)
        } else {
          newObject[keyFirst] = value
        }
      }
    }
    return newObject
  }
  // eslint-disable-next-line guard-for-in
  for (const key in dataRaw) {
    const keys = key.split('.')
    newData = { ..._.merge(fnHelper(keys, dataRaw[key]), newData) }
  }
  return newData
}

export const sortObjectByKey = (data: ObjectMultiDepth) => {
  const dataRaw = { ...data }
  const newData: ObjectMultiDepth = {}
  _(dataRaw)
    .keys()
    .sort()
    .each(function (key) {
      if (typeof dataRaw[key] === 'object') {
        newData[key] = sortObjectByKey(dataRaw[key] as ObjectMultiDepth)
      } else {
        newData[key] = dataRaw[key]
      }
    })
  return newData
}

export const resPagination = (count: number, pagination: IPaginationReq) => {
  const totalPages = Math.ceil(count / (pagination?.pageSize ?? 10))
  return {
    totalPages,
    count,
  }
}
