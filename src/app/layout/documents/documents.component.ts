import { Component,OnInit, ViewChild, ElementRef,Inject} from '@angular/core';
import { DocumentService } from './documents.service';
import { Post } from '../../models/post.model';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { saveAs } from 'file-saver';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import{MatListOption} from '@angular/material/list'

export interface PeriodicElement {
  value: string;
  viewValue: string;
  checked: boolean;
}

const typesOfShoes: PeriodicElement[] = [
  { value: '../../../assets/images/dummy.pdf', viewValue: 'Document1',checked:true },
  { value: '../../../assets/images/download.png', viewValue: 'Document2' ,checked:false},
  { value: '../../../assets/images/ClientPortalDesignsummary.docx', viewValue: 'Document3' ,checked:true},
  { value: '../../../assets/images/card-3.jpg', viewValue: 'Document4' ,checked:false},
  { value: '../../../assets/images/download.png', viewValue: 'Document5' ,checked:true},
];

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
  providers: [ DocumentService ]
})
export class DocumentComponent implements OnInit{

  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];
  public post : Post;
   typesOfShoes1: [
    { value: '../../../assets/images/dummy.pdf', viewValue: 'Document1',checked:true },
    { value: '../../../assets/images/download.png', viewValue: 'Document2' ,checked:false},
    { value: '../../../assets/images/ClientPortalDesignsummary.docx', viewValue: 'Document3' ,checked:true},
    { value: '../../../assets/images/card-3.jpg', viewValue: 'Document4' ,checked:false},
    { value: '../../../assets/images/download.png', viewValue: 'Document5' ,checked:true},
  ];

  constructor( private modalService: NgbModal, private addPostService: DocumentService, private router: Router ) {
  	this.post = new Post();
  }
  displayedColumns = ['viewValue', 'value'];
  dataSource = new MatTableDataSource(typesOfShoes);
  uploaddata: any;
  selectedOptions: number[];
  fileName:string = "";
  FileSize:string;
  UpdatedFilesData:any;
  selectedUploadDocs:any;
  selectedFilesData:any;
  selectedmenuItem:any;
  items = [
    {
      id: 1,
      name: "Contrary to popular belief, Lorem Ipsum is not simply random text.",
      details: "../../../assets/images/dummy.pdf",
      checked:false
    },
    {
      id: 2,
      name: "Lorem Ipsum is the single greatest threat. ",
      details: "../../../assets/images/download.png",
      checked:false
    },
    {
      id: 3,
      name: "Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. ",
      details: "../../../assets/images/ClientPortalDesignsummary.docx",
      checked:false
    },
    {
      id: 4,
      name: "Cupcake ipsum dolor. Sit amet marshmallow topping cheesecake muffin.",
      details: "../../../assets/images/card-3.jpg",
      checked:false
    }
  ];

  uploadedDocs = [
    {
      id: 1,
      name: "Lorem Ipsum is simply dummy text of the printing.",
      details: "../../../assets/images/dummy.pdf",
      checked:true,
      assigned:null
    },
    {
      id: 2,
      name: "My personal documents.",
      details: "../../../assets/images/download.png",
      checked:true,
      assigned:null
    },
    {
      id: 3,
      name: "Document related to case details.",
      details: "../../../assets/images/ClientPortalDesignsummary.docx",
      checked:true,
      assigned:null
    },
    {
      id: 4,
      name: "End each item with a period.",
      details: "../../../assets/images/card-3.jpg",
      checked:true,
      assigned:null
    }
  ];

  items1 = [
    {
      id: 1,
      name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      details: "../../../assets/images/dummy.pdf",
      checked:true
    },
    {
      id: 2,
      name: "	Number of words per item.",
      details: "../../../assets/images/download.png",
      checked:true
    },
    {
      id: 3,
      name: "Document 3",
      details: "../../../assets/images/ClientPortalDesignsummary.docx",
      checked:true
    },
    {
      id: 4,
      name: "End each item with a period.",
      details: "../../../assets/images/card-3.jpg",
      checked:true
    }
  ];
  closeResult: string;

  ngOnInit(){
   var data  = localStorage.getItem('PostsData');
   this.UpdatedFilesData = JSON.parse(data);
  }

  open(content,data,i) {
    data.index = i;
    this.uploaddata = data;
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  selectedMenuUpload(data,docUrl,m,fileindex)
  {
    debugger;
    let filedetails = {
      id: Math.floor(Math.random() * 100),name: data.name, details: data.details,
      checked:true
    };

    this.items1.push(filedetails);
    this.items.splice(m, 1);
    this.UpdatedFilesData.splice(fileindex, 1);
  }

  selectedMenu(data,index,i) { 
    debugger;
    this.selectedmenuItem = data.name;
    let filedetails = {
      id: Math.floor(Math.random() * 100),name: data.name, details: data.details,
      checked:true
    };

    this.items1.push(filedetails);
    this.items.splice(index, 1);
    this.uploadedDocs.splice(i, 1);
    }

  onSelectionChanged(option ,data,index) {
    console.log('select changed...');
    let d = option.value;
    if(option.value == "Assigned")
    {
      let filedetails = {
        id: Math.floor(Math.random() * 100),name: data.name, details: data.details,
        checked:true
      };

  this.items1.push(filedetails);
  this.uploadedDocs.splice(index, 1);
    }
  }
  onCountrySelectionChanged(event,shoe,i){
    console.log('onCountrySelectionChanged event @@@ :');
    console.log(event.value);
  
    if(event.value  =="Assigned") {
      this.uploadedDocs[i].assigned = "Assigned";
      this.selectedUploadDocs="Select";
    } else {
      this.uploadedDocs[i].assigned = null;
    }
  
  }

  onUrlChanged(option ,data,index,fileindex) {
    console.log('select changed...');
    let d = option.value;
    if(option.value == "Assigned")
    {
      this.UpdatedFilesData[fileindex].assigned = "Assigned";
      this.selectedFilesData="Select";
      let filedetails = {
        id: Math.floor(Math.random() * 100),name: data.url, details: data.url,
        checked:true,Assigned:"Assigned"
      };

  this.items1.push(filedetails);
  this.UpdatedFilesData[fileindex].docUrl.splice(index, 1);
    }
  }

  onFileSelect(input: HTMLInputElement, name:any,i:number): void {
    debugger;
    /**
     * Format the size to a human readable string
     *
     * @param bytes
     * @returns the formatted string e.g. `105 kB` or 25.6 MB
     */
    function formatBytes(bytes: number): string {
      const UNITS = ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const factor = 1024;
      let index = 0;
      while (bytes >= factor) {
        bytes /= factor;
        index++;
      }
      return `${parseFloat(bytes.toFixed(2))} ${UNITS[index]}`;
    }
    const file = input.files[0];

      this.fileName = `${file.name}`;
      let fName ="";
      if(name.value == "")
      {
        fName = this.fileName;
      }
      else{
        fName = name.value;
      }
      this.FileSize =`(${formatBytes(file.size)})`;

      let filedetails = {
        id: 5,name: fName, details: file.name,
        checked:true
      };
  this.items1.push(filedetails);
  this.items.splice(this.uploaddata.index, 1);
  this.files = [];
  this.modalService.dismissAll();
 
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  addPost() {
  	if(this.post.title && this.post.description){
  		this.addPostService.addPost(this.post).subscribe(res =>{
  			this.closeBtn.nativeElement.click();
  		});
  	} else {
  		alert('Title and Description required');
  	}
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
}

onClick(content ,option: MatListOption) {  
  let data: any;
    if(option.selected == true)
    {
       data = this.items[option.value];
       let index = option.value;
       this.open(content,data,index);
    }
}

uploadFile(event) {
  this.files=[];
  for (let index = 0; index < event.length; index++) {
    const element = event[index];
    this.files.push(element.name)
  }  
}
deleteAttachment(index) {
  this.files.splice(index, 1)
}
}

