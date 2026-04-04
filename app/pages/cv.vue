<template>
  <div class="cv-root bg-stone-200 flex justify-center py-8 px-4 print:p-0 print:bg-white antialiased">

    <div class="cv-page bg-cream w-[210mm] min-h-[297mm] flex shadow-2xl print:shadow-none print:w-full relative overflow-hidden">

      <!-- Sidebar -->
      <aside class="bg-carbon text-white w-[34%] shrink-0 relative overflow-hidden">
        <div class="sidebar-pattern absolute inset-0 pointer-events-none" />
        <div class="h-[3px] bg-gradient-to-r from-bronze via-bronze-light to-transparent line-grow" style="animation-delay: 0.2s" />

        <div class="relative z-10 px-8 pt-10 pb-10">
          <!-- Photo -->
          <div class="flex justify-center mb-8 anim-scale" style="animation-delay: 0.15s">
            <div class="photo-ring rounded-full p-[3px]">
              <img
                src="/profielfoto.jpg"
                alt="Nick van Hooff"
                class="w-[130px] h-[130px] rounded-full object-cover block bg-ink border-[3px] border-carbon"
              >
            </div>
          </div>

          <!-- Contact -->
          <div class="anim-right" style="animation-delay: 0.25s">
            <h2 class="font-display text-[13pt] font-bold uppercase tracking-[0.25em] text-bronze-light mb-4 flex items-center gap-3">
              <span class="w-2 h-2 rounded-full bg-bronze inline-block flex-shrink-0" />
              Contact
            </h2>
            <div class="space-y-3 ml-5">
              <div>
                <div class="text-[8pt] uppercase tracking-[0.15em] text-stone-500 mb-0.5 font-medium">E-mail</div>
                <a href="mailto:nickvanhooff03@gmail.com" class="sidebar-link text-[9.5pt] text-stone-300 no-underline break-all leading-snug">nickvanhooff03@gmail.com</a>
              </div>
              <div>
                <div class="text-[8pt] uppercase tracking-[0.15em] text-stone-500 mb-0.5 font-medium">Telefoon</div>
                <a href="tel:0629787913" class="sidebar-link text-[9.5pt] text-stone-300 no-underline leading-snug">06 29 78 79 13</a>
              </div>
              <div>
                <div class="text-[8pt] uppercase tracking-[0.15em] text-stone-500 mb-0.5 font-medium">Adres</div>
                <span class="text-[9.5pt] text-stone-300 leading-snug">Torenberglaan 29<br>5628 EL, Eindhoven</span>
              </div>
              <div>
                <div class="text-[8pt] uppercase tracking-[0.15em] text-stone-500 mb-0.5 font-medium">LinkedIn</div>
                <a href="https://www.linkedin.com/in/nick-van-hooff-67ba7a1b8/" target="_blank" rel="noopener noreferrer" class="sidebar-link text-[9pt] text-stone-300 no-underline break-all leading-snug">linkedin.com/in/nick-van-hooff-67ba7a1b8</a>
              </div>
              <div>
                <div class="text-[8pt] uppercase tracking-[0.15em] text-stone-500 mb-0.5 font-medium">GitHub</div>
                <a href="https://github.com/nickvanhooff" target="_blank" rel="noopener noreferrer" class="sidebar-link text-[9pt] text-stone-300 no-underline break-all leading-snug">github.com/nickvanhooff</a>
              </div>
              <div>
                <div class="text-[8pt] uppercase tracking-[0.15em] text-stone-500 mb-0.5 font-medium">Website</div>
                <a href="https://www.nickvanhooff.com" target="_blank" rel="noopener noreferrer" class="sidebar-link text-[9pt] text-stone-300 no-underline break-all leading-snug">nickvanhooff.com</a>
              </div>
            </div>
          </div>

          <div class="my-6 h-px bg-gradient-to-r from-bronze/30 via-bronze/10 to-transparent" />

          <!-- Vaardigheden -->
          <div class="anim-right" style="animation-delay: 0.35s">
            <h2 class="font-display text-[13pt] font-bold uppercase tracking-[0.25em] text-bronze-light mb-4 flex items-center gap-3">
              <span class="w-2 h-2 rounded-full bg-bronze inline-block flex-shrink-0" />
              Vaardigheden
            </h2>
            <div class="ml-5 space-y-4">
              <div>
                <div class="text-[8pt] uppercase tracking-[0.15em] text-stone-500 mb-1.5 font-semibold">Talen</div>
                <div class="space-y-1">
                  <div class="flex items-start"><span class="skill-dot" /><span class="text-[9.5pt] text-stone-300">JavaScript / TypeScript</span></div>
                  <div class="flex items-start"><span class="skill-dot" /><span class="text-[9.5pt] text-stone-300">PHP</span></div>
                  <div class="flex items-start"><span class="skill-dot" /><span class="text-[9.5pt] text-stone-300">C# / Java</span></div>
                  <div class="flex items-start"><span class="skill-dot skill-dot--muted" /><span class="text-[9pt] text-stone-500 italic">Python <span class="text-[7.5pt] not-italic">(lerend)</span></span></div>
                </div>
              </div>
              <div>
                <div class="text-[8pt] uppercase tracking-[0.15em] text-stone-500 mb-1.5 font-semibold">Frameworks</div>
                <div class="space-y-1">
                  <div class="flex items-start"><span class="skill-dot" /><span class="text-[9.5pt] text-stone-300">Nuxt.js / Next.js</span></div>
                  <div class="flex items-start"><span class="skill-dot" /><span class="text-[9.5pt] text-stone-300">Laravel</span></div>
                  <div class="flex items-start"><span class="skill-dot" /><span class="text-[9.5pt] text-stone-300">Spring Boot / .NET</span></div>
                  <div class="flex items-start"><span class="skill-dot skill-dot--muted" /><span class="text-[9pt] text-stone-500 italic">LangGraph / LLM's <span class="text-[7.5pt] not-italic">(lerend)</span></span></div>
                  <div class="flex items-start"><span class="skill-dot skill-dot--muted" /><span class="text-[9pt] text-stone-500 italic">Hugging Face <span class="text-[7.5pt] not-italic">(lerend)</span></span></div>
                </div>
              </div>
              <div>
                <div class="text-[8pt] uppercase tracking-[0.15em] text-stone-500 mb-1.5 font-semibold">Tools &amp; Databases</div>
                <div class="space-y-1">
                  <div class="flex items-start"><span class="skill-dot" /><span class="text-[9.5pt] text-stone-300">Git &amp; Docker</span></div>
                  <div class="flex items-start"><span class="skill-dot" /><span class="text-[9.5pt] text-stone-300">PostgreSQL / MySQL</span></div>
                  <div class="flex items-start"><span class="skill-dot" /><span class="text-[9.5pt] text-stone-300">Sanity CMS / Shopware</span></div>
                  <div class="flex items-start"><span class="skill-dot" /><span class="text-[9.5pt] text-stone-300">REST API's</span></div>
                </div>
              </div>
            </div>
          </div>

          <div class="my-6 h-px bg-gradient-to-r from-bronze/30 via-bronze/10 to-transparent" />

          <!-- Eigenschappen -->
          <div class="anim-right" style="animation-delay: 0.45s">
            <h2 class="font-display text-[13pt] font-bold uppercase tracking-[0.25em] text-bronze-light mb-4 flex items-center gap-3">
              <span class="w-2 h-2 rounded-full bg-bronze inline-block flex-shrink-0" />
              Eigenschappen
            </h2>
            <div class="ml-5 flex flex-wrap gap-1.5">
              <span class="text-[8.5pt] text-stone-300 border border-stone-700 rounded-full px-2.5 py-0.5">Leergierig</span>
              <span class="text-[8.5pt] text-stone-300 border border-stone-700 rounded-full px-2.5 py-0.5">Probleemoplossend</span>
              <span class="text-[8.5pt] text-stone-300 border border-stone-700 rounded-full px-2.5 py-0.5">Flexibel</span>
              <span class="text-[8.5pt] text-stone-300 border border-stone-700 rounded-full px-2.5 py-0.5">Doorzettingsvermogen</span>
              <span class="text-[8.5pt] text-stone-300 border border-stone-700 rounded-full px-2.5 py-0.5">Sociaal &amp; Teamgericht</span>
              <span class="text-[8.5pt] text-stone-300 border border-stone-700 rounded-full px-2.5 py-0.5">Loyaal</span>
            </div>
          </div>

          <div class="my-6 h-px bg-gradient-to-r from-bronze/30 via-bronze/10 to-transparent" />

          <!-- Hobby's -->
          <div class="anim-right" style="animation-delay: 0.55s">
            <h2 class="font-display text-[13pt] font-bold uppercase tracking-[0.25em] text-bronze-light mb-4 flex items-center gap-3">
              <span class="w-2 h-2 rounded-full bg-bronze inline-block flex-shrink-0" />
              Hobby's
            </h2>
            <div class="ml-5 space-y-1">
              <div class="flex items-start"><span class="skill-dot" /><span class="text-[9.5pt] text-stone-300">Fitness</span></div>
              <div class="flex items-start"><span class="skill-dot" /><span class="text-[9.5pt] text-stone-300">Uiteten</span></div>
              <div class="flex items-start"><span class="skill-dot" /><span class="text-[9.5pt] text-stone-300">Met vrienden optrekken</span></div>
            </div>
          </div>
        </div>

        <div class="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-bronze-light to-bronze line-grow" style="animation-delay: 0.6s; transform-origin: right;" />
      </aside>

      <!-- Main Content -->
      <main class="w-[66%] px-10 py-10 relative">
        <!-- Decorative corner accent -->
        <div class="absolute top-0 right-0 w-24 h-24 opacity-[0.03] pointer-events-none print:hidden">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="100" y1="0" x2="0" y2="100" stroke="#b08968" stroke-width="1" />
            <line x1="100" y1="20" x2="20" y2="100" stroke="#b08968" stroke-width="1" />
            <line x1="100" y1="40" x2="40" y2="100" stroke="#b08968" stroke-width="1" />
            <line x1="100" y1="60" x2="60" y2="100" stroke="#b08968" stroke-width="1" />
            <line x1="100" y1="80" x2="80" y2="100" stroke="#b08968" stroke-width="1" />
          </svg>
        </div>

        <!-- Header -->
        <header class="mb-8">
          <h1 class="anim font-display text-[34pt] font-bold text-carbon tracking-[0.08em] leading-none" style="animation-delay: 0.1s">
            NICK<br><span class="text-bronze">VAN HOOFF</span>
          </h1>
          <div class="anim mt-3 flex items-center gap-3" style="animation-delay: 0.2s">
            <div class="h-[2px] w-10 bg-bronze" />
            <p class="font-dm text-[10pt] text-stone-500 font-light tracking-[0.12em] uppercase">
              Full-Stack Developer &amp; AI Engineer
              <span class="text-bronze text-[8.5pt] normal-case tracking-normal">(in opleiding)</span>
            </p>
          </div>
          <p class="anim text-[9.5pt] text-stone-600 leading-relaxed mt-5 font-light" style="animation-delay: 0.3s">
            HBO-ICT student (Fontys) met werkervaring in full-stack development, momenteel de overstap makend naar Generative AI. Op zoek naar een onderzoeksstage per september 2026.
          </p>
        </header>

        <!-- AI Projecten -->
        <section class="anim mb-7" style="animation-delay: 0.32s">
          <h2 class="font-display text-[13pt] font-bold text-carbon uppercase tracking-[0.25em] mb-1 flex items-center gap-3">
            <span class="w-1.5 h-1.5 rounded-full bg-bronze inline-block" />
            AI-Projecten
            <span class="text-[9pt] text-stone-400 font-dm font-light normal-case tracking-normal ml-1">(in ontwikkeling)</span>
          </h2>
          <div class="h-[2px] bg-gradient-to-r from-bronze via-bronze/40 to-transparent mb-4 line-grow" style="animation-delay: 0.33s" />

          <div class="entry-card rounded-lg px-3 py-2.5 -mx-3 mb-3">
            <div class="flex justify-between items-baseline mb-1">
              <span class="text-[10.5pt] font-semibold text-carbon">Privacy Officer AI Agent</span>
              <span class="text-[8.5pt] text-stone-400 tracking-wide whitespace-nowrap ml-3 font-medium uppercase">2026</span>
            </div>
            <p class="text-[9.5pt] text-stone-600 leading-snug font-light mt-0.5">Haalt automatisch gevoelige persoonsgegevens uit open teksten via drie lagen, inclusief indirecte identificatie die standaard tools missen.</p>
            <div class="flex flex-wrap gap-1.5 mt-2.5">
              <span class="tech-tag bg-carbon/[0.06] text-carbon text-[8pt] px-2.5 py-0.5 rounded-full font-medium">Python</span>
              <span class="tech-tag bg-carbon/[0.06] text-carbon text-[8pt] px-2.5 py-0.5 rounded-full font-medium">Presidio</span>
              <span class="tech-tag bg-carbon/[0.06] text-carbon text-[8pt] px-2.5 py-0.5 rounded-full font-medium">Ollama</span>
              <span class="tech-tag bg-carbon/[0.06] text-carbon text-[8pt] px-2.5 py-0.5 rounded-full font-medium">Local LLM</span>
            </div>
          </div>

          <div class="entry-card rounded-lg px-3 py-2.5 -mx-3">
            <div class="flex justify-between items-baseline mb-1">
              <span class="text-[10.5pt] font-semibold text-carbon">Multi-Agent System: Marketing Bureau</span>
              <span class="text-[8.5pt] text-stone-400 tracking-wide whitespace-nowrap ml-3 font-medium uppercase">2026</span>
            </div>
            <p class="text-[9.5pt] text-stone-600 leading-snug font-light mt-0.5">Onderzoekt hoe autonome AI-agenten samenwerken om taken te verdelen en relevante data op te halen via RAG.</p>
            <div class="flex flex-wrap gap-1.5 mt-2.5">
              <span class="tech-tag bg-carbon/[0.06] text-carbon text-[8pt] px-2.5 py-0.5 rounded-full font-medium">Python</span>
              <span class="tech-tag bg-carbon/[0.06] text-carbon text-[8pt] px-2.5 py-0.5 rounded-full font-medium">LangGraph</span>
              <span class="tech-tag bg-carbon/[0.06] text-carbon text-[8pt] px-2.5 py-0.5 rounded-full font-medium">Hugging Face</span>
              <span class="tech-tag bg-carbon/[0.06] text-carbon text-[8pt] px-2.5 py-0.5 rounded-full font-medium">RAG</span>
            </div>
          </div>
        </section>

        <!-- Werkervaring -->
        <section class="anim mb-7" style="animation-delay: 0.35s">
          <h2 class="font-display text-[13pt] font-bold text-carbon uppercase tracking-[0.25em] mb-1 flex items-center gap-3">
            <span class="w-1.5 h-1.5 rounded-full bg-bronze inline-block" />
            Werkervaring
          </h2>
          <div class="h-[2px] bg-gradient-to-r from-bronze via-bronze/40 to-transparent mb-4 line-grow" style="animation-delay: 0.4s" />

          <div class="entry-card rounded-lg px-3 py-2.5 -mx-3 mb-3">
            <div class="flex justify-between items-baseline mb-1">
              <span class="text-[10.5pt] font-semibold text-carbon">Junior Software Developer <span class="text-bronze font-medium">no.dots</span></span>
              <span class="text-[8.5pt] text-stone-400 tracking-wide whitespace-nowrap ml-3 font-medium uppercase">Jul 2024 – Jan 2026</span>
            </div>
            <ul class="text-[9.5pt] text-stone-600 leading-snug list-none pl-0 mt-1 space-y-0.5 font-light">
              <li class="flex items-start gap-2"><span class="text-bronze mt-[5px] text-[6pt]">&#9670;</span>Ontwikkelen van headless webshops en websites met Sanity CMS en Shopware</li>
              <li class="flex items-start gap-2"><span class="text-bronze mt-[5px] text-[6pt]">&#9670;</span>Werken in teamverband aan full-stack projecten</li>
            </ul>
            <div class="flex flex-wrap gap-1.5 mt-2.5">
              <span class="tech-tag bg-carbon/[0.06] text-carbon text-[8pt] px-2.5 py-0.5 rounded-full font-medium">Nuxt.js</span>
              <span class="tech-tag bg-carbon/[0.06] text-carbon text-[8pt] px-2.5 py-0.5 rounded-full font-medium">Sanity</span>
              <span class="tech-tag bg-carbon/[0.06] text-carbon text-[8pt] px-2.5 py-0.5 rounded-full font-medium">Shopware</span>
              <span class="tech-tag bg-carbon/[0.06] text-carbon text-[8pt] px-2.5 py-0.5 rounded-full font-medium">JavaScript</span>
            </div>
          </div>

          <div class="entry-card rounded-lg px-3 py-2.5 -mx-3 mb-3">
            <div class="flex justify-between items-baseline">
              <span class="text-[10.5pt] font-semibold text-carbon">Medewerker Gasterij <span class="text-bronze font-medium">Archipel den Eerdbrand</span></span>
              <span class="text-[8.5pt] text-stone-400 tracking-wide whitespace-nowrap ml-3 font-medium uppercase">Jul 2021 – heden</span>
            </div>
          </div>

          <div class="entry-card rounded-lg px-3 py-2.5 -mx-3 mb-3">
            <div class="flex justify-between items-baseline">
              <span class="text-[10.5pt] font-semibold text-carbon">Junior Logistiek Support <span class="text-bronze font-medium">Magentapack</span></span>
              <span class="text-[8.5pt] text-stone-400 tracking-wide whitespace-nowrap ml-3 font-medium uppercase">Nov 2021 – Dec 2022</span>
            </div>
          </div>

          <div class="entry-card rounded-lg px-3 py-2.5 -mx-3">
            <div class="flex justify-between items-baseline">
              <span class="text-[10.5pt] font-semibold text-carbon">Vakkenvuller / Medewerker <span class="text-bronze font-medium">Jumbo</span></span>
              <span class="text-[8.5pt] text-stone-400 tracking-wide whitespace-nowrap ml-3 font-medium uppercase">2018 – 2021</span>
            </div>
          </div>
        </section>

        <!-- Opleidingen -->
        <section class="anim mb-7" style="animation-delay: 0.45s">
          <h2 class="font-display text-[13pt] font-bold text-carbon uppercase tracking-[0.25em] mb-1 flex items-center gap-3">
            <span class="w-1.5 h-1.5 rounded-full bg-bronze inline-block" />
            Opleidingen
          </h2>
          <div class="h-[2px] bg-gradient-to-r from-bronze via-bronze/40 to-transparent mb-4 line-grow" style="animation-delay: 0.5s" />

          <div class="entry-card rounded-lg px-3 py-2.5 -mx-3 mb-3">
            <div class="flex justify-between items-baseline mb-1">
              <span class="text-[10.5pt] font-semibold text-carbon">HBO-ICT <span class="text-bronze font-medium">Fontys Hogeschool</span></span>
              <span class="text-[8.5pt] text-stone-400 tracking-wide whitespace-nowrap ml-3 font-medium uppercase">Sep 2024 – heden</span>
            </div>
            <p class="text-[9.5pt] text-stone-600 leading-snug font-light mt-0.5">Richting: Software Engineering &amp; AI | Gevolgd: Fullstack, Generative AI</p>
          </div>

          <div class="entry-card rounded-lg px-3 py-2.5 -mx-3 mb-3">
            <div class="flex justify-between items-baseline mb-1">
              <span class="text-[10.5pt] font-semibold text-carbon">Software Developer <span class="text-bronze font-medium">Summa College</span></span>
              <span class="text-[8.5pt] text-stone-400 tracking-wide whitespace-nowrap ml-3 font-medium uppercase">Sep 2020 – Aug 2024</span>
            </div>
            <p class="text-[9.5pt] text-stone-600 leading-snug font-light mt-0.5">Niveau: MBO niveau 4 | Diploma: Behaald</p>
          </div>

          <div class="entry-card rounded-lg px-3 py-2.5 -mx-3">
            <div class="flex justify-between items-baseline">
              <span class="text-[10.5pt] font-semibold text-carbon">VMBO-T <span class="text-bronze font-medium">Eckart College</span></span>
              <span class="text-[8.5pt] text-stone-400 tracking-wide whitespace-nowrap ml-3 font-medium uppercase">Sep 2016 – Jul 2020</span>
            </div>
          </div>
        </section>

        <!-- Stages -->
        <section class="anim mb-4" style="animation-delay: 0.55s">
          <h2 class="font-display text-[13pt] font-bold text-carbon uppercase tracking-[0.25em] mb-1 flex items-center gap-3">
            <span class="w-1.5 h-1.5 rounded-full bg-bronze inline-block" />
            Stages
          </h2>
          <div class="h-[2px] bg-gradient-to-r from-bronze via-bronze/40 to-transparent mb-4 line-grow" style="animation-delay: 0.6s" />

          <div class="entry-card rounded-lg px-3 py-2.5 -mx-3 mb-3">
            <div class="flex justify-between items-baseline mb-1">
              <span class="text-[10.5pt] font-semibold text-carbon">Stage Software <span class="text-bronze font-medium">no.dots</span></span>
              <span class="text-[8.5pt] text-stone-400 tracking-wide whitespace-nowrap ml-3 font-medium uppercase">Feb 2024 – Jul 2024</span>
            </div>
            <p class="text-[9.5pt] text-stone-600 leading-snug font-light mt-0.5">Opgezet van een headless CMS met Sanity in teamverband; bijgedragen aan de frontend integratie.</p>
            <div class="flex flex-wrap gap-1.5 mt-2.5">
              <span class="tech-tag bg-carbon/[0.06] text-carbon text-[8pt] px-2.5 py-0.5 rounded-full font-medium">Sanity CMS</span>
              <span class="tech-tag bg-carbon/[0.06] text-carbon text-[8pt] px-2.5 py-0.5 rounded-full font-medium">Nuxt.js</span>
              <span class="tech-tag bg-carbon/[0.06] text-carbon text-[8pt] px-2.5 py-0.5 rounded-full font-medium">JavaScript</span>
            </div>
          </div>

          <div class="entry-card rounded-lg px-3 py-2.5 -mx-3 mb-3">
            <div class="flex justify-between items-baseline mb-1">
              <span class="text-[10.5pt] font-semibold text-carbon">Stage Software <span class="text-bronze font-medium">Medusa Media Usage Advice B.V.</span></span>
              <span class="text-[8.5pt] text-stone-400 tracking-wide whitespace-nowrap ml-3 font-medium uppercase">Sep 2022 – Feb 2023</span>
            </div>
            <p class="text-[9.5pt] text-stone-600 leading-snug font-light mt-0.5">Geïmplementeerd CMS met het Laravel-framework en Twill CMS.</p>
            <div class="flex flex-wrap gap-1.5 mt-2.5">
              <span class="tech-tag bg-carbon/[0.06] text-carbon text-[8pt] px-2.5 py-0.5 rounded-full font-medium">Laravel</span>
              <span class="tech-tag bg-carbon/[0.06] text-carbon text-[8pt] px-2.5 py-0.5 rounded-full font-medium">PHP</span>
              <span class="tech-tag bg-carbon/[0.06] text-carbon text-[8pt] px-2.5 py-0.5 rounded-full font-medium">Twill CMS</span>
            </div>
          </div>
        </section>
      </main>

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

