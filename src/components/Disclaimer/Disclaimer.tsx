import { useEffect } from "react";

const Disclaimer = () => {
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
                The information provided on this website is for general
                informational purposes only. Dhaduk and Sons Farmer LLP makes
                every effort to ensure that the information on this website is
                accurate, complete, and up-to-date. However, we do not make any
                warranties or representations of any kind, express or implied,
                about the accuracy, reliability, suitability, or availability of
                the information, products, or services contained on the website.
              </p>

              <h5 className="mt-30">Product Information Disclaimer</h5>
              <p>
                All product descriptions, images, ingredients, nutritional
                values, and pricing displayed on the website are provided for
                reference purposes only. Actual product packaging and contents
                may vary. Customers are advised to read product labels carefully
                before use, especially if they have allergies or dietary
                restrictions.
              </p>

              <h5 className="mt-30">Health & Usage Disclaimer</h5>
              <p>
                Our products are not intended to diagnose, treat, cure, or
                prevent any disease. Any health-related information shared on
                this website is not a substitute for professional medical
                advice. Always consult a qualified professional before making
                dietary or health-related decisions.
              </p>

              <h5 className="mt-30">External Links Disclaimer</h5>
              <p>
                This website may contain links to third-party websites for
                additional information or convenience. Dhaduk and Sons Farmer
                LLP does not have control over the content, nature, or
                availability of those sites and does not endorse or take
                responsibility for them.
              </p>

              <h5 className="mt-30">Limitation of Liability</h5>
              <p>
                Under no circumstances shall Dhaduk and Sons Farmer LLP be
                liable for any loss or damage, including indirect or
                consequential loss, arising out of or in connection with the use
                of this website or the purchase of products through it.
              </p>

              <h5 className="mt-30">Website Availability Disclaimer</h5>
              <p>
                We do not guarantee that the website will always be available,
                uninterrupted, or free from technical errors, viruses, or other
                harmful components.
              </p>

              <h5 className="mt-30">Changes to Disclaimer</h5>
              <p>
                We reserve the right to modify or update this Disclaimer at any
                time without prior notice. Continued use of the website after
                changes are posted constitutes acceptance of the updated
                Disclaimer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
