import * as core from '@actions/core'
import run from '../debug'
import * as github from '@actions/github'

beforeEach(() => {
  jest.resetModules()
  process.env['INPUT_AMAZING-CREATURE'] = 'person'

  github.context.payload = {
    pusher: {
      name: 'mona',
    },
  }
})

afterEach(() => {
  delete process.env['INPUT_AMAZING-CREATURE']
})

describe('debug action debug messages', () => {
  it('outputs a debug message', async () => {
    const debugMock = jest.spyOn(core, 'debug')
    await run()
    expect(debugMock).toHaveBeenCalledWith('👋 Hello mona! You are an amazing person! 🙌')
  })

  it('does not output debug messages for non-amazing creatures', async () => {
    process.env['INPUT_AMAZING-CREATURE'] = 'mosquito'
    const debugMock = jest.spyOn(core, 'debug')
    const setFailedMock = jest.spyOn(core, 'setFailed')
    await run()
    expect(debugMock).toHaveBeenCalledTimes(0)
    expect(setFailedMock).toHaveBeenCalledWith('Sorry, mosquitos are not amazing 🚫🦟')
  })
})

