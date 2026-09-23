import { Link } from 'react-router-dom';
import SpecialsCard from "./SpecialsCard";

function SpecialsSection() {
    const specials = [
        { name: 'Greek salad', price: '$12.99', description: 'The famous Greek salad of crispy lettuce, peppers, olives and our Chicago-style feta cheese.' },
        { name: 'Bruschetta', price: '$5.99', description: 'Our bruschetta is made from grilled bread rubbed with garlic and topped with fresh tomatoes.' },
        { name: 'Lemon dessert', price: '$5.00', description: 'This dessert comes straight from grandma’s recipe book and has an authentic lemon flavor.' },
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
                    />
                ))}
            </div>
        </section>
    )
}

export default SpecialsSection;