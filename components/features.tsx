import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const features = [
  {
    title: "Tech Talks",
    description: "Regular presentations on cutting-edge technologies and local innovations."
  },
  {
    title: "Networking",
    description: "Connect with like-minded tech enthusiasts and professionals in Bend."
  },
  {
    title: "Workshops",
    description: "Hands-on learning experiences to enhance your tech skills."
  },
  {
    title: "Job Board",
    description: "Exclusive access to local tech job opportunities."
  }
]

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

