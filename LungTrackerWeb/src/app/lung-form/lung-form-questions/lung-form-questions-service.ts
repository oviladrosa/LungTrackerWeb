import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class LungFormQuestionsService {

    constructor(private httpService: HttpClient){

    }

    findJobs(text: string){
        let header = new HttpHeaders().set('Access-Control-Allow-Headers','Content-Type');
        header.set('Access-Control-Allow-Methods', 'GET');
        header.set('Access-Control-Allow-Origin', '*');
        header.set('Access-Control-Allow-Headers', 'Origin');
        // const headers = new Headers();
        // headers.append('Access-Control-Allow-Headers', 'Content-Type');
        // headers.append('Access-Control-Allow-Methods', 'GET');
        // headers.append('Access-Control-Allow-Origin', '*');

        return this.httpService.get(`https://young-hollows-40979.herokuapp.com/https://www.qualificalia.com/terms/cno/services.php?task=search&arg=${text}&output=json`, {headers: header});
    }

    findProvinces(){
        return this.httpService.get("https://young-hollows-40979.herokuapp.com/https://apiclinic.herokuapp.com/postalCodes/provinces" );
    }

    findCitiesByProvince(province: string){
        return this.httpService.get("https://young-hollows-40979.herokuapp.com/https://apiclinic.herokuapp.com/postalCodes/cities?provincia="+province );
    }

    communicateForm(data: any): Promise<any> {

        return this.httpService.post('https://young-hollows-40979.herokuapp.com/https://apiclinic.herokuapp.com/upload',data).toPromise();
    }

}