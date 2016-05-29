
import React from 'react'
import {
  renderIntoDocument
} from 'react-addons-test-utils'
import Perf from 'react-addons-perf'
import expect from 'expect'
import Root from './Root'

console.log('Perf tests')

describe('Perf', () => {
  let root

  it('should not throw', () => {
    expect(() => {
      root = renderIntoDocument(<Root />)
    }).toNotThrow()
  })

  describe('wasted', () => {
    let results

    before((done) => {
      Perf.start()
      const length = 32
      Array.from({ length })
        .map((a, b) => b)
        .forEach(i => {
          if (i % 2) {
            root.setState({
              label: 'Hello ' + i,
              name: 'name ' + i,
              m: i % 4
            })
          }
        })
      done()
    })

    it('should print wasted', () => {
      Perf.stop()
      Perf.printWasted()
      results = Perf.getLastMeasurements()
      expect(results).toExist()
    })
  })
})
