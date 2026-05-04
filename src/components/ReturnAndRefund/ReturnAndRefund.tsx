import { useEffect } from "react";

const ReturnRefundPolicy = () => {
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
                At <strong>Dhaduk and Sons Farmer LLP</strong>, we take pride in
                delivering fresh, high-quality food products. Due to the
                perishable nature of our products, we have a specific Return and
                Refund Policy to ensure fairness and customer satisfaction.
              </p>

              {/* 1 */}
              <h5 className="mt-30">1. Eligibility for Returns and Refunds</h5>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li className="text-black">
                  Returns are accepted only if the product is damaged, spoiled,
                  or incorrect.
                </li>
                <li className="text-black">
                  Claims must be made within <strong>2 days</strong> of
                  receiving the product.
                </li>
                <li className="text-black">
                  Products must be unused and in their original packaging when
                  requesting a refund.
                </li>
              </ul>

              {/* 2 */}
              <h5 className="mt-30">2. Non-Returnable Items</h5>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li className="text-black">
                  Due to hygiene and safety reasons, perishable food items
                  cannot be returned if they are delivered in good condition.
                </li>
                <li className="text-black">
                  Products purchased at promotional discounts or clearance may
                  not be eligible for refunds unless damaged.
                </li>
              </ul>

              {/* 3 */}
              <h5 className="mt-30">3. How to Request a Refund</h5>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li className="text-black">
                  Contact our customer support via email{" "}
                  <strong>dandsfarmerllp@gmail.com</strong> or phone{" "}
                  <strong>+91 9601182335</strong> within the specified
                  timeframe.
                </li>
                <li className="text-black">
                  Provide your order number, product details, and photographic
                  proof of the issue.
                </li>
                <li className="text-black">
                  Our team will review your request and guide you through the
                  process.
                </li>
              </ul>

              {/* 4 */}
              <h5 className="mt-30">4. Refund Process</h5>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li className="text-black">
                  Once the claim is verified, the refund will be processed to
                  the original payment method.
                </li>
                <li className="text-black">
                  Refund processing may take up to <strong>7 days</strong>,
                  depending on your bank or payment provider.
                </li>
                <li className="text-black">
                  Shipping charges, if any, are non-refundable unless the error
                  is on our side.
                </li>
              </ul>

              {/* 5 */}
              <h5 className="mt-30">5. Replacement Policy</h5>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li className="text-black">
                  In case of damaged or incorrect products, we may offer a
                  replacement instead of a refund based on stock availability.
                </li>
                <li className="text-black">
                  Replacement delivery will be arranged at no additional cost to
                  the customer.
                </li>
              </ul>

              {/* 6 */}
              <h5 className="mt-30">6. Contact Us</h5>
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

export default ReturnRefundPolicy;
