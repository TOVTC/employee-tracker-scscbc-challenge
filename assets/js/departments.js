const path = require("path");

const viewAllDept = () => {
    fetch("/departments"), {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body:JSON.stringify(zookeeperObj)
    }
    .then(res => {
        console.log(res);
    })
}

module.exports = {
    viewAllDept
}