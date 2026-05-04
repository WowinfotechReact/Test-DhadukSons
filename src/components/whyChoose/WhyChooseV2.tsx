import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const WhyChooseV2 = () => {
  const [counts, setCounts] = useState({
    softwares: 0,
    mobileApps: 0,
    webDev: 0,
    digital: 0,
    awards: 0,
  });

  // Animate counts
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const targets = {
      softwares: 100,
      mobileApps: 5,
      // webDev: 3141,
      // digital: 150,
      awards: 4,
    };

    const interval = setInterval(() => {
      setCounts((prev) => {
        let updated = { ...prev };
        let finished = true;

        (Object.keys(targets) as Array<keyof typeof targets>).forEach((key) => {
          if (prev[key] < targets[key]) {
            updated[key] = prev[key] + 1;
            finished = false;
          }
        });

        if (finished) clearInterval(interval);
        return updated;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="counter-section">
      <div className="container">
        <div className="site-heading text-center">
          <h5 className="sub-title">Our Achievements</h5>
          <h2 className="title">Performance You Can Count On</h2>
        </div>

        <div className="counter-grid">
          <div
            className="counter-card"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <i className="fas fa-users counter-icon flex-1"></i>
            <div className="flex-1">
              <h3>{counts.softwares}+</h3>
              <p className="counterpara">Our Satisfied Source from Farmers</p>
            </div>
          </div>

          <div
            className="counter-card"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <i className="fas fa-tractor counter-icon flex-1"></i>
            <div className="flex-1">
              <h3>{counts.mobileApps}+</h3>
              <p className="counterpara">Exporting Countries</p>
            </div>
          </div>

          {/* <div className="counter-card">
            <i className="fas fa-box-open counter-icon"></i>

            <div>
              <h3>{counts.webDev}+</h3>
              <p className="counterpara">Product Range</p>
            </div>
          </div> */}

          <div
            className="counter-card"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <i className="fas fa-trophy counter-icon flex-1"></i>
            <div className="flex-1" style={{ marginRight: "25px" }}>
              <h3>{counts.awards}+</h3>
              <p className="counterpara">Awards Won</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseV2;