useSeoMeta({
  title: 'CV - Nick van Hooff',
  description: 'CV van Nick van Hooff - Full-Stack Software Developer & AI Engineer',
})

useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap',
    },
  ],
})
</script>

<style scoped>
.cv-root {
  font-family: 'DM Sans', system-ui, sans-serif;
}

@media print {
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  .cv-root { padding: 0; background: white; }
  .cv-page { box-shadow: none !important; }
  .anim, .anim-right, .anim-scale { opacity: 1 !important; transform: none !important; }
}

@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeSlideRight {
  from { opacity: 0; transform: translateX(-14px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes scaleReveal {
  from { opacity: 0; transform: scale(0.88); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes lineGrow {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
@keyframes subtlePulse {
  0%, 100% { opacity: 0.04; }
  50% { opacity: 0.07; }
}

.anim {
  opacity: 0;
  animation: fadeSlideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.anim-right {
  opacity: 0;
  animation: fadeSlideRight 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.anim-scale {
  opacity: 0;
  animation: scaleReveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.line-grow {
  transform-origin: left;
  animation: lineGrow 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.sidebar-pattern {
  background-image: radial-gradient(circle at 1px 1px, rgba(176, 137, 104, 0.06) 1px, transparent 0);
  background-size: 24px 24px;
  animation: subtlePulse 8s ease-in-out infinite;
}

.photo-ring {
  background: conic-gradient(from 0deg, #b08968, #c9a882, #b08968, transparent, #b08968);
}

.skill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
  background: #b08968;
  margin-right: 6px;
  flex-shrink: 0;
  margin-top: 7px;
}
.skill-dot--muted {
  background: #6b7280;
}

.sidebar-link {
  position: relative;
  transition: color 0.25s ease, padding-left 0.25s ease;
}
.sidebar-link:hover {
  color: #c9a882;
  padding-left: 4px;
}

.tech-tag {
  transition: background-color 0.2s ease, transform 0.2s ease;
  cursor: default;
}
.tech-tag:hover {
  background-color: #b08968;
  color: white;
  transform: translateY(-1px);
}

.entry-card {
  transition: background-color 0.25s ease;
}
.entry-card:hover {
  background-color: rgba(176, 137, 104, 0.04);
}
</style>
