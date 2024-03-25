import socket
import time
import json
import os

IP = 'localhost'
PORT = 8000
BUFFER_SIZE = 16

EOF_CHAR = bytes('\0', 'utf-8')

def recvall(sock):
    data = b''
    while(True):
        part = sock.recv(BUFFER_SIZE)
        data += part
        if data[len(data)-1:len(data)] == EOF_CHAR:
            return data[0:len(data)-1]
        if len(part) < BUFFER_SIZE:
            return False

print('IP =', IP)
print('PORT =', PORT)

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
while(True):
    try:
        sock.connect((IP, PORT))
        print('Successfully connected')
        break
    except:
        print('Could not connect, waiting for 1 second')
        time.sleep(1)

def execute(query):
    data = { "query" : query }
    data = json.dumps(data)
    data = bytes(data, 'utf-8')
    data += EOF_CHAR
    sock.sendall(data)

    data = recvall(sock)
    try:
        data = json.loads(data)
    except ValueError as e:
        data = {}
        data['error'] = 'Recieved an invalid json'
    if data['result'] is None:
        return data['error']
    return data['result']

while True:
    print('query: ', end='')
    query = input()
    if query == 'exit':
        break
    res = execute(query)
    print('result:', res)


