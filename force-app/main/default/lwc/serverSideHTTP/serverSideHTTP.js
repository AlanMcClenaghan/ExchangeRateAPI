import { LightningElement } from 'lwc';
import exchangeRateData from '@salesforce/apex/ExchangeRateAPIController.retrieveExchangeRates'

export default class ServerSideHTTP extends LightningElement {

    options = [
        {label: 'Austrailia - AUD', value: 'AUD'},
        {label: 'Canada - CAD', value: 'CAD'},
        {label: 'China - CNY', value: 'CNY'},
        {label: 'Eurozone - EUR', value: 'EUR'},
        {label: 'India INR', value: 'INR'},
        {label: 'Japan - JPY', value: 'JPY'},
        {label: 'UK - GBP', value: 'GBP'},
        {label: 'USA - USD', value: 'USD'}
    ]

    fromCurrencyValue = 'GBP';
    toCurrencyValue;
    fromQuery;
    toQuery;
    displayData;


   fromCurrencyChangeHandler(event) {
        this.fromCurrencyValue = event.target.value;
        console.log('fromCurrencyValue: ' + this.fromCurrencyValue); 
    }

    toCurrencyChangeHandler(event) {
        this.toCurrencyValue = event.target.value;
        console.log('toCurrencyValue: ' + this.toCurrencyValue); 
    }

    currencyConversionHandler() {
        console.log('fromCurrencyValue: ' + 
                    this.fromCurrencyValue + 
                    ' ' +
                    'toCurrencyValue: ' + 
                    this.toCurrencyValue );
    }

}