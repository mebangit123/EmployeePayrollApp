let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener("DOMContentLoaded", (event)=>{
    validateName();
    validateDate();
    checkForUpdate();
});

function validateName() {
    const name = document.querySelector("#name");
    const textError = document.querySelector('.error-output');
    name.addEventListener('input', () => {
        if(name.value.length == 0){
           return textError.textContent ='';
        }
        try {
            (new EmployeePayrollData()).name=name.value;
            textError.textContent ='';
        } catch (e) {
           textError.textContent = e;
        }
    });
}
function validateDate(){
    const day = document.querySelector('#day')
    const month = document.querySelector('#month')
    const year = document.querySelector('#year')
    const dateError = document.querySelector('.date-error');

    day.addEventListener('input', checkDate)
    month.addEventListener('input', checkDate)
    year.addEventListener('input', checkDate)
} 
function checkDate() {
    const dateError = document.querySelector('.date-error');
    try {
        let date = day.value+" "+month.value+" "+year.value;
        (new EmployeePayrollData()).startDate = new Date(Date.parse(date));
        dateError.textContent = "";
    } catch (e) {
        dateError.textContent = e;
    }
}
const checkForUpdate = () => {
    const empJson = localStorage.getItem('edit-emp');
    isUpdate  = empJson? true:false;
    if(!isUpdate){
        return;
    }
    employeePayrollObj = JSON.parse(empJson);
    setForm();
    console.log(employeePayrollObj);
}
const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValue('[name = profile]', employeePayrollObj._profilePic);
    setSelectedValue('[name = gender]', employeePayrollObj._gender);
    setSelectedValue('[name = department]', employeePayrollObj._department);
    setValue('#salary', employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day',date[0]);
    setValue('#month',date[1]);
    setValue('#year',date[2]);
    setValue('#notes', employeePayrollObj._note)
}
const save = (event) => {
        event.preventDefault();
        event.stopPropagation();
    try {
        setEmployeeObj();
        console.log("Set EmpObj")
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    } catch (error) {
        console.log("error")
    }
}
const setEmployeeObj = () => {
    employeePayrollObj._name = getInputValueByID('#name');
    employeePayrollObj._profilePic = getSelectedValue('[name = profile]').pop();
    employeePayrollObj._gender = getSelectedValue('[name = gender]').pop();
    employeePayrollObj._department = getSelectedValue('[name = department]');
    employeePayrollObj._salary = getInputValueByID('#salary');
    employeePayrollObj._note = getInputValueByID('#notes');
    let date = getInputValueByID('#day')+" "+getInputValueByID('#month')+" "+getInputValueByID('#year');
    employeePayrollObj._startDate = date;
}

const createAndUpdateStorage= () => {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList) {
        let employeeData = employeePayrollList.find(empData => empData._id == employeePayrollObj._id);
        if(!employeeData) {
            employeePayrollList.push(createEmployeePayrollData())
        }else {
            const index = employeePayrollList.map(empData => empData.id)
                                             .indexOf(employeeData._id);
            employeePayrollList.splice(index, 1, createEmployeePayrollData(employeeData._id))
        }
    }else {
        employeePayrollList = [createEmployeePayrollData()];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}
const createEmployeePayrollData = (id) => {
    let employeeParyollData = new EmployeePayrollData();
    if(!id) employeeParyollData.id = createNewEmployeeId();
    else employeeParyollData.id = id;
    setEmployeePayrollData(employeeParyollData);
    return employeeParyollData;
}
const setEmployeePayrollData = (employeePayrollData) => {
    try {
        employeePayrollData.name = employeePayrollObj._name;
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = employeePayrollObj._profilePic;
    employeePayrollData.gender = employeePayrollObj._gender;
    employeePayrollData.department = employeePayrollObj._department;
    employeePayrollData.salary = employeePayrollObj._salary;
    employeePayrollData.note = employeePayrollObj._note;
    try {
        employeePayrollData.startDate = new Date(Date.parse(employeePayrollObj._startDate))
    } catch (e) {
        setTextValue('.date-error', e);
        throw e;
    }
    alert(employeePayrollData.toString);
}
const createNewEmployeeId = () => {
    let empId = localStorage.getItem("EmpId");
    empId = !empId? 1:(parseInt(empId)+1).toString();
    localStorage.setItem('EmpId', empId);
    return empId;
}
const resetForm = () => {
    setValue('#name', "");
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', "");
    setTextValue('.salary-output', 400000);
    setValue('#notes', '');
    setTextValue('.error-output', '')
    setTextValue('.date-error', '')
    setSelectedIndex('#day', 0);
    setSelectedIndex('#month', 0);
    setSelectedIndex('#year', 0);
}
const getInputValueByID = (id) => {
    let value = document.querySelector(id).value
    return value
}
const getSelectedValue = (proprertyValue) => {
    let allItem = document.querySelectorAll(proprertyValue)
    let setItem = []
    allItem.forEach(item => {
        if(item.checked)
            setItem.push(item.value)
    });
    return setItem;
}
const unsetSelectedValues = (propertyValue) => {
    let allItem = document.querySelectorAll(propertyValue)
    allItem.forEach(item => {
        item.checked = false;
    });
}
const setValue = (id, value) => {
    let element = document.querySelector(id);
    element.value = value;
}

const setTextValue = (id, message) => {
    let textError = document.querySelector(id)
    textError.textContent = message
}
const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    console.log(element);
    element.selectedIndex = index;
}
const setSelectedValue = (propertyValue, value) => {
    let allItem = document.querySelectorAll(propertyValue);
    allItem.forEach(item => {
       if(Array.isArray(value)){
           if(value.includes(item.value)){
               item.checked = true;
           }
       } else if(item.value === value) {
           item.checked = true;
       }
    });
}