let employeePayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    employeePayrollList = getDataFromLocalStorage();
    document.querySelector('.emp-count').textContent = employeePayrollList.length;
    createInnerHtml();
    localStorage.removeItem("edit-emp");
})

const createInnerHtml = () => {
    const headerHtml = "<tr><th></th> <th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>";
    if (employeePayrollList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for (const employeePayrollData of employeePayrollList) {
        innerHtml = `${innerHtml}
        <tr>
            <td>
                <img class="profile" src="${employeePayrollData._profilePic}" alt="">
            </td>
            <td>${employeePayrollData._name}</td>
            <td>${employeePayrollData._gender}</td>
            <td>${getDeptHtml(employeePayrollData._department)}</td>
            <td>${employeePayrollData._salary}</td>
            <td>${stringifyDate(employeePayrollData._startDate)}</td>
            <td>
                <img id="${employeePayrollData._id}" onclick="remove(this)" src="../assets/icons/delete-black-18dp.svg" alt="delete">
                <img id="${employeePayrollData._id}" onclick="update(this)" src="../assets/icons/create-black-18dp.svg" alt="edit">
            </td>
        </tr>`;
    }
    document.querySelector('#display').innerHTML = innerHtml;
};
const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for(const dept of deptList) {
        deptHtml = `${deptHtml}<div class="dept-label">${dept}</div>`
    }
    return deptHtml;
}
const getDataFromLocalStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ? JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}
const remove = (data) => {
    console.log("inside Delete");
    console.log(data.id);
    let employeeData = employeePayrollList.find(empData => empData._id == data.id);
    if(!employeeData) {
        return;
    }
    const index = employeePayrollList.map(empData => empData._id)
                                     .indexOf(employeeData.id);
    employeePayrollList.splice(index, 1);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
    document.querySelector('.emp-count').textContent= employeePayrollList.length;
    createInnerHtml();
}
const update = (data) => {
    console.log(data.id)
    let employeeData = employeePayrollList.find(empData => empData._id == data.id);
    if(!employeeData)
    return;
    localStorage.setItem("edit-emp", JSON.stringify(employeeData));
    window.location.replace(site_properties.add_employee_page);
}