const stringifyDate = (date) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const newDate = !date ? "undefined" : new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
    return newDate;
}

const update = (node) => {
    let employeePayRollData = empPayrollList.find(empData => empData._id == node.id);
    if(!employeePayRollData){return;}
    localStorage.setItem("editEmp", JSON.stringify(employeePayRollData))
    window.location.replace(site_properties.add_emp_payroll_page);
}

// const update = (node) => {
//     let empPayrollData = empPayrollList.find(empData => empData._id == node.id);
//     if(!empPayrollData){return;}
//     localStorage.setItem("editEmp", JSON.stringify(empPayrollData._id))
//     window.location.replace(site_properties.add_emp_payroll_page);
// }