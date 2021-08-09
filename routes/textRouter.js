const express = require('express');

const router = express.Router();
const WebSocket = require('ws');
const { Text } = require('../db/models'); // импортируем модель Text

const wss = new WebSocket.Server({ port: process.env.WSPORT });

wss.on('connection', (user) => {
  user.on('message', async (message) => {
    const receiveedMessage = JSON.parse(message);
    // user.send(receiveedMessage.text);
    // session.user
    const mess = await Text.create({ message: receiveedMessage.text }); // создаем новое сообщение
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({ text: mess.message, id: mess.id }));
    });
  });
  // user.send('server connected');
});

router.get('/add', async (req, res) => { // ручка добавления поста
  const messages = await Text.findAll(); // находим все старые посты чтобы отобразить на странице
  res.render('messageForm', { messages }); // рендерим messageForm
});

router.post('/add', async (req, res) => {
  const { messageInput } = req.body; // то что приходит от юзера достаем из req.body
  const newMessage = await Text.create({ message: messageInput }); // создаем новое сообщение
  // console.log(newMessage);
  res.render('chat', { message: newMessage.message, id: newMessage.id, layout: false }); // рендерим chat.hbs без лейаута потому что будем вставлять ее на страницу в чат
});

router.get('/delete/:id', async (req, res) => { // ручка удаления сообщения
  const { id } = req.params;
  await Text.destroy({ where: { id } }); // удаляем из бд сообщение с ид который пришел в параметре
  res.status(200).end(); // если все ОК то возвращаем статус 200 (есл не ОК то плохой статус сам вернется)
});

module.exports = router;
