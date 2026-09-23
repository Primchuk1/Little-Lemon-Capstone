import { Link } from 'react-router-dom';
import SpecialsCard from "./SpecialsCard";

function SpecialsSection() {
    const specials = [
        { name: 'Greek salad', price: '$12.99', description: 'The famous Greek salad of crispy lettuce, peppers, olives and our Chicago-style feta cheese.', imageSrc: '/images/greek-salad.jpg', imageAlt: 'Greek salad with feta, tomatoes, olives, and crisp lettuce' },
        { name: 'Bruschetta', price: '$5.99', description: 'Our bruschetta is made from grilled bread rubbed with garlic and topped with fresh tomatoes.', imageSrc: '/images/bruschetta.jpg', imageAlt: 'Toasted bread topped with tomato slices and fresh basil' },
        { name: 'Lemon dessert', price: '$5.00', description: 'Inspired by grandma\'s recipe book, our lemon dessert is a bright and refreshing finish to your meal.', imageSrc: '/images/lemon-cake.jpg', imageAlt: 'Golden lemon cake served with fresh lemon slices' },
    ]

    return (
        <section className="specials page-width" aria-labelledby="specials-title">
            <div className="section-heading">
                <h2 id="specials-title">Specials</h2>
                <Link className="button" to="/menu">Online Menu</Link>
            </div>
            <div className="card-grid">
                {specials.map((special) => (
                    <SpecialsCard
                        key={special.name}
                        title={special.name}
                        price={special.price}
                        description={special.description}
                        imageSrc={special.imageSrc}
                        imageAlt={special.imageAlt}
                    />
                ))}
            </div>
        </section>
    )
}

export default SpecialsSection;
