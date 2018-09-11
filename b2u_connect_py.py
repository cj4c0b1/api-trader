import datetime
import time
import hmac
import hashlib
import json
import socket
import websocket

def get_signature():
    key = API_KEY
    secret = SECRET_KEY
    user = USER_ID
    dt = datetime.datetime.now()
    nonce = str(int((time.mktime( dt.timetuple() )  + dt.microsecond/1000000.0) * 1000000))
    print(secret)
    signature = hmac.new(bytes(secret, 'utf8'), bytes((nonce + user + key), 'utf8'), digestmod=hashlib.sha256).hexdigest()
    return key, nonce, signature, user



def get_balance_btcyou_ws():


    key, nonce, signature, user = get_signature()

    dados = {
        'APIKey': key,
        'Signature': signature,
        'UserId' : user,
        'Nonce': nonce
    }
    # print()
    data = {
        'm': 0,
        'i': 1,
        'n': 'AuthenticateUser',
        'o': json.dumps(dados, separators=(',',':'))
    }

    ws = websocket.create_connection('wss://bitcointoyou.alphapoint.com/WSGateway/')
    ws.send(json.dumps(data, separators=(',',':')))

    print (ws.recv())

    ws.close()
