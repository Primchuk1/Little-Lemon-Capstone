function SpecialsCard({ title, price, description, imageSrc }) {
    return (
        <article className="special-card">
            <div className="image-placeholder special-card__image" role="img" aria-label={`${title} placeholder`} />
            <div className="special-card__content">
                <div className="special-card__heading"><h3>{title}</h3><span>{price}</span></div>
                <p>{description}</p>
                <a href="/order-online">Order a delivery <span aria-hidden="true">🛵</span></a>
            </div>
        </article>
    )
}

export default SpecialsCard;