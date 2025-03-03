export default function StatsSection() {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-bold mb-2">15+</div>
            <p className="text-primary-foreground/80">Years Experience</p>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold mb-2">1,200+</div>
            <p className="text-primary-foreground/80">Projects Completed</p>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
            <p className="text-primary-foreground/80">Satisfied Clients</p>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold mb-2">25+</div>
            <p className="text-primary-foreground/80">Team Members</p>
          </div>
        </div>
      </div>
    </section>
  )
}

