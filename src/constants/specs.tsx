import { Specialty } from '@/app/conditions/components/SpecialtySection'

export const specialities: Specialty[] = [
  {
    id: "fitik-cerrahisi",
    title: "Fıtık Cerrahisi",
    description: "Karın duvarındaki zayıf bir noktadan dışarı çıkan organ veya dokuların anatomik yerine yerleştirilmesi ve defektin onarılmasını amaçlayan cerrahi girişimdir.",
    details: [
      "İnguinal Herni (Kasık Fıtığı)",
      "Umblikal Herni (Göbek Fıtığı)",
      "İnsizyonel Herni (Kesi Yeri Fıtığı)",
      "Parastomal Herni",
      "Kompleks Karın Duvarı Fıtığı",
      "Prehabilitasyon (Botoks ve PPP Uygulamaları)",
      "Hiatal Herni (Mide Fıtığı)",
      "Kronik Kasık Ağrısı",
      "Minimal İnvaziv Fıtık Cerrahisi",
    ]
  },
  {
    id: "proktoloji",
    title: "Proktoloji",
    description: "Rektum, anal kanal ve perianal bölge hastalıklarının tanı ve tedavisidir.",
    details: [
      "Hemoroidal Hastalık (Basur)",
      "Anal Fissür",
      "Anal Fistül",
      "Anal Abse",
      "Pilonidal Sinüs (Kıl Dönmesi)",
      "Rektal Prolapsus",
    ]
  },
  {
    id: "endokrin-cerrahisi",
    title: "Endokrin Cerrahisi",
    description: "Hormon salgılayan bezlerin benign ve malign hastalıklarının tedavisini amaçlayan cerrahi girişimlerdir.",
    details: [
      "Tiroid Hastalıkları",
      "Paratiroid Hastalıkları",
      "Adrenal Bez Hastalıkları",
    ]
  },
  {
    id: "meme-cerrahisi",
    title: "Meme Cerrahisi",
    description: "Memenin benign ve malign hastalıklarının tanı ve tedavisini kapsayan cerrahi girişimlerdir.",
    details: [
      "Benign Meme Hastalıkları",
      "Meme Kanseri",
      "Meme Koruyucu Cerrahi",
      "Onkoplastik Meme Cerrahisi",
    ]
  },
  {
    id: "onkolojik-cerrahi",
    title: "Onkolojik Cerrahi",
    description: "Gastrointestinal sistem, endokrin sistem, meme ve yumuşak doku tümörlerinin tanı, takip ve cerrahi tedavisini kapsayan, multidisipliner yaklaşımlı uygulamalardır.",
    details: [
      "Kolon ve Rektum Kanseri",
      "Mide Kanseri",
      "İnce Barsak Kanseri",
      "Tiroid/Paratiroid Kanseri",
      "Meme Kanseri",
    ]
  },
  {
    id: "minimal-invaziv",
    title: "Minimal İnvaziv Cerrahi",
    description: "Daha az ağrı, daha kısa hastanede kalış süresi ve hızlı iyileşme sağlayan, küçük kesilerle gerçekleştirilen kapalı ve modern cerrahi tekniklerdir.",
    details: [
      "Fıtık Cerrahisi",
      "Safra Kesesi Cerrahisi",
      "Reflü Cerrahisi",
      "Kolorektal Cerrahi",
      "Bariatrik Cerrahi",
      "Robotik Cerrahi",
    ]
  },
];
