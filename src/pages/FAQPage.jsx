import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import styles from "../styles/styles";

const FAQPage = () => {
  return (
    <div>
      <Header activeHeading={5} />
      <FAQ />
      <Footer />
    </div>
  );
};

const FAQ = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tab) => {
    setActiveTab(activeTab === tab ? 0 : tab);
  };

  return (
    <div className={`${styles.section} my-8`}>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">FAQ</h2>

      <div className="mx-auto space-y-4">

        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(1)}
          >
            <span className="text-lg font-medium text-gray-900">
              What is your return policy?
            </span>
            <span>{activeTab === 1 ? "-" : "+"}</span>
          </button>
          {activeTab === 1 && (
            <div className="mt-4">
              <p className="text-base text-gray-500">
                If you're not satisfied with your purchase, we accept returns
                within 30 days of delivery. Please email us at
                support@myshopOstore.com.
              </p>
            </div>
          )}
        </div>

        {/* Q2 */}
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(2)}
          >
            <span className="text-lg font-medium text-gray-900">
              How do I track my order?
            </span>
            <span>{activeTab === 2 ? "-" : "+"}</span>
          </button>
          {activeTab === 2 && (
            <div className="mt-4">
              <p className="text-base text-gray-500">
                You can track your order by clicking the tracking link in your
                shipping confirmation email, or by logging into your account.
              </p>
            </div>
          )}
        </div>

        {/* Q3 */}
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(3)}
          >
            <span className="text-lg font-medium text-gray-900">
              How do I contact customer support?
            </span>
            <span>{activeTab === 3 ? "-" : "+"}</span>
          </button>
          {activeTab === 3 && (
            <div className="mt-4">
              <p className="text-base text-gray-500">
                Email support@myecommercestore.com or call (555) 123-4567 between
                9am–5pm EST, Mon–Fri.
              </p>
            </div>
          )}
        </div>

        {/* Q4 */}
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(4)}
          >
            <span className="text-lg font-medium text-gray-900">
              Can I change or cancel my order?
            </span>
            <span>{activeTab === 4 ? "-" : "+"}</span>
          </button>
          {activeTab === 4 && (
            <div className="mt-4">
              <p className="text-base text-gray-500">
                Once an order has been placed, we cannot make changes or
                cancellations. You may return items within 30 days of delivery.
              </p>
            </div>
          )}
        </div>

        {/* Q5 */}
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(5)}
          >
            <span className="text-lg font-medium text-gray-900">
              Do you offer international shipping?
            </span>
            <span>{activeTab === 5 ? "-" : "+"}</span>
          </button>
          {activeTab === 5 && (
            <div className="mt-4">
              <p className="text-base text-gray-500">
                Currently, we only ship within the United States.
              </p>
            </div>
          )}
        </div>

        {/* Q6 */}
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(6)}
          >
            <span className="text-lg font-medium text-gray-900">
              What payment methods do you accept?
            </span>
            <span>{activeTab === 6 ? "-" : "+"}</span>
          </button>
          {activeTab === 6 && (
            <div className="mt-4">
              <p className="text-base text-gray-500">
                We accept Visa, Mastercard, PayPal, and also offer Cash on
                Delivery.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;


