import { useEffect } from "react";

const TermsAndConditions = () => {
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
                Welcome to <strong>Dhaduk and Sons Farmer LLP</strong>. By
                accessing or using our website, you agree to comply with and be
                bound by the following Terms and Conditions. Please read them
                carefully before placing any orders.
              </p>

              {/* 1 */}
              <h5 className="mt-30">1. Acceptance of Terms</h5>
              <p>
                By using our website and purchasing our products, you accept
                these Terms and Conditions in full. If you do not agree to these
                terms, please do not use the website or place orders.
              </p>

              {/* 2 */}
              <h5 className="mt-30">2. Eligibility</h5>
              <p>
                You must be at least 18 years old to use this website and
                purchase products. By placing an order, you confirm that you
                meet this age requirement.
              </p>

              {/* 3 */}
              <h5 className="mt-30">3. Product Information</h5>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li className="text-black">
                  We make every effort to ensure that product descriptions,
                  images, pricing, and availability are accurate.
                </li>
                <li className="text-black">
                  Product packaging, ingredients, or appearance may vary
                  slightly from the images displayed on the website.
                </li>
                <li className="text-black">
                  Allergen information is provided as accurately as possible;
                  please read product labels carefully before use.
                </li>
              </ul>

              {/* 4 */}
              <h5 className="mt-30">4. Orders and Payment</h5>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li className="text-black">
                  Orders can be placed online through our website.
                </li>
                <li className="text-black">
                  All prices are in Indian Rupees (INR) and are inclusive of
                  applicable taxes unless stated otherwise.
                </li>
                <li className="text-black">
                  Payment must be made at the time of order via the available
                  secure payment methods.
                </li>
                <li className="text-black">
                  We reserve the right to cancel any order if payment cannot be
                  processed or if there are errors in pricing or product
                  description.
                </li>
              </ul>

              {/* 5 */}
              <h5 className="mt-30">5. Delivery and Shipping</h5>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li className="text-black">
                  Delivery timelines are estimates and may vary depending on
                  location, stock availability, and other factors.
                </li>
                <li className="text-black">
                  Risk of loss or damage to products passes to the customer upon
                  delivery.
                </li>
                <li className="text-black">
                  Customers must provide accurate delivery details. We are not
                  responsible for delays caused by incorrect addresses or
                  third-party logistics providers.
                </li>
              </ul>

              {/* 6 */}
              <h5 className="mt-30">6. Returns and Refunds</h5>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li className="text-black">
                  Due to the perishable nature of our products, we generally do
                  not accept returns unless the product is damaged, spoiled, or
                  incorrect.
                </li>
                <li className="text-black">
                  For eligible refunds, customers must contact us within 2 days
                  with proof of the issue.
                </li>
                <li className="text-black">
                  Refunds will be processed after verification and may take up
                  to 7 days to reflect in your account.
                </li>
              </ul>

              {/* 7 */}
              <h5 className="mt-30">7. User Conduct</h5>
              <p>While using our website, you agree not to:</p>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li className="text-black">
                  Post or transmit any unlawful, harmful, or offensive content
                </li>
                <li className="text-black">
                  Interfere with the functioning of the website
                </li>
                <li className="text-black">
                  Attempt to access other users’ accounts or personal
                  information
                </li>
              </ul>

              {/* 8 */}
              <h5 className="mt-30">8. Intellectual Property</h5>
              <p>
                All content on this website, including text, images, logos,
                product descriptions, and designs, is owned by Dhaduk and Sons
                Farmer LLP and protected under intellectual property laws. You
                may not use, reproduce, or distribute our content without
                written permission.
              </p>

              {/* 9 */}
              <h5 className="mt-30">9. Limitation of Liability</h5>
              <p>
                We strive to provide accurate and high-quality products, but
                Dhaduk and Sons Farmer LLP is not liable for any direct,
                indirect, or consequential loss arising from the use of our
                website or products. We do not guarantee uninterrupted access to
                the website or error-free functionality.
              </p>

              {/* 10 */}
              <h5 className="mt-30">10. Privacy</h5>
              <p>
                Your use of our website is also governed by our Privacy Policy,
                which explains how we collect, use, and protect your personal
                information. By using our website, you consent to our Privacy
                Policy.
              </p>

              {/* 11 */}
              <h5 className="mt-30">11. Governing Law</h5>
              <p>
                These Terms and Conditions are governed by the laws of India.
                Any disputes arising from these terms or your use of our website
                shall be subject to the exclusive jurisdiction of the courts.
              </p>

              {/* 12 */}
              <h5 className="mt-30">12. Changes to Terms</h5>
              <p>
                We may update these Terms and Conditions from time to time. Any
                changes will be posted on this page with the updated effective
                date. Continued use of our website constitutes acceptance of the
                updated Terms.
              </p>

              {/* 13 */}
              <h5 className="mt-30">13. Contact Us</h5>
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

export default TermsAndConditions;
