import Nav from "./Nav";
import Header from "./Header";
import Footer from "./Footer";

export default function StaticPageLayout({ title, eyebrow, description, children }) {
    return (
        <>
            <Nav className="topbar page-width"><Header /></Nav>
            <main className="static-page">
                <header className="static-page__hero">
                    <div className="page-width">
                        <p className="static-page__eyebrow">{eyebrow}</p>
                        <h1>{title}</h1>
                        <p className="static-page__description">{description}</p>
                    </div>
                </header>
                <div className="page-width static-page__content">{children}</div>
            </main>
            <Footer />
        </>
    );
}
