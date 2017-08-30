import {Component} from '@angular/core';
import {Person} from './app.models';
import {PersonService} from './person.service';
import {LocalStorageService} from './local-storage.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.bootstrap.html'
})

// TODO add filer/sort+icon/show edit sign??/localstorage

export class AppComponent {

    persons: Person[];
    filteredPersons: Person[];
    filterString: string;
    phoneSortState: number = 0;
    nameSortState: number = 0;
    addressSortState: number = 0;
    isFormReadonly: boolean;

    constructor(private personService: PersonService, private localStorageService: LocalStorageService) {
        this.isFormReadonly = true;
    }

    ngOnInit() {
        // this.personService.getAllPersons().subscribe(persons => {
        //     this.persons = persons;
        //     this.filteredPersons = persons;
        // });

        this.filteredPersons = this.localStorageService.getFromStorage();
        this.persons = this.localStorageService.getFromStorage();
        ;
    }

    filter() {
        let result: Person[] = [];
        this.filteredPersons = this.persons;
        let caseInsensitiveFilterString = this.filterString.toLowerCase();
        for (let person of this.filteredPersons) {
            if (person.name.toLowerCase().includes(caseInsensitiveFilterString) ||
                person.phone.toLowerCase().includes(caseInsensitiveFilterString) ||
                person.address.toLowerCase().includes(caseInsensitiveFilterString)) {
                result.push(person);
            }
        }
        this.filteredPersons = result;
    }

    saveToStorage() {
        this.localStorageService.saveToStorage(this.filteredPersons);
    }

    getDefaultPerson(): Person {
        return {name: '', address: '', phone: '', photo: ''};
    }

    addPerson() {
        this.filteredPersons.push(this.getDefaultPerson());
    }

    loadPersons() {
        $('#readFileButton').click();
    }

    readFile($event: any) {
        let file = $event.target.files[0];
        let reader = new FileReader();
        let service = this;
        reader.onload = function (e) {
            let text = reader.result;
            let data = JSON.parse(text);
            service.persons = data.data;
            service.filteredPersons = data.data;
        }

        reader.readAsText(file);
    }

    delete(person: Person) {
        this.filteredPersons.splice(this.filteredPersons.indexOf(person), 1);
        this.persons.splice(this.persons.indexOf(person), 1);
        toastr.success(`person ${person.name} was successfuly deleted`);
    }

    update(person: Person) {
        this.localStorageService.saveToStorage(this.filteredPersons);
        // toastr.success(`person ${person.name} was successfuly updated`);
    }

    sortByAddress() {
        if (this.addressSortState === 1) {

            this.filteredPersons.sort((a: Person, b: Person) => {
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
            this.filteredPersons.sort((b: Person, a: Person) => {
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
    }

    sortNyName() {
        // this.filteredPersons.sort(this.lexicographicSort);

        if (this.nameSortState === 1) {

            this.filteredPersons.sort((a: Person, b: Person) => {
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
            this.filteredPersons.sort((b: Person, a: Person) => {
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
    }

    lexicographicSort(a: Person, b: Person) {
        if (a.name < b.name) {
            return -1;
        }

        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }

    sortByPhone() {

        if (this.phoneSortState === 1) {

            this.filteredPersons.sort((a: Person, b: Person) => {
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
            this.filteredPersons.sort((b: Person, a: Person) => {
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
    }

    addressClick() {
        this.addressSortState++;
        this.sortByAddress();
        if (this.addressSortState === 3) {
            this.addressSortState = 0;
        }
    }

    nameClick() {
        this.nameSortState++;
        this.sortNyName();
        if (this.nameSortState === 3) {
            this.nameSortState = 0;
        }
    }

    phoneClick() {
        this.phoneSortState++;
        this.sortByPhone();
        if (this.phoneSortState === 3) {
            this.phoneSortState = 0;
        }
    }

    isPhoneDesc(): boolean {
        if (this.phoneSortState === 1) {
            return true;
        }
        return false;
    }

    isPhoneAsc(): boolean {
        if (this.phoneSortState === 2) {
            return true;
        }
        return false;
    }

    isNameDesc(): boolean {
        if (this.nameSortState === 1) {
            return true;
        }
        return false;
    }

    isNameAsc(): boolean {
        if (this.nameSortState === 2) {
            return true;
        }
        return false;
    }

    isAddressDesc(): boolean {
        if (this.addressSortState === 1) {
            return true;
        }
        return false;
    }

    isAddressAsc(): boolean {
        if (this.addressSortState === 2) {
            return true;
        }
        return false;
    }

    onEdit() {
        this.isFormReadonly = !this.isFormReadonly;
    }

}

