// // import { Server } from "socket.io";

// // let io;
// // const socketRoomsMap = new Map();

// // export const config = { api: { bodyParser: false } };

// // export default function handler(req, res) {
// //   if (!res.socket.server.io) {
// //     io = new Server(res.socket.server, {
// //       path: "/api/socket",
// //       serveClient: false,
// //       cors: {
// //         origin: process.env.NEXT_PUBLIC_SOCKET_URL || "*",
// //         methods: ["GET", "POST"],
// //         credentials: true,
// //       },
// //       transports: ["websocket"],
// //       allowEIO3: true,
// //     });

// //     io.on("connection", (socket) => {
// //       socket.on("join-room", ({ roomId, userId }) => {
// //         socket.join(roomId);
// //         const rooms = socketRoomsMap.get(socket.id) || new Set();
// //         rooms.add(roomId);
// //         socketRoomsMap.set(socket.id, rooms);
// //         socket.to(roomId).emit("user-connected", userId);
// //         socket.to(roomId).emit("presence-ping", { from: userId });
// //       });

// //       socket.on("send-message", ({ roomId, message, sender, senderId, image = null }) => {
// //         io.to(roomId).emit("receive-message", { message, sender, senderId, image });
// //       });

// //       ["offer", "answer", "ice-candidate"].forEach((event) => {
// //         socket.on(event, (data) => socket.to(data.roomId).emit(event, data));
// //       });

// //       ["call-request", "call-accept", "call-reject", "call-end"].forEach((event) => {
// //         socket.on(event, (data) => socket.to(data.roomId).emit(event, data));
// //       });

// //       socket.on("presence-ping", ({ roomId, from }) => {
// //         socket.to(roomId).emit("presence-ping", { from });
// //       });

// //       socket.on("presence-pong", ({ roomId, from }) => {
// //         socket.to(roomId).emit("presence-pong", { from });
// //       });

// //       socket.on("disconnect", () => {
// //         const rooms = socketRoomsMap.get(socket.id);
// //         if (rooms) {
// //           rooms.forEach((roomId) => {
// //             socket.to(roomId).emit("user-disconnected", { socketId: socket.id });
// //           });
// //           socketRoomsMap.delete(socket.id);
// //         }
// //       });
// //     });

// //     res.socket.server.io = io;
// //   }

// //   res.end("Socket server is running");
// // }


// import { Server } from "socket.io";
// import databaseConnection from "@/lib/dbConfig";
// import Message from "@/models/messageModel";

// let io;
// const socketRoomsMap = new Map();

// // Initialize database connection
// databaseConnection();

// export const config = { api: { bodyParser: false } };

// export default function handler(req, res) {
//   if (!res.socket.server.io) {
//     io = new Server(res.socket.server, {
//       path: "/api/socket",
//       serveClient: false,
//       cors: {
//         origin: process.env.NEXT_PUBLIC_SOCKET_URL || "*",
//         methods: ["GET", "POST"],
//         credentials: true,
//       },
//       transports: ["websocket"],
//       allowEIO3: true,
//     });

//     io.on("connection", (socket) => {
//       socket.on("join-room", ({ roomId, userId }) => {
//         socket.join(roomId);
//         const rooms = socketRoomsMap.get(socket.id) || new Set();
//         rooms.add(roomId);
//         socketRoomsMap.set(socket.id, rooms);
//         socket.to(roomId).emit("user-connected", userId);
//         socket.to(roomId).emit("presence-ping", { from: userId });
//       });
//       /*
//       socket.on("send-message", async ({ roomId, message, sender, senderId, image = null }) => {
//         try {
//           // Save message to database
//           const messageType = image ? "image" : "text";
//           const content = image || message;
          
//           const savedMessage = await Message.create({
//             bookingId: roomId,
//             senderId: senderId,
//             type: messageType,
//             content: content,
//           });

