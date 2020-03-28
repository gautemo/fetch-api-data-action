const core = require('@actions/core');
const github = require('@actions/github');

try{
    const file = core.getInput('file');
    console.log(`file: ${file}`);
}catch(error){
    core.setFailed(error.message);
}