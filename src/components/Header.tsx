import { useNavigate } from "react-router-dom";

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
}

export function Header({ showBack = false, onBack }: HeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__left">
          {showBack && (
            <button
              className="header__back"
              onClick={handleBack}
              aria-label="Go back"
            >
              <svg
                width="10"
                height="20"
                viewBox="0 0 10 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 1L1.5 10L8.5 19"
                  stroke="#212121"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="header__center">
          <div className="header__logo">
            <img src="/src/assets/icons/Logo Wrap.png" alt="Momentum" />
          </div>
        </div>

        <div className="header__right" />
      </div>
    </header>
  );
}
