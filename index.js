import fetch from "node-fetch";
import core from '@actions/core';
import github from '@actions/github';
import fs from "fs";
import connected from 'process';
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
    try {
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

        data.forEach(elementCheck => {
            var keys = Object.keys(elementCheck);
            for (let i = 0; i < keys.length; i++) {
                var key = keys[i];
                if(elementCheck[key] <=30){
                console.log(key, " : ", elementCheck[key]);
                 }
                 else{
                   console.log(elementCheck.employee_name); 
                 }
            }
        //console.log(element.key, ", ", element.value);
        });

        //checkFileExistence("README.md");
        //checkFileExistence("LICENSE");
        
    } catch (error) {
        core.setFailed(error.message);
    }
})();