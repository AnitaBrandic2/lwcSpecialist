import getBoatsByLocation from '@salesforce/apex/BoatDataService.getBoatsByLocation';
import { LightningElement,wire } from 'lwc';
import { APPLICATION_SCOPE, createMessageContext, MessageContext, publish, releaseMessageContext, subscribe, unsubscribe } from 'lightning/messageService';

export default class BoatsNearMe extends LightningElement {
  
    error=undefined;
    @wire (getBoatsByLocation)
        BoatsNearMe({error,data}){
        if(data)
        {
           createMapMarkers(data);
        }
        else if (error) {
            this.error = error;
            this.boatId = undefined;
            this.mapMarkers = [];
        }
    }
}