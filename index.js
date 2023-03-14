import fetch from "node-fetch";
import core from '@actions/core';
import github from '@actions/github';
import fs from "fs";
import connected from 'process';
import { Console } from "console";
import { Octokit } from "@octokit/rest";
//const core = require('@actions/core');
//const github = require('@actions/github');
//const fs = require("fs");
//const { connected } = require('process');

async function checkFileExistence(path) {
    return fs.promises.access(path, fs.constants.F_OK)
    .then(() => {
        core.info(`${path} exists`);
        return true;
    })
    .catch(() => {
        core.setFailed(`${path} does not exist`);
        return false;
    });
  }

(async () => {

    //const GITHUB_TOKEN = '';// core.getInput('GITHUB_TOKEN');
    //const octokit = github.getOctokit(GITHUB_TOKEN);

    const MY_TOKEN = core.getInput('MY_TOKEN');
    //console.log(MY_TOKEN);

    //const octokit = github.getOctokit('');

    //const {context = {}} = github;

    //console.log(context);
    try {
        //const octokit = new Octokit();
        const octokit = new Octokit({
            auth: core.getInput('MY_TOKEN')
          });

        const response = await octokit.pulls.get({
            owner: 'madhavirkl84',
            repo: 'CustomAction',
            pull_number: 1
        }); 
        console.log(response);

        let response2 = await octokit.request('POST /repos/madhavirkl84/CustomAction/pulls', {
            owner: 'madhavirkl84',
            repo: 'CustomAction',
            title: 'My first pull request using the API',
            body: 'This is simply a pull request for demo purposes',
            head: 'madhavirkl84-patch-1',
            base: 'main'
          }); 
          
          console.log(response);
        /*
        await octokit.pulls.create({            
            owner: 'madhavirkl84',
            repo: 'CustomAction',
            title: 'Amazing new feature',
            body: 'Please pull these awesome changes in!',
            head: 'CustomAction:madhavirkl84-patch-1',
            base: 'main'
        }
        );*/
    
    } catch(error) {
        console.log(error);
    }

    try {
        //await github.context.

        const url = "https://dummy.restapiexample.com/api/v1/employees";
        const response = await fetch(url);
        const {status, data, message} = await response.json();
        console.log(status);
        console.log(message);
        console.log(data[0].employee_name);
        data.forEach(element => {
            var keys = Object.keys(element);
            for (let i = 0; i < keys.length; i++) {
                var key = keys[i];
                console.log(key, " : ", element[key]);
            }
        //console.log(element.key, ", ", element.value);
        });

        console.log("Employee Details");
        data.forEach(employee => {
            var keys = Object.keys(employee);

            if(employee["employee_age"] <=30){
                for (let i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    console.log(key, " : ", employee[key]);
                }
            } else {
                console.log("Name :",employee.employee_name);
            }
        //console.log(element.key, ", ", element.value);
        });

        //checkFileExistence("README.md");
        checkFileExistence("newTest");
        //checkFileExistence("LICENSE");
        
    } catch (error) {
        console.log("Please review it with QM Team");
        core.setFailed(error.message);
    }
})();