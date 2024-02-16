function fetchEmployees() {
  fetch("http://localhost:3000/api/v1/employee")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("dataTable");
      tableBody.innerHTML = "";
      const list = data.data;
      list.forEach((item) => {
        const row = document.createElement("tr");
        const idCell = document.createElement("td");
        idCell.textContent = item.id;
        row.appendChild(idCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn", "btn-danger", "btn-sm");

        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell);

        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error(error));
}

// TODO
// add event listener to submit button
document
  .getElementById("SubmitButton")
  .addEventListener("click", createEmployee);

// TODO
// add event listener to delete button
document.getElementById("dataTable").addEventListener("click", function(event) {
  if (event.target.tagName === "BUTTON" && event.target.textContent === "Delete") {
    const row = event.target.parentNode.parentNode;
    // const id = row.querySelector("td:first-child").textContent;
    deleteEmployee(row);
  }
});

// TODO
function createEmployee() {
  // get data from input field
  const name = document.getElementById("name").value;
  const id = document.getElementById("id").value;
  const employee = { id, name };
  // send data to BE
  if (name && id) {
    fetch("http://localhost:3000/api/v1/employee", {
      method: "POST",
      body: JSON.stringify(employee),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  } else {
    alert("Please enter both your name and id");
  }
  // call fetchEmployees
  fetchEmployees();
}

// TODO
function deleteEmployee(row) {
  // get id
  const id = row.querySelector("td:first-child").textContent;
  // send id to BE
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: "DELETE"
  })
  .then((response) => {
    if (response.ok) {
      console.log(response);
    } else {
      alert("Failed to delete employee");
    }
  })
  // call fetchEmployees
  .then(() => {
    fetchEmployees();
  })
  .catch((error) => console.error(error));
}

fetchEmployees();
