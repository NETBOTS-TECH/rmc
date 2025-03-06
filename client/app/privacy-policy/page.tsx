import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gray-100">
      <div className="container px-4  p-8 ">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Privacy Policy</h1>
        <p className="text-gray-600 text-center mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        {/* Content */}
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
            <p>
              Welcome to Repair My Concrete. Your privacy is important to us. This Privacy Policy explains how we
              collect, use, and protect your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
            <p>
              We may collect personal information such as your name, email, phone number, and location when you interact
              with our website, request an estimate, or contact us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6">
              <li>To provide and improve our services.</li>
              <li>To communicate with you regarding inquiries or requests.</li>
              <li>To send updates, promotions, and service-related notifications.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Cookies & Tracking Technologies</h2>
            <p>
              Our website may use cookies to enhance user experience, analyze site traffic, and personalize content.
              You can choose to disable cookies in your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Third-Party Services</h2>
            <p>
              We may use third-party services for analytics, payments, and marketing. These services have their own
              privacy policies that govern their data handling practices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Your Rights & Choices</h2>
            <p>
              You have the right to request access to your personal data, correct inaccuracies, or request deletion of
              your information. Contact us for any requests.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2 font-medium">Email: info@repairmyconcrete.com</p>
            <p className="font-medium">Phone: 720-555-1234</p>
          </section>
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-primary font-semibold hover:underline transition-all duration-200 hover:text-gray-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
