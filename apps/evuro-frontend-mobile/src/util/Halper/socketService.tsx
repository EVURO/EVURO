import SocketIOClient from 'socket.io-client';

class WSService {
  initializeSocket = () => {
    try {
      this.socket = SocketIOClient('https://api.evurodog.com/', {
        reconnection: true,
        reconnectionAttempts: Infinity,
      });
      this.socket.on('connect', () => {
        console.log('Socket connected');
      });
      this.socket.on('disconnect', () => {
        console.log('Socket disconnected');
      });
      this.socket.on('connect_error', (err) => {
        console.log('socket connection error: ', err);
        //    console.log("socket connection error: ", JSON.stringify(err));
      });
      this.socket.on('error', (err) => {
        console.log('socket error: ', err);
        //    console.log("socket error: ", JSON.stringify(err));
      });
    } catch (error) {
      console.log('initialize token error: ', error);
    }
  };
  emit(event, data = {}, acknowldge) {
    console.log('event', event, data);
    this.socket.emit(event, data, acknowldge);
  }
  on(event, cb) {
    if (this.socket) {
      // console.log('dsadasd', event);
      this.socket.on(event, cb);
    }
  }
  removeListener(listenerName) {
    this.socket?.removeListener(listenerName);
  }
  sendMessage(event, data = {}, acknowldge) {
    //     console.log(event, data, "event");
    this.socket?.emit(event, data, acknowldge);
  }
  messageFromServer(event, cb) {
    this.socket.on(event, cb);
  }
  socketInstace() {
    return this.socket;
  }
}
const SocketServices = new WSService();
export default SocketServices;
