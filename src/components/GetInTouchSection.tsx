import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/lib/images";

type GetInTouchSectionProps = {
  /** Taller image column on the homepage hero-adjacent layout */
  tallImage?: boolean;
  className?: string;
};

export function GetInTouchSection({
  tallImage = false,
  className = "",
}: GetInTouchSectionProps) {
  return (
    <section id="contact" className={`get-in-touch ${className}`.trim()}>
      <div className="tlc-container get-in-touch-inner">
        <SectionHeading
          align="center"
          className="get-in-touch-heading"
          subtitle="Tell us about your community or ask a question about TLC CareNow—we'll get back to you soon."
        >
          Get In Touch
        </SectionHeading>

        <div className="get-in-touch-card">
          <div
            className={`get-in-touch-media${tallImage ? " get-in-touch-media--tall" : ""}`}
          >
            <Image
              src={images.contact}
              alt="Caregiver and resident knitting together and smiling"
              fill
              className="object-cover object-[center_20%]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={tallImage}
            />
            <div className="get-in-touch-media-overlay" aria-hidden />
          </div>

          <div className="get-in-touch-panel">
            <header className="get-in-touch-panel-head">
              <h3 className="get-in-touch-form-title">Send a message</h3>
              <p className="get-in-touch-form-lead">
                Fill out the form and our team will respond as soon as we can.
              </p>
            </header>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
