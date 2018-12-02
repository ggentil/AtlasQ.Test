import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'

import { environment } from './../../../../environments/environment';

@Injectable()
export class RequestService {

    private BASE_API_URL: string = environment.BASE_API_URL;
    private internalRequest: boolean = false;

    constructor(private _http: HttpClient) { }

    requestMethod(requestURL: string, method: string, itsAsync: boolean, itsInternal: boolean, data?: any) {


        let header,
            url = itsInternal ? this.BASE_API_URL + requestURL : requestURL

        this.internalRequest = itsInternal;

        if (itsInternal) {
            header = {
                "Content-Type": "application/json",
            };
            url = this.BASE_API_URL + requestURL;
        } else {
            header = { "Content-Type": "application/json" };
            url = requestURL;
        }

        let option = {
            headers: header,
            responseType: "json"
        };

        if (method.toUpperCase() == "POST" && data) {
            return this.throughPost(url, JSON.stringify(data), option);
        } else {
            return this.throughGet(url, option);
        }
    }

    private throwObservableSuccess(dataToReturn: any) {
        return {
            success: true,
            message: null,
            data: dataToReturn
        };
    }

    private throughPost(url: string, data: string, option?: any) {
        return this._http.post(url, data, option)
            .map(response => {
                //this.setToken(response);
                return this.internalRequest ? response : this.throwObservableSuccess(response);
            }).catch(this.handleError);
    }

    private throughGet(url: string, option?: any) {
        return this._http.get(url, option)
            .map(response => {
                //this.setToken(response);
                return this.internalRequest ? response : this.throwObservableSuccess(response);
            }).catch(this.handleError);
    }

    public handleError = (response: any) => {
        let throwObservableError = (dataToReturn: any) => {
            return Observable.throw({
                success: false,
                message: null,
                data: dataToReturn
            });
        }
        return this.internalRequest ?  Observable.throw(response.error) : throwObservableError(response.error);
    }

    private getToken(): string {
        return "null";
    }
    
    private setToken(response: any): boolean {
        console.log("headers: ", response);
        return false;
    }
}