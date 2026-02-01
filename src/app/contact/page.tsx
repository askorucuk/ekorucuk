"use client";
import React, { JSX, useState } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

const Contact = (): JSX.Element => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setFormData({ fullName: '', email: '', subject: '', message: '' });
  };

  const submitButtonDisabled = formData.fullName === '' || formData.email === '' || formData.message === '';

  return (
    <div className="w-full h-auto bg-black text-white flex items-center justify-center p-4 md:p-12">
      <div className="max-w-7xl w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white" style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}>İletişime Geçin</h2>
          <p className="text-gray-400 max-w-2xl mx-auto" style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}>
            Profesyonel sorularınız, işbirlikleriniz veya aklınızdaki sorular için çekinmeyin.
            Size en kısa sürede geri döneceğim.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 border border-gray-secondary rounded-2xl p-6 md:p-8 bg-black/50">
            <h3 className="text-2xl font-semibold mb-8 text-white" style={{ fontSize: 'clamp(1.5rem, 2vw, 2rem)' }}>Mesaj Gönder</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="fullName" className="text-sm text-gray-400" style={{ fontSize: 'clamp(0.8rem, 1vw, 1rem)' }}>Ad Soyad</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Adınız ve Soyadınız"
                    className="bg-base-secondary border border-gray-primary rounded-lg p-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#ff3b5c] transition-colors w-full"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm text-gray-400" style={{ fontSize: 'clamp(0.8rem, 1vw, 1rem)' }}>E-Posta Adresi</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-posta Adresiniz"
                    className="bg-base-secondary border border-gray-primary rounded-lg p-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#ff3b5c] transition-colors w-full"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm text-gray-400" style={{ fontSize: 'clamp(0.8rem, 1vw, 1rem)' }}>Konu</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Mesajınızın Konusu"
                  className="bg-base-secondary border border-gray-secondary rounded-lg p-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#ff3b5c] transition-colors w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm text-gray-400" style={{ fontSize: 'clamp(0.8rem, 1vw, 1rem)' }}>Mesajınız</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Mesajınızı buraya yazınız..."
                  className="bg-base-secondary border border-gray-primary rounded-lg p-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#ff3b5c] transition-colors w-full resize-none"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#3C88CB] hover:bg-[#ff2448] text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 w-full md:w-auto disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                disabled={submitButtonDisabled}
              >
                Mesajı Gönder
              </button>
            </form>
          </div>
          <div className="lg:col-span-1 flex flex-col gap-8 pt-4">
            <h3 className="text-2xl font-semibold text-white mb-2" style={{ fontSize: 'clamp(1.5rem, 2vw, 2rem)' }}>Diğer Yollarla Bağlanın</h3>
            <div className="flex items-start gap-4">
              <div className="bg-[#1a1a1a] p-3 rounded-lg text-[#3C88CB]">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-white font-medium text-lg" style={{ fontSize: 'clamp(1rem, 1vw, 1.5rem)' }}>Klinik Adresi</h4>
                <p className="text-gray-400 text-sm mt-1">
                  Ege Üniversitesi,<br />
                  İzmir, Türkiye
                </p>
              </div>
            </div>
            <a href="mailto:korucuke@gmail.com" className="flex items-start gap-4">
              <div className="bg-[#1a1a1a] p-3 rounded-lg text-[#3C88CB]">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-white font-medium text-lg" style={{ fontSize: 'clamp(1rem, 1vw, 1.5rem)' }}>E-Posta</h4>
                <p className="text-gray-400 text-sm mt-1 hover:text-[#3C88CB] transition-colors cursor-pointer">
                  korucuke@gmail.com
                </p>
              </div>
            </a>
            {false && (
              <a href="tel:+905510203435" className="flex items-start gap-4">
                <div className="bg-[#1a1a1a] p-3 rounded-lg text-[#3C88CB]">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-white font-medium text-lg" style={{ fontSize: 'clamp(1rem, 1vw, 1.5rem)' }}>Telefon</h4>
                  <p className="text-gray-400 text-sm mt-1 hover:text-[#3C88CB] transition-colors cursor-pointer">
                    +90 551 020 34 35
                  </p>
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
