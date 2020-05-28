export interface IResult {
  multiple: boolean
  label: string
}

// An object with a name field
interface IName {
  name: string
}

export function checkList(list: IName[], re: RegExp): IResult {
  let matched = false
  let multiple = false
  let label = ''

  for (const element of list) {
    if (re.test(element.name)) {
      if (matched) {
        multiple = true
        break
      } else {
        matched = true
        label = element.name
      }
    }
  }
  return {
    multiple,
    label
  }
}
