import React, { useEffect, useRef } from "react";
import "./PrivacyPolicy.css";

const sections = [
  {
    number: "01",
    title: "Information We Collect",
    subsections: [
      {
        subtitle: "Information You Provide",
        content:
          "Rate My Prof is designed to be used anonymously. We do not require you to create an account or provide any personal information such as your name, email address, student ID, or contact details.",
        bullets: [
          "The content of your rating or review",
          "The professor you are reviewing",
          "The timestamp of your submission",
        ],
      },
      {
        subtitle: "Automatically Collected Information",
        content:
          "When you visit Rate My Prof, we may automatically collect certain technical information. This is used solely for operating and improving the platform and is never used to personally identify individual users.",
        bullets: [
          "Your IP address (used only for spam prevention)",
          "Browser type and device information",
          "Pages visited and time spent on the platform",
          "Referring website or source",
        ],
      },
    ],
  },
  {
    number: "02",
    title: "How We Use Your Information",
    content:
      "We do not use your information for advertising targeting, profiling, or any commercial purpose beyond operating the platform.",
    bullets: [
      "To display professor ratings and reviews on the platform",
      "To maintain and improve platform performance",
      "To detect and prevent spam, abuse, or misuse",
      "To understand general usage patterns and improve experience",
    ],
  },
  {
    number: "03",
    title: "Anonymity and Your Reviews",
    content:
      "Rate My Prof is built on the principle of anonymous feedback. We do not display your identity alongside any review or rating you submit. Your name, email, or student identity is never associated with your submissions publicly. However, please be aware that no system can guarantee complete anonymity — submissions containing highly specific personal details or writing patterns may inadvertently identify the author.",
  },
  {
    number: "04",
    title: "Our Content Policy",
    highlight: true,
    content:
      "Rate My Prof is a platform for honest, constructive academic feedback. We strongly believe in giving students a voice — and with that voice comes responsibility.",
    warning:
      "We do not encourage, support, or condone the use of this platform to defame, abuse, harass, or personally attack any professor or faculty member.",
    bullets: [
      "Abusive, offensive, or threatening language directed at any individual",
      "False statements of fact intended to damage a person's reputation",
      "Personal attacks unrelated to academic performance or teaching quality",
      "Discriminatory content based on gender, religion, caste, race, or nationality",
      "Content that violates any applicable law",
      "We do not prompte or censor specific opinions about professors, but we reserve the right to remove content that violates our guidelines or is reported by users as harmful or abusive.",
      "We encourage users to focus their feedback on academic aspects such as teaching style, grading patterns, course difficulty, and overall learning experience rather than personal characteristics or unrelated matters.",
      "If you see content that you believe violates our guidelines, please report it to us so we can review and take appropriate action.",
      "We are not responsible for the content posted by users, but we reserve the right to remove any content that violates our guidelines.",
    ],
    footer:
      "Criticism of teaching style, grading patterns, course difficulty, or academic conduct is entirely within the scope of this platform. The distinction we draw is between honest academic feedback and malicious personal targeting.",
  },
  {
    number: "05",
    title: "Data Sharing and Third Parties",
    content:
      "We do not sell, rent, or trade your personal information to any third party under any circumstances. We may share limited technical information with the following service providers who are bound by their own privacy policies:",
    bullets: [
      "Vercel — frontend hosting provider",
      "Render — backend hosting provider",
      "MongoDB Atlas — secure database storage",
    ],
  },
  {
    number: "06",
    title: "Data Retention",
    content:
      "Reviews, ratings, and comments are stored in our database and displayed publicly on the platform. We retain this data for as long as the platform is operational. If you wish to have a specific review removed, please contact us and we will evaluate the request on a case by case basis.",
  },
  {
    number: "07",
    title: "Cookies",
    content:
      "Rate My Prof uses minimal cookies strictly necessary for the platform to function, such as storing your selected college preference locally in your browser. We do not use tracking cookies, advertising cookies, or any third party analytics cookies.",
  },
  {
    number: "08",
    title: "Children's Privacy",
    content:
      "Rate My Prof is intended for use by college students aged 18 and above. We do not knowingly collect any information from individuals under the age of 18. If you believe a minor has submitted information through our platform, please contact us immediately.",
  },
  {
    number: "09",
    title: "Security",
    content:
      "We take reasonable technical measures to protect the data stored on our platform. However, no internet-based platform can guarantee absolute security. We encourage users not to include any sensitive personal information in their reviews or comments.",
  },
  {
    number: "10",
    title: "Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time as the platform grows. Any changes will be reflected on this page with an updated effective date. Continued use of the platform after any changes constitutes your acceptance of the updated policy.",
  },
];

