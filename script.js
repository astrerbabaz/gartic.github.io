const socketURL = "wss://server05.gartic.io/socket.io/?EIO=3&transport=websocket";
let socket;
let nickName = ""; // Kullanıcının girdiği nick adı
let currentUserId = null;
const nickRandom = Math.floor(Math.random() * 9999);
let messageToSend;
let targetUserId = ""; // Hedeflenen kullanıcı ID'si



function onOpen() {
    console.log("WebSocket bağlantısı başarıyla açıldı.");
}

// Diğer fonksiyonlar ve kod burada devam eder...

const idNickListContainer = document.createElement("div");
document.body.appendChild(idNickListContainer);

function onMessage(event) { const message = event.data;try {
    const parsedMessage = JSON.parse(message.slice(2));

    const items = parsedMessage[5];
    currentUserId = parsedMessage[2]; // Dışarıdaki değişkene atama


console.log(currentUserId)
    if (Array.isArray(items)) {
        items.forEach(item => {
            if (item.id && item.nick) {
                const idNickElement = document.createElement("div");
                idNickElement.textContent = `${item.id} - ${item.nick}`;
                idNickElement.style.cursor = "pointer"; // Tıklanabilir hale getir

                // Tıklanabilir öğeye tıklandığında ID'yi kopyala
                idNickElement.addEventListener("click", () => {
                    const dummyElement = document.createElement("textarea");
                    dummyElement.value = item.id;
                    document.body.appendChild(dummyElement);
                    dummyElement.select();
                    document.execCommand("copy");
                    document.body.removeChild(dummyElement);

                    console.log("Kopyalanan ID:", item.id);
                });

                idNickListContainer.appendChild(idNickElement);
            }
        });
    }
} catch (error) {
    console.error("JSON ayrıştırma hatası:", error);
}

console.log("Gelen mesaj:", message);}



function onClose() {
    console.log("WebSocket bağlantısı kapatıldı.");
}

function onError(error) {
    console.error("WebSocket hatası:", error);
}

function connectWebSocket() {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        socket = new WebSocket(socketURL);
        socket.onopen = onOpen;
        socket.onmessage = onMessage;
        socket.onclose = onClose;
        socket.onerror = onError;
    }
}

// "WebSocket Bağla" butonu oluştur
const connectButton = document.createElement("button");
connectButton.textContent = "WebSocket Bağla";
connectButton.addEventListener("click", connectWebSocket);
document.body.appendChild(connectButton);
// WebSocket bağlantısını başlat

        

        const fetchButton = document.getElementById("fetchButton");
        fetchButton.addEventListener("click", fetchAndRenderData);

       // ... Önceki kodlar ...

async function fetchAndRenderData() {
    try {
        const response = await fetch("https://gartic.io/req/list?search=&language[]=8");
        const responseData = await response.json();

        const responseContainer = document.getElementById("responseContainer");
        responseContainer.innerHTML = ""; // Eski verileri temizle

        const sortedData = responseData.sort((a, b) => a.id.localeCompare(b.id));

        const nonZeroQuantityData = sortedData.filter(item => item.quant !== 0); // Quantity'si 0 olmayanları filtrele

        nonZeroQuantityData.forEach(item => {
            const div = document.createElement("div");
            div.textContent = `${item.id} - ${item.quant}`;

            const joinButton = document.createElement("button");
            joinButton.textContent = "Katıl";
            joinButton.addEventListener("click", () => sendWebSocketMessage(item.id));
            
            const container = document.createElement("div");
            container.appendChild(div);
            container.appendChild(joinButton);

            responseContainer.appendChild(container);
        });

    } catch (error) {
        console.error("Fetch hatası:", error);
    }
}

function sendWebSocketMessage(id) {
    if (socket && socket.readyState === WebSocket.OPEN) {
        const messageToSend = `42[3,{"v":20000,"nick":"${nickName}","avatar":${Math.floor(Math.random() * 25)},"sala":"${id}"}]`;
        const message = messageToSend.replace("{id}", id);
        socket.send(message);
        console.log("WebSocket mesajı gönderildi:", message);
    } else if (socket && socket.readyState === WebSocket.CONNECTING) {
        console.log("WebSocket bağlantısı hala açılıyor. Bekleyin...");
        setTimeout(() => sendWebSocketMessage(id), 100); // 100 milisaniye sonra tekrar deneyin
    } else {
        console.log("WebSocket bağlantısı yok veya bağlantı kapalı.");
    }
}

// ... Diğer kodlar ...

// İnput alanı oluştur
const nickInput = document.createElement("input");
nickInput.placeholder = "Nick Girin";
document.body.appendChild(nickInput);

// "Nicki Kaydet" butonu oluştur
const saveNickButton = document.createElement("button");
saveNickButton.textContent = "Nicki Kaydet";
saveNickButton.addEventListener("click", () => {
    nickName = nickInput.value;
    console.log("Nick kaydedildi:", nickName);
});
document.body.appendChild(saveNickButton);

// ... Diğer kodlar ...
// Diğer fonksiyonlar ve kod burada devam eder...
        function sendPingMessage() {
    if (socket && socket.readyState === WebSocket.OPEN) {
        const pingMessage = "2"; // "ping" mesajı
        socket.send(pingMessage);
        console.log("Ping mesajı gönderildi.");
    } else {
        console.log("WebSocket bağlantısı yok veya bağlantı kapalı.");
    }
}

// Otomatik ping mesajlarını gönderen zamanlayıcıyı başlat
const pingInterval = setInterval(sendPingMessage, 12000);

        async function sendWebSocketMessage(id) {
    if (socket && socket.readyState === WebSocket.OPEN) {
        messageToSend = `42[3,{"v":20000,"nick":"${nickName}${nickRandom}","avatar":${Math.floor(Math.random() * 25)},"sala":"${id}"}]`;
        const message = messageToSend.replace("{id}", id);
        socket.send(message);
        console.log("WebSocket mesajı gönderildi:", message);
    } else if (socket && socket.readyState === WebSocket.CONNECTING) {
        console.log("WebSocket bağlantısı hala açılıyor. Bekleyin...");
        setTimeout(() => sendWebSocketMessage(id), 100); // 100 milisaniye sonra tekrar deneyin
    } else {
        console.log("WebSocket bağlantısı yok veya bağlantı kapalı.");
    }
}

        function closeWebSocket() {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
        console.log("WebSocket bağlantısı kapatıldı.");
    } else {
        console.log("WebSocket bağlantısı zaten kapalı.");
    }
}


// "WebSocket Kapat" butonu oluştur
const closeButton = document.createElement("button");
closeButton.textContent = "WebSocket Kapat";
closeButton.addEventListener("click", closeWebSocket);
document.body.appendChild(closeButton);
