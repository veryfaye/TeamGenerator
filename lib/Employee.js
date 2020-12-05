// TODO: Write code to define and export the Employee class
class Employee{
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName(){
        return this.name;
    }

    getId(){
        return this.id;
    }

    getEmail(){
        return this.email;
    }

    //Unsure if this is the correct way to have this pass the test, but it works
    getRole(){
        return "Employee"
    }
}

module.exports = Employee;