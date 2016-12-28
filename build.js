var spawn = require('child_process').spawn;

_process('tsc', ['-w']);
_process('watchify', ['./build/main.js', '-o', 'app.bundle.js']);
_process('http-server', ['-o', '-c-1']);

function _process(command, args){
    let p  = spawn(command, args);
    p.stdout.on('data', d => console.log(d.toString()));
    p.stderr.on('data', d => console.log(d.toString()));
}