public with sharing class ExchangeRateAPIController {
    @AuraEnabled
    public static map<String, Object> retrieveExchangeRates(String endPointURL) {
        
        map<String, Object> mapJSONData = new map<String, Object>();
        
        String strResponse = null;

        if (String.isNotBlank(endPointURL)) {
             // Instantiate a new http object
            Http http = new Http();

            // Instantiate a new HTTP request, specify the method (GET) as well as the endpoint
            HttpRequest request = new HttpRequest();
            request.setEndpoint(endPointURL);
            request.setMethod('GET');

            try {
                 // Send the request, and return a response
                HttpResponse response = http.send(request);
                if (response.getStatusCode() == 200) {
                    strResponse = response.getBody();
                } else {
                    throw new CalloutException(response.getBody());
                }
            } catch (Exception e) {
                throw e;
            }
        }
        if (String.isNotBlank(strResponse)) {
            mapJSONData = (map<String, Object>) JSON.deserializeUntyped(strResponse);
            System.debug('mapJSONData: ' + mapJSONData);
        }
        return mapJSONData;
    }
}


/*
Execute Anonymous code
ExchangeRateAPIController.retrieveExchangeRates(
'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=GBP&to_currency=USD&apikey=C2LE11OK1EV4V4NH');
*/