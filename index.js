const core = require('@actions/core');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path')

const makeSureFoldersAreCreated = filename => {
    const folders = filename.split(path.sep).slice(0, -1)
    if (folders.length) {
        folders.reduce((last, folder) => {
            const folderPath = last ? last + path.sep + folder : folder
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath)
                console.log(`created folder: ${folderPath}`);
            }
            return folderPath
        },'');
    }
}

try{
    const url = core.getInput('url');
    const file = core.getInput('file');
    console.log(`Fetch data started with`, `url: ${url}`, `file: ${file}`);
    if(!url){
        core.setFailed('url required');
    }
    fetch(url)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            core.setFailed(`fetch to ${url} failed with status: ${response.status}`);
        })
        .then(data => {
            makeSureFoldersAreCreated(file);
            fs.writeFileSync(file, JSON.stringify(data, null, '\t'));
            console.log(`successfully saved data from ${url} to ${file}`);
        });
}catch(error){
    core.setFailed(error.message);
}