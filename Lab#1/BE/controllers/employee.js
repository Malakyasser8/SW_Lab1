const employee = [{ id: "1", name: "Mohamed Sayed" }];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const id = req.params.id;
  // Assuming employee is an array of objects
  const index = employee.findIndex((emp) => emp.id === id);
  if (index !== -1) {
    employee.splice(index, 1);
    res.status(200).json({ message: "Employee deleted successfully" });
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const id = req.body.id;
  const index = employee.findIndex((emp) => emp.id === id);
  if (index == -1) {
    employee.push(req.body);
    console.log("Employee created successfully");
    res.status(200).json({ message: "Employee created successfully" });
  } else {
    console.log("Employee NOTT");
    res.status(404).json({ message: "Employee not created" });
  }
};
