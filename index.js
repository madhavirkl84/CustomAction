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

    //const GITHUB_TOKEN = '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';// core.getInput('GITHUB_TOKEN');
    //const octokit = github.getOctokit(GITHUB_TOKEN);

    //const MY_TOKEN = core.getInput('MY_TOKEN');
    //console.log(MY_TOKEN);

    //const octokit = github.getOctokit('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');

    //const {context = {}} = github;

    //console.log(context);
    const octokit = new Octokit();

    await octokit.pulls.create({            
        owner: 'madhavirkl84',
        repo: 'CustomActionTest',
        head: 'main',
        base: 'main',
        title: 'My First PR from app'
    }
    );

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