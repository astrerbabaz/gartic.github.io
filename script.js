function custom() {
  var at = prompt("Bot adı yaz");
  var esek = prompt("Otağ kodu yaz amma axirdan dördünü");
  var donuz = prompt("Botlar giriş etdikde yazılan mesaj");

  let r;
  let p;
  

  window.addEventListener('keypress', (e) => {
    k(parseInt(e.key) - 1);
  });

  function connect() {
    const ws = new WebSocket(`wss://server05.gartic.io/socket.io/?EIO=3&transport=websocket`);

    ws.onopen = () => {
      ws.send(`42[3,{"v":20000,"nick":"${at}${Math.floor(Math.random()* 9999)}","avatar":16,"sala":"${esek}"}]`);
      ws.send(`42[3,{"v":20000,"nick":"${at}${Math.floor(Math.random()* 9999)}","avatar":16,"sala":"${esek}"}]`);
      ws.send(`42[3,{"v":20000,"nick":"${at}${Math.floor(Math.random()* 9999)}","avatar":16,"sala":"${esek}"}]`);
      ws.send(`42[3,{"v":20000,"nick":"${at}${Math.floor(Math.random()* 9999)}","avatar":16,"sala":"${esek}"}]`);
      ws.send(`42[3,{"v":20000,"nick":"${at}${Math.floor(Math.random()* 9999)}","avatar":16,"sala":"${esek}"}]`);
       
    };

    ws.onmessage = (m) => {
      p = JSON.parse(m.data.slice(2));
      r = p[5];

      for (let i = 0; i < 7; i++) {
        ws.send(`42[11,${p[2]},"${donuz}"]`);
        
       
        
      }

      

      connect();
    };
  }

  connect();
}
