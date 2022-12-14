import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// function joinGame(socket) {
//   let ball = new Ball(socket);
//   balls.push(ball);
//   ballMap[socket.id] = ball;
//   return ball;
// }

// function leaveGame(socket) {
//   for (let i = 0; i < balls.length; ++i) {
//     if (balls[i].id == socket.id) {
//       balls.splice(i, 1);
//       break;
//     }
//   }
//   delete ballMap[socket.id];
// }

// function updateGame() {
//   let currentUpdateTime = new Date().getTime();
//   let deltaTime = currentUpdateTime - prevUpdateTime;
//   prevUpdateTime = currentUpdateTime;
//   let timeRate = deltaTime / (1000 / 60);
//   for (let i = 0; i < balls.length; ++i) {
//     let ball = balls[i];
//     ball.applyInputs();
//     ball.handleInput(timeRate);
//   }
//   setTimeout(updateGame, 16);
// }

// function broadcastState() { //전체 볼 정보를 상대방한테 보낸다
//   stateNum += 1;
//   let data = {};
//   data.state_num = stateNum;
//   for (let i = 0; i < balls.length; ++i) {
//     let ball = balls[i];
//     data[ball.id] = { last_input_num: ball.lastInputNum, x: ball.x, y: ball.y };
//   }
//   io.sockets.emit("update_state", data);
//   setTimeout(broadcastState, 33);
// }

// var balls = [];

// class Ball {
//   constructor(socket) {
//     this.socket = socket;
//     this.x = 0;
//     this.y = 0;
//     this.color = getRandomColor();
//     this.inputMap = {};
//     this.inputBuffer = [];
//     this.lastInputNum = 0;
//   }
//   get id() {
//     return this.socket.id;
//   }
//   checkKey(key) {
//     return this.inputMap[key];
//   }
//   pushInput(inputData) {
//     this.inputBuffer.push(inputData);
//   }
//   applyInputs() {
//     let left = this.inputBuffer.length;
//     while (left > 0) {
//       left -= 1;
//       let input = this.inputBuffer.shift();
//       if (input.num > this.lastInputNum) {
//         this.lastInputNum = input.num;
//         this.inputMap.w = input.w;
//         this.inputMap.s = input.s;
//         this.inputMap.a = input.a;
//         this.inputMap.d = input.d;
//       }
//     }
//   }
//   handleInput(timeRate) {
//     let vx = 0;
//     let vy = 0;
//     if (this.checkKey("w")) {
//       vy = -4;
//     }
//     if (this.checkKey("s")) {
//       vy = 4;
//     }
//     if (this.checkKey("a")) {
//       vx = -4;
//     }
//     if (this.checkKey("d")) {
//       vx = 4;
//     }
//     this.x += vx * timeRate;
//     this.y += vy * timeRate;
//   }
// }

@WebSocketGateway(8080, { cors: true })
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  publicRooms(keyword: string) {
    const {
      sockets: {
        adapter: { sids, rooms },
      },
    } = this.server;

    const publicRooms = [];
  
    rooms.forEach((id, roomName) => {
      if(!roomName.includes(keyword)) {
        return;
      }
      
      if (sids.get(roomName) === undefined) {
        const roomId = [...id][0];
        
        let owner = this.server.sockets.adapter
          .nsp.sockets
          .get(roomId)
          .nickname
  
        publicRooms.push({
          roomName,
          owner,
          userCount:1
        });
      }
    });

    return publicRooms;
  }

  countRoom(roomName: string) {
    return this.server.sockets.adapter.rooms.get(roomName)?.size;
  }

  nicknames = {
  }

  handleConnection() {
    console.log("Connect!")

    this.server.emit('load_rooms', this.publicRooms(''));
  }

  handleDisconnect() {
    console.log("Disconnect")
  }

  @SubscribeMessage('load_rooms')
  async handleLoadRooms(@MessageBody() data: {keyword: string, state: number}) {
    this.server.emit('load_rooms', this.publicRooms(data.keyword), data.state);
  }

  @SubscribeMessage('search_rooms')
  async handleSearchRooms(@MessageBody() data: {keyword: string, state: number}) {
    this.server.emit('search_rooms', {rooms: this.publicRooms(data.keyword), state: data.state});
  }

  @SubscribeMessage('chat')
  async handleChat(@MessageBody() data:any) {
    this.server.to(data.roomName).emit("chat", data.nickName, data.chat);  
  }

  @SubscribeMessage('set_nickname')
  async handleChangeNickname(@ConnectedSocket() client: Socket, @MessageBody() nickname:any) {
    this.nicknames[client.id] = nickname;
  }

  @SubscribeMessage('disconnecting')
  async handleDisconnecting(socket: Socket, @MessageBody() data:any): Promise<any> {
    // socket.rooms.forEach((room) =>
    //   socket.to(room).emit("left", socket.nickname)
    // );
  }

  @SubscribeMessage('join_room')
  async handleJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() roomName: string): Promise<any> {    
    await client.join(roomName);

    // client.emit('join_room', roomName);

    // done();

    this.server.to(roomName).emit("join", this.nicknames[client.id], this.countRoom(roomName));
    
    // updateGame();
    // broadcastState();

    // let newBall = joinGame(socket);

    // for (let i = 0; i < balls.length; ++i) {
    //   let ball = balls[i];
    //   socket.emit("join_user", {
    //     id: ball.id,
    //     x: ball.x,
    //     y: ball.y,
    //     color: ball.color,
    //   });
    // }

    // socket.broadcast.emit("join_user", {
    //   id: socket.id,
    //   x: newBall.x,
    //   y: newBall.y,
    //   color: newBall.color,
    // });
  }

  @SubscribeMessage('leave_room')
  async handleLeaveRoom(socket: Socket, @MessageBody() data:any): Promise<any> {
    // socket.leave(roomName);
    // socket.broadcast.emit("leave_user", socket.nickname, countRoom(data.roomName));
  }
}


  // socket.on("offer", (offer, roomName) => {
  //   socket.to(roomName).emit("offer", offer);
  // });
  // socket.on("answer", (chat, roomName) => {
  //   socket.to(roomName).emit("answer", chat);
  // });
  // socket.on("ice", (ice, roomName) => {
  //   socket.to(roomName).emit("ice", ice);
  // });




  // socket.on("disconnect", function (reason) {
  //   console.log(`${socket.id} has leaved! (${reason})`);
  //   leaveGame(socket);
  //   socket.broadcast.emit("leave_user", socket.id);
  // });
  // });