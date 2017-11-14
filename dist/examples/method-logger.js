var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Logger } from '../src';
var StudentComponent = /** @class */ (function () {
    function StudentComponent(name, debt, avgGrade, examsNumber) {
        this.examsNumber = 0;
        console.log("Hi " + name);
        this.name = name;
        this.debt = debt;
        this.avgGrade = avgGrade;
        this.examsNumber = examsNumber;
    }
    StudentComponent.prototype.addExam = function (grade) {
        if (grade < 0 || grade > 100) {
            console.log('invalid grade');
            return;
        }
        this.avgGrade = (this.avgGrade * this.examsNumber + grade) / ++this.examsNumber;
    };
    StudentComponent.prototype.fine = function () {
        this.debt *= 1.1;
    };
    StudentComponent.prototype.grantScholarship = function (dollars) {
        this.debt += dollars;
    };
    __decorate([
        Logger(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], StudentComponent.prototype, "addExam", null);
    return StudentComponent;
}());
var stud = new StudentComponent('John Doe', 1000, 98, 3);
stud.addExam(200);
stud.addExam(90);
stud.grantScholarship(1000);
stud.fine();
//# sourceMappingURL=method-logger.js.map