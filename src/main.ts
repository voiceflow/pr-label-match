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
    if (typeof PRLabels !== 'undefined') {
      core.info('Running regex match')
      const result: IResult = checkList(PRLabels, re)
      if (result.multiple) {
        core.warning('Multiple matches found for regex')
      }

      // Outputs
      core.setOutput('multiple', result.multiple)
      core.setOutput('label', result.label)
    } else {
      core.info('Skipping match because I am not running in a PR!')
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
