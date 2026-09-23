import { Link } from 'react-router-dom';
function Hero() {
    return (
        <>
            <section className="hero-section">
                <div className="page-width hero-section__layout">
                    <div className="hero-section__copy">
                        <h1>Little Lemon</h1>
                        <p className="location">Chicago</p>
                        <p>We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
                        <Link className="button" to="/reservations">Reserve a Table</Link>
                    </div>
                    <div className="image-placeholder image-placeholder--hero" role="img" aria-label="Restaurant food presentation placeholder" />
                </div>
            </section>
        </>
    )
}

export default Hero;