import { LightningElement,wire } from 'lwc';
import getAccountRecords from '@salesforce/apex/lwcPagination.getAccountsList';
import getContactRecords from '@salesforce/apex/lwcPagination.getContactList';
export default class LwcPagination extends LightningElement {

accountRecords;
contactsRecords;
searchKeyword;
selectObjectName;
objectName;
showAccountDataTable = false;
showContactDataTable = false;

//for paginations
currentPage=1;
recordsize =5;
totalPages;

    get optionsObject() {
        return [
            { label: 'Account', value: 'account' },
            { label: 'Contact', value: 'contact' }
        ];
    }

    contactColumns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Email', fieldName: 'Email' },
        { label: 'Title', fieldName: 'Title'}
    ];

    accountColumns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Phone', fieldName: 'Phone' },
        { label: 'Website', fieldName: 'Website'}
    ];

    selectObjectsName = (event) =>{
        this.objectName = event.target.value;
    }

    processKeyword = (event) =>{
        this.searchKeyword = event.target.value;
    }

    handleSearchRecords = () =>{

        switch (this.objectName) {
            case 'account': this.handleAccountSearch();
            break;
            
            case 'contact' : this.handleContactSearch();
            break;

            default:
            break;
        }
    }

    handleAccountSearch = () =>{
        this.showAccountDataTable = true;
        this.showContactDataTable = false;

        const start = (this.currentPage-1)*this.recordsize;
        const end = this.recordsize*this.currentPage;

        getAccountRecords({accountName : this.searchKeyword})
        .then(acc =>{
            this.accountRecords = [...acc.slice(start,end)];
            this.totalPages = Math.ceil(acc.length/this.recordsize);
        })
        .catch(error=>{
            console.log(error);
        })
        
    }

    handleContactSearch = () =>{
        this.showContactDataTable = true;
        this.showAccountDataTable = false;

        const start = (this.currentPage-1)*this.recordsize;
        const end = this.recordsize*this.currentPage;

        getContactRecords({contactName : this.searchKeyword})
        .then(con =>{
            this.contactsRecords = [...con.slice(start,end)];
            this.totalPages = Math.ceil(acc.length/this.recordsize);
        })
        .catch(error=>{
            console.log(error);
        })
    }

    handlePrevious = () =>{
        if(this.currentPage>1){ // && this.currentPage !== this.totalPages
            this.currentPage = this.currentPage-1;
            if(this.objectName === 'account'){
                this.handleAccountSearch();
            }
            else if(this.objectName === 'contact'){
                this.handleContactSearch();
            }
            
        }
    }

    handleNext = () =>{
        if(this.currentPage<this.totalPages){ // && this.currentPage !== this.totalPages
            this.currentPage = this.currentPage+1;
            if(this.objectName === 'account'){
                this.handleAccountSearch();
            }
            else if(this.objectName === 'contact'){
                this.handleContactSearch();
            }
            
        }
    }

    get enablePagination(){
        return this.showContactDataTable || this.showAccountDataTable;
    }

    get disableNext(){
        return this.currentPage >= this.totalPages;
    }

    get disablePrevious(){
        return this.currentPage <= 1;
    }
}
