import { motion } from 'framer-motion';
import { FaLaptopCode, FaMobileScreen, FaArrowsRotate, FaRegFileCode, FaGaugeHigh, FaLayerGroup } from 'react-icons/fa6';
import SectionHeading from './SectionHeading.jsx';
import { freelanceServices } from '../data/projects.js';
import { EASE_OUT } from '../utils/motion.js';

const SERVICE_ICONS = [
  FaLaptopCode,
  FaLayerGroup,
  FaMobileScreen,
  FaArrowsRotate,
  FaRegFileCode,
  FaGaugeHigh,
];

const INDEPENDENT_CASE_STUDIES = [
  {
    name: 'RentalChaavi',
    category: 'Commercial Rental Platform',
    liveUrl: 'https://rentalchaavi.com',
    roleTag: 'Frontend & UI Architecture',
    summary:
      'Engineered responsive property search flows, verified listing cards, and seamless REST API connectivity for real-estate rental interactions.',
    deliverables: ['Responsive Web Interface', 'Search & Filter Workflows', 'Direct Owner Connect UI', 'Mobile Optimization'],
  },
  {
    name: 'DealsKB',
    category: 'AutoBid & Auction Marketplace',
    liveUrl: 'https://dealskb.com',
    roleTag: 'Web App & Live Bidding UI',
    summary:
      'Developed real-time auto-bid interfaces, interactive map views with Leaflet, buyer/seller dashboards, and API communications.',
    deliverables: ['Live Auction Countdown UI', 'Interactive Maps (Leaflet)', 'Buyer & Seller Portals', 'WebSocket & REST Handlers'],
  },
  {
    name: 'VahanFinserv',
    category: 'Vehicle Finance Platform',
    liveUrl: 'https://vahanfinserv.com',
    roleTag: 'Frontend Finance Solutions',
    summary:
      'Created multi-step vehicle loan application flows, dynamic interest & EMI calculator widgets, and banking partner integrations.',
    deliverables: ['Dynamic Loan Calculator', 'Multi-Step Application Forms', 'Banking Partner Showcase', 'Mobile Responsive Layouts'],
  },
];

export default function Freelance() {
  return (
    <section id="freelance" className="section freelance" aria-labelledby="freelance-title">
      <div className="container">
        <SectionHeading
          id="freelance-title"
          index="04"
          label="Capabilities"
          title="Freelance & Independent Projects"
          variant="tracking"
        />

        <div className="freelance__intro-block">
          <p className="freelance__lead">
            Available for selected freelance and contract frontend engineering projects. Focused on crafting responsive,
            production-ready user interfaces that combine thoughtful design systems with reliable API integrations.
          </p>
        </div>

        {/* Services & Capabilities Grid */}
        <div className="freelance__grid">
          {freelanceServices.map((service, index) => {
            const Icon = SERVICE_ICONS[index % SERVICE_ICONS.length];
            return (
              <motion.div
                key={service.title}
                className="freelance-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: EASE_OUT }}
              >
                <div className="freelance-card__header">
                  <div className="freelance-card__icon-box">
                    <Icon className="freelance-card__icon" aria-hidden="true" />
                  </div>
                  <span className="freelance-card__tag">{service.tag}</span>
                </div>
                <h3 className="freelance-card__title">{service.title}</h3>
                <p className="freelance-card__description">{service.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Case Studies & Distinction */}
        <div className="freelance__delivery">
          <div className="freelance__delivery-header">
            <span className="eyebrow">Project Delivery Highlights</span>
            <h3 className="freelance__delivery-title">Featured Independent & Collaborative Deliverables</h3>
            <p className="freelance__delivery-sub">
              Clear distinction of frontend contributions across real-world commercial platforms and independent implementations:
            </p>
          </div>

          <div className="freelance__cases-grid">
            {INDEPENDENT_CASE_STUDIES.map((study, idx) => (
              <motion.div
                key={study.name}
                className="freelance-case"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: EASE_OUT }}
              >
                <div className="freelance-case__top">
                  <span className="freelance-case__category">{study.category}</span>
                  <span className="freelance-case__role">{study.roleTag}</span>
                </div>
                <h4 className="freelance-case__name">{study.name}</h4>
                <p className="freelance-case__desc">{study.summary}</p>
                <ul className="freelance-case__tags">
                  {study.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {study.liveUrl && (
                  <div className="freelance-case__action">
                    <a
                      href={study.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="freelance-case__link"
                    >
                      Visit {study.name} ↗
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="freelance__cta-banner">
            <div>
              <h4 className="freelance__cta-heading">Looking for Frontend Support on Your Project?</h4>
              <p className="freelance__cta-text">
                Whether you need a new responsive website built from scratch, complex React components, or REST API integration.
              </p>
            </div>
            <a href="#contact" className="btn btn--primary">
              Discuss Your Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
