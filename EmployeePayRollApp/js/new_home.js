let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) =>{
    empPayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem("editEmp")
});
const getEmployeePayrollDataFromStorage = () =>{
    return localStorage.getItem('EmployeePayrollList') ? JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}
const createInnerHtml = () => {    
    const headerHtml ="<th></th><th>ID</th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>StartDate</th><th>Actions</th>";
    if(empPayrollList.length == 0) 
    // document.querySelector("#table-display").innerHTML = innerHtml;
    return;
    let innerHtml =`${headerHtml}`;
    for( const empPayrollData of empPayrollList){
        innerHtml = `${innerHtml}<tr><td><img class="profie" src="${empPayrollData._profilePic}" alt="No pic"><td>${empPayrollData._id}</td><td>${empPayrollData._name}</td><td>${empPayrollData._gender}</td><td>${getDeptHtml(empPayrollData._department)}</td><td>${empPayrollData._salary}</td><td>${stringifyDate(empPayrollData._startDate)}</td><td><img id="${empPayrollData._id}"  onclick="remove(this)" src="../assets/icons/delete-black-18dp.svg" alt="delete"><img id="${empPayrollData._id}" onclick="update(this)" src="../assets/icons/create-black-18dp.svg" alt="edit"></td></tr>`;
    document.querySelector("#table-display").innerHTML = innerHtml;
}
}

// const createInnerHtml = () => {

//     const headerHtml ="<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";
//     const innerHtml =`${headerHtml}<tr>
//     <td><img class="profie" src='../assets/profile-images/Ellipse 1.png'></td>
//     <td>Narayana Mahadevan</td>
//     <td>Female</td>
//     <td><div class="dept-label">HR</div><div class="dept-label">Finance</div></td>
//     <td>300000</td>
//     <td>1 Nov 2020</td>
//     <td><img id="1" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg"><img id="1"  onclick="update(this)" alt="edit" src="../assets/icons/create-black-18dp.svg"></td>
//     </tr>`;
// document.querySelector('#table-display').innerHTML = innerHtml;
// }
/*${empPayrollData_id}*/

const getDeptHtml = (deptList) =>{
    let deptHtml = '';
    for( const dept of deptList){
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}

const remove = (node) => {
    let empPayrollData = empPayrollList.find(empData => empData._id == node.id);
    if( !empPayrollData) return;
    const index = empPayrollList.map(empData => empData._id).indexOf(empPayrollData._id);
    empPayrollList.splice(index,1);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
}

// const remove = (node) => {
//     let empPayrollData = empPayrollList.find(empData => empData._id == node.id);
//     if( !empPayrollData) return;
//     const index = empPayrollList.map(empData => empData._id).indexOf(empPayrollData._id);
//     empPayrollList.splice(index,1);
//     localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
//     document.querySelector(".emp-count").textContent = empPayrollList.length;
//     createInnerHtml();
// }
