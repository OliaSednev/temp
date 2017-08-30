import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'englishLetters'})

export class EnglishLettersPipe implements PipeTransform {

    public transform(input: string): string {
        if (!input) {
            return '';
        } else {
            return input.replace(/[^0-9 a-z]/gi, '');
        }
    }
}
