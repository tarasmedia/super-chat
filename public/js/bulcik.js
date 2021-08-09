const { messageForm } = document.forms;
const chat = document.querySelector('.chat');

const wsURLProto = window.location.protocol.replace('http', 'ws'); // wss:
const wsURLAdress = window.location.hostname; // superapp.heroku.com
const wsURLPort = 3099;
const websocket = new WebSocket(`${wsURLProto}//${wsURLAdress}:${wsURLPort}`);
console.log(websocket);

websocket.onopen = function () {
  console.log('hello');
};

websocket.onmessage = function (message) {
  const parsedMessage = JSON.parse(message.data);
  chat.innerHTML += `<div class="message" id="${parsedMessage.id}"> 
  <span>${parsedMessage.text}</span>
  <button class="deleteMessage">del</button>
</div>`;
};

messageForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const myMessage = messageForm.messageInput.value;
  // const { messageInput, action, method } = messageForm;
  /*
  const send = await fetch('/text/add', { // отправляем фетч на '/text/add'
    method: 'POST', // метод, которым отправляем запрос на сервер
    headers: {
      'Content-Type': 'application/json', // обзательный заголовок (тип содержимого запроса)
    },
    body: JSON.stringify({ messageInput: myMessage }), // само сообщение в объекте в виде строки (оно будет messageInput в req.body )
  });

  const result = await send.text(); // принимает ответ от сервера (от ручки '/text/add', она вернет html)
  // console.log('-------->', result);
  chat.innerHTML += result; // добавляем результат работы фетча (ответ от ручки '/text/add') на страницу
  messageForm.reset(); // сбравсиваем заполненное поле в форме
  */
  websocket.send(JSON.stringify({ text: myMessage }));
  messageForm.reset();
});

chat.addEventListener('click', async (e) => {
  if (e.target.classList.contains('deleteMessage')) { // проверяем была ли нажата кнопка 'deleteMessage'
    // console.log(e.target.parentNode.id);
    const delRequest = await fetch(`/text/delete/${e.target.parentNode.id}`); // отправляем фетч с ид кнопки на ручку '/delete/:id'
    // console.log(delRequest);
    if (delRequest.status === 200) { // если ручка в ответ отправляет 200, значит удаление прошло успешно и удаляем элемент со страницы
      e.target.parentNode.remove();
    }
  }
});
