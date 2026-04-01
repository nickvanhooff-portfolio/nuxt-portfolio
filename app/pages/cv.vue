<template>
  <div class="bg-gray-100 flex justify-center p-5 print:p-0 print:bg-white font-sans">
    <div class="bg-white w-[210mm] min-h-[297mm] flex shadow-lg print:shadow-none print:w-full print-exact">

      <!-- Sidebar -->
      <div class="bg-navy text-white w-[35%] p-10 shrink-0 print-exact">
        <img
          src="/profielfoto.jpg"
          alt="Nick van Hooff"
          class="w-[150px] h-[150px] rounded-full object-cover border-4 border-white mx-auto mb-8 block bg-white"
        >

        <h2 class="text-[14pt] font-bold uppercase tracking-widest border-b-2 border-white pb-1 mb-3 mt-0">Contact</h2>
        <p class="text-[10pt] leading-relaxed mb-2">
          <strong>E-mail:</strong><br>
          <a href="mailto:nickvanhooff03@gmail.com" class="text-white no-underline break-all">nickvanhooff03@gmail.com</a>
        </p>
        <p class="text-[10pt] leading-relaxed mb-2">
          <strong>Telefoon:</strong><br>
          <a href="tel:0629787913" class="text-white no-underline">06 29 78 79 13</a>
        </p>
        <p class="text-[10pt] leading-relaxed mb-2">
          <strong>Adres:</strong><br>Torenberglaan 29<br>5628 EL, Eindhoven
        </p>
        <p class="text-[10pt] leading-relaxed mb-2">
          <strong>LinkedIn:</strong><br>
          <a href="https://www.linkedin.com/in/nick-van-hooff-67ba7a1b8/" target="_blank" rel="noopener noreferrer" class="text-white no-underline break-all">linkedin.com/in/nick-van-hooff</a>
        </p>
        <p class="text-[10pt] leading-relaxed mb-2">
          <strong>GitHub:</strong><br>
          <a href="https://github.com/nickvanhooff" target="_blank" rel="noopener noreferrer" class="text-white no-underline break-all">github.com/nickvanhooff</a>
        </p>
        <p class="text-[10pt] leading-relaxed mb-2">
          <strong>Website:</strong><br>
          <a href="https://www.nickvanhooff.com" target="_blank" rel="noopener noreferrer" class="text-white no-underline break-all">nickvanhooff.com</a>
        </p>

        <h2 class="text-[14pt] font-bold uppercase tracking-widest border-b-2 border-white pb-1 mb-3 mt-8">Vaardigheden</h2>

        <div class="mb-3">
          <div class="text-[9pt] uppercase tracking-wide opacity-75 mb-1">Talen</div>
          <ul class="list-none p-0">
            <li class="text-[10pt] leading-relaxed mb-1">JavaScript / TypeScript</li>
            <li class="text-[10pt] leading-relaxed mb-1">PHP</li>
            <li class="text-[10pt] leading-relaxed mb-1">C# / Java</li>
          </ul>
        </div>
        <div class="mb-3">
          <div class="text-[9pt] uppercase tracking-wide opacity-75 mb-1">Frameworks</div>
          <ul class="list-none p-0">
            <li class="text-[10pt] leading-relaxed mb-1">Nuxt.js / Next.js</li>
            <li class="text-[10pt] leading-relaxed mb-1">Laravel</li>
            <li class="text-[10pt] leading-relaxed mb-1">Spring Boot / .NET</li>
          </ul>
        </div>
        <div class="mb-3">
          <div class="text-[9pt] uppercase tracking-wide opacity-75 mb-1">Tools &amp; Databases</div>
          <ul class="list-none p-0">
            <li class="text-[10pt] leading-relaxed mb-1">Git &amp; Docker</li>
            <li class="text-[10pt] leading-relaxed mb-1">PostgreSQL / MySQL</li>
            <li class="text-[10pt] leading-relaxed mb-1">Sanity CMS / Shopware</li>
            <li class="text-[10pt] leading-relaxed mb-1">REST API's</li>
          </ul>
        </div>

        <h2 class="text-[14pt] font-bold uppercase tracking-widest border-b-2 border-white pb-1 mb-3 mt-8">Eigenschappen</h2>
        <ul class="list-inside">
          <li class="text-[10pt] leading-relaxed mb-2">Leergierig</li>
          <li class="text-[10pt] leading-relaxed mb-2">Probleemoplossend</li>
          <li class="text-[10pt] leading-relaxed mb-2">Flexibel</li>
          <li class="text-[10pt] leading-relaxed mb-2">Doorzettingsvermogen</li>
          <li class="text-[10pt] leading-relaxed mb-2">Sociaal &amp; Teamgericht</li>
          <li class="text-[10pt] leading-relaxed mb-2">Loyaal</li>
        </ul>

        <h2 class="text-[14pt] font-bold uppercase tracking-widest border-b-2 border-white pb-1 mb-3 mt-8">Hobby's</h2>
        <ul class="list-inside">
          <li class="text-[10pt] leading-relaxed mb-2">Fitness</li>
          <li class="text-[10pt] leading-relaxed mb-2">Uiteten</li>
          <li class="text-[10pt] leading-relaxed mb-2">Met vrienden optrekken</li>
        </ul>
      </div>

      <!-- Main Content -->
      <div class="w-[65%] p-10">
        <div>
          <h1 class="text-[28pt] text-navy uppercase tracking-widest mb-1">Nick van Hooff</h1>
          <p class="text-[16pt] text-gray-500 font-light">Full-Stack Software Developer</p>
          <p class="text-[10pt] text-gray-700 leading-relaxed mt-4 pt-4 border-t border-gray-200">
            Enthousiaste en leergierige HBO-ICT student (Fontys) met een sterke achtergrond in full-stack webontwikkeling. Ervaring met het bouwen van headless webshops, CMS-systemen en API's. Continu bezig met het oplossen van problemen op een slimmere en efficiëntere manier met moderne tools en technologieën.
          </p>
        </div>

        <h2 class="text-[14pt] font-bold text-navy border-b-2 border-navy pb-1 mb-5 mt-8 uppercase tracking-widest">Werkervaring</h2>

        <div class="mb-5">
          <div class="flex justify-between items-baseline mb-1">
            <span class="text-[12pt] font-bold text-gray-800">Junior Software Developer — no.dots</span>
            <span class="text-[10pt] text-gray-500 italic whitespace-nowrap ml-2">Jul 2024 – Jan 2026</span>
          </div>
          <div class="text-[10pt] text-gray-700 leading-snug">
            <ul class="list-disc pl-4 mt-1">
              <li class="mb-0.5">Ontwikkelen van headless webshops en websites met Sanity CMS en Shopware</li>
              <li class="mb-0.5">Werken in teamverband aan full-stack projecten</li>
            </ul>
            <div class="flex flex-wrap gap-1 mt-2">
              <span class="bg-[#e8eef5] text-navy text-[8.5pt] px-2 py-0.5 rounded">Nuxt.js</span>
              <span class="bg-[#e8eef5] text-navy text-[8.5pt] px-2 py-0.5 rounded">Sanity</span>
              <span class="bg-[#e8eef5] text-navy text-[8.5pt] px-2 py-0.5 rounded">Shopware</span>
              <span class="bg-[#e8eef5] text-navy text-[8.5pt] px-2 py-0.5 rounded">JavaScript</span>
            </div>
          </div>
        </div>

        <div class="mb-5">
          <div class="flex justify-between items-baseline mb-1">
            <span class="text-[12pt] font-bold text-gray-800">Medewerker Horeca — Archipel den Eerdbrand</span>
            <span class="text-[10pt] text-gray-500 italic whitespace-nowrap ml-2">Jul 2021 – heden</span>
          </div>
          <div class="text-[10pt] text-gray-700 leading-snug">Klantgericht werken in een zorgomgeving; verantwoordelijk voor bediening en service.</div>
        </div>

        <div class="mb-5">
          <div class="flex justify-between items-baseline mb-1">
            <span class="text-[12pt] font-bold text-gray-800">Junior Logistiek Support — Magentapack</span>
            <span class="text-[10pt] text-gray-500 italic whitespace-nowrap ml-2">Nov 2021 – Dec 2022</span>
          </div>
        </div>

        <div class="mb-5">
          <div class="flex justify-between items-baseline mb-1">
            <span class="text-[12pt] font-bold text-gray-800">Vakkenvuller / Medewerker — Jumbo</span>
            <span class="text-[10pt] text-gray-500 italic whitespace-nowrap ml-2">2018 – 2021</span>
          </div>
          <div class="text-[10pt] text-gray-700 leading-snug">Extra functies: magazijnmedewerker en kassa.</div>
        </div>

        <h2 class="text-[14pt] font-bold text-navy border-b-2 border-navy pb-1 mb-5 mt-8 uppercase tracking-widest">Opleidingen</h2>

        <div class="mb-5">
          <div class="flex justify-between items-baseline mb-1">
            <span class="text-[12pt] font-bold text-gray-800">HBO-ICT — Fontys Hogeschool</span>
            <span class="text-[10pt] text-gray-500 italic whitespace-nowrap ml-2">Sep 2024 – heden</span>
          </div>
          <div class="text-[10pt] text-gray-700 leading-snug">Richting: Software Engineering &amp; AI | Gevolgd: Fullstack, Generative AI</div>
        </div>

        <div class="mb-5">
          <div class="flex justify-between items-baseline mb-1">
            <span class="text-[12pt] font-bold text-gray-800">Software Developer — Summa College</span>
            <span class="text-[10pt] text-gray-500 italic whitespace-nowrap ml-2">Sep 2020 – Aug 2024</span>
          </div>
          <div class="text-[10pt] text-gray-700 leading-snug">Niveau: MBO niveau 4 | Diploma: Behaald</div>
        </div>

        <div class="mb-5">
          <div class="flex justify-between items-baseline mb-1">
            <span class="text-[12pt] font-bold text-gray-800">VMBO-T — Eckart College</span>
            <span class="text-[10pt] text-gray-500 italic whitespace-nowrap ml-2">Sep 2016 – Jul 2020</span>
          </div>
          <div class="text-[10pt] text-gray-700 leading-snug">Richting: Techniek | Diploma: Behaald</div>
        </div>

        <h2 class="text-[14pt] font-bold text-navy border-b-2 border-navy pb-1 mb-5 mt-8 uppercase tracking-widest">Stages</h2>

        <div class="mb-5">
          <div class="flex justify-between items-baseline mb-1">
            <span class="text-[12pt] font-bold text-gray-800">Stage Software — no.dots</span>
            <span class="text-[10pt] text-gray-500 italic whitespace-nowrap ml-2">Feb 2024 – Jul 2024</span>
          </div>
          <div class="text-[10pt] text-gray-700 leading-snug">
            Opgezet van een headless CMS met Sanity in teamverband; bijgedragen aan de frontend integratie.
            <div class="flex flex-wrap gap-1 mt-2">
              <span class="bg-[#e8eef5] text-navy text-[8.5pt] px-2 py-0.5 rounded">Sanity CMS</span>
              <span class="bg-[#e8eef5] text-navy text-[8.5pt] px-2 py-0.5 rounded">Nuxt.js</span>
              <span class="bg-[#e8eef5] text-navy text-[8.5pt] px-2 py-0.5 rounded">JavaScript</span>
            </div>
          </div>
        </div>

        <div class="mb-5">
          <div class="flex justify-between items-baseline mb-1">
            <span class="text-[12pt] font-bold text-gray-800">Stage Software — Medusa Media Usage Advice B.V.</span>
            <span class="text-[10pt] text-gray-500 italic whitespace-nowrap ml-2">Sep 2022 – Feb 2023</span>
          </div>
          <div class="text-[10pt] text-gray-700 leading-snug">
            Geïmplementeerd CMS met het Laravel-framework en Twill CMS.
            <div class="flex flex-wrap gap-1 mt-2">
              <span class="bg-[#e8eef5] text-navy text-[8.5pt] px-2 py-0.5 rounded">Laravel</span>
              <span class="bg-[#e8eef5] text-navy text-[8.5pt] px-2 py-0.5 rounded">PHP</span>
              <span class="bg-[#e8eef5] text-navy text-[8.5pt] px-2 py-0.5 rounded">Twill CMS</span>
            </div>
          </div>
        </div>

        <div class="mb-5">
          <div class="flex justify-between items-baseline mb-1">
            <span class="text-[12pt] font-bold text-gray-800">Maatschappelijke stage — Archipel den Eerdbrand</span>
            <span class="text-[10pt] text-gray-500 italic whitespace-nowrap ml-2">2020</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

useSeoMeta({
  title: 'CV - Nick van Hooff',
  description: 'CV van Nick van Hooff - Full-Stack Software Developer',
})
</script>

<style scoped>
.print-exact {
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}
</style>
