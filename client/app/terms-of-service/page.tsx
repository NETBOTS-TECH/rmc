import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Terms of Service
        </h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Please read these Terms of Service carefully before using our website.
        </p>

        <div className=" p-8  max-w-4xl mx-auto space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-600">
              Welcome to Repair My Concrete. By accessing our website, you agree to comply with our terms and conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. User Responsibilities</h2>
            <p className="text-gray-600">
              You must use this site responsibly and not engage in any activities that may harm our services or reputation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Limitation of Liability</h2>
            <p className="text-gray-600">
              We do not take responsibility for any direct or indirect damages resulting from the use of our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Contact Information</h2>
            <p className="text-gray-600">
              If you have any questions about these Terms, please contact us at:
              <Link href="/contact" className="text-primary font-medium hover:underline ml-1">
                Contact Us
              </Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
