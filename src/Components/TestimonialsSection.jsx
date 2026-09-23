import TestimonialCard from "./TestimonialCard";

const testimonials = [
    { name: "Maya R.", occasion: "Lunch with friends", testimonial: "The Greek salad was crisp and full of flavor, and the bruschetta was perfect for sharing. A lovely spot for a long lunch with friends." },
    { name: "Daniel K.", occasion: "A family celebration", testimonial: "We came for a family birthday and felt welcome from the moment we arrived. Friendly service, a relaxed atmosphere, and plenty to share." },
    { name: "Sofia M.", occasion: "A sweet finish", testimonial: "Save room for the lemon dessert! Bright, light, and just the right amount of sweetness after a delicious meal. It was the highlight of our visit." },
];

function TestimonialsSection() {
    return (
        <section className="testimonials" aria-labelledby="testimonials-title" aria-describedby="testimonials-note">
            <div className="page-width">
                <p className="booking-eyebrow testimonials__eyebrow">Around our table</p>
                <h2 id="testimonials-title">A taste of the Little Lemon experience</h2>
                <p className="testimonials__note" id="testimonials-note">Sample testimonials for this capstone project, not verified customer reviews.</p>
                <div className="testimonial-grid">
                    {testimonials.map((testimonial) => <TestimonialCard key={testimonial.name} {...testimonial} />)}
                </div>
            </div>
        </section>
    );
}

export default TestimonialsSection;
