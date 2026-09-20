import TestimonialCard from "./TestimonialCard";


function TestimonialsSection() {
    const testimonials = [
        { name: 'John Doe', testimonial: 'This is a placeholder testimonial.', },
        { name: 'Jane Smith', testimonial: 'This is a placeholder testimonial.' },
        { name: 'Bob Johnson', testimonial: 'This is a placeholder testimonial.' },
        { name: 'Alice Williams', testimonial: 'This is a placeholder testimonial.' },
        { name: 'Michael Brown', testimonial: 'This is a placeholder testimonial.' },
        { name: 'Emily Davis', testimonial: 'This is a placeholder testimonial.' },
    ];

    return (
        <section className="testimonials page-width" aria-labelledby="testimonials-title">
            <h2 id="testimonials-title">Testimonials</h2>
            <div className="card-grid">
                {testimonials.map((testimonial) => (
                    <TestimonialCard
                        key={testimonial.name}
                        name={testimonial.name}
                        testimonial={testimonial.testimonial}
                    />
                ))}
            </div>
        </section>
    )
}

export default TestimonialsSection;