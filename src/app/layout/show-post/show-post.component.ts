import { Component, OnInit, NgModule, ElementRef, Injectable, Inject, ViewChild, QueryList } from '@angular/core';
import { ShowPostService } from './show-post.service';
import { DOCUMENT, DatePipe } from '@angular/common';
import { Post } from '../../models/post.model';
import { ViewportScroller } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { PageScrollService } from 'ngx-page-scroll-core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { observable } from 'rxjs';
declare var jQuery: any;

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.scss'],
  providers: [ShowPostService, DatePipe]
})

@Injectable()
export class ShowPostComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];
  @ViewChild("titleInput") titleInput: QueryList<ElementRef>;
  @ViewChild("edittitleInput") edittitleInput: QueryList<ElementRef>;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  underUpdateTagId = null;
  public posts: any = [];

  selectedcase = "1";
  fileToUpload: File = null;
  replyToMsg = "";
  playerName: string = "";
  jsonArray: any = [];
  urls: any = [];
  usermsg: string = "";
  editusermsg: string = "";
  selected_index = 0;
  public fullName: string = "";
  public isEdit: boolean = false;
  public editArrayData: any = [];
  public isEditPost:boolean=false;
  public attachedFileName:any=[];
  public fileNameEdit:any=[];
  public AssignInfo:any=['Assign'];
  closeResult: string;
  cases: any = [
    { value: 'case1', viewValue: 'case1' },
    { value: 'case2', viewValue: 'case2' },
    { value: 'case3', viewValue: 'case3' },
  ];

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

  ClientData = {
    "clientName": "Jhon Smith", "cases": [
      { "id": "1", "case": "Case1", "caseType": "Type1", "caseStatus": "waiting for documents" },
      { "id": "2", "case": "Case2", "caseType": "Type2", "caseStatus": "documents on varification" },
      { "id": "3", "case": "Case3", "caseType": "Type3", "caseStatus": "waiting for emails" },
    ], "caseDocuments": [
      { "case": "Case1", "documents": [{ "msg": "Need to fill primary form to complete first step.", "name": "PdfDoc", "docUrl": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/9487/LV_MOTOR_DOCUMENT_OF_INSURANCE.pdf" }, { "msg": "Check given documentations requriments", "name": "test doc", "docUrl": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/9487/LV_MOTOR_DOCUMENT_OF_INSURANCE.pdf" }, { "msg": "Attach your documentation soft copies.", "name": "text2", "docUrl": "../../../assets//images//png-logo-design-logo-brand-design-459.png" }, { "msg": "Attach your pics here.", "name": "Images", "docUrl": "../../../assets//images//png-logo-design-logo-brand-design-459.png" }] },
      { "case": "Case2", "documents": [{ "msg": "Need to check given attachment.", "name": "PdfDoc", "docUrl": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/9487/LV_MOTOR_DOCUMENT_OF_INSURANCE.pdf" }] },
      { "case": "Case3", "documents": [] },
    ], "massages": [
      { "case": "Case1", "msgs": [{ "Id": "test1", "FromName": "ABC user", "msg": "Please check the document checkout list", "date": "22-March-2020", "time": "10:30", "reply": [{ "Id": "1", "msgId": "test1", "reply": "Yes I will update that shortly", "docUrl": null, "date": "01-April-2020", "time": "10:30" }] }, { "Id": "test7", "FromName": "ABC", "msg": "this is a sample msg", "date": "01-April-2020", "time": "10:35", "reply": [{ "Id": "2", "msgId": "test1", "reply": "Please check the attached file.", "docUrl": null, "date": "01-April-2020", "time": "10:30" }, { "Id": "2", "msgId": "test7", "reply": "PdfDoc", "docUrl": "../../../assets//images//png-logo-design-logo-brand-design-459.png" }] }, { "Id": "test0", "FromName": "ABC", "msg": "Test msgs", "date": "03-April-2020", "time": "10:30" }] },
      { "case": "Case2", "msgs": [{ "Id": "test2", "FromName": "Lmn user ", "msg": "Please check the document checkout list", "date": "24-March-2020", "time": "11:30" }, { "Id": "test8", "FromName": "xyz", "msg": "Please review and complete these forms", "date": "01-April-2020", "time": "11:40" }, { "Id": "test9", "FromName": "ABC", "msg": "Test msgs111111", "date": "01-April-2020", "time": "11:00" }] },
      { "case": "Case3", "msgs": [{ "Id": "test3", "FromName": "AopqBC user", "msg": "Please check the document checkout list", "date": "01-April-2020", "time": "12:23" }] },
    ]
  }

  typesOfShoes: string[] = ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/9487/LV_MOTOR_DOCUMENT_OF_INSURANCE.pdf', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/9487/LV_MOTOR_DOCUMENT_OF_INSURANCE.pdf', 'Loafers', 'Moccasins', 'Sneakers'];
  constructor(private modalService: NgbModal, private datePipe: DatePipe, private activatedRoute: ActivatedRoute, private route: Router, private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any, private showPostService: ShowPostService, public myElement: ElementRef, private _scrollToService: ScrollToService) {
  }


  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  getInitials = function (string) {
    var names = string.split(' ');
    console.log("names", names)
    var initials = "";

    names.forEach(name => {
      if (name != "" && name != " ") {
        return initials += name[0].toUpperCase();
      }
    });

    console.log("firstLetters", initials)
    return initials;
  };
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      var size = file.size;
      const totalSize = Math.round((size / 1024 / 1024));
      if (totalSize > 10) {
        // this.FileUploadError = "File is too big.";
        return;
      }
      else {
        // this.FileUploadError = "";
      }
    }
    else {
      //this.IsDisabled = true;
      // this.FileUploadError = "";
    }
  }
  goToMsg(id) {
    let el = this.myElement.nativeElement.querySelector(id);
    el.scrollIntoView();
  }

  public triggerScrollTo(id) {
    const config: ScrollToConfigOptions = {
      target: id
    };
    this._scrollToService.scrollTo(config);
  }

  ReplyToMsg(data, val) {
    this.replyToMsg = data;
  }

  MsgReply(replydata, fromdata) {
    if (this.isEdit == false) {
      var reply = replydata.value;
      var file = this.files;
      var msgindex = this.selected_index;
      var date = new Date();
      var currentdate = this.datePipe.transform(date, 'dd-MMMM-yyyy');
      var time = this.datePipe.transform(date, 'hh:mm');
      let filedetails = { case: this.selectedcase, Id: "2", msgId: "test1", reply: replydata.value, docUrl: [], date: currentdate, time: time,assigned:null,urlNotAssign:[] };
      this.posts.push(filedetails);
      if (file.length == 0 || file == null) {
        var fileurl = null;
      }
      else {
        //
        let dataFile = this.attachedFileName;
        this.attachedFileName=[];

        console.log('@@@@@ attached file array :',dataFile);
        for (var i = 0; i <= dataFile.length; i++) {
        if(dataFile[i].assign!=null){
          //assigned
          this.AssignInfo[i]="Assign";
          var fileurl = dataFile[i]['name'];
          var t = this.ClientData.massages[msgindex].msgs.length;
          this.posts[this.posts.length - 1].docUrl.push({ "url": fileurl });
          localStorage.setItem('PostsData', JSON.stringify(this.posts));
          this.usermsg = '';
          this.replyToMsg = '';
          this.files = [];
        }
        else{
           //not assigned 
           //var fileurl =  null;
           var fileurl=dataFile[i]['name'];
          // var t = this.ClientData.massages[msgindex].msgs.length;
           this.posts[this.posts.length - 1].urlNotAssign.push({ "urlNotAssign": fileurl });
           localStorage.setItem('PostsData', JSON.stringify(this.posts));
           this.usermsg = '';
           this.replyToMsg = '';
           this.files = [];
        }
      }
      }
      this.usermsg = '';
      this.replyToMsg = '';
      setTimeout(()=>{this.scrollToBottom();},100);
    }
    else {
      //edit code
      if(this.isEditPost==false){
        console.log('Edited Text : ', this.editusermsg);
        this.editArrayData.reply = this.editusermsg;
        this.editusermsg = '';
        this.isEdit = false;
      }
      else{
        console.log('Edited POST Text : ', this.editusermsg,'Edit array data :',this.editArrayData);
        this.editArrayData.reply = this.editusermsg;
        this.editArrayData['isEdit']=false;
        this.editusermsg = '';
        this.isEdit = false;
        this.isEditPost=false;
        console.log('After edit array data : ',this.editArrayData);
      }  
      setTimeout(()=>{this.scrollToBottom();},100);
    }
  }

  EditMsgReply(replydata, fromdata,i,j)
  {
    //edit code
    if(this.isEditPost==false){
      console.log('Edited Text : ', this.editusermsg);
      this.jsonArray[2].msgs[j].reply[i]['isEdit']=false;
      this.editArrayData.reply = this.editusermsg;
      this.editusermsg = '';
      this.isEdit = false;
    }
    else{
      console.log('Edited POST Text : ', this.editusermsg,'Edit array data :',this.editArrayData);
      this.editArrayData.reply = this.editusermsg;
      //this.jsonArray[2].msgs[j].reply[i]['isEdit']=false;
      this.posts[i]['isEdit']=false;
      this.editusermsg = '';
      this.isEdit = false;
      this.isEditPost=false;
      console.log('After edit array data : ',this.editArrayData);
    }  
    setTimeout(()=>{this.scrollToBottom();},100);
  }

  cancelEdit(i,j,data)
  {
    //edit code
    if(this.isEditPost==false){
      console.log('Edited Text : ', this.editusermsg);
      this.jsonArray[2].msgs[j].reply[i]['isEdit']=false;
      this.editArrayData.reply = data.reply;
      this.editusermsg = '';
      this.isEdit = false;
    }
    else{
      console.log('Edited POST Text : ', this.editusermsg,'Edit array data :',this.editArrayData);
      this.editArrayData.reply = data.reply;
      //this.jsonArray[2].msgs[j].reply[i]['isEdit']=false;
      this.posts[i]['isEdit']=false;
      this.editusermsg = '';
      this.isEdit = false;
      this.isEditPost=false;
      console.log('After edit array data : ',this.editArrayData);
    }  
    setTimeout(()=>{this.scrollToBottom();},100);
  }

  onUpload() { }
  onCountrySelectionChanged(data) {
    console.log('select changed...');
    this.selectedcase = data.value;
    for (var n = 0; n < this.ClientData.cases.length; n++) {
      if (this.ClientData.cases[n].id == this.selectedcase) {
        this.jsonArray = [];
        console.log("data", this.ClientData.cases[n]);
        this.selected_index = n;
        this.jsonArray.push(this.ClientData.cases[n], this.ClientData.caseDocuments[n], this.ClientData.massages[n]);
      }
      console.log(this.jsonArray.length);
    }
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  ngAfterViewChecked() {
    //this.scrollToBottom();
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  ngOnInit() {
    //this.scrollToBottom();
    this.activatedRoute.params.forEach(params => {
      this.selectedcase = params["id"];
      if (this.selectedcase == null || this.selectedcase == undefined) {
        this.selectedcase = "1";
      }
      let index = parseInt(this.selectedcase);
      for (var n = 0; n < this.ClientData.cases.length; n++) {
        if (this.ClientData.cases[n].id == this.selectedcase) {
          this.jsonArray = [];
          console.log("data", this.ClientData.cases[n]);
          this.jsonArray.push(this.ClientData.cases[n], this.ClientData.caseDocuments[n], this.ClientData.massages[n]);
        }
        console.log(this.jsonArray);
      }

    });

    var data = localStorage.getItem('PostsData');
    if (data != null) {
      this.posts = JSON.parse(data);
      console.log('PostsData Localstorage value : ',this.posts);
    }

    this.pageScrollService.scroll({
      document: this.document,
      scrollTarget: '.theEnd',
    });
  }

  public myEasing = (t: number, b: number, c: number, d: number): number => {
    // easeInOutExpo easing
    if (t === 0) {
      return b;
    }
    if (t === d) {
      return b + c;
    }
    if ((t /= d / 2) < 1) {
      return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    }
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
  }

  doSmth(reachedTarget: boolean): void {
    if (reachedTarget) {
      console.log('Yeah, we reached our destination');
    } else {
      console.log('Ohoh, something interrupted us');
    }
  }

  onClick() {
    this.files = [];
    const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({ data: file, inProgress: false, progress: 0 });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }
  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

  // uploadFile(file) {
  //   const formData = new FormData();
  //   formData.append('file', file.data);
  //   file.inProgress = true;

  // }
  beforeEdit(jsonArray, index) {
    this.underUpdateTagId = jsonArray.Id;
    //this.titleInput.toArray()[index].nativeElement.focus();
    this.edittitleInput.toArray()[index].nativeElement.focus();
  }

  editClick(data, i, j) {
    if(j!='ePost'){
      console.log('selected edit message : ', JSON.stringify(data));
      this.editusermsg = data.reply;
      var arrayJson = this.jsonArray[2].msgs[0].reply;
      //this.jsonArray[2].msgs[j].reply[i].isEdit == true;
      this.jsonArray[2].msgs[j].reply[i]['isEdit']=true;
      console.log('this.jsonArray[2].msgs[j].isEdit===>'+this.jsonArray[2].msgs[j].reply[i].isEdit);
      console.log('json array : ', arrayJson);
      console.log('JSON FULL ARRAY : ', this.jsonArray[2].msgs[j].reply[i], i, j);
      this.isEdit = true;
      this.editArrayData = this.jsonArray[2].msgs[j].reply[i];
    }
    else
    {
      console.log('edit click post selected message : ',data);
      this.editusermsg = data.reply;
      console.log('JSON post array:',this.posts);
      this.posts[i]['isEdit']=true;
      console.log('JSON post array:',this.posts);
      this.isEdit = true;
      this.isEditPost=true;
      this.editArrayData = this.posts[i];
    }
  }

  fileEvent(data){
    console.log('File event called : ',data);
    let file = data.target.files[0];
    this.attachedFileName.push({
      name: file.name,
      size: file.size,
      type: file.type,
      assign:null
    });
    console.log('@@@@ FileName : ',this.attachedFileName);
  }

  editFileName(data,f){
    console.log('edit file name is called ...');
    console.log('edit text is :',data.name,' , and index is :',f);
    this.fileNameEdit[f] = data.name;
  }
  clearAttachedFile(filenm,f){
    console.log('@@@@@@@ File data :',filenm);
    console.log('@@ index :', f);
    const index: number = this.attachedFileName.indexOf(filenm);
    if (index !== -1) {
        this.attachedFileName.splice(index, 1);
        this.fileNameEdit=[];
        console.log('removed the attached file..');
    }  
  }
  saveFileName(file,filename,f){
    console.log('Save file name is called....');
    console.log('@@@@ filedata:',file,', @@@file name edit :', filename, ' @@@index :',f);
    console.log('@@@@@@@ Attached filename array :', this.attachedFileName);

   let fnm = filename;
   this.fileNameEdit=[];

   for (let i = 0; i < this.attachedFileName.length; i++) {
     console.log('for loop #### ');
     if(this.attachedFileName[i]==file){
       console.log('@@@ ACCESSED  NAME : ',this.attachedFileName[i]['name']);
       this.attachedFileName[i]['name'] = fnm;//set the new updated name 
     }
  }
  }

  assignAttachmentClick(file,assign,f){
    if(assign=="assign")
    {
      console.log('assignAttachmentClick is called...');
      console.log('file : ',file, ', assign :', assign, 'f index :', f);
      let dt = this.attachedFileName;
      console.log('File Array before assigned :',dt);
        this.attachedFileName[f].assign = 'Assigned';
        this.AssignInfo[f]="Assigned";
        console.log('File Array after assigned :',this.attachedFileName);
    }
    else{
      console.log('assignAttachmentClick is called...');
      console.log('file : ',file, ', assign :', assign, 'f index :', f);
      let dt = this.attachedFileName;
      console.log('File Array before assigned :',dt);
      this.attachedFileName[f].assign = null;
      this.AssignInfo[f]="Assign";
      console.log('File Array after assigned :',this.attachedFileName);
    }  
  }
  
  open(content) {
  
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  ModelClose(content)
  {
    this.attachedFileName=[];
    this.files=[];
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

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.attachedFileName.push({
        name: element.name,
        size: element.size,
        type: element.type,
        assign:null
      });
      this.files.push(element.name)
    }  
  }
  deleteAttachment(index) {
    this.files.splice(index, 1)
    this.attachedFileName.splice(index, 1);
  }
}
