import API from "./api.js";
import UI from "./ui.js";

// ! METHODLARI KULLANABİLMEK İÇİN CLASS ÖRNEĞİ ALIYORUZ. 
const api = new API();
const ui = new UI();

// ! SAYFA YÜKLNDİPĞİ ANDA API DEN POPULER MÜZİKLERİ ALMAK İÇİN RENDERLIYORUZ. 
document.addEventListener("DOMContentLoaded", async () => {
  // ! EKRANA LOADER BASMAK İÇİN 
  ui.renderLoader();

  // ! API İSTEĞİ ATMA
  api
    .getPopular()

    // ! EKRANA KARTLARI BASMA
    .then((data) => ui.renderCards(data))
    .catch((err) => {
      console.log(err);
      alert("Üzgünüz bir sorun oluştu");
    });
});

// ! FORMDAN BİR ŞEY ARATILDIĞINDA, UYGUN SONUÇLARI AL VE RENDERLA
ui.form.addEventListener("submit", (e) => {
  // ! SAYFAYI YENİLEMEYİ ENGELLEMEK İÇİN 
  e.preventDefault();

  // ! ARATILAN KELİMEYE ERİŞMEK İÇİN 
  const query = e.target[0].value;

  // ! ARATILAN KELİME BOŞSA FOKSYONU DURDUR
  if (query.trim() === "") return alert("Lütfen geçerli bir metin aratın");

  // ! EKRANA LOADER BAS
  ui.renderLoader();

  // ! Başlığı Güncelle
  ui.updateTitle(query + " için sonuçlar");

  // ! API'dan verileri al
  api
    .searchMusic(query)
    .then((data) => ui.renderCards(data))
    .catch((err) => {
      console.log(err);
      alert("Üzgünüz bir sorun oluştu");
    });
});

// ! Liste Alanındaki Tıklama Olaylarını İzle ve
ui.list.addEventListener("click", (e) => {
  // ! Oynat butonuna tıklanıldığında şarkıyı oynatma
  if (e.target.className === "play") {
    // ! Oynatılacak şarkının kartına eriş
    const card = e.target.closest(".card");

    // ! Oynatılacak şarkının bilgilerini alma
    const data = card.dataset;

    // ! Player alanını tekrar rende etmek için 
    ui.renderPlayer(data);
  }
});