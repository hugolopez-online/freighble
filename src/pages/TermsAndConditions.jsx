const TermsAndConditions = ({ theme }) => {
    window.scrollTo(0, 0);

    return (
        <section
            id="terms"
            className="row justify-content-center pt-5 mb-2"
        >
            <div
                className="col-10 col-md-9 mt-5 py-4"
                style={{ minHeight: "100vh" }}
            >
                <h1
                    className={`display-1 fw-semibold text-${
                        theme === "light" ? "dark" : "light"
                    }`}
                >
                    General Terms &amp; Conditions
                </h1>

                {/*<p className="text-secondary mt-3 mb-0">
                    Last updated: <span className="fw-semibold">[YYYY-MM-DD]</span>
                </p>*/}

                <div className="mt-4">
                    <p className="fs-5">
                        These Terms &amp; Conditions (<strong>“Terms”</strong>)
                        govern access to and use of the Freighble
                        software-as-a-service platform (
                        <strong>“Freighble”</strong> or the{" "}
                        <strong>“Platform”</strong>), operated by{" "}
                        <strong>FREIGHBLE TECHNOLOGIES</strong> (
                        <strong>“Company”</strong>, <strong>“we”</strong>,{" "}
                        <strong>“our”</strong>, <strong>“us”</strong>). By using
                        Freighble, you agree to be bound by these Terms.
                    </p>

                    {/* 1. Definitions */}
                    <h2 className="h3 mt-5">1. Definitions</h2>
                    <ol className="fs-6">
                        <li>
                            <strong>“Vendor”</strong> means an asset-based
                            carrier, freight broker, freight forwarder, or
                            comparable transportation provider registering a
                            company profile on Freighble.
                        </li>
                        <li>
                            <strong>“User”</strong> means a shipper, broker, or
                            other party using Freighble to discover or contact
                            Vendors for potential transportation services.
                        </li>
                        <li>
                            <strong>“Profile”</strong> means a Vendor's company
                            record on the Platform, including coverage,
                            capabilities, lanes, and contact details.
                        </li>
                        <li>
                            <strong>“Content”</strong> means information
                            submitted to or displayed on the Platform by Users
                            or Vendors.
                        </li>
                    </ol>

                    {/* 2. Account Registration & Acceptance of Terms */}
                    <h2 className="h3 mt-4">
                        2. Account Registration &amp; Acceptance of Terms
                    </h2>
                    <ol className="fs-6">
                        <li>
                            Vendors and Users must provide accurate, current,
                            and complete information during registration and
                            maintain it thereafter.
                        </li>
                        <li>
                            By ticking an acceptance box, clicking “I agree,” or
                            otherwise indicating consent, you acknowledge these
                            Terms. The version accepted at signup is recorded in
                            our systems for audit purposes.
                        </li>
                        <li>
                            Accounts may be closed by you at any time. Account
                            deletion requests can be initiated from within the
                            Platform or by contacting support (see Section 16).
                        </li>
                    </ol>

                    {/* 3. Responsibilities of Vendors & Users */}
                    <h2 className="h3 mt-4">
                        3. Responsibilities of Vendors &amp; Users
                    </h2>
                    <ol className="fs-6">
                        <li>
                            <strong>Vendor Accuracy.</strong> Vendors are solely
                            responsible for the accuracy and completeness of
                            their Profiles, including capabilities, coverage,
                            lanes (core/exclusive/banned), certifications (e.g.,
                            C-TPAT, FAST, TSA), and contact information.
                        </li>
                        <li>
                            <strong>User Use.</strong> Users agree to use
                            contact information obtained via Freighble solely to
                            inquire about legitimate loads and in compliance
                            with applicable law.
                        </li>
                        <li>
                            <strong>Visibility Control.</strong> Vendors control
                            their public visibility status and may toggle it at
                            any time in the Vendor Portal.
                        </li>
                    </ol>

                    {/* 4. Good Faith & Proper Use */}
                    <h2 className="h3 mt-4">4. Good Faith &amp; Proper Use</h2>
                    <ol className="fs-6">
                        <li>
                            Vendors and Users agree to use the Platform
                            exclusively for its intended purpose of facilitating
                            lawful and legitimate freight transportation
                            opportunities.
                        </li>
                        <li>
                            You agree to act in good faith, including: (a)
                            providing truthful information; (b) refraining from
                            deceptive or fraudulent conduct; (c) not attempting
                            to manipulate search, rankings, or visibility
                            features; (d) not scraping, spamming, harassing, or
                            misusing contact information.
                        </li>
                        <li>
                            We may suspend or terminate access for conduct
                            inconsistent with good faith or the spirit of these
                            Terms (see Section 12).
                        </li>
                    </ol>

                    {/* 5. Nature of Information & Screening */}
                    <h2 className="h3 mt-4">
                        5. Nature of Information, Screening &amp; Disclaimers
                    </h2>
                    <ol className="fs-6">
                        <li>
                            Freighble is a discovery and matching tool. While
                            the Platform may include checks, validations, or
                            badges for convenience,{" "}
                            <strong>
                                FREIGHBLE TECHNOLOGIES does not independently
                                verify, warrant, or guarantee Vendor information
                            </strong>
                            . Vendors are responsible for the accuracy and
                            reliability of their Profiles.
                        </li>
                        <li>
                            Users must conduct their own due diligence before
                            engaging a Vendor. Freighble is not a party to any
                            service agreement concluded between Users and
                            Vendors and assumes no responsibility for the
                            performance of either party.
                        </li>
                    </ol>

                    {/* 6. Matching Engine & Communication */}
                    <h2 className="h3 mt-4">
                        6. Matching Engine &amp; Communication
                    </h2>
                    <ol className="fs-6">
                        <li>
                            Freighble's matching engine surfaces Vendors based
                            on multiple factors (e.g., modes, coverage, lanes,
                            certifications). Results are best-effort and not
                            guarantees of suitability or availability.
                        </li>
                        <li>
                            When a User selects a Vendor, Freighble provides an{" "}
                            <strong>instant email link</strong> (mailto) for
                            direct outreach. The default email template includes
                            a discreet attribution and link to the Vendor
                            Portal, where visibility controls and Terms are
                            accessible. Users may edit the email, but if the
                            attribution is removed,{" "}
                            <strong>
                                FREIGHBLE TECHNOLOGIES cannot vouch for proper
                                use of contact data
                            </strong>
                            .
                        </li>
                    </ol>

                    {/* 7. Privacy & Data Use */}
                    <h2 className="h3 mt-4">7. Privacy &amp; Data Use</h2>
                    <ol className="fs-6">
                        <li>
                            Please review our Privacy Policy for details on how
                            we collect, use, and safeguard personal data. By
                            using the Platform, you consent to the practices
                            described therein.
                        </li>
                        <li>
                            You are responsible for complying with all
                            applicable privacy laws in relation to data you
                            submit or export from the Platform.
                        </li>
                    </ol>

                    {/* 8. Intellectual Property */}
                    <h2 className="h3 mt-4">8. Intellectual Property</h2>
                    <ol className="fs-6">
                        <li>
                            The Platform, including its software, design, logos,
                            text, graphics, and matching methodology, is owned
                            by FREIGHBLE TECHNOLOGIES and protected by
                            intellectual property laws.
                        </li>
                        <li>
                            You receive a limited, revocable, non-exclusive,
                            non-transferable license to use Freighble in
                            accordance with these Terms. No other rights are
                            granted.
                        </li>
                    </ol>

                    {/* 9. Prohibited Conduct */}
                    <h2 className="h3 mt-4">9. Prohibited Conduct</h2>
                    <p className="fs-6 mb-2">
                        You may not, directly or indirectly:
                    </p>
                    <ul className="fs-6">
                        <li>Reverse engineer, copy, or modify the Platform;</li>
                        <li>
                            Scrape or harvest data without express written
                            permission;
                        </li>
                        <li>
                            Use automated means to access or impact Platform
                            performance;
                        </li>
                        <li>
                            Upload malicious code or attempt to breach security;
                        </li>
                        <li>
                            Use contact details for spam, harassment, or
                            unrelated marketing.
                        </li>
                    </ul>

                    {/* 10. Fees & Subscriptions (if applicable) */}
                    <h2 className="h3 mt-4">10. Fees &amp; Subscriptions</h2>
                    <ol className="fs-6">
                        <li>
                            Certain features may require payment. Pricing,
                            billing cycles, and cancellation policies are
                            disclosed at purchase and may be updated from time
                            to time.
                        </li>
                        <li>
                            Taxes may apply based on your location (see your
                            plan details).
                        </li>
                    </ol>

                    {/* 11. No Guarantee of Outcomes */}
                    <h2 className="h3 mt-4">11. No Guarantee of Outcomes</h2>
                    <p className="fs-6">
                        FREIGHBLE TECHNOLOGIES does not guarantee that Users
                        will find suitable Vendors or that Vendors will receive
                        inquiries or secure loads. Results depend on many
                        factors beyond our control.
                    </p>

                    {/* 12. Suspension & Termination */}
                    <h2 className="h3 mt-4">
                        12. Suspension &amp; Termination
                    </h2>
                    <ol className="fs-6">
                        <li>
                            We may suspend or terminate access, with or without
                            notice, for violations of these Terms, suspected
                            fraud, legal compliance, or protection of Platform
                            integrity.
                        </li>
                        <li>
                            You may close your account at any time. Upon
                            closure, we will process deletion requests in
                            accordance with our Privacy Policy and legal
                            obligations.
                        </li>
                    </ol>

                    {/* 13. Disclaimers & Service Interruptions */}
                    <h2 className="h3 mt-4">
                        13. Disclaimers &amp; Service Interruptions
                    </h2>
                    <p className="fs-6">
                        The Platform is provided on an “as-is” and
                        “as-available” basis. We do not warrant uninterrupted
                        operation or error-free performance. Temporary outages,
                        maintenance, or third-party failures may occur.
                    </p>

                    {/* 14. Limitation of Liability */}
                    <h2 className="h3 mt-4">14. Limitation of Liability</h2>
                    <p className="fs-6">
                        To the maximum extent permitted by law, FREIGHBLE
                        TECHNOLOGIES will not be liable for indirect,
                        incidental, special, consequential, or exemplary
                        damages, including lost profits, lost business
                        opportunities, or loss of data, arising from or relating
                        to your use of the Platform or business conducted
                        between Users and Vendors.
                    </p>

                    {/* 15. Indemnification */}
                    <h2 className="h3 mt-4">15. Indemnification</h2>
                    <p className="fs-6">
                        You agree to defend, indemnify, and hold harmless
                        FREIGHBLE TECHNOLOGIES and its officers, directors,
                        employees, and agents from any claims, damages,
                        liabilities, costs, and expenses (including reasonable
                        attorneys' fees) arising out of or related to: (a) your
                        Content; (b) your use or misuse of the Platform; (c)
                        your violation of these Terms; or (d) your violation of
                        applicable laws or third-party rights.
                    </p>

                    {/* 16. Contact; Notices */}
                    <h2 className="h3 mt-4">16. Contact; Notices</h2>
                    <p className="fs-6">
                        For account deletion, support, or legal notices, contact
                        us at{" "}
                        <a
                            href="mailto:support@freighble.com"
                            target="_blank"
                        >
                            support@freighble.com
                        </a>
                        . Notices will be deemed received when sent to your
                        account email or delivered via the Platform.
                    </p>

                    {/* 17. Force Majeure */}
                    <h2 className="h3 mt-4">17. Force Majeure</h2>
                    <p className="fs-6">
                        We are not liable for delays or failures caused by
                        events beyond our reasonable control, including acts of
                        God, labor disputes, internet or hosting outages,
                        government actions, or other force majeure events.
                    </p>

                    {/* 18. Modifications to Terms */}
                    <h2 className="h3 mt-4">18. Modifications to Terms</h2>
                    <p className="fs-6">
                        We may update these Terms from time to time. Material
                        changes will be posted on the Platform with a revised
                        “Last updated” date. Continued use after changes become
                        effective constitutes acceptance of the updated Terms.
                    </p>

                    {/* 19. Governing Law; Venue */}
                    <h2 className="h3 mt-4">19. Governing Law; Venue</h2>
                    <p className="fs-6 mb-0">
                        These Terms are governed by the laws of the jurisdiction
                        in which FREIGHBLE TECHNOLOGIES is organized, without
                        regard to conflict of law rules. Exclusive venue for
                        disputes shall lie in the courts of that jurisdiction
                        unless otherwise required by applicable law.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default TermsAndConditions;
