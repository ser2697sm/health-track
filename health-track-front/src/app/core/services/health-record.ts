import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateFirstRecordRequest } from '../models/request/createFirstRecord-request';
import { Observable } from 'rxjs';
import { HealthRecordResponse } from '../models/response/healthRecord-response';

@Injectable({
  providedIn: 'root',
})
export class HealthRecord {

  private readonly apiUrl = '/api/admin'

  constructor(private http: HttpClient) { }

  createFirstRecord(userId: string, value: CreateFirstRecordRequest) {
    return this.http.post(this.apiUrl + `/health-records/create/${userId}`, value, { responseType: 'text' })
  }


  viewRecord(userId: string): Observable<HealthRecordResponse[]> {
    return this.http.get<HealthRecordResponse[]>(this.apiUrl + `/health-records/viewRecord/${userId}`)
  }


}
