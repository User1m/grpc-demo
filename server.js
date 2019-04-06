// https://auth0.com/blog/creating-a-node-grpc-service-using-mali/
// server.js
const path = require("path");
const Mali = require("mali");

// Defines the path to a proto file that will hold the service definition
const PROTO_PATH = path.resolve(__dirname, "./protos/hello.proto");

/**
 * Handler for the Echo RPC.
 * @param {object} ctx The request context provided by Mali.
 * @returns {Promise<void>}
 */

const echo = async ctx => {
    // Log that we received the request
    console.log("Received request.");
    // Set the response on the context
    ctx.res = {
        // Define the message, and time
        message: ctx.request.req.message,
        timestamp: Date.now()
    }
};

/**
 * Define the main entry point for the application.
 * From here, we stand up the server and do some light logging.
 */
const main = () => {
    const app = new Mali(PROTO_PATH, "Hello", {
        defaults: true
    });
    app.use({ echo });
    app.start("127.0.0.1:50051");
    console.log("Listening...");
};

main();