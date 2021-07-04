public with sharing class lwcPagination {
    // public lwcPagination() {

    // }
    @AuraEnabled(cacheable=true)
    public static list<Account> getAccountsList(String accountName){
        try {
            list<Account> accountList = [SELECT Id,Name,Website,Phone FROM Account WHERE Name LIKE : '%'+accountName+'%'];
            return accountList;
        } 
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }   
    
    @AuraEnabled(cacheable=true)
    public static list<Contact> getContactList(String contactName){
        try {
            list<Contact> contactList = [SELECT Id, Name, Email, Title, Department FROM Contact WHERE LastName LIKE : '%'+contactName+'%'];
            return contactList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}
