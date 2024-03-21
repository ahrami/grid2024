import socket
import sqlite_db
import json
import os

IP = os.getenv('LOCAL_IP')
PORT = int(os.getenv('PORT'))
BUFFER_SIZE = 16

EOF_CHAR = bytes('\0', 'utf-8')

def recvall(sock):
    data = b''
    while(True):
        part = sock.recv(BUFFER_SIZE)
        data += part
        print('recieved part:', part)
        if data[len(data)-1:len(data)] == EOF_CHAR:
            return data[0:len(data)-1]
        if len(part) < BUFFER_SIZE:
            return False

print('IP =', IP)
print('PORT =', PORT)

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.bind((IP, PORT))
sock.listen(1)

print('Successfully started TCP server')

db1 = sqlite_db.db('data/database.db')

print('Successfully connected to a database')

while(True):
    print('Trying to connect')
    conn, addr = sock.accept()
    print('Connection address:', addr)
    while(True):
        try:
            data = recvall(conn)
            if not data: 
                print('No data recieved, dropping connection')
                break
            data = json.loads(data)
            query = data['query']
            print('executing:', query)
            res, err = db1.execute(query)
            data = { 'result' : res, 'error': err }
            data = json.dumps(data)
            data = bytes(data, 'utf-8')
            data += EOF_CHAR
            conn.sendall(data)
        except ConnectionResetError as err:
            print("Connection Reset Error:", err.strerror)
            break
    conn.close()