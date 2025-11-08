const spawn = require('cross-spawn')
const os = require('os')
const fs = require('fs')
const path = require('path')

function runCommand(cmd, args, cwd) {
    const result = spawn.sync(cmd, args, { stdio: 'inherit', cwd })
    if (result.status !== 0) {
        throw new Error(`Command failed: ${cmd} ${args.join(' ')}`)
    }
}

try {
    console.log('📦 Building frontend...')
    runCommand('npm', ['install'], '../frontend')
    runCommand('npm', ['run', 'build'], '../frontend')

    console.log('📂 Copying frontend build to wwwroot...')
    const wwwrootPath = path.join('./TestHub.Api', 'wwwroot')

    if (fs.existsSync(wwwrootPath)) {
        if (os.platform() === 'win32') {
            runCommand('cmd', ['/c', 'rmdir', '/s', '/q', wwwrootPath], process.cwd())
        } else {
            runCommand('rm', ['-rf', wwwrootPath], process.cwd())
        }
    }

    fs.mkdirSync(wwwrootPath, { recursive: true })

    if (os.platform() === 'win32') {
        runCommand('cmd', ['/c', 'xcopy', '..\\frontend\\dist', wwwrootPath, '/E', '/I', '/Y'], process.cwd())
    } else {
        runCommand('cp', ['-r', '../frontend/dist/*', wwwrootPath + '/'], process.cwd())
    }

    console.log('🚀 Starting backend (prod local)...')
    runCommand('dotnet', ['run'], './TestHub.Api')

} catch (err) {
    console.error('❌ Error:', err)
    process.exit(1)
}
