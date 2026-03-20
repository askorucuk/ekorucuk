"use client";
import React, { JSX, useCallback, useEffect, useRef, useState } from 'react';
import { LuMapPin, LuMail, LuPhone, LuLoader, LuCalendar } from 'react-icons/lu';
import { EMAIL, PHONE } from '@/constants/contactInfo';
import { useUIStore } from '@/store/client/ui';
import emailjs from '@emailjs/browser';
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from '@/api/config/emailjs';
import toast from 'react-hot-toast';

const MAX_SENDS_PER_EMAIL = 2;
const RATE_LIMIT_KEY = 'contact_email_sends';

type EmailSendRecord = Record<string, { count: number; lastSent: number }>;

const getEmailSends = (): EmailSendRecord => {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

const recordEmailSend = (email: string) => {
  const sends = getEmailSends();
  const now = Date.now();
  sends[email] = {
    count: (sends[email]?.count || 0) + 1,
    lastSent: now,
  };
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(sends));
};

const isEmailRateLimited = (email: string): boolean => {
  const sends = getEmailSends();
  const record = sends[email];
  if (!record) return false;

  // Reset after 24 hours
  const ONE_DAY = 24 * 60 * 60 * 1000;
  if (Date.now() - record.lastSent > ONE_DAY) return false;

  return record.count >= MAX_SENDS_PER_EMAIL;
};

const Contact = (): JSX.Element => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  const { contactPrefill, setContactPrefill } = useUIStore();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    if (contactPrefill) {
      setFormData((prev) => ({
        ...prev,
        subject: contactPrefill.subject,
        message: contactPrefill.message,
      }));
      setContactPrefill(null);

      // Scroll to form and highlight
      setTimeout(() => {
        formContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setIsHighlighted(true);
        setTimeout(() => setIsHighlighted(false), 2500);
      }, 300);
    }
  }, [contactPrefill, setContactPrefill]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const email = formData.email.trim().toLowerCase();

    if (isEmailRateLimited(email)) {
      toast.error('Bu e-posta ile kısa süre içinde birden fazla mesaj gönderdiniz. Lütfen daha sonra tekrar deneyin.', {
        duration: 5000,
      });
      return;
    }

    setSending(true);

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY,
      );
      recordEmailSend(email);
      setFormData({ fullName: '', email: '', subject: '', message: '' });
      toast.success('Mesajınız başarıyla gönderildi!');
    } catch {
      toast.error('Mesaj gönderilemedi. Lütfen tekrar deneyin.');
    } finally {
      setSending(false);
    }
  }, [formData.email]);

  const submitButtonDisabled = sending || formData.fullName === '' || formData.email === '' || formData.message === '';

  return (
    <div className="w-full h-auto bg-black text-white flex items-center justify-center p-4 md:p-12">
      <div className="max-w-7xl w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white" style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}>İletişime Geçin</h2>
          <p className="text-gray-400 max-w-2xl mx-auto" style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}>
            Profesyonel sorularınız, iş birlikleriniz veya aklınızdaki sorular için çekinmeyin.
            Size en kısa sürede geri döneceğim.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div
            ref={formContainerRef}
            className={`lg:col-span-2 border rounded-2xl p-6 md:p-8 bg-black/50 transition-all duration-700 ${
              isHighlighted
                ? 'border-blue-primary shadow-lg shadow-blue-primary/20 ring-2 ring-blue-primary/30'
                : 'border-gray-secondary'
            }`}
          >
            <h3 className="text-2xl font-semibold mb-8 text-white" style={{ fontSize: 'clamp(1.5rem, 2vw, 2rem)' }}>Mesaj Gönder</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
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
                    className="bg-base-secondary border border-gray-primary rounded-lg p-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-primary transition-colors w-full"
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
                    className="bg-base-secondary border border-gray-primary rounded-lg p-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-primary transition-colors w-full"
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
                  className="bg-base-secondary border border-gray-secondary rounded-lg p-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-primary transition-colors w-full"
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
                  className="bg-base-secondary border border-gray-primary rounded-lg p-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-primary transition-colors w-full resize-none"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-blue-primary hover:opacity-90 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 w-full md:w-auto disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                disabled={submitButtonDisabled}
              >
                {sending && <LuLoader size={18} className="animate-spin" />}
                {sending ? 'Gönderiliyor...' : 'Mesajı Gönder'}
              </button>
            </form>
          </div>
          <div className="lg:col-span-1 flex flex-col gap-8 pt-4">
            <h3 className="text-2xl font-semibold text-white mb-2" style={{ fontSize: 'clamp(1.5rem, 2vw, 2rem)' }}>Randevu İletişim Bilgileri</h3>
            <a href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x4013206231ee0cf3:0x976ce00f75dd5ef?sa=X&ved=1t:8290&ictx=111" target='_blank' className="flex items-start gap-4">
              <div className="bg-[#1a1a1a] p-3 rounded-lg text-[#3C88CB]">
                <LuMapPin size={24} />
              </div>
              <div>
                <h4 className="text-white font-medium text-lg" style={{ fontSize: 'clamp(1rem, 1vw, 1.5rem)' }}>Randevu Adres</h4>
                <p className="text-gray-400 text-sm hover:text-[#3C88CB] mt-1">
                  Erciş Şehit Rıdvan Çevik Devlet Hastanesi,<br />
                  Van, Türkiye
                </p>
              </div>
            </a>
            <a href='https://mhrs.gov.tr/vatandas/?/Randevu#/' target='_blank' className="flex items-start gap-4">
              <div className="bg-[#1a1a1a] p-3 rounded-lg text-[#3C88CB]">
                <LuCalendar size={24} />
              </div>
              <div>
                <h4 className="text-white font-medium text-lg" style={{ fontSize: 'clamp(1rem, 1vw, 1.5rem)' }}>Randevu Al</h4>
                <p className="text-gray-400 text-sm mt-1 hover:text-[#3C88CB] transition-colors cursor-pointer">
                  MHRS Üzerinden Randevu Al
                </p>
              </div>
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-start gap-4">
              <div className="bg-[#1a1a1a] p-3 rounded-lg text-[#3C88CB]">
                <LuMail size={24} />
              </div>
              <div>
                <h4 className="text-white font-medium text-lg" style={{ fontSize: 'clamp(1rem, 1vw, 1.5rem)' }}>E-Posta</h4>
                <p className="text-gray-400 text-sm mt-1 hover:text-[#3C88CB] transition-colors cursor-pointer">
                  {EMAIL}
                </p>
              </div>
            </a>
            {false && (
              <a href={`tel:${PHONE}`} className="flex items-start gap-4">
                <div className="bg-[#1a1a1a] p-3 rounded-lg text-[#3C88CB]">
                  <LuPhone size={24} />
                </div>
                <div>
                  <h4 className="text-white font-medium text-lg" style={{ fontSize: 'clamp(1rem, 1vw, 1.5rem)' }}>Telefon</h4>
                  <p className="text-gray-400 text-sm mt-1 hover:text-[#3C88CB] transition-colors cursor-pointer">
                    {PHONE}
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
