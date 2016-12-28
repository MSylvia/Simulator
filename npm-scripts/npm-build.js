var spawn = require('child_process').spawn;

_process('tsc', ['-p ../Simulator']);

function _process(command, args){
    let p  = spawn(command, args);
    p.stdout.on('data', d => console.log(d.toString()));
    p.stderr.on('data', d => console.log(d.toString()));
}