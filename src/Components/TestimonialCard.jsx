function TestimonialCard({ name, occasion, testimonial }) {
    const initials = name.split(" ").map((part) => part[0]).join("");

    return (
        <figure className="testimonial-card">
            <span className="testimonial-card__quote-mark" aria-hidden="true">&ldquo;</span>
            <blockquote><p>{testimonial}</p></blockquote>
            <figcaption className="testimonial-card__person">
                <span className="testimonial-card__initials" aria-hidden="true">{initials}</span>
                <div><strong>{name}</strong><span className="testimonial-card__occasion">{occasion}</span><span className="testimonial-card__sample">Sample testimonial</span></div>
            </figcaption>
        </figure>
    );
}

export default TestimonialCard;
