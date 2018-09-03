const CryptoJS = require("crypto-js");
const WebSocket = require('ws');
let countRequest = 0;

var ws = new WebSocket("wss://bitcointoyou.alphapoint.com/WSGateway/");
ws.on('open', () => {

	//Config
	let nonce = (new Date().getTime()).toString();
	const APIKey = "";
	const APISecret = "";
	const userID = '';

	// Create apiSig
	let apiSig = CryptoJS.HmacSHA256(nonce + userID + APIKey, APISecret);
	apiSig = CryptoJS.enc.Hex.stringify(apiSig);
	//apiSig = CryptoJS.enc.Base64.stringify(apiSig);

	let dados = {
		APIKey: APIKey,
		Signature: apiSig,
		UserId: userID,
		Nonce: nonce
	}

	let sendRequest = {
		m: 0,
		i: ++countRequest,
		n: 'AUTHENTICATEUSER',
		o: JSON.stringify(dados)
	}

	// Send 
	let sendMessage = JSON.stringify(sendRequest);
	ws.send(sendMessage);


	// Test create order
	setTimeout(() => {

		let orderLimitSell = {
			AccountId: 0,
			Side: 0,
			Quantity: 0,
			OrderType: 0,
			InstrumentId: 0,
			TimeInForce: 0,
			OMSId: 0,
			LimitPrice: 0
		}

		let sendRequestOrder = {
			m: 0,
			i: ++countRequest,
			n: 'SENDORDER',
			o: JSON.stringify(orderLimitSell) }

		// Send 
		console.log(sendRequestOrder)
		let sendMessageOrder = JSON.stringify(sendRequestOrder);

		ws.send(sendMessageOrder);
	}, 3000);

	// Test Cancel order
	// setTimeout(() => {

	// 	let orderCancel = {
	// 		OMSId: 1,
	// 		OrderId: 72341
	// 	}

	// 	let sendRequestOrder = {
	// 		m: 0,
	// 		i: ++countRequest,
	// 		n: 'CancelOrder',
	// 		o: JSON.stringify(orderCancel) }

	// 	// Send 
	// 	let sendMessageOrder = JSON.stringify(sendRequestOrder);

	// 	ws.send(sendMessageOrder);		
	// }, 3000);	
});

ws.on('message', (data) => {
	console.log(data);
});

ws.on('close', () => {
	console.log('disconnected');
});
