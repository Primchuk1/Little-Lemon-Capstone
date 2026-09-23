import { Link } from 'react-router-dom';
function SpecialsCard({ title, price, description, imageSrc, imageAlt }) {
    return (
        <article className="special-card">
            <img className="special-card__image" src={imageSrc} alt={imageAlt} width="900" height="600" loading="lazy" decoding="async" />
            <div className="special-card__content">
                <div className="special-card__heading"><h3>{title}</h3><span>{price}</span></div>
                <p>{description}</p>
                <Link to="/order-online">Order a delivery <span aria-hidden="true">&rarr;</span></Link>
            </div>
        </article>
    )
}

export default SpecialsCard;
