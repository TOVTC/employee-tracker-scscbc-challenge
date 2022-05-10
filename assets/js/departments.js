const path = require("path");
const fetch = require("node-fetch");

// still to edit - also I know this is for Web APIs, but node-fetch is not the way to gooo

const viewAllDept = () => {
    fetch("/departments"), {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    }
    .then(res => {
        console.log(res);
    })
}

module.exports = {
    viewAllDept
}