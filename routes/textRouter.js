const express = require('express');

const router = express.Router();
const { Text } = require('../db/models'); // импортируем модель Text

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
