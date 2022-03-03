import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';
import { LightningElement,wire,track,api } from 'lwc';

export default class BoatSearchForm extends LightningElement {
    selectedBoatTypeId = '';
  
    // Private
    error = undefined;
    
    searchOptions;
    
    // Wire a custom Apex method
    @wire (getBoatTypes)
      boatTypes({ error, data }) {
      if (data) {
        this.searchOptions = data.map(type => {
          return {
            label: type.Name,
            value: type.Id
            };
        });
        this.searchOptions.unshift({ label: 'All Types', value: '' });
      } else if (error) {
        this.searchOptions = undefined;
        this.error = error;
      }
    }
    
    // Fires event that the search option has changed.
    // passes boatTypeId (value of this.selectedBoatTypeId) in the detail
    handleSearchOptionChange(event) {
      event.preventDefault();
        this.selectedBoatTypeId = event.detail.value;
        const searchEvent = new CustomEvent("search", {
        detail: {
        boatTypeId: this.selectedBoatTypeId
        }
        });
        this.dispatchEvent(searchEvent);
    }
}