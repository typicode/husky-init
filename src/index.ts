import { PackageJson } from 'type-fest'

function appendScript(pkg: PackageJson, scriptName: string, cmd: string) {
  pkg.scripts ||= {}
  if (pkg.scripts[scriptName] !== undefined) {
    if (pkg.scripts[scriptName].includes(cmd)) {
      console.log(
        `  "${cmd}" command already exists in ${scriptName} script, skipping.`,
      )
    } else {
      console.log(`  appending "${cmd}" command to ${scriptName} script`)
      pkg.scripts[scriptName] += ` && ${cmd}`
    }
  } else {
    console.log(`  setting ${scriptName} script to command "${cmd}"`)
    pkg.scripts[scriptName] = cmd
  }
}

export function updatePkg(pkg: PackageJson, isYarn2: boolean): PackageJson {
  pkg.devDependencies ||= {}
  pkg.devDependencies.husky = '^8.0.3'
  if (isYarn2) {
    pkg.scripts ||= {}
    appendScript(pkg, 'postinstall', 'husky install')
    if (pkg.private !== true) {
      appendScript(pkg, 'prepack', 'pinst --disable')
      appendScript(pkg, 'postpack', 'pinst --enable')
      pkg.devDependencies.pinst = '^3.0.0'
    }
  } else {
    pkg.scripts ||= {}
    appendScript(pkg, 'prepare', 'husky install')
  }

  return pkg
}
