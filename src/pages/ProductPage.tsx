import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { promoCode } from "../utils/promo";
import {
  setCountdownStart,
  getCountdownStart,
  clearCountdown,
} from "../utils/countdown";
import { useCountdown } from "../hooks/useCountdown";
import { useUserData } from "../hooks/useUserData";
import { useStripePrices } from "../hooks/useStripePrices";
import { checkoutApi } from "../utils/api";
import { Button } from "../components/Button";
import { Header } from "../components/Header";

export function ProductPage() {
  const navigate = useNavigate();
  const { userData } = useUserData();
  const { isActive, formattedTime } = useCountdown();
  const {
    prices,
    isLoading: pricesLoading,
    error: pricesError,
    refetch,
  } = useStripePrices();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Parse formattedTime to get minutes and seconds
  const parseTime = (timeString: string) => {
    const [minutes, seconds] = timeString.split(":").map(Number);
    return {
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  };

  const { minutes, seconds } = parseTime(formattedTime);

  // Initialize countdown on first visit
  useEffect(() => {
    // Check for timer reset in dev mode
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("resetTimer") === "1") {
      clearCountdown();
      setCountdownStart();
      // Remove the resetTimer param from URL
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("resetTimer");
      window.history.replaceState({}, "", newUrl.toString());
      return;
    }

    if (!getCountdownStart()) {
      setCountdownStart();
    }
  }, []);

  const promoCodeValue = promoCode(userData.name);

  // Get current price based on timer state and Stripe data
  const currentPrice =
    isActive && prices?.discounted ? prices.discounted : prices?.full;
  const originalPrice = prices?.full;

  const handleBuyNow = async () => {
    if (!userData.email) {
      setError("Email is required for checkout");
      return;
    }

    if (!currentPrice) {
      setError("Pricing information is not available. Please try again.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await checkoutApi.createSession({
        mode: isActive ? "discounted" : "full",
        email: userData.email,
      });

      // Redirect to Stripe Checkout
      window.location.href = response.url;
    } catch (err) {
      console.error("Checkout error:", err);
      setError("Failed to start checkout. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="page">
      <Header showBack={true} onBack={() => navigate("/name")} />
      <div className="page__container">
        <div className="page__content">
          <h1
            className="page__title"
            style={{ textAlign: "center", fontSize: "22px" }}
          >
            Choose the best plan for you
          </h1>

          <div className="product">
            {isActive && (
              <div className="product__promo">
                <div className="product__promo-header">
                  <img
                    src="/src/assets/icons/Coupon Icon.png"
                    alt="Promo"
                    className="product__promo-icon"
                    style={{ width: "17px", height: "17px" }}
                  />
                  <span className="product__promo-text">
                    Your Promo Code is Applied!
                  </span>
                </div>
                <div className="product__promo-divider"></div>
                <div className="product__promo-content">
                  <div className="product__promo-code-container">
                    <img
                      src="/src/assets/icons/Vector (Stroke).png"
                      alt="Check"
                      className="product__promo-check"
                      style={{ width: "13.43px", height: "9.72px" }}
                    />
                    <span className="product__promo-code">
                      {promoCodeValue}
                    </span>
                  </div>
                  <div className="product__timer">
                    <div className="product__timer-content">
                      <div className="product__timer-values">
                        <div className="product__timer-value product__timer-minutes">
                          {minutes}
                        </div>
                        <div className="product__timer-separator">:</div>
                        <div className="product__timer-value product__timer-seconds">
                          {seconds}
                        </div>
                      </div>
                      <div className="product__timer-labels">
                        <div className="product__timer-label">minutes</div>
                        <div className="product__timer-label">seconds</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="product__card product__card--selected">
              <div className="product__card-content">
                <div className="product__card-left">
                  <div className="product__card-radio product__card-radio--selected">
                    <img
                      src="/src/assets/icons/Selector.png"
                      alt="Selected"
                      className="product__card-radio-icon"
                    />
                  </div>
                  <div className="product__card-info">
                    <h3 className="product__card-title">4 WEEK PLAN</h3>
                    <div className="product__prices">
                      {isActive && originalPrice && currentPrice && (
                        <>
                          <span className="product__price-text product__price-original">
                            {originalPrice.formatted}
                          </span>
                          <span className="product__price-text product__price-current">
                            {currentPrice.formatted}
                          </span>
                        </>
                      )}
                      {!isActive && currentPrice && (
                        <span className="product__price-text product__price-current">
                          {currentPrice.formatted}
                        </span>
                      )}
                      {!currentPrice && !pricesLoading && (
                        <span className="product__price-text product__price-error">
                          Price unavailable
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="product__card-right">
                  <div className="product__price-daily">
                    {currentPrice ? (
                      <>
                        <span className="product__price-daily-amount">
                          {(currentPrice.amount / 100 / 28).toFixed(2)}{" "}
                          <span className="product__price-daily-currency">
                            {currentPrice.currency.toUpperCase()}
                          </span>
                        </span>
                        <div className="product__price-daily-label">
                          per day
                        </div>
                      </>
                    ) : (
                      <div className="product__price-daily-error">
                        {pricesLoading ? "Loading..." : "Unavailable"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="product__card-popular">MOST POPULAR</div>
            </div>

            {(error || pricesError) && (
              <div className="product__error">
                {error || pricesError}
                {pricesError && (
                  <button
                    onClick={refetch}
                    className="product__retry-btn"
                    style={{
                      marginLeft: "8px",
                      padding: "4px 8px",
                      fontSize: "12px",
                      background: "transparent",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Retry
                  </button>
                )}
              </div>
            )}

            <div className="product__actions">
              <Button
                onClick={handleBuyNow}
                isLoading={isLoading || pricesLoading}
                disabled={!currentPrice || pricesLoading}
                className="product__buy-btn"
              >
                {pricesLoading ? "Loading..." : "Get My Plan"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