const PrivacyPolicy = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("pp-visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pp-root">
      {/* Background grid */}
      <div className="pp-bg-grid" />

      {/* Header */}
      <header className="pp-header">
        <div className="pp-header-inner">
          <div className="pp-badge">Legal Document</div>
          <h1 className="pp-title">
            Privacy
            <br />
            <span className="pp-title-accent">Policy</span>
          </h1>
          <div className="pp-meta">
            <span className="pp-meta-item">
              <span className="pp-meta-dot" />
              Rate My Prof
            </span>
            <span className="pp-meta-item">
              <span className="pp-meta-dot" />
              Effective: March 2026
            </span>
            <span className="pp-meta-item">
              <span className="pp-meta-dot" />
              IIT Colleges, India
            </span>
          </div>
          <p className="pp-intro">
            Welcome to Rate My Prof — a student-built anonymous professor rating
            platform for IIT colleges across India. This policy explains how we
            collect, use, and protect your information at{" "}
            <a
              href="https://rate-my-prof-mu.vercel.app"
              className="pp-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              rate-my-prof-mu.vercel.app
            </a>
            . By using Rate My Prof, you agree to the practices described below.
          </p>
        </div>
      </header>

      {/* Sections */}
      <main className="pp-main">
        {sections.map((section, i) => (
          <div
            key={i}
            className={`pp-section ${section.highlight ? "pp-section-highlight" : ""}`}
            ref={(el) => (sectionRefs.current[i] = el)}
          >
            <div className="pp-section-number">{section.number}</div>
            <div className="pp-section-body">
              <h2 className="pp-section-title">{section.title}</h2>

              {section.subsections ? (
                section.subsections.map((sub, j) => (
                  <div key={j} className="pp-subsection">
                    <h3 className="pp-subsection-title">{sub.subtitle}</h3>
                    <p className="pp-text">{sub.content}</p>
                    {sub.bullets && (
                      <ul className="pp-bullets">
                        {sub.bullets.map((b, k) => (
                          <li key={k} className="pp-bullet-item">
                            <span className="pp-bullet-icon">→</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))
              ) : (
                <>
                  {section.warning && (
                    <div className="pp-warning">
                      <span className="pp-warning-icon">⚠</span>
                      {section.warning}
                    </div>
                  )}
                  {section.content && (
                    <p className="pp-text">{section.content}</p>
                  )}
                  {section.bullets && (
                    <ul className="pp-bullets">
                      {section.bullets.map((b, k) => (
                        <li key={k} className="pp-bullet-item">
                          <span className="pp-bullet-icon">→</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.footer && (
                    <p className="pp-text pp-section-footer">
                      {section.footer}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        ))}

        {/* Contact Section */}
        <div
          className="pp-contact"
          ref={(el) => (sectionRefs.current[sections.length] = el)}
        >
          <div className="pp-section-number">11</div>
          <div className="pp-section-body">
            <h2 className="pp-section-title">Contact Us</h2>
            <p className="pp-text">
              If you have any questions about this Privacy Policy, wish to
              report a content violation, or want to request removal of a
              review, please reach out to us.
            </p>
            <div className="pp-contact-card">
              <div className="pp-contact-row">
                <span className="pp-contact-label">Platform</span>
                <a
                  href="https://rate-my-prof-mu.vercel.app"
                  className="pp-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  rate-my-prof-mu.vercel.app
                </a>
              </div>
              <div className="pp-contact-row">
                <span className="pp-contact-label">Email</span>
                <a
                  href="mailto:startupfactory303@gmail.com"
                  className="pp-link"
                >
                  startupfactory303@gmail.com
                </a>
              </div>
              <div className="pp-contact-row">
                <span className="pp-contact-label">Location</span>
                <span className="pp-contact-value">
                  IIT ISM Dhanbad, Jharkhand, India
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer strip */}
      <div className="pp-footer-strip">
        <span>Rate My Prof</span>
        <span className="pp-footer-dot">·</span>
        <span>Built by students, for students</span>
        <span className="pp-footer-dot">·</span>
        <span>© 2026</span>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
