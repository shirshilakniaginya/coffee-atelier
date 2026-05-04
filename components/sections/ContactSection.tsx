import Image from "next/image";
import { contacts } from "@/lib/coffee-content";

export default function ContactSection() {
  return (
    <section className="contact-panel" id="contacts">
      <div className="contact-panel__layout">
        <div className="contact-panel__media">
          <div className="contact-panel__frame">
            <Image
              src="/cofecontacts.png"
              alt="Coffee People interior"
              className="contact-panel__image"
              fill
              sizes="(max-width: 1120px) 100vw, 48vw"
            />
          </div>
        </div>

        <div className="contact-panel__content">
          <div className="contact-panel__intro">
            <span className="section-kicker">Контакты</span>
            <h2>{contacts.title}</h2>
            <p>{contacts.subtitle}</p>
          </div>

          <div className="contact-panel__grid">
            <a className="contact-card" href={`tel:${contacts.phone.replace(/[^\d+]/g, "")}`}>
              <span>Телефон</span>
              <strong>{contacts.phone}</strong>
            </a>
            <a className="contact-card" href={`mailto:${contacts.email}`}>
              <span>Email</span>
              <strong>{contacts.email}</strong>
            </a>
            <div className="contact-card">
              <span>Адрес</span>
              <strong>{contacts.address}</strong>
            </div>
            <div className="contact-card">
              <span>Режим работы</span>
              <strong>{contacts.hours}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
