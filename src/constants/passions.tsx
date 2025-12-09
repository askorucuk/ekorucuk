import Image from 'next/image';
import music from '../assets/img/music.png';
import adventure from '../assets/img/adventure.png';
import sports from '../assets/img/sports.png';
import writer from '../assets/img/writer.png';

export const passions = [
  {
    title: "Müzik",
    description: "Melodiler bestelemek ve gitar çalmak, benim için bir tür meditasyon ve zihinsel arınma biçimi.",
    img: <Image src={music} alt="Music" width={500} height={500} className="w-full h-full object-cover" />
  },
  {
    title: "Macera/Seyahat",
    description: "Yeni coğrafyalar keşfetmek ve kendi sınırlarımı zorlayarak ufkumu genişletmek.",
    img: <Image src={adventure} alt="Adventure" width={500} height={500} className="w-full h-full object-cover" />
  },
  {
    title: "Spor",
    description: "Zorlu patikaları yürütmek ve hayata yeni bir perspektiften bakmak.",
    img: <Image src={sports} alt="Sports" width={500} height={500} className="w-full h-full object-cover" />
  },
  {
    title: "Söz Yazarlığı",
    description: "Hikayeleri ve derin duyguları işleyerek, onları sözlere ve tınılara dönüştürme sanatı.",
    img: <Image src={writer} alt="Writer" width={500} height={500} className="w-full h-full object-cover" />
  },
];

export const passionsDescription = "Ameliyathane dışında, müzik ve büyük harita buluşturma ile bakiyorum ve ilham buluyorum. Bu tutkular benim hayata yeni bir perspektiften bakmak ve tüm yaşam alanlarında kreativite ve ilhamımını besliyor.";