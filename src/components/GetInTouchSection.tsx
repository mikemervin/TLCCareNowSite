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
      <div className="tlc-container tlc-section pb-0 sm:pb-2">
        <SectionHeading
          align="center"
          className="mb-10 sm:mb-12"
          subtitle="Questions about CareNow or your community? We'd love to hear from you."
        >
          Get In Touch
        </SectionHeading>
      </div>

      <div className="tlc-container get-in-touch-body">
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
            <ContactForm />
            <p className="get-in-touch-note">
              We look forward to hearing from you!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
