import { Activity, Stethoscope, Heart, Scissors, Scale, ShieldAlert, Monitor } from 'lucide-react'
import { Specialty } from '@/app/conditions/components/SpecialtySection'

export const specialities: Specialty[] = [
  {
    id: "fitik",
    title: "Fıtık",
    description: "Fıtık, karın duvarındaki zayıf noktalardan iç organların dışarı çıkması durumudur. Genel cerrahide en sık karşılaşılan hastalıklardan biridir ve genellikle cerrahi müdahale ile tedavi edilir.",
    icon: <Activity size={28} />,
    details: [  
      "Kasık (inguinal) fıtığı",
      "Göbek (umbilikal) fıtığı",
      "Kesi (insizyonel) fıtığı",
      "Laparoskopik ve açık fıtık onarımı",
      "Mesh (yama) ile güçlendirme teknikleri",
    ]
  },
  {
    id: "endokrin-cerrahisi",
    title: "Endokrin Cerrahisi",
    description: "Tiroid, paratiroid ve böbreküstü bezi gibi endokrin organlara yönelik cerrahi müdahaleleri kapsar. Nodül, guatr ve endokrin tümörlerinin tedavisinde cerrahi yaklaşımlar uygulanır.",
    icon: <Stethoscope size={28} />,
    details: [
      "Tiroid nodülleri ve guatr cerrahisi",
      "Tiroidektomi (total / subtotal)",
      "Paratiroid cerrahisi",
      "Böbreküstü bezi (adrenal) cerrahisi",
      "Endokrin tümörlerin cerrahi tedavisi",
    ]
  },
  {
    id: "meme-cerrahisi",
    title: "Meme Cerrahisi",
    description: "Meme hastalıklarının tanı ve tedavisine yönelik cerrahi işlemleri içerir. Meme kanseri cerrahisinden benign meme hastalıklarına kadar geniş bir yelpazede hizmet sunulmaktadır.",
    icon: <Heart size={28} />,
    details: [
      "Meme kanseri cerrahisi",
      "Meme koruyucu cerrahi (lumpektomi)",
      "Mastektomi",
      "Sentinel lenf nodu biyopsisi",
      "Benign meme hastalıkları tedavisi",
    ]
  },
  {
    id: "proktoloji",
    title: "Proktoloji",
    description: "Kalın bağırsağın son kısmı, rektum ve anüs bölgesindeki hastalıkların tanı ve tedavisi ile ilgilenen cerrahi alt dal. Hemoroid, fissür ve fistül gibi hastalıklar bu kapsamda değerlendirilir.",
    icon: <Scissors size={28} />,
    details: [
      "Hemoroid (basur) tedavisi",
      "Anal fissür tedavisi",
      "Perianal fistül ve apse cerrahisi",
      "Pilonidal sinüs (kıl dönmesi) cerrahisi",
      "Rektal prolapsus tedavisi",
    ]
  },
  {
    id: "obezite-metabolik",
    title: "Obezite ve Metabolik Cerrahi",
    description: "Morbid obezite ve buna bağlı metabolik hastalıkların cerrahi tedavisi. Diyet ve egzersiz ile kontrol altına alınamayan obezitede bariatrik cerrahi yöntemleri uygulanmaktadır.",
    icon: <Scale size={28} />,
    details: [
      "Sleeve gastrektomi (tüp mide)",
      "Gastrik bypass",
      "Revizyon cerrahisi",
      "Tip 2 diyabet cerrahisi",
      "Ameliyat öncesi ve sonrası takip",
    ]
  },
  {
    id: "kanser-cerrahisi",
    title: "Kanser Cerrahisi",
    description: "Gastrointestinal sistem, meme, tiroid ve yumuşak doku tümörlerinin cerrahi tedavisi. Multidisipliner yaklaşımla onkolojik cerrahi prensiplere uygun müdahaleler gerçekleştirilir.",
    icon: <ShieldAlert size={28} />,
    details: [
      "Mide kanseri cerrahisi",
      "Kolon ve rektum kanseri cerrahisi",
      "Karaciğer tümörleri cerrahisi",
      "Pankreas cerrahisi",
      "Yumuşak doku tümörleri cerrahisi",
    ]
  },
  {
    id: "minimal-invaziv",
    title: "Minimal İnvaziv Cerrahi",
    description: "Küçük kesilerle gerçekleştirilen kapalı ameliyat teknikleri. Hastanın daha az ağrı duyması, daha kısa hastanede kalış süresi ve hızlı iyileşme sağlayan modern cerrahi yaklaşımlardır.",
    icon: <Monitor size={28} />,
    details: [
      "Laparoskopik kolesistektomi (safra kesesi)",
      "Laparoskopik apendektomi",
      "Laparoskopik fıtık onarımı",
      "Laparoskopik bariatrik cerrahi",
      "Laparoskopik kolorektal cerrahi",
    ]
  },
];