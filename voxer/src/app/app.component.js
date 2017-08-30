"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var person_service_1 = require("./person.service");
var local_storage_service_1 = require("./local-storage.service");
var AppComponent = (function () {
    function AppComponent(personService, localStorageService) {
        this.personService = personService;
        this.localStorageService = localStorageService;
        this.phoneSortState = 0;
        this.nameSortState = 0;
        this.addressSortState = 0;
        this.isFormReadonly = true;
    }
    AppComponent.prototype.ngOnInit = function () {
        // this.personService.getAllPersons().subscribe(persons => {
        //     this.persons = persons;
        //     this.filteredPersons = persons;
        // });
        this.filteredPersons = this.localStorageService.getFromStorage();
        this.persons = this.localStorageService.getFromStorage();
        ;
    };
    AppComponent.prototype.filter = function () {
        var result = [];
        this.filteredPersons = this.persons;
        var caseInsensitiveFilterString = this.filterString.toLowerCase();
        for (var _i = 0, _a = this.filteredPersons; _i < _a.length; _i++) {
            var person = _a[_i];
            if (person.name.toLowerCase().includes(caseInsensitiveFilterString) ||
                person.phone.toLowerCase().includes(caseInsensitiveFilterString) ||
                person.address.toLowerCase().includes(caseInsensitiveFilterString)) {
                result.push(person);
            }
        }
        this.filteredPersons = result;
    };
    AppComponent.prototype.saveToStorage = function () {
        this.localStorageService.saveToStorage(this.filteredPersons);
    };
    AppComponent.prototype.getDefaultPerson = function () {
        return { name: '', address: '', phone: '', photo: '' };
    };
    AppComponent.prototype.addPerson = function () {
        this.filteredPersons.push(this.getDefaultPerson());
    };
    AppComponent.prototype.loadPersons = function () {
        $('#readFileButton').click();
    };
    AppComponent.prototype.readFile = function ($event) {
        var file = $event.target.files[0];
        var reader = new FileReader();
        var service = this;
        reader.onload = function (e) {
            var text = reader.result;
            var data = JSON.parse(text);
            service.persons = data.data;
            service.filteredPersons = data.data;
        };
        reader.readAsText(file);
    };
    AppComponent.prototype.delete = function (person) {
        this.filteredPersons.splice(this.filteredPersons.indexOf(person), 1);
        this.persons.splice(this.persons.indexOf(person), 1);
        toastr.success("person " + person.name + " was successfuly deleted");
    };
    AppComponent.prototype.update = function (person) {
        this.localStorageService.saveToStorage(this.filteredPersons);
        // toastr.success(`person ${person.name} was successfuly updated`);
    };
    AppComponent.prototype.sortByAddress = function () {
        if (this.addressSortState === 1) {
            this.filteredPersons.sort(function (a, b) {
                if (a.address < b.address) {
                    return -1;
                }
                if (a.address > b.address) {
                    return 1;
                }
                return 0;
            });
        }
        else if (this.addressSortState === 2) {
            this.filteredPersons.sort(function (b, a) {
                if (a.address < b.address) {
                    return -1;
                }
                if (a.address > b.address) {
                    return 1;
                }
                return 0;
            });
        }
        else {
            this.filteredPersons = this.persons;
        }
    };
    AppComponent.prototype.sortNyName = function () {
        // this.filteredPersons.sort(this.lexicographicSort);
        if (this.nameSortState === 1) {
            this.filteredPersons.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
        }
        else if (this.nameSortState === 2) {
            this.filteredPersons.sort(function (b, a) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
        }
        else {
            this.filteredPersons = this.persons;
        }
    };
    AppComponent.prototype.lexicographicSort = function (a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    };
    AppComponent.prototype.sortByPhone = function () {
        if (this.phoneSortState === 1) {
            this.filteredPersons.sort(function (a, b) {
                if (a.phone < b.phone) {
                    return -1;
                }
                if (a.phone > b.phone) {
                    return 1;
                }
                return 0;
            });
        }
        else if (this.phoneSortState === 2) {
            this.filteredPersons.sort(function (b, a) {
                if (a.phone < b.phone) {
                    return -1;
                }
                if (a.phone > b.phone) {
                    return 1;
                }
                return 0;
            });
        }
        else {
            this.filteredPersons = this.persons;
        }
    };
    AppComponent.prototype.addressClick = function () {
        this.addressSortState++;
        this.sortByAddress();
        if (this.addressSortState === 3) {
            this.addressSortState = 0;
        }
    };
    AppComponent.prototype.nameClick = function () {
        this.nameSortState++;
        this.sortNyName();
        if (this.nameSortState === 3) {
            this.nameSortState = 0;
        }
    };
    AppComponent.prototype.phoneClick = function () {
        this.phoneSortState++;
        this.sortByPhone();
        if (this.phoneSortState === 3) {
            this.phoneSortState = 0;
        }
    };
    AppComponent.prototype.isPhoneDesc = function () {
        if (this.phoneSortState === 1) {
            return true;
        }
        return false;
    };
    AppComponent.prototype.isPhoneAsc = function () {
        if (this.phoneSortState === 2) {
            return true;
        }
        return false;
    };
    AppComponent.prototype.isNameDesc = function () {
        if (this.nameSortState === 1) {
            return true;
        }
        return false;
    };
    AppComponent.prototype.isNameAsc = function () {
        if (this.nameSortState === 2) {
            return true;
        }
        return false;
    };
    AppComponent.prototype.isAddressDesc = function () {
        if (this.addressSortState === 1) {
            return true;
        }
        return false;
    };
    AppComponent.prototype.isAddressAsc = function () {
        if (this.addressSortState === 2) {
            return true;
        }
        return false;
    };
    AppComponent.prototype.onEdit = function () {
        this.isFormReadonly = !this.isFormReadonly;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app.component.bootstrap.html'
    })
    // TODO add filer/sort+icon/show edit sign??/localstorage
    ,
    __metadata("design:paramtypes", [person_service_1.PersonService, local_storage_service_1.LocalStorageService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map