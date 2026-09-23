import StaticPageLayout from "../Components/StaticPageLayout";

export default function AboutPage() {
    return (
        <StaticPageLayout
            title="About Little Lemon"
            eyebrow="Family-owned. Chicago at heart."
            description="Mediterranean traditions, a modern touch, and a warm welcome at every table."
        >
            <section className="static-page__split" aria-labelledby="our-story">
                <div>
                    <p className="booking-eyebrow">Our story</p>
                    <h2 id="our-story">Good food brings us together.</h2>
                    <p>Little Lemon is a family-owned Mediterranean restaurant in Chicago. Our kitchen celebrates the recipes we love, bringing traditional flavors to the table with a fresh, modern approach.</p>
                    <p>From a crisp Greek salad to a slice of our lemon dessert, we believe the most memorable meals start with simple ingredients and end with good company.</p>
                </div>
                <aside className="static-page__panel static-page__panel--green">
                    <p className="static-page__eyebrow">The Little Lemon way</p>
                    <h2>A place at the table for you.</h2>
                    <p>A relaxed lunch, a family celebration, or a catch-up with friends. Whatever brings you here, settle in and make yourself at home.</p>
                    <span className="static-page__signature">With love, Little Lemon</span>
                </aside>
            </section>
            <section aria-labelledby="our-values">
                <div className="section-heading"><h2 id="our-values">What makes us Little Lemon</h2></div>
                <div className="static-page__cards">
                    <article className="static-page__panel"><h3>Mediterranean roots</h3><p>Olive oil, bright citrus, fragrant herbs, and recipes made for sharing.</p></article>
                    <article className="static-page__panel"><h3>A fresh perspective</h3><p>Traditional favorites with thoughtful touches that make every dish our own.</p></article>
                    <article className="static-page__panel"><h3>Warm hospitality</h3><p>A friendly neighborhood table where a quick bite can become a long conversation.</p></article>
                </div>
            </section>
            <section className="static-page__visit" aria-labelledby="visit-title">
                <div><h2 id="visit-title">Find us in Chicago</h2><p>Come for the food. Stay for the company.</p></div>
                <address>Little Lemon<br />123 Lemon Street, Chicago, IL<br />(312) 555-0123<br />hello@littlelemon.com</address>
            </section>
        </StaticPageLayout>
    );
}

