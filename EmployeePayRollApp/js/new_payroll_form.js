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
        window.location.replace("../pages/new_home.html");
        window.location.replace(site_properties.home_page);
        // window.location.replace(site_properties.home_page);
        // let employeePayRollData = createEmployeePayroll();
        // createAndUpdateStoragef(employeePayRollData);
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
    let date = new Date(d);
    employeePayrollObj._startDate = date;
}
const  createAndUpdateStorage = () =>{
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

    if(employeePayrollList){
        let employeePayrollData = employeePayrollList.find(empData => empData._id == employeePayrollObj._id);
        if(!employeePayrollData){
            employeePayrollList.push(createEmployeePayrollData());
        }else{
            const index = employeePayrollList.map(empData => empData._id).indexOf(employeePayrollData._id);
            employeePayrollList.splice(index,1, createEmployeePayrollData(employeePayrollData._id));
        }
    }
    else{
        employeePayrollList = [createEmployeePayrollData()];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}
const createEmployeePayrollData = (id) => {
    let employeePayrollData = new EmployeePayRollData();
    if(!id) employeePayrollData.id = createNewEmployeeId();
    else employeePayrollData.id = id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}
const setEmployeePayrollData = (employeePayRollData) => {
    try{
        employeePayRollData.name = employeePayrollObj._name;
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
        let d = getInputValueById("#day")+ " " + getInputValueById("#month") + " "+ getInputValueById("#year");
        let date = new Date(d);
        // employeePayRollData.startDate = new Date(Date.parse(employeePayrollObj._startDate));
        employeePayRollData.startDate = date;
}catch(e){
    setTextValue(".date-error", e);
    throw e;
}
alert(employeePayRollData.toString());
}
const setTextValue = (id, value) =>{
    const element = document.querySelector(id);
    element.textContent = value;
}
const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let setItems = [];
    allItems.forEach( item =>{
        if(item.checked){
            setItems.push(item.value);
        }
    });
    return setItems;
}
const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}
const resetForm = () => {
    setValue("#name","");
    unSelectedValues('[name=profile]');
    unSelectedValues('[name=gender]');
    unSelectedValues('[name=department]');
    setTextValue('.text-error', '');
    setTextValue('.startDate-error', '');
    setTextValue('.salary-output', getInputValueById("#salary"));
    setValue('#salary','500000');
    setValue('#notes','');
    setSelectedIndex('#day',0);
    setSelectedIndex('#month',0);
    setSelectedIndex('#year',0);   
}
const unSelectedValues = (propertyValue) =>{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}
const setValue = (id, value) =>{
    var element = document.querySelector(id);
    element.value = value;
}
const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
}
const createNewEmployeeId = () => {
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : ( parseInt(empID)+1).toString();
    localStorage.setItem("EmployeeID", empID);
    return empID;
}
const checkForUpdate = () =>{
    const employeePayrollJson = localStorage.getItem("editEmp");
    isUpdate = employeePayrollJson ? true : false;
    if(!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}
const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]', employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrollObj._department);
    setValue('#salary', employeePayrollObj._salary);
    setValue('#salaryOutput', employeePayrollObj._salary);
    setValue('#notes', employeePayrollObj._note);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
}
const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach( item => {
        if(Array.isArray(value)){
            if(value.includes(item.value)){
                item.checked = true;
            }
        }
        else if( item.value === value){
            item.checked = true;
        }
    });
}
const stringifyDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const newDate = !date ? "undefined" : new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
    return newDate;
}
// function createAndUpdateStoragef(employeePayrollData){
//     let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

//     if(employeePayrollList != undefined){
//         employeePayrollList.push(employeePayrollData);
//     }
//     else{
//         employeePayrollList = [employeePayrollData];
//     }
//     alert(employeePayrollList.toString());
//     localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
//     alert("Details added");
//     location.href="../pages/new_home.html";
// }
// const createEmployeePayroll = () => {
//     let employeePayRollData = new EmployeePayRollData();
//     try{
//         employeePayRollData.name = getInputValueById('#name');
//     }catch(e){
//         setTextValue('.text-error', e);
//         throw e;
//     }
//     employeePayRollData.profilePic = getSelectedValues('[name=profile]').pop();
//     employeePayRollData.gender = getSelectedValues('[name=gender]').pop();
//     employeePayRollData.department = getSelectedValues('[name=department]');
//     employeePayRollData.salary = getInputValueById('#salary');
//     employeePayRollData.note = getInputValueById('#notes');
//     let date = getInputValueById("#day") + " " + getInputValueById("#month")+" "+getInputValueById("#year");
//     var a = new Date(date);
//     employeePayRollData.startDate = a;
//     window.alert(employeePayRollData.toString());
//     return employeePayRollData;
// }
// const getInputElementValue = (id) => {
//     let value = document.getElementById(id).value;
//     return value;
// }
// function  getSelectedValues(propertyValue){
//     let allItems = document.querySelectorAll(propertyValue);
//     let setItems = [];
//     allItems.forEach( item =>{
//         if(item.checked){
//             setItems.push(item.value);
//         }
//     });
//     return setItems;
// }
// function setValue(id, value){
//     var element = document.querySelector(id);
//     element.value = value;
// }
// function setTextValue(id, value){
//     const element = document.querySelector(id);
//     element.textContent = value;
// }
// function unSelectedValues(propertyValue){
//     let allItems = document.querySelectorAll(propertyValue);
//     allItems.forEach(item => {
//         item.checked = false;
//     });
// }
// function resetForm(){
//     setValue("#name","");
//     unSelectedValues('[name=profile]');
//     unSelectedValues('[name=gender]');
//     unSelectedValues('[name=department]');
//     setTextValue('.text-error', '');
//     setTextValue('.startDate-error', '');
//     setTextValue('.salary-output', '5000000');
//     setValue('#salary','500000');
//     setValue('#notes','Write Something');
//     setValue('#day','6');
//     setValue('#month','Feb');
//     setValue('#year','2020');  
// }
// function getInputElementValue(id){
//     let value = document.getElementById(id).value;
//     return value;
// }
// function getInputValueById(id){
//     let value = document.querySelector(id).value;
//     return value;
// }