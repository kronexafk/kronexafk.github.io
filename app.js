// Баланс пользователя
let stars = 100;

// Призы для кейсов
const prizes = [
  "🔮 Шар судьбы", 
  "⚔️ Меч дракона", 
  "🛡️ Щит героя", 
  "💎 10 алмазов",
  "🍀 Четырехлистный клевер"
];

function openCase() {
  const tg = window.Telegram.WebApp;
  
  // Проверяем хватает ли звёзд
  if(stars < 50) {
    tg.showAlert("Недостаточно звёзд!");
    return;
  }
  
  // Анимация открытия
  const caseElement = document.querySelector('.case');
  caseElement.style.transform = "rotate(10deg)";
  setTimeout(() => caseElement.style.transform = "rotate(-10deg)", 100);
  setTimeout(() => caseElement.style.transform = "rotate(0)", 200);
  
  // Открываем кейс через 500 мс
  setTimeout(() => {
    // Списываем звёзды
    stars -= 50;
    document.getElementById('stars').textContent = stars;
    
    // Выбираем случайный приз
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
    
    // Показываем приз
    tg.showPopup({
      title: "🎉 Поздравляем!",
      message: `Вы получили: ${randomPrize}`
    });
  }, 500);
}

function buyStars() {
  const tg = window.Telegram.WebApp;
  
  tg.showPopup({
    title: "Покупка звёзд",
    message: "Выберите пакет:",
    buttons: [
      {type: "default", text: "50 звёзд - $1"},
      {type: "default", text: "150 звёзд - $2"},
      {type: "cancel", text: "Отмена"}
    ]
  }, (buttonId) => {
    if(buttonId === 0 || buttonId === 1) {
      stars += buttonId === 0 ? 50 : 150;
      document.getElementById('stars').textContent = stars;
      tg.showAlert("Покупка успешна!");
    }
  });
}

// Инициализация Telegram Web App
document.addEventListener('DOMContentLoaded', () => {
  const tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();
});
