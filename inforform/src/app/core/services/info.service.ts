import { ApiService } from './api.service';
import { InfoUser } from './../models/InfoUser.model';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
@Injectable()
export class InfoService {
    public _urlAPI = environment.urlAPI;
    constructor(private apiService: ApiService) { }
    postInfo(info: InfoUser): Observable<InfoUser> {
        return this.apiService.post('', info);
    }
}
