import Image from "next/image";
import Link from "next/link";
import { CommunityFeatureIcon } from "@/components/CommunityFeatureIcon";
import { EnterpriseLeadCapture } from "@/components/EnterpriseLeadCapture";
import { EnterpriseScreenshots } from "@/components/EnterpriseScreenshots";
import { ButtonLink } from "@/components/ui/Button";
import { communityFeatures } from "@/lib/product";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

const bookingHighlights = {
  eyebrow: "Supervisors & front desk",
  title: "Book for any resident in seconds",
  summary:
    "Book and rebook on behalf of anyone—fill a day or a full week in minutes, then pay now or pay later when it works for the resident.",
  points: [
    {
      title: "Book on behalf",
      description: "Schedule care for any resident from the desk.",
    },
    {
      title: "Rebook fast",
      description: "Change times or copy visits in seconds.",
    },
    {
      title: "Fill the week",
      description: "Stack as many bookings as you need, any day.",
    },
    {
      title: "Pay now or pay later",
      description:
        "Lock in the schedule—charge when you book, or pay later when it works for the resident.",
    },
  ],
} as const;

const rolesAndPermissions = {
  title: "Roles & permissions",
  summary:
    "Every role gets its own dashboard—the right tools for that job, without clutter from everything else.",
  roles: [
    {
      id: "resident",
      name: "Residents",
      dashboard: "Resident dashboard",
      permissions: [
        "Book visits",
        "Pay in the app",
        "See their own schedule",
        "Add care plans",
      ],
    },
    {
      id: "care-pro",
      name: "Care professionals",
      dashboard: "Care professional dashboard",
      permissions: [
        "View assignments",
        "Punch in and out",
        "Oversee their schedule",
        "Add care notes after each visit",
      ],
    },
    {
      id: "supervisor",
      name: "Supervisors",
      dashboard: "Supervisor dashboard",
      permissions: [
        "Book and rebook on behalf",
        "Assign visits and manage the day",
        "Manage care professionals",
        "Manage community staff schedules",
      ],
    },
    {
      id: "admin",
      name: "Admins",
      dashboard: "Admin dashboard",
      permissions: [
        "Services and pricing",
        "Community settings",
        "Users and permissions",
        "Payments",
      ],
    },
    {
      id: "owner",
      name: "Owners",
      dashboard: "Owner dashboard",
      permissions: [
        "Dashboards and snapshots across locations",
        "Payroll and performance reports",
        "Client scheduling",
        "Full access when they need it",
      ],
    },
  ],
} as const;

const careNotesFlow = {
  title: "Care notes after every visit",
  summary:
    "Care pros start and finish each in-progress booking with timestamps—documentation stays with the visit from the floor to end-of-shift sign-off.",
  steps: [
    {
      title: "Start the visit",
      description:
        "The care professional starts the in-progress booking; a timestamp records when care begins.",
    },
    {
      title: "Finish the visit",
      description:
        "They complete the visit when done; the finish timestamp closes the record and helps prevent time leakage.",
    },
    {
      title: "After each service",
      description:
        "Care notes are captured when the service is completed, so nothing is left undocumented.",
    },
    {
      title: "End of shift",
      description:
        "All care notes from the shift are compiled in one place for review.",
    },
    {
      title: "Care pro sign-off",
      description:
        "The care professional signs off on the shift\u2019s notes before handoff is complete.",
    },
  ],
} as const;

const carePlans = {
  title: "Care plans clients can access—and your team can act on",
  summary:
    "Care plans stay easy to find, easy to update, and easy to see in the field when something changes.",
  points: [
    {
      title: "Accessible for clients",
      description:
        "Clients can view care plans in the app without hunting through paperwork or phone calls.",
    },
    {
      title: "Easy to edit",
      description:
        "Admins update care plans in detail when needs change—without a separate system.",
    },
    {
      title: "Visible in the field",
      description:
        "Care pros and supervisors see new care plan changes so everyone out on the floor is working from the latest plan.",
    },
  ],
} as const;

const adminSetup = {
  title: "Configure your community",
  summary:
    "Admins manage setup, branding, and day-to-day controls from one place—no separate tools for each job.",
  modulesTitle: "Admin dashboard modules",
  modules: [
    "Communities",
    "Products",
    "News & Events",
    "Documents",
    "Team Members",
    "Clients",
  ],
} as const;

