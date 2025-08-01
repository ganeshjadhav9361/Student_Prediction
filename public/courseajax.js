let searchCourse = (str) => {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let jsonObj = JSON.parse(this.responseText);

            let tableBody = document.getElementById("tblCourseBody");
            tableBody.innerHTML = "";

            jsonObj.forEach((element, index) => {
                let row = document.createElement("tr");

                let col = document.createElement("td");
                col.innerHTML = index + 1;
                row.appendChild(col);

                col = document.createElement("td");
                col.innerHTML = element.id;
                row.appendChild(col);

                col = document.createElement("td");
                col.innerHTML = element.name;
                row.appendChild(col);

                col = document.createElement("td");
                col.innerHTML = '<button class="btn btn-danger btn-sm">Delete</button>';
                row.appendChild(col);

                col = document.createElement("td");
                col.innerHTML = '<button class="btn btn-warning btn-sm">Update</button>';
                row.appendChild(col);

                tableBody.appendChild(row);
            });
        }
    };

    xhttp.open("GET", "/searchCourseByName?name=" + str, true);
    xhttp.send();
}