//           // Emit message to all clients in the room
//           io.to(roomId).emit("receive-message", { 
//             message, 
//             sender, 
//             senderId, 
//             image,
//             messageId: savedMessage._id,
//             createdAt: savedMessage.createdAt
//           });
//         } catch (error) {
//           console.error("Error saving message to database:", error);
//           // Still emit the message even if database save fails
//           io.to(roomId).emit("receive-message", { message, sender, senderId, image });
//         }
//       });
//       */
//      socket.on("send-message", async ({ roomId, senderId, text = "", imageUrl = null }) => {
//         try {
//           // Validate input - must have either text or imageUrl
//           const trimmedText = (text || "").trim();
//           if (!trimmedText && !imageUrl) {
//             console.error("Message must have either text or imageUrl");
//             return;
//           }

//           // Determine message type
//           let type = "text";
//           if (imageUrl && !trimmedText) type = "image";
//           else if (imageUrl && trimmedText) type = "mixed";

//           // Save message to database
//           const saved = await Message.create({
//             bookingId: roomId,
//             senderId,
//             text: trimmedText || "", // Ensure empty string if no text
//             imageUrl: imageUrl || null,
//             type,
//           });

//           // Populate sender info
//           const msg = await Message.findById(saved._id)
//             .populate("senderId", "firstName lastName image");

//           if (!msg || !msg.senderId) {
//             console.error("Failed to populate message sender");
//             return;
//           }

//           // Emit message to all clients in the room
//           io.to(roomId).emit("receive-message", {
//             messageId: msg._id,
//             sender: `${msg.senderId.firstName || ""} ${msg.senderId.lastName || ""}`.trim(),
//             senderId: msg.senderId._id,
//             text: msg.text || "",
//             imageUrl: msg.imageUrl || null,
//             type: msg.type,
//             createdAt: msg.createdAt,
//           });
//         } catch (error) {
//           console.error("Error saving message to database:", error);
//           // Optionally emit an error event to the sender
//           socket.emit("message-error", { error: "Failed to save message" });
//         }
//       });

//       socket.on("offer", (data) => {
//         // Forward offer to other users in the room (excluding sender)
//         socket.to(data.roomId).emit("offer", { offer: data.offer, roomId: data.roomId });
//       });

//       socket.on("answer", (data) => {
//         // Forward answer to other users in the room (excluding sender)
//         socket.to(data.roomId).emit("answer", { answer: data.answer, roomId: data.roomId });
//       });

//       socket.on("ice-candidate", (data) => {
//         // Forward ICE candidate to other users in the room (excluding sender)
//         // Note: candidate can be null (end of candidates), so we forward the entire data object
//         socket.to(data.roomId).emit("ice-candidate", { candidate: data.candidate, roomId: data.roomId });
//       });

//       socket.on("call-request", (data) => {
//         // Forward call request to other users in the room (excluding sender)
//         socket.to(data.roomId).emit("call-request", {
//           from: data.from,
//           fromId: data.fromId
//         });
//       });

//       socket.on("call-accept", (data) => {
//         // Forward call acceptance to other users in the room
//         socket.to(data.roomId).emit("call-accept", {
//           by: data.by,
//           byId: data.byId
//         });
//       });

//       socket.on("call-reject", (data) => {
//         // Forward call rejection to other users in the room
//         socket.to(data.roomId).emit("call-reject", {
//           by: data.by,
//           byId: data.byId
//         });
//       });

//       socket.on("call-end", (data) => {
//         // Forward call end to other users in the room
//         socket.to(data.roomId).emit("call-end", {
//           by: data.by,
//           byId: data.byId
//         });
//       });

//       socket.on("presence-ping", ({ roomId, from }) => {
//         socket.to(roomId).emit("presence-ping", { from });
//       });

//       socket.on("presence-pong", ({ roomId, from }) => {
//         socket.to(roomId).emit("presence-pong", { from });
//       });

