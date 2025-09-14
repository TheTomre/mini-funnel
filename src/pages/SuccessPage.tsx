import { Header } from "../components/Header";

export function SuccessPage() {
  return (
    <div className="page">
      <Header showBack={false} />
      <div className="page__container">
        <div className="success">
          <h1 className="success__title">Thank you</h1>
        </div>
      </div>
    </div>
  );
}
