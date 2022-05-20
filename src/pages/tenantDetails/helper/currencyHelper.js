export const getFormattedAmount=(amount)=> {
    // Format price details and detect zero decimal currencies
    var amount = amount;
    var numberFormat = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'symbol',
    });
    var parts = numberFormat.formatToParts(amount);
    var zeroDecimalCurrency = true;
    for (var part of parts) {
      if (part.type === 'decimal') {
        zeroDecimalCurrency = false;
      }
    }
    amount = zeroDecimalCurrency ? amount : amount / 100;
    var formattedAmount = numberFormat.format(amount);
  
    return formattedAmount;
  }
  