//       socket.on("disconnect", () => {
//         const rooms = socketRoomsMap.get(socket.id);
//         if (rooms) {
//           rooms.forEach((roomId) => {
//             socket.to(roomId).emit("user-disconnected", { socketId: socket.id });
//           });
//           socketRoomsMap.delete(socket.id);
//         }
//       });
//     });

//     res.socket.server.io = io;
//   }

//   res.end("Socket server is running");
// }


import { Server } from "socket.io";
import databaseConnection from "@/lib/dbConfig";
import Message from "@/models/messageModel";

let io;
const socketRoomsMap = new Map();
databaseConnection();

export const config = { api: { bodyParser: false } };

export default function handler(req, res) {
  if (!res.socket.server.io) {
    io = new Server(res.socket.server, {
      path: "/api/socket",
      cors: { origin: process.env.NEXT_PUBLIC_SOCKET_URL || "*", methods: ["GET", "POST"] },
      transports: ["websocket"],
    });

    io.on("connection", (socket) => {
      //console.log("Socket connected:", socket.id);
      socket.on("join-room", ({ roomId, userId }) => {
        socket.join(roomId);
        const rooms = socketRoomsMap.get(socket.id) || new Set();
        rooms.add(roomId);
        socketRoomsMap.set(socket.id, rooms);
        // Track user in room
        if (!roomUsersMap.has(roomId)) {
          roomUsersMap.set(roomId, new Set());
        }
        roomUsersMap.get(roomId).add(userId);
        
        // Store userId on socket for later reference
        socket.userId = userId;
        socket.to(roomId).emit("user-connected", userId);
       // Send list of currently online users to the newly joined user
        const onlineUsers = Array.from(roomUsersMap.get(roomId)).filter(id => id !== userId);
        if (onlineUsers.length > 0) {
          socket.emit("users-online", { userIds: onlineUsers });
        }
        
        //console.log(`User ${userId} joined room ${roomId}. Online users:`, Array.from(roomUsersMap.get(roomId)));
      });
      socket.on("presence-ping", ({ roomId, from }) => {
        socket.to(roomId).emit("presence-ping", { from });
      });
      // Handle presence pong (response to ping)
      socket.on("presence-pong", ({ roomId, from }) => {
        socket.to(roomId).emit("presence-pong", { from });
      });
      socket.on("send-message", async ({ roomId, sender, senderId, text = "", imageUrl = null }) => {
        try {
          const type = imageUrl && text ? "mixed" : imageUrl ? "image" : "text";
          const saved = await Message.create({
            bookingId: roomId,
            senderId,
            type,
            text: text || "",
            imageUrl: imageUrl || null,
          });
          io.to(roomId).emit("receive-message", {
            text,
            sender,
            senderId,
            imageUrl,
            messageId: saved._id,
            createdAt: saved.createdAt,
          });
        } catch (err) {
          console.error("Message save error:", err);
          socket.emit("message-error", { error: err.message });
        }
      });

      // ✅ WebRTC Signaling
      socket.on("call-request", (data) => socket.to(data.roomId).emit("call-request", data));
      socket.on("call-accept", (data) => socket.to(data.roomId).emit("call-accept", data));
      socket.on("call-reject", (data) => socket.to(data.roomId).emit("call-reject", data));
      socket.on("call-end", (data) => socket.to(data.roomId).emit("call-end", data));

      socket.on("offer", (data) => socket.to(data.roomId).emit("offer", data));
      socket.on("answer", (data) => socket.to(data.roomId).emit("answer", data));

      // ✅ FIXED ICE candidate forwarding
      socket.on("ice-candidate", (data) => {
        if (data?.candidate) {
          socket.to(data.roomId).emit("ice-candidate", data);
        }
      });
      socket.on("disconnect", () => {
        const rooms = socketRoomsMap.get(socket.id);
        if (rooms) {
          rooms.forEach((roomId) => {
            socket.to(roomId).emit("user-disconnected", { socketId: socket.id });
          });
          socketRoomsMap.delete(socket.id);
        }
      });
    });

    res.socket.server.io = io;
  }

  res.end("Socket server running");
}
