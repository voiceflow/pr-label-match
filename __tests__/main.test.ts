import {IResult, checkList} from '../src/matcher'
import * as path from 'path'

test('Matches single string', async () => {
  const input = [{name: 'env-adjective-noun'}]
  const re = new RegExp('env-')

  const result: IResult = checkList(input, re)

  expect(result.label).toEqual('env-adjective-noun')
  expect(result.multiple).toStrictEqual(false)
})

test('Matches multiple strings', async () => {
  const input = [{name: 'env-adjective1-noun1'}, {name: 'env-adjective2-noun2'}]
  const re = new RegExp('env-')

  const result: IResult = checkList(input, re)

  expect(result.label).toEqual('env-adjective1-noun1')
  expect(result.multiple).toStrictEqual(true)
})

test('Handle no matches correctly', async () => {
  const input = [{name: 'something'}, {name: 'else'}]
  const re = new RegExp('env-')

  const result: IResult = checkList(input, re)

  expect(result.label).toEqual('')
  expect(result.multiple).toStrictEqual(false)
})

test('Handles matches correctly', async () => {
  const input = [
    {name: 'something'},
    {name: 'else'},
    {name: 'env-adjective-noun'}
  ]
  const re = new RegExp('env-')

  const result: IResult = checkList(input, re)

  expect(result.label).toEqual('env-adjective-noun')
  expect(result.multiple).toStrictEqual(false)
})
