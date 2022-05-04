import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class LungFormQuestionsService {

    constructor(private httpService: HttpClient){

    }

    findJobs(text: string): Promise<any> {
        let header = new HttpHeaders().set('Access-Control-Allow-Headers','Content-Type');
        header.set('Access-Control-Allow-Methods', 'GET');
        header.set('Access-Control-Allow-Origin', '*');
        header.set('Access-Control-Allow-Headers', 'Origin');
        // const headers = new Headers();
        // headers.append('Access-Control-Allow-Headers', 'Content-Type');
        // headers.append('Access-Control-Allow-Methods', 'GET');
        // headers.append('Access-Control-Allow-Origin', '*');

        return this.httpService.get(`http://www.qualificalia.com/terms/cno/services.php?task=search&arg=${text}&output=json`, {headers: header}).toPromise();
    }

}