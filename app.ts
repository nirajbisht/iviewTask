'use strict';
import express from 'express';
import config from 'config'
import { BootstrapS } from './src/utils/bootstrap'
import { postCommentService } from './src/controllers'
const app = express();
const init = async () => {

  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const port = config.get<string>('host.node.port')
    const server = app.listen(port)
    console.log(`Listening to http://localhost:${port}`)
    app.get('/post-comment', async (req, res) => {
      let postData = await postCommentService.getPostAndComment()
      res.send(postData)
    })
    process.on('warning', e => console.warn("-------  process warning  -------", e.stack))
    process.on('unhandledRejection', (reason, promise) => {
      console.log('Unhandled Rejection at:', promise, 'reason:', reason);
    });
    //await BootstrapS.bootstrap(server)
  } catch (err) {
    console.log("error in init fucntion app js", err)
  }
}
init()