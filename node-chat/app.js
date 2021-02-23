/*Node.js 기본 내장 모듈 불러오기*/
const fs = require('fs')

/*설치한 express 모듈 불러오기*/
const express = require('express')

/*설치한 socket.io 모듈 불러오기*/
const socket = require('socket.io')

/*Node.js 기본 내장 모듈 불러오기*/
const http = require('http')

/*express 객체 생성*/
const app = express()

/*생성된 서버를 socket.io에 바인딩*/
const server = http.createServer(app)

/*생성된 서버를 socket.io에 바인딩*/
const io = socket(server)

app.use('/css', express.static('./static/css'))
app.use('/js', express.static('./static/js'))

/*get 방식으로 / 경로에 접속하면 실행됨*/
app.get('/', function(request, response){
	fs.readFile('./static/index.html', function(err, date){
		if(err){
			response.send('에러')
		}else{
			response.writeHead(200, {'Content-Type':'text/html'})
			response.write(date)
			response.end()
		}
	})
})


io.sockets.on('connection', function(socket){
	console.log('유저 접속 됨')
	
	socket.on('send', function(data){
		console.log('전달된 메시지',data.msg)
	})
	
	socket.on('desconnect', function(){
		console.log('접속 종료')
	})
})

server.listen(8090, function(){
	console.log('서버 실행 중 ...')
})
