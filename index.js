const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');
const fs = require('fs');

try{
    const url = core.getInput('url');
    const file = core.getInput('file');
    const success = fetch(url)
        .then(response => response.json())
        .then(data => {
            fs.writeFileSync(file, data);
        });
    if(!success){
        core.setFailed('fetch failed');
    }
}catch(error){
    core.setFailed(error.message);
}