import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class HomeComponentService {

    constructor(private httpService: HttpClient){

    }

    communicateSuggest(data: any): Promise<any> {
        return this.httpService.post('https://young-hollows-40979.herokuapp.com/https://apiclinic.herokuapp.com/suggestions',data).toPromise();
    }

    getPersons() :Promise<any> {
        return this.httpService.get('https://young-hollows-40979.herokuapp.com/https://apiclinic.herokuapp.com/persons/count').toPromise();

    }

    getSuggestions() :Promise<any> {
        return this.httpService.get('https://young-hollows-40979.herokuapp.com/https://apiclinic.herokuapp.com/suggestions/marks').toPromise();

    }

}