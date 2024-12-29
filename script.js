// Config dosyasından sosyal medya verilerini import et
import socialMediaConfig from './config.js';

// Sürükle-bırak fonksiyonları

const draggables = document.querySelectorAll('[draggable="true"]');
const container = document.getElementById("links");

// Her bir sürüklenebilir öğe için olay dinleyicileri
draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", (e) => {
    // Sürükleme başladığında, öğeyi geçici olarak 'dragging' class'ı ile işaretle
    e.target.classList.add("dragging");
  });

  draggable.addEventListener("dragend", (e) => {
    // Sürükleme sona erdiğinde, 'dragging' class'ını kaldır
    e.target.classList.remove("dragging");
  });
});

// Sürüklenebilir öğe hedef alanında (container) bırakılabilir alan oluşturuluyor
container.addEventListener("dragover", (e) => {
  e.preventDefault(); // Varsayılan davranışı engelle (bırakma olayı)
  const afterElement = getDragAfterElement(container, e.clientY);
  const dragging = document.querySelector(".dragging");
  if (afterElement == null) {
    container.appendChild(dragging);
  } else {
    container.insertBefore(dragging, afterElement);
  }
});

// Sürüklenen öğenin nereye bırakılacağına karar veren yardımcı fonksiyon
function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".link-item:not(.dragging)"),
  ];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, {}).element;
}

// Linkleri güncelleyen fonksiyon
function updateSocialLinks() {
    const linksSection = document.querySelector('.links');
    
    // Mevcut linkleri temizle
    linksSection.innerHTML = '';
    
    // Her sosyal medya için yeni link oluştur
    Object.entries(socialMediaConfig).forEach(([platform, data]) => {
        const linkElement = document.createElement('a');
        linkElement.href = data.url;
        linkElement.className = `link-item ${platform}`;
        linkElement.target = '_blank';
        
        const iconElement = document.createElement('i');
        iconElement.className = `${data.icon} icon`;
        
        const spanElement = document.createElement('span');
        spanElement.textContent = data.text;
        
        linkElement.appendChild(iconElement);
        linkElement.appendChild(spanElement);
        linksSection.appendChild(linkElement);
    });
}

// Sayfa yüklendiğinde linkleri güncelle
document.addEventListener('DOMContentLoaded', updateSocialLinks);
