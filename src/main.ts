/* eslint-disable @typescript-eslint/camelcase */
import * as core from '@actions/core'
import * as github from '@actions/github'
import {checkList, IResult} from './matcher'

async function run(): Promise<void> {
  try {
    // Input
    const re = new RegExp(core.getInput('regex'))

    // Regex check
    const PRLabels = github?.context?.payload?.pull_request?.labels
    const result: IResult = checkList(PRLabels, re)

    // Outputs
    core.setOutput('multiple', result.multiple)
    core.setOutput('label', result.label)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
