const express = require('express');
const next = require('next/');
import userHandler from '../pages/api/users';

export default async () => {
  const app = next({ dev: true });
  const handle = app.getRequestHandler();

  const server = await app.prepare().then(() => {
    const server = express();

    server.get('/api/users', userHandler);

    server.get('*', (req, res) => {
      handle(req, res);
    });
    server.listen(3000);
  });

  return server;
};

// import http from 'http'
// import listen from 'test-listen'
// import { apiResolver } from 'next-server/dist/server/api-utils'
// import ping from 'pages/api/ping'
// test('responds with 200 and  { "pong": "pong" }', async () => {
//   let requestHandler = (req, res) => apiResolver(req, res, undefined, ping)
//   let server = http.createServer(requestHandler)
//   let url = await listen(server)
//   let response = await fetch(url)
//   let json = await response.json()
//   expect(response.status).toBe(200)
//   expect(json).toEqual({ pong: 'pong' })
// })
