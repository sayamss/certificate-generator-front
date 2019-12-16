import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../services/organization.service';
import { Certificate } from '../services/certificate.model';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  private gridApi;

  constructor(private orgService: OrganizationService) { }

  title = 'app';

  columnDefs = [
      {headerName: 'Student Name', field: 'name', checkboxSelection: true},
      {headerName: 'Date', field: 'date' },
      {headerName: 'Certificate Description', field: 'desc'}
  ];

  rowData = [];

  handleFileInput(event){
    console.log(event);
  }

  ngOnInit() {
    this.orgService.getCertificates().subscribe((certificates: Certificate[]) => {

      // add certificates in ag-grid
      for (const certificate of certificates){
        this.rowData.push({ name: certificate.student.name, date: certificate.date, desc: certificate.issued_for });
      }
      this.gridApi.setRowData(this.rowData);
    });
  }

  onGridReady(event) {
    this.gridApi = event.api;
  }
}
