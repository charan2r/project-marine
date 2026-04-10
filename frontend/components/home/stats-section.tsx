import { Fish, Users, MapPin, TreePine } from "lucide-react"

const stats = [
  {
    label: "Species Catalogued",
    value: "12,500+",
    icon: Fish,
    description: "Marine species in our database"
  },
  {
    label: "Observations",
    value: "245,000+",
    icon: MapPin,
    description: "Citizen science contributions"
  },
  {
    label: "Active Members",
    value: "35,000+",
    icon: Users,
    description: "Community participants worldwide"
  },
  {
    label: "Conservation Projects",
    value: "180+",
    icon: TreePine,
    description: "Active initiatives globally"
  },
]

export function StatsSection() {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Our Impact
          </h2>
          <p className="text-3xl font-bold tracking-tight sm:text-4xl">
            Together We Make a Difference
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <stat.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="text-3xl font-bold tracking-tight text-foreground">
                {stat.value}
              </div>
              <div className="mt-1 text-sm font-medium text-foreground">
                {stat.label}
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
