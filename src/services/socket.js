"use client";
import { io } from "socket.io-client";

let instance = null;

class SocketClient {
  constructor() {
    if (!instance) {
      instance = this;
      this.socket = null;
      this.connected = false; // Track connection status
    }

    return instance;
  }

  connect(token) {
    if (!token) {
      console.error("Token is null. Socket connection won't be established.");
      return Promise.reject(
        "Token is null. Socket connection won't be established."
      );
    }

    this.socket = io(process.env.NEXT_PUBLIC_API_URL_SO, {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    return new Promise((resolve, reject) => {
      this.socket.on("connect", () => {
        console.log("Socket connected");
        this.connected = true;
        this.socket.emit("join:private", {}, (message) => {
          // console.log("Private join response:", message);
        });
        resolve();
      });

      this.socket.on("connect_error", (error) => {
        console.error("Connection error:", error);
        this.connected = false;
        reject(error);
      });

      this.socket.on("disconnect", () => {
        console.log("Socket disconnected");
        this.connected = false;
      });

      this.socket.on("reconnect", (attempt) => {
        console.log(`Reconnected on attempt ${attempt}`);
        this.connected = true;
      });

      this.socket.on("reconnect_error", (error) => {
        console.error("Reconnection error:", error);
      });

      this.socket.on("reconnect_failed", () => {
        console.error("Reconnection failed");
        this.connected = false;
      });
    });
  }
  listenForMessages() {
    if (this.socket) {
      this.socket.on("message", (newMessage) => {
        console.log("New message:", newMessage);
      });
    } else {
      console.error("Socket not initialized.");
    }
  }
  listenForNotificationCount() {
    return new Promise((resolve, reject) => {
      if (this.socket) {
        this.socket.on("notification", (newMessage) => {
          console.log("Notification received:", newMessage);
          try {
            const parsedMessage = JSON.parse(newMessage);
            resolve(parsedMessage);
          } catch (error) {
            console.error("Failed to parse notification message:", error);
            reject(error);
          }
        });
      } else {
        console.error("Socket not initialized.");
        reject("Socket not initialized.");
      }
    });
  }
  disconnect() {
    return new Promise((resolve) => {
      if (this.socket) {
        this.socket.disconnect(() => {
          this.socket = null;
          this.connected = false;
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  // emit(event, data) {
  //   return new Promise((resolve, reject) => {
  //     if (!this.connected) {
  //       return reject("No socket connection.");
  //     }

  //     this.socket.emit(event, data, (response) => {
  //       if (response?.error) {
  //         console.error(response.error);
  //         return reject(response.error);
  //       }

  //       return resolve(response);
  //     });
  //   });
  // }

  // emit(event, data) {
  //   return new Promise((resolve, reject) => {
  //     // Check if there is a socket connection
  //     if (!this.connected || !this.socket) {
  //       // If there's no socket connection, reject the promise
  //       return reject("No socket connection.");
  //     }

  //     // Emit the event with data to the server
  //     this.socket.emit(event, data, (response) => {
  //       // Check if the response contains an error
  //       if (response && response.error) {
  //         // If there's an error in the response, log it and reject the promise
  //         console.error(response.error);
  //         return reject(response.error);
  //       }

  //       // If there's no error, resolve the promise with the response data
  //       resolve(response);
  //     });
  //   });
  // }

  emit(event, data, cb) {
    if (!this.connected || !this.socket) {
      console.log("Not connected");
      return;
    }

    this.socket.emit(event, data, (response) => {
      if (response && response.error) {
        console.error(response.error);
        console.log(response.error);
      } else {
        cb(response);
      }
    });
  }

  on(event, fun) {
    return new Promise((resolve, reject) => {
      if (!this.connected) {
        return reject("No socket connection.");
      }

      this.socket.on(event, fun);
      resolve();
    });
  }
}

export const socket = new SocketClient();

export default SocketClient;
