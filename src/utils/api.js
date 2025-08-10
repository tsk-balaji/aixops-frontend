export async function getApiResponse(message) {
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (message.toLowerCase().includes('order status')) {
    return {
      type: 'table',
      data: {
        headers: ['Order ID', 'Item', 'Status', 'Carrier'],
        rows: [
          ['12345-A', 'iPhone 15 Pro', 'In Transit', 'UPS'],
          ['12346-B', 'Samsung Galaxy S23', 'Delivered', 'FedEx'],
          ['12347-C', 'Google Pixel 8', 'Processing', 'N/A'],
        ]
      }
    };
  }

  if (message.toLowerCase().includes('fraud alert')) {
    return {
      type: 'structured',
      content: {
        output: "This is a detailed analysis of a potential fraud event. The system flagged a high-value trade-in from a new account with a different shipping address than the billing address. This raises a red flag for potential fraudulent activity.",
        fraud_rule: {
          "query": {
            "bool": {
              "must": [
                { "match": { "event.type": "fraud_detection" } },
                { "term": { "user.new_account": true } },
                { "range": { "trade_in.value": { "gte": 800 } } },
                { "match": { "address.billing_mismatch": true } }
              ]
            }
          }
        }
      }
    };
  }

  if (message.toLowerCase().includes('trade-in value')) {
    return {
      type: 'text',
      data: "The trade-in value for an iPhone 13 in good condition is estimated to be $450. The final value is subject to a full inspection after it is received.",
    };
  }

  return {
    type: 'text',
    data: 'I received your message. You can ask for an "order status," a "fraud alert" or about a "trade-in value" to see different response types!',
  };
}