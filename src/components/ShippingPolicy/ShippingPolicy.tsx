import { useEffect } from "react";

const ShippingPolicy = () => {
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
                At <strong>Dhaduk and Sons Farmer LLP</strong>, we aim to
                deliver fresh, high-quality products to your doorstep safely and
                on time. Please read our Shipping Policy to understand how we
                process and deliver orders.
              </p>

              {/* 1 */}
              <h5 className="mt-30">1. Order Processing</h5>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li className="text-black">
                  Orders are usually processed within 1 business day after
                  payment confirmation.
                </li>
                <li className="text-black">
                  During peak seasons or promotional periods, processing times
                  may take longer.
                </li>
                <li className="text-black">
                  Customers will receive an order confirmation email along with
                  tracking details once the order is dispatched.
                </li>
              </ul>

              {/* 2 */}
              <h5 className="mt-30">2. Shipping Methods and Delivery Time</h5>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li className="text-black">
                  We partner with trusted courier and logistics services to
                  ensure timely delivery.
                </li>
                <li className="text-black">
                  Estimated delivery timelines depend on your location:
                </li>
                <li className="text-black">Within State: 1–3 Business Days</li>
                <li className="text-black">Across India: 3–7 Business Days</li>
                <li className="text-black">Out of India: 7–12 Business Days</li>
                <li className="text-black">
                  We do not guarantee same-day or exact-time delivery, but we
                  make every effort to meet estimated timelines.
                </li>
              </ul>

              {/* 3 */}
              <h5 className="mt-30">3. Shipping Charges</h5>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li className="text-black">
                  Shipping charges are calculated at checkout based on order
                  weight, size, and delivery location.
                </li>
                <li className="text-black">
                  Free shipping may be available for orders above a certain
                  value, as per our current offers.
                </li>
              </ul>

              {/* 4 */}
              <h5 className="mt-30">4. Delivery Instructions</h5>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li className="text-black">
                  Customers must provide accurate delivery details, including
                  full address and contact number.
                </li>
                <li className="text-black">
                  We are not responsible for delays or failed deliveries caused
                  by incorrect or incomplete information.
                </li>
                <li className="text-black">
                  If no one is available at the delivery address, the courier
                  may attempt redelivery or hold the package at the nearest
                  branch.
                </li>
              </ul>

              {/* 5 */}
              <h5 className="mt-30">5. Shipping Restrictions</h5>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li className="text-black">
                  Certain products may have shipping restrictions due to their
                  perishable nature.
                </li>
                <li className="text-black">
                  Orders cannot be shipped to P.O. Boxes or addresses outside
                  India unless explicitly specified.
                </li>
              </ul>

              {/* 6 */}
              <h5 className="mt-30">6. Damaged or Lost Packages</h5>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li className="text-black">
                  In case of damaged, lost, or incorrect deliveries, please
                  contact us immediately.
                </li>
                <li className="text-black">
                  Claims must include order details and photographic evidence of
                  the issue.
                </li>
                <li className="text-black">
                  After verification, we will arrange a replacement or refund as
                  applicable.
                </li>
              </ul>

              {/* 7 */}
              <h5 className="mt-30">7. Contact Us</h5>
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

export default ShippingPolicy;
