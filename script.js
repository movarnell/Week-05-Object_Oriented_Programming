/* This assignment requires that I create a menu, using 2 classes and at least 1 array. 
I took time to create an employer class, and an employee class, each creates its own array to hold values. 
you can create and delete employers and employees. Employees are under their repsective employers, and...
as an added bonus I made it to where when your selecting to delete something you can see the list with the indexes above in the prompt
that way you don't have to remember the index. 
*/

class Employee {
    constructor(name, title, employeeNumber) {
        this.name = name;
        this.title = title;
        this.employeeNumber = employeeNumber;
    }

    describe() {
        return `${this.employee.name} is a ${this.employee.title} Employee#${this.employee.employeeNumber}` ;
    } 
}

class Employer {
    constructor(employerName) {
        this.name = employerName;
        this.employees = [];
    }

    addEmployee(employee) {
        if (employee instanceof Employee) {
            this.employees.push(employee);
        } else {
            throw new Error(`You can only add an instance of Employee. Argument is not an employee: ${employee}`);
        }
    }

    describe() {
        return `${this.employerName} has ${this.employees.length} staff.` ;
    }
}

class Menu {
    constructor() {
        this.employers = [];
        this.selectedEmployer = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1' : 
                this.createEmployer();
                break;
                case '2' : 
                this.showEmployers();
                break;
                case '3' : 
                this.deleteEmployer();
                break;
                case '4' : 
                this.viewEmployers();
                break;
                default: 
                selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!');
    }

// this part shows the main menu to the user asking for a response
    showMainMenuOptions() {
        return prompt(`
        0) exit
        1) Create New Employer
        2) View List of Employers
        3) Delete an Employer
        4) Select Employer
        `);
    }
// this part shows the employer menu. Employees are created from here and stored in the employees array
    showEmployerMenuOptions(employerInfo) {
        return prompt(`
        ${employerInfo}
        0) back
        1) create employee
        2) delete employee
        `);
    }

// this will get each employer from the employers array and display them each on a new line
    showEmployers() {
        let employerString = '';
        for (let i = 0; i < this.employers.length; i++) {
            employerString += i + ') ' + this.employers[i].name + '\n';
        }
        alert(employerString);
    }
// this will create an employer and add it to the employer array
    createEmployer() {
        let name = prompt('Employers Name:');
        this.employers.push(new Employer(name));
    }
// this serves two purposes, it asks what indexed employer you want to view (displaying them all) and then
// it will let you choose from the employer menu what option you want;
    viewEmployers() {
        let list = '';
        for (let i = 0; i < this.employers.length; i++) {
            list += i + ') ' + this.employers[i].name + '\n';
        }
        let index = prompt(`
Enter the index of the employer you wish to view:
${list}
        `);
        if (index > -1 && index < this.employers.length) {
            this.selectedEmployer = this.employers[index];
            let description = 'Employer: ' + this.selectedEmployer.name + '\n';

            for (let i = 0; i < this.selectedEmployer.employees.length; i++) {
                description += i + ') ' + this.selectedEmployer.employees[i].name + " is a " + 
                this.selectedEmployer.employees[i].title + " with an employee number of: " + 
                this.selectedEmployer.employees[i].employeeNumber + '\n';
            }

            let selection = this.showEmployerMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createEmployee();
                    break;
                case '2':
                    this.deleteEmployee();
                    break;
            }
        }
    }

// this method lets you delete an employer as a whole. 
    deleteEmployer() {
        let list = '';
        for (let i = 0; i < this.employers.length; i++) {
            list += i + ') ' + this.employers[i].name + '\n';
        }
        let index = prompt(`
Enter the index of the employer you want to delete:
${list}
        `);
        
        if (index > -1 && index < this.employers.length) {
            this.employers.splice(index, 1);
        }
    }
// this method lets you create an employee
    createEmployee() {
        let name = prompt("Enter the employees full name:");
        let title = prompt("What is the employees job title?");
        let employeeNumber = prompt('What is the employee number?');
        this.selectedEmployer.employees.push(new Employee(name, title, employeeNumber));
    }

// // this method will give a list of the employees for the selected employer, and will then allow you to select which one to delete, 
// this goes a step beyond the functions we did in the teams app built in the lesson. 
    deleteEmployee(){
        let description ="";
    for (let i = 0; i < this.selectedEmployer.employees.length; i++) {
    description += i + ') ' + this.selectedEmployer.employees[i].name + " is a " + 
    this.selectedEmployer.employees[i].title + " with an employee number of: " + 
    this.selectedEmployer.employees[i].employeeNumber + '\n';
    }
        let index = prompt(`
        Enter the index of the employee you wish to delete:
            ${description}
        `);
        if (index > -1 && index < this.selectedEmployer.employees.length) {
            this.selectedEmployer.employees.splice(index, 1);
        }

}
}

let menu = new Menu();
menu.start();
