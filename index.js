

import http from "http"
import fetch from "node-fetch"

const server = http.createServer((req, res) =>{
    const url = req.url
    let tableData = "<table border='1'><tr><th>Name</th><th>Height</th><th>Mass</th><th>Hair Color</th><th>Eye Color</th><th>Birth Year</th></tr>"
    if(url === '/'){
        res.write('<h1>Welcome!</h1>');
        res.write('<img src="https://reskillamericans.org/images/Working_01_hu5ad8091daa575d31c3a849555bf8c607_139470_800x0_resize_box_3.png">'); 
        res.end()
    }
    else if(url === '/list'){
        fetch('https://swapi.dev/api/people/?format=json')
            .then(res => res.json())
            .then(data => {
                createData(data)
                res.write(tableData)
                res.end()
            })
            
    }
    else{
        res.write("Page Not Found")
        res.end()
    }

    function createData(data) {
        data.results.forEach(element => {
            tableData+=`<tr><td>${element.name}</td><td>${element.height}</td><td>${element.mass}</td><td>${element.hair_color}</td><td>${element.eye_color}</td><td>${element.birth_year}</td></tr>`
        });
        tableData+= `</table>`
    }

}).listen(8090,console.log(`Server listening on port 8090`))