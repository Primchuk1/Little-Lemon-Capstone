import StaticPageLayout from "../Components/StaticPageLayout";
import { menuCategories } from "../data/menu";

export default function MenuPage() {
    return (
        <StaticPageLayout
            title="Our menu"
            eyebrow="Fresh flavors. Made for sharing."
            description="Explore Mediterranean favorites, from the first bite to something sweet."
        >
            {menuCategories.map((category, index) => (
                <section className="menu-category" key={category.name} aria-labelledby={`menu-category-${index}`}>
                    <div className="menu-category__intro">
                        <span className="menu-category__number" aria-hidden="true">0{index + 1}</span>
                        <h2 id={`menu-category-${index}`}>{category.name}</h2>
                        <p>{category.description}</p>
                    </div>
                    <ul className="menu-list">
                        {category.items.map((item) => (
                            <li className="menu-list__item" key={item.name}>
                                <div className="menu-list__heading"><h3>{item.name}</h3><span className="menu-list__price">{item.price}</span></div>
                                <p>{item.description}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
            <p className="static-page__note">Please let our team know about any food allergies or dietary requirements when you visit.</p>
        </StaticPageLayout>
    );
}
