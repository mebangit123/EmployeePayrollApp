class EmployeePayrollData {
	
get id() { return this._id }
set id(id)
{
	if(id < 0)
		throw 'ID: Enter positive integer'
	else this._id = id
}

get name() { return this._name }
set name(name)
{
	let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
	if(nameRegex.test(name))
		this._name = name;
	else 
		throw "Name is Incorrect"
}

get profilePic(){
	return this._profilePic
}
set profilePic(profilePic){
	this._profilePic = profilePic
}

get salary() { return this._salary }
set salary(salary)
{
	if(salary < 0 )
		throw 'Salary: Enter positive integer'
	else this._salary = salary
}

get gender() { return this._gender }
set gender(gender)
{
	let genderRegex = RegExp('^[MF]{1}$')
	if(genderRegex.test(gender) )
	this._gender = gender
	else throw 'Gender Not Match'
}

get department(){ return this._department }
set department(department)
{
	this._department = department
}

get note() { return this._note }
set note(note)
{
	this._note = note
}
get startDate(){ return this._startDate }
set startDate(startDate) {
	let currentDate = new Date();
	if (startDate > currentDate) {
		throw 'Start Date is a future Date'
	}
	var diff = Math.abs(currentDate.getTime() - startDate.getTime());
	if(diff/(1000*60*60*24) > 30){
	throw 'StartDate is beyond 30 Days';
	}
	this._startDate = startDate;
}
toString() {
	return "id= " + this.id + ", name= "+this.name+ ", ProfilePic= "+this.profilePic+ ", salary= "+ this.salary + ", "+
		   "gender= "+this.gender+  ", Department= "+this.department+ ", startDate= "+this.startDate+ ", Note= "+this.note;
	}
}