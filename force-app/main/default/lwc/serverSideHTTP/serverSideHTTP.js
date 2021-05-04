import { LightningElement } from 'lwc';
import retrieveExchangeRates from '@salesforce/apex/ExchangeRateAPIController.retrieveExchangeRates'

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
    display = false;
    error = false;


    fromCurrencyChangeHandler(event) {
        this.fromCurrencyValue = event.target.value;
    }

    toCurrencyChangeHandler(event) {
        this.toCurrencyValue = event.target.value;
    }

    hideResults() {
        this.display = false;
        this.error = false;
    }

    clearQueries() {
        this.template.querySelectorAll('lightning-input').forEach(element => {
            element.value = null;
        });
        this.displayData = {};
        this.fromCurrencyValue = 'GBP';
        this.toCurrencyValue = '';
        this.fromQuery = '';
        this.toQuery = '';
    }

    resetHandler(event) {
        this.hideResults();
        this.clearQueries();
    }

    currencyConversionHandler() {

        this.hideResults();

        // USING SERVER-SIDE HTTP API call

        let endpoint = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency='
                        + this.fromCurrencyValue 
                        + '&to_currency=' 
                        + this.toCurrencyValue 
                        + '&apikey=BTPCEJAG4SXCEC95';

        retrieveExchangeRates({endPointURL : endpoint})
        .then(data => {
            console.log(data);

            let exchangeData = data['Realtime Currency Exchange Rate'];

            let tempData = {
                From_Currency_Code : '',
                From_Currency_Name : '',
                To_Currency_Code : '',
                To_Currency_Name : '',
                Last_Refreshed : '',
                Exchange_rate : ''
            }

            
            console.log(exchangeData);
            console.log(tempData);
            tempData.From_Currency_Code = exchangeData['1. From_Currency Code'];
            tempData.From_Currency_Name = exchangeData['2. From_Currency Name'];
            tempData.To_Currency_Code = exchangeData['3. To_Currency Code'];
            tempData.To_Currency_Name = exchangeData['4. To_Currency Name'];
            tempData.Exchange_rate  = exchangeData['5. Exchange Rate'];
            tempData.Last_Refreshed = exchangeData['6. Last Refreshed'];
            console.log(tempData);
            this.displayData = tempData;
            console.log(this.displayData);
            this.display = true;
        })
        .catch(error => {
            console.log("Not a valid Currency Code");
            this.error = true;
            console.error(error);
        })

        this.clearQueries();
   
    }

}


