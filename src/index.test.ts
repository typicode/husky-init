import { strict as assert } from 'assert'
import { PackageJson } from 'type-fest'

import { updatePkg } from './index.js'

export function TestUpdatePkg(): void {
  const pkg: PackageJson = {
    scripts: {},
  }
  const actual = updatePkg(pkg, false)
  const expected = {
    scripts: {
      prepare: 'husky install',
    },
    devDependencies: {
      husky: '^8.0.0',
    },
  }
  assert.deepEqual(actual, expected)
}

export function TestUpdatePkg_Yarn2(): void {
  const pkg: PackageJson = {
    scripts: {},
  }
  const actual = updatePkg(pkg, true)
  const expected = {
    scripts: {
      postinstall: 'husky install',
      prepack: 'pinst --disable',
      postpack: 'pinst --enable',
    },
    devDependencies: {
      husky: '^8.0.0',
      pinst: '^3.0.0',
    },
  }
  assert.deepEqual(actual, expected)
}
