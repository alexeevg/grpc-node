/*
 *
 * Copyright 2024 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const parseArgs = require('minimist');

const PROTO_PATH = __dirname + '/../protos/echo.proto';

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {keepCase: true,
   longs: String,
   enums: String,
   defaults: true,
   oneofs: true
  });
const echoProto = grpc.loadPackageDefinition(packageDefinition).grpc.examples.echo;

function makeRequest(client) {
  return new Promise((resolve, reject) => {
    client.unaryEcho({message: 'goaway demo'}, (error, value) => {
      if (error) {
        return reject(error);
      }
      resolve(value);
    });
  });
}

async function main() {
  let argv = parseArgs(process.argv.slice(2), {
    string: 'target',
    default: {target: 'localhost:50052'}
  });
  const client = new echoProto.Echo(argv.target, grpc.credentials.createInsecure());
  
  // Keep process alive forever; run with GRPC_TRACE=transport GRPC_VERBOSITY=DEBUG 
  // to observe errors when GOAWAY is handled while there are requests in flight
  setInterval(async () => {
    try {
      await Promise.all(Array.from({length: 16}).map(() => makeRequest(client)));
    } catch (error) {
      console.error(error.message);
    }
  }, 8);
}

main();
