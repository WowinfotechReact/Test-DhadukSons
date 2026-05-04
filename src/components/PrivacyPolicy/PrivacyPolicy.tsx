import { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="default-padding">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-11">
            <div className="about-style-one-info">
              <p>
                At Dhaduk and Sons Farmer LLP, we respect your privacy and are
                committed to protecting the personal information you share with
                us. This Privacy Policy explains how we collect, use, store, and
                protect your information when you visit our website or purchase
                our products.
              </p>

              <p>
                By accessing or using our website, you agree to the terms of
                this Privacy Policy.
              </p>

              <h5 className="mt-30">Information We Collect</h5>
              <p>
                <strong>Personal Information</strong>
              </p>

              <p>We collect personal information when you:</p>
              <ul className="list-disc list-inside pl-4 mb-2">
                <li className="text-black">Place an order</li>
                <li className="text-black">Create an account</li>
                <li className="text-black">Contact us</li>
                <li className="text-black">Subscribe to updates or offers</li>
              </ul>
              <br />
              <p>This may include:</p>
              <ul className="list-disc list-inside pl-4 mb-2">
                <li className="text-black">Name</li>
                <li className="text-black">Mobile number</li>
                <li className="text-black">Email address</li>
                <li className="text-black">Billing and delivery address</li>
                <li className="text-black">Order and transaction details</li>
              </ul>
              <br />
              <h5 className="mt-30">How We Use Your Information</h5>
              <ul className="list-disc list-inside pl-4 mb-2">
                <li className="text-black">Process and deliver orders</li>
                <li className="text-black">
                  Confirm transactions and send updates
                </li>
                <li className="text-black">Provide customer support</li>
                <li className="text-black">
                  Improve our website and product offerings
                </li>
                <li className="text-black">
                  Send important service-related communication
                </li>
                <li className="text-black">
                  Share promotional content (only if you opt in)
                </li>
              </ul>
              <br />
              <h5 className="mt-30">Cookies Policy</h5>
              <p>
                Our website uses cookies to enhance user experience, remember
                preferences, and analyse site traffic. You can manage or disable
                cookies through your browser settings. Some features may not
                function properly without cookies.
              </p>

              <h5 className="mt-30">Sharing of Information</h5>
              <p>
                We do not sell or rent your personal data. Your information may
                be shared only with:
              </p>
              <ul className="list-disc list-inside pl-4 mb-2">
                <li className="text-black">Payment gateway providers</li>
                <li className="text-black">Logistics and delivery partners</li>
                <li className="text-black">Technology and service providers</li>
                <li className="text-black">
                  Legal or regulatory authorities, when required by law
                </li>
              </ul>
              <br />
              <h5 className="mt-30">Payment Information</h5>
              <p>
                All payments made on our website are processed through secure
                third-party payment gateways. Dhaduk and Sons Farmer LLP does
                not store your card or banking details.
              </p>

              <h5 className="mt-30">Data Protection & Security</h5>
              <p>
                We follow reasonable security practices and procedures to
                protect your personal data. However, no online platform can
                guarantee absolute security.
              </p>

              <h5 className="mt-30">Data Retention</h5>
              <p>
                Your personal data is retained only for as long as necessary to
                fulfil orders, comply with legal obligations, or resolve
                disputes.
              </p>

              <h5 className="mt-30">Children’s Privacy</h5>
              <p>
                Our website and products are intended for individuals above 18
                years of age. We do not knowingly collect personal information
                from minors.
              </p>

              <h5 className="mt-30">Third-Party Links</h5>
              <p>
                Our website may include links to third-party websites. We are
                not responsible for their privacy practices or content.
              </p>

              <h5 className="mt-30">Your Rights</h5>
              <ul className="list-disc list-inside pl-4 mb-2">
                <li className="text-black">Access your personal data</li>
                <li className="text-black">Request correction or deletion</li>
                <li className="text-black">
                  Withdraw consent for marketing communication
                </li>
              </ul>
              <br />
              <h5 className="mt-30">Changes to This Privacy Policy</h5>
              <p>
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page with a revised effective date.
              </p>

              <h5 className="mt-30">Contact Information</h5>
              <p>
                <strong>Dhaduk and Sons Farmer LLP</strong>
                <br />
                Email: dandsfarmerllp@gmail.com
                <br />
                Phone: +91 9601182335
                <br />
                Address: Block No. 119, Near Main Canal Areth Bodhan Road,
                Areth, Mandvi, Surat, Gujarat, India, 394170
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