export function EnterprisePageContent() {
  return (
    <article className="enterprise-page">
      <section className="enterprise-hero">
        <div className="enterprise-hero-copy">
          <p className="enterprise-eyebrow">
            Designed for residents, owners, admins, and care teams
          </p>
          <h1 className="enterprise-title">
            Run your community&apos;s care from one place
          </h1>
          <span className="tlc-accent-line enterprise-accent" aria-hidden />
          <p className="enterprise-lead">
            TLC CareNow is transparent operator software built for everyday
            use—straightforward to learn, with clear visibility into care, not a
            complicated platform your community has to work around. Residents,
            supervisors, admins, and owners each get a role-based dashboard so
            bookings, schedules, and payroll are easy to see and easy to trust.
          </p>
          <div className="enterprise-hero-actions">
            <ButtonLink
              href="/contact"
              size="md"
              className="enterprise-contact-btn w-full sm:w-auto !text-white"
            >
              Request a free demo
            </ButtonLink>
          </div>
        </div>

        <div className="enterprise-hero-media">
          <Image
            src={images.featureSlides[0]}
            alt="Supervisor reviewing care assignments on a tablet with a team member"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="enterprise-hero-overlay" aria-hidden />
        </div>
      </section>

      <section className="enterprise-main tlc-section">
        <div className="tlc-container enterprise-main-inner">
          <div className="enterprise-platform-stack">
            <aside
              className="enterprise-intro"
              aria-label="Operators and residents"
            >
              <p className="enterprise-intro-eyebrow">One platform</p>
              <span
                className="tlc-accent-line enterprise-intro-accent"
                aria-hidden
              />
              <p className="enterprise-intro-lead">
                <strong className="enterprise-intro-strong">Your team</strong>{" "}
                runs operations in {site.name};{" "}
                <strong className="enterprise-intro-strong">
                  residents and families
                </strong>{" "}
                use the same platform to book and stay informed.
              </p>
              <div className="enterprise-intro-cta">
                <Link href="/" className="enterprise-intro-link">
                  See the home page
                </Link>
                <span className="enterprise-intro-cta-note">
                  for the resident experience
                </span>
              </div>
            </aside>

            <EnterpriseScreenshots />
          </div>

          <section
            className="enterprise-booking-power"
            aria-labelledby="enterprise-booking-heading"
          >
            <header className="enterprise-block-header enterprise-block-header--light">
              <p className="enterprise-block-eyebrow">
                {bookingHighlights.eyebrow}
              </p>
              <h2
                id="enterprise-booking-heading"
                className="enterprise-block-title"
              >
                {bookingHighlights.title}
              </h2>
              <span className="tlc-accent-line" aria-hidden />
              <p className="enterprise-block-lead">
                {bookingHighlights.summary}
              </p>
            </header>
            <ul className="enterprise-booking-power-grid">
              {bookingHighlights.points.map((item, index) => (
                <li key={item.title} className="enterprise-booking-power-card">
                  <span className="enterprise-booking-power-step" aria-hidden>
                    {index + 1}
                  </span>
                  <div className="enterprise-booking-power-card-body">
                    <h3 className="enterprise-booking-power-card-title">
                      {item.title}
                    </h3>
                    <p className="enterprise-booking-power-card-text">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section
            className="enterprise-platform"
            aria-labelledby="enterprise-platform-heading"
          >
            <header className="enterprise-block-header">
              <h2
                id="enterprise-platform-heading"
                className="enterprise-block-title"
              >
                Platform tools
              </h2>
              <span className="tlc-accent-line" aria-hidden />
              <p className="enterprise-block-lead">
                Workbasket, schedules, messaging, and reporting—built in, not
                bolted on.
              </p>
            </header>
            <ul className="enterprise-platform-grid">
              {communityFeatures.map((feature) => (
                <li key={feature.title} className="enterprise-platform-card">
                  <span className="enterprise-platform-icon" aria-hidden>
                    <CommunityFeatureIcon icon={feature.icon} />
                  </span>
                  <h3 className="enterprise-platform-card-title">
                    {feature.title}
                  </h3>
                  <p className="enterprise-platform-card-text">
                    {feature.summary}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section
            className="enterprise-roles"
            aria-labelledby="enterprise-roles-heading"
          >
            <header className="enterprise-block-header">
              <h2
                id="enterprise-roles-heading"
                className="enterprise-block-title"
              >
                {rolesAndPermissions.title}
              </h2>
              <span className="tlc-accent-line" aria-hidden />
              <p className="enterprise-block-lead">
                {rolesAndPermissions.summary}
              </p>
            </header>
            <ul className="enterprise-roles-list">
              {rolesAndPermissions.roles.map((role) => (
                <li
                  key={role.id}
                  className={`enterprise-roles-item enterprise-roles-item--${role.id}`}
                >
                  <div className="enterprise-roles-card-top">
                    <span className="enterprise-roles-icon" aria-hidden>
                      <EnterpriseRoleIcon roleId={role.id} />
                    </span>
                    <div className="enterprise-roles-heading">
                      <h3 className="enterprise-roles-name">{role.name}</h3>
                      <p className="enterprise-roles-dashboard">
                        <span className="enterprise-roles-dashboard-label">
                          {role.dashboard}
                        </span>
                      </p>
                    </div>
                  </div>
                  <ul className="enterprise-roles-permissions">
                    {role.permissions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          <div className="enterprise-ops-stack">
            <section
              className="enterprise-care-plans"
              aria-labelledby="enterprise-care-plans-heading"
            >
              <header className="enterprise-block-header enterprise-block-header--light">
                <h2
                  id="enterprise-care-plans-heading"
                  className="enterprise-block-title"
                >
                  {carePlans.title}
                </h2>
                <span className="tlc-accent-line" aria-hidden />
                <p className="enterprise-block-lead">{carePlans.summary}</p>
              </header>
              <ul className="enterprise-care-plans-grid">
                {carePlans.points.map((point) => (
                  <li key={point.title} className="enterprise-care-plans-card">
                    <h3 className="enterprise-care-plans-card-title">
                      {point.title}
                    </h3>
                    <p className="enterprise-care-plans-card-text">
                      {point.description}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section
              className="enterprise-care-notes"
              aria-labelledby="enterprise-care-notes-heading"
            >
              <header className="enterprise-block-header enterprise-block-header--light">
                <h2
                  id="enterprise-care-notes-heading"
                  className="enterprise-block-title"
                >
                  {careNotesFlow.title}
                </h2>
                <span className="tlc-accent-line" aria-hidden />
                <p className="enterprise-block-lead">{careNotesFlow.summary}</p>
              </header>
              <ol className="enterprise-care-notes-steps">
                {careNotesFlow.steps.map((step) => (
                  <li key={step.title} className="enterprise-care-notes-step">
                    <h3 className="enterprise-care-notes-step-title">
                      {step.title}
                    </h3>
                    <p className="enterprise-care-notes-step-text">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <section
            className="enterprise-admin-setup"
            aria-labelledby="enterprise-admin-setup-heading"
          >
            <header className="enterprise-block-header">
              <h2
                id="enterprise-admin-setup-heading"
                className="enterprise-block-title"
              >
                {adminSetup.title}
              </h2>
              <span className="tlc-accent-line" aria-hidden />
              <p className="enterprise-block-lead">{adminSetup.summary}</p>
            </header>
            <h3 className="enterprise-admin-setup-modules-title">
              {adminSetup.modulesTitle}
            </h3>
            <ul className="enterprise-admin-modules-grid">
              {adminSetup.modules.map((module) => (
                <li key={module} className="enterprise-admin-modules-item">
                  {module}
                </li>
              ))}
            </ul>
            <div
              className="enterprise-branding enterprise-branding--nested"
              aria-labelledby="enterprise-branding-heading"
            >
              <h3
                id="enterprise-branding-heading"
                className="enterprise-branding-title"
              >
                Manage your own branding
              </h3>
              <p className="enterprise-branding-text">
                Your community&apos;s app experience can reflect your brand—not
                a generic template. Admins configure how {site.name} looks and
                feels for residents and staff.
              </p>
            </div>
          </section>

          <section
            className="enterprise-closing"
            aria-labelledby="enterprise-closing-heading"
          >
            <h2
              id="enterprise-closing-heading"
              className="enterprise-closing-title"
            >
              Free demo &amp; pricing
            </h2>
            <span
              className="tlc-accent-line enterprise-closing-accent"
              aria-hidden
            />
            <p className="enterprise-closing-lead">
              Every community is different. We&apos;ll walk your team through a
              complimentary demo and put together pricing for your campuses.
            </p>
            <ul className="enterprise-closing-list">
              <li>Hands-on demo for leadership and supervisors</li>
              <li>Focused on operations—not just the resident app</li>
              <li>Custom pricing for single sites and multi-site groups</li>
            </ul>
            <div className="enterprise-closing-actions">
              <ButtonLink
                href="/contact"
                size="md"
                className="enterprise-contact-btn !text-white"
              >
                Request a free demo
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary" size="md">
                Contact us for pricing
              </ButtonLink>
            </div>
            <p className="enterprise-closing-contact">
              <a
                href={`tel:${site.phoneHeader.replace(/-/g, "")}`}
                className="enterprise-closing-phone tabular-nums"
              >
                {site.phoneHeader}
              </a>
              <span className="enterprise-closing-sep" aria-hidden>
                ·
              </span>
              <a
                href={`mailto:${site.email}`}
                className="enterprise-inline-link"
              >
                {site.email}
              </a>
            </p>
          </section>
        </div>
      </section>

      <EnterpriseLeadCapture />
    </article>
  );
}

type EnterpriseRoleId = (typeof rolesAndPermissions.roles)[number]["id"];

function EnterpriseRoleIcon({ roleId }: { roleId: EnterpriseRoleId }) {
  const shared = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (roleId) {
    case "resident":
      return (
        <svg {...shared} aria-hidden>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case "care-pro":
      return (
        <svg {...shared} aria-hidden>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "supervisor":
      return (
        <svg {...shared} aria-hidden>
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      );
    case "admin":
      return (
        <svg {...shared} aria-hidden>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      );
    case "owner":
      return (
        <svg {...shared} aria-hidden>
          <path d="M3 3v18h18" />
          <path d="M7 16l4-5 4 3 5-7" />
        </svg>
      );
  }
}
