const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path')

const makeSureFoldersAreCreated = filename => {
    const folders = filename.split(path.sep).slice(0, -1)
    if (folders.length) {
        folders.reduce((last, folder) => {
            const folderPath = last ? last + path.sep + folder : folder
            console.log('1', folderPath);
            console.log('2', fs.existsSync(folderPath));
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath)
                console.log('3', 'ejje');
            }
            return folderPath
        })
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
            console.log('next')
            fs.writeFileSync(file, data);
            console.log(`successfully saved data from ${url} to ${file}`);
        });
    if(!success){
        core.setFailed('fetch failed');
    }
}catch(error){
    core.setFailed(error.message);
}