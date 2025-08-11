import Image from "next/image";

function SectionImagePlaceholder({
  label,
  variant = "light",
}: {
  label: string;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  return (
    <div className="mt-10 mx-auto w-full max-w-4xl">
      <div
        className={[
          "aspect-[4/3] w-full overflow-hidden rounded-xl",
          isDark
            ? "border border-white/20 bg-white/5"
            : "border border-gray-200 bg-gray-50",
        ].join(" ")}
      >
        <div
          className={[
            "grid h-full place-items-center text-sm",
            isDark ? "text-white/70" : "text-gray-500",
          ].join(" ")}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Human‑Like Automation for Depop Sellers
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Automatically relist and like items to boost your visibility —
                safely and naturally, just like a real person.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center rounded-lg bg-black px-5 py-3 text-white shadow hover:opacity-90"
                >
                  Start Free Trial
                </a>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span>Safe to Use</span>
                  <span>•</span>
                  <span>No Password Sharing</span>
                  <span>•</span>
                  <span>Cancel Anytime</span>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                <Image
                  src="/hero-relist.png"
                  alt="Relisting automation preview"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 540px, 100vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-semibold">Selling on Depop Takes Time You Don’t Have</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              "Manually relisting items every day is exhausting",
              "Liking items to get noticed takes hours",
              "Falling behind means fewer sales",
            ].map((point) => (
              <div key={point} className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="text-gray-700">{point}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 mx-auto w-full max-w-4xl">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-gray-200 bg-white">
              <Image
                src="/problem.png"
                alt="Common time drains for Depop sellers"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 768px, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-semibold">Let Our Tool Do the Work — Just Like You Would</h2>
          <p className="mt-3 text-gray-600 max-w-2xl">
            Our automation mimics real human behavior — with realistic timing and patterns — so it’s safe for your account.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-medium">Automatic Relisting</h3>
              <p className="mt-2 text-gray-600">
                Keep your items at the top of search results — without constant manual work.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-medium">Auto‑Like</h3>
              <p className="mt-2 text-gray-600">
                Engage with buyers and boost visibility — in a natural, human‑like way.
              </p>
            </div>
          </div>
          <div className="mt-10 mx-auto w-full max-w-4xl">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-gray-200 bg-white">
              <Image
                src="/solution.png"
                alt="Human-like automation: relisting and liking"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 768px, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-semibold">How It Works</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Sign up and connect your Depop account",
                desc: "Create your account in minutes."
              },
              {
                title: "Set your relisting and liking preferences",
                desc: "Choose timing and limits that match your pace."
              },
              {
                title: "Watch your items climb the search results",
                desc: "We handle the repetitive clicks for you."
              }
            ].map((step, i) => (
              <div key={step.title} className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="text-sm text-gray-500">Step {i + 1}</div>
                <h3 className="mt-1 text-lg font-medium">{step.title}</h3>
                <p className="mt-1 text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
          <SectionImagePlaceholder label="How it works image placeholder" />
        </div>
      </section>

      {/* Social Proof */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-semibold">Loved by Busy Sellers</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border border-gray-200 p-6">
                <p className="text-gray-700">
                  “I went from 2 sales a week to 6 — without spending more time online.”
                </p>
                <div className="mt-3 text-sm text-gray-500">Placeholder Name</div>
              </div>
            ))}
          </div>
          <SectionImagePlaceholder label="Social proof image placeholder" />
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-semibold">Simple, Affordable Pricing</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h3 className="text-xl font-medium">Free</h3>
              <p className="mt-1 text-gray-600">10 relists/day, 10 likes/day</p>
              <button className="mt-6 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 hover:bg-gray-100">
                Get Started
              </button>
            </div>
            <div className="rounded-2xl border-2 border-black bg-white p-6">
              <h3 className="text-xl font-medium">Pro</h3>
              <p className="mt-1 text-gray-600">Unlimited relists & likes, priority support</p>
              <button className="mt-6 w-full rounded-lg bg-black px-4 py-3 text-white shadow hover:opacity-90">
                Start Free Trial
              </button>
            </div>
          </div>
          <SectionImagePlaceholder label="Pricing section image placeholder" />
        </div>
      </section>

      {/* Safety */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-semibold">Safe, Human‑Like Automation</h2>
          <p className="mt-3 max-w-2xl text-gray-600">
            We use realistic delays, randomization, and human‑like patterns to keep your account safe. No password sharing — your data stays secure.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {["Realistic delays", "Randomized patterns", "No password sharing"].map((item) => (
              <div key={item} className="rounded-xl border border-gray-200 p-6">
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
          <SectionImagePlaceholder label="Safety section image placeholder" />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className="text-3xl font-semibold">Spend Less Time Clicking — and More Time Selling</h2>
          <SectionImagePlaceholder label="Final CTA image placeholder" variant="dark" />
          <a
            href="#pricing"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 font-medium text-gray-900 shadow hover:opacity-90"
          >
            Start Free Trial
          </a>
        </div>
      </section>
    </main>
  );
}
