import StaticPageLayout from "../Components/StaticPageLayout";
import { menuCategories } from "../data/menu";

const favorites = menuCategories.map((category) => category.items[0]);

export default function OrderOnlinePage() {
    return (
        <StaticPageLayout
            title="Order online"
            eyebrow="A taste of Little Lemon at home"
            description="Your favorite Mediterranean flavors, ready to inspire your next night in."
        >
            <section className="static-page__split" aria-labelledby="ordering-title">
                <div>
                    <p className="booking-eyebrow">From our table to yours</p>
                    <h2 id="ordering-title">Good food, wherever you gather.</h2>
                    <p>A relaxed evening, a lunch with friends, or a family meal. Bring a little Mediterranean inspiration to your table with our restaurant favorites.</p>
                </div>
                <aside className="static-page__panel" aria-labelledby="ordering-status">
                    <span className="static-page__badge">Coming soon</span>
                    <h2 id="ordering-status">Online ordering is on its way.</h2>
                    <p>For now, enjoy a look at some of our favorites below. Orders cannot be placed through this page yet.</p>
                </aside>
            </section>
            <section aria-labelledby="order-favorites">
                <div className="section-heading"><h2 id="order-favorites">A few favorites for your table</h2></div>
                <div className="static-page__cards">
                    {favorites.map((item) => (
                        <article className="static-page__panel" key={item.name}>
                            <div className="menu-list__heading"><h3>{item.name}</h3><span className="menu-list__price">{item.price}</span></div>
                            <p>{item.description}</p>
                        </article>
                    ))}
                </div>
            </section>
            <section className="static-page__visit" aria-labelledby="sharing-title">
                <div><h2 id="sharing-title">Make a meal of it</h2><p>Start with bruschetta, share a Greek salad, and finish with something lemony. The best meals have a little of everything.</p></div>
                <p className="static-page__signature">Simple ingredients. Plenty of heart.</p>
            </section>
        </StaticPageLayout>
    );
}
