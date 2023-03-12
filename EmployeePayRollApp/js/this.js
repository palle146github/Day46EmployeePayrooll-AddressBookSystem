let isUpdate = false;
let employeePayrollObj = {};
window.addEventListener('DOMContentLoaded', (event) =>{
    const name = document.querySelector("#name");
    const textError = document.querySelector(".text-error");
    name.addEventListener('input',function(){
        if( name.value.length == 0){
            textError.textContent = "";
            return;
        }
        try{
            (new EmployeePayRollData()).name = name.value;
            textError.textContent = "";
        }catch(e){
            textError.textContent = e;
    }
});
const date = document.querySelector("#date");
date.addEventListener("input", function(){
    let startDate = getInputValueById("#day") + " " + getInputValueById("#month") + " " + getInputValueById("#year");
    try{
        (new EmployeePayRollData()).startDate = new Date(Date.parse(startDate));
        setTextValue(".date-error", "");
    }catch(e){
        setTextValue(".date-error", e);
    }
});
const salary = document.querySelector("#salary");
const output = document.querySelector(".salary-output");
output.textContent = salary.value;
salary.addEventListener('input', function(){
    output.textContent = salary.value;
});
checkForUpdate();
});

const save = (event) =>{
    event.preventDefault();
    event.stopPropagation();
    try{
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    }catch(e){
        return;
    }   
}
const setEmployeePayrollObject = () =>{
    employeePayrollObj._name = getInputValueById("#name");
    employeePayrollObj._profilePic = getSelectedValues("[name=profile]").pop();
    employeePayrollObj._gender = getSelectedValues("[name=gender]").pop();
    employeePayrollObj._department = getSelectedValues("[name=department]");
    employeePayrollObj._salary = getInputValueById("#salary");
    employeePayrollObj._note = getInputValueById("#notes");
    let d = getInputValueById("#day")+ " " + getInputValueById("#month") + " "+ getInputValueById("#year");
    date = new Date(d);
    employeePayrollObj._startDate = date;
}

function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

    if(employeePayrollList){
        let empPayrollData = employeePayrollList.find(empData => empData._id = employeePayrollObj._id);
        if(!empPayrollData){
            employeePayrollList.push(createEmployeePayrollData());
        }else{
            const index = employeePayrollList.map(empData => empData._id).indexOf(empPayrollData._id);
            employeePayrollList.splice(index,1, createEmployeePayrollData(empPayrollData._id));
        }
    }
    else{
        employeePayrollList = [employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
    alert("Details added");
    window.location.replace(site_properties.home_page);
}
const createEmployeePayrollData = (id) => {
    let employeePayrollData = new EmployeePayrollData();
    if(!id) employeePayrollData.id = createNewEmployeeId();
    else employeePayrollData.id = id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}

const setEmployeePayrollData = (employeePayRollData) => {
    try{
        employeePayRollData.name = employeePayrollobj._name;
    }catch(e){
        setTextValue('.text-error',e);
        throw e;
    }
    employeePayRollData.profilePic = employeePayrollObj._profilePic;
    employeePayRollData.gender = employeePayrollObj._gender;
    employeePayRollData.department = employeePayrollObj._department;
    employeePayRollData.salary = employeePayrollObj._salary;
    employeePayRollData.note = employeePayrollObj._note;   
    try{
        employeePayRollData.startDate = new Date(Date.parse(employeePayrollObj._startDate));
        employeePayrollObj._startDate = date;
}catch(e){
    setTextValue(".date-error", e);
    throw e;
}
alert(employeePayRollData.toString());
}
const createNewEmployeeId = () => {
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : ( parseInt(empID)+1).toString();
    localStorage.setItem("EmployeeID", empID);
    return empID;
}