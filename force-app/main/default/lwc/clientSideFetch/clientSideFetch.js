import { LightningElement } from 'lwc';

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

        // USING CLIENT-SIDE REST API call
        
        fetch('https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency='
            + this.fromCurrencyValue 
            + '&to_currency=' 
            + this.toCurrencyValue 
            + '&apikey=C2LE11OK1EV4V4NH')
        .then(response=>response.json())
        .then(data=>{
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

            tempData.From_Currency_Code = exchangeData['1. From_Currency Code'];
            tempData.From_Currency_Name = exchangeData['2. From_Currency Name'];
            tempData.To_Currency_Code = exchangeData['3. To_Currency Code'];
            tempData.To_Currency_Name = exchangeData['4. To_Currency Name'];
            tempData.Exchange_rate  = exchangeData['5. Exchange Rate'];
            tempData.Last_Refreshed = exchangeData['6. Last Refreshed'];
            this.displayData = tempData;
            this.display = true;
        })
        .catch(error => {
            this.error = true;
            console.error(error);
        })

        this.clearQueries();
   
    }

}


