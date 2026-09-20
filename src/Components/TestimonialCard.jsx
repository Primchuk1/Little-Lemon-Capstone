function TestimonialCard({ name, image, testimonial }) {
    return (
        <article className="testimonial-card">
            <p aria-label="5 out of 5 stars">★★★★★</p>
            <div className="testimonial-card__person">
                <div className="avatar-placeholder" aria-hidden="true" />
                <strong>{name}</strong>
            </div>
            <p>{testimonial}</p>
        </article>
    )
}

export default TestimonialCard;