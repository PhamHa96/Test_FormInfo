import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from './../core/services/api.service';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../environments/environment';
import { InfoUser } from './../core/models/InfoUser.model';
import { InfoService } from './../core/services/info.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
    public info: InfoUser = {
        id: '',
        name: '',
        phone: '',
        bday: '',
        message: '',
        urlId: '',
    };
    selectedFile: File = null;
    public file = new FormData();
    public maxDate: Date = null;
    public value: Date = new Date('16/03/2019');
    public isSuccessPost = false;
    public isFailPost = false;
    public messErr = '';
    public srcImg = environment.defaultUrlImage;
    public checkSizeImg = true;
    public checkWidthHeightImg = true;
    public tempUser: InfoUser;
    constructor(private infosv: InfoService) { }
    ngOnInit() {
    }
    onResetForm(formInfo: NgForm) {
        formInfo.reset();
        this.srcImg = environment.defaultUrlImage;
        this.checkSizeImg = true;
        this.checkWidthHeightImg = true;
        this.isSuccessPost = false;
    }
    handleFileInput(file: FileList) {
        this.selectedFile = file.item(0);
        const sizeImg = this.selectedFile.size; // check size img 2Mb = 2097152 B
        if (sizeImg > 2097152) {
            this.checkSizeImg = false;
        } else { this.checkSizeImg = true; }
        const reader = new FileReader();
        reader.onload = (event: any) => {
            this.srcImg = event.target.result;
            const img = new Image();
            img.onload = () => {
                // check image width and height
                if (img.naturalWidth <= 250 || img.naturalHeight <= 150) {
                    this.checkWidthHeightImg = false;
                } else { this.checkWidthHeightImg = true; }
            };
            img.src = this.srcImg;
        };
        reader.readAsDataURL(this.selectedFile);
    }

    submitSend(formInfo: NgForm) {
        const myDate = new Date(this.info.bday);
        const day = myDate.getDate();
        const month = myDate.getMonth();
        const year = myDate.getFullYear();
        this.tempUser = { ...this.info };
        this.tempUser.bday = day + '/' + month + '/' + year;
        let str = '';
        str = this.tempUser.phone.slice(1);
        this.tempUser.phone = '(+84)' + ' ' + str; // format phone type Vietnam
        if (formInfo.valid) {
            this.infosv.postInfo(this.tempUser).subscribe(
                response => {
                    console.log('response', response);
                    if (response) {
                        this.isSuccessPost = true;
                        const self = this;
                        setTimeout(() => { self.isSuccessPost = false; }, 3000);
                    } else {
                        this.isSuccessPost = false;
                    }
                },
                (err: HttpErrorResponse) => {
                    if (err) {
                        this.isFailPost = true;
                    }
                    this.isFailPost = true;
                    if (err.error instanceof Error) {
                        // A client-side or network error occurred. Handle it accordingly.
                        this.messErr = 'An error occurred: ' + err.message;
                    } else {
                        // The backend returned an unsuccessful response code.
                        // The response body may contain clues as to what went wrong,
                        this.messErr = `Backend returned code ${err.status} ` + err.message;
                    }
                    const self = this;
                    setTimeout(() => { self.isFailPost = false; self.messErr = ''; }, 4000);
                }
            );
        }
    }
}
