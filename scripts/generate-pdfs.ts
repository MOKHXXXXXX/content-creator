import { chromium } from "playwright";
import path from "path";
import fs from "fs";

const portfolio = [
  {
    id: "activation-reduction-blog",
    title: "How We Cut Activation Time by 40% Without Adding Features",
    category: "BLOG",
    client: "StackFlow",
    industry: "B2B SaaS",
    excerpt:
      "A deep dive into activation patterns for a B2B SaaS startup, covering onboarding psychology and actionable product-led growth tactics.",
    content:
      "This research-backed blog post analyzed three B2B SaaS companies that reduced time-to-value without shipping new features. It covered first-run experience design, progressive disclosure, and personalized onboarding emails, backed by data from the client's own analytics. The post ranked in the top 3 for 'reduce activation time SaaS' within six weeks and generated 12 demo requests from organic traffic.",
  },
  {
    id: "fintech-landing-copy",
    title: "Converting Landing Page Copy for a Fintech Product Launch",
    category: "COPY",
    client: "PaySwift",
    industry: "Fintech",
    excerpt:
      "Full landing page copy for a payments startup launching its SMB product — headline, value props, feature breakdown, and founder letter.",
    content:
      "Developed the complete landing page for PaySwift's SMB product launch. The copy included a conversion-tested headline, three-tier value proposition, competitive feature comparison, trust anchor section with logos, and a closing letter from the founder. The page achieved a 4.8% conversion rate in its first month — 2.2x the client's previous benchmark.",
  },
  {
    id: "beta-launch-email-sequence",
    title: "From 0 to 10K Beta Users: A Launch Email Sequence",
    category: "EMAIL",
    client: "DevKit.io",
    industry: "Developer Tools",
    excerpt:
      "A 7-email launch sequence that helped a developer-tool startup fill its beta waitlist and drive 10,000 signups in 30 days.",
    content:
      "Designed and wrote a complete pre-launch email sequence including a teaser, founder story, social proof roundup, early access invite, urgency notice, onboarding guide, and referral ask. Each email was A/B tested for subject lines and CTAs. The sequence achieved a 38% open rate, 12% click-through rate, and a 22% referral conversion — helping the startup exceed its beta signup goal by 40%.",
  },
  {
    id: "product-led-seo-guide",
    title: "The Complete Guide to Product-Led SEO for Early-Stage Startups",
    category: "BLOG",
    client: "GrowthLab",
    industry: "Marketing SaaS",
    excerpt:
      "A 3,000-word pillar page covering product-led SEO strategy, programmatic content, free tools as lead magnets, and measuring organic growth.",
    content:
      "This comprehensive guide explained how startups can use product data, templates, and free tools to build SEO moats without a dedicated content team. It included step-by-step frameworks, real startup examples, and a checklist for getting started. The post became the client's top organic landing page within 90 days and continues to generate 2,500+ monthly visitors from search.",
  },
];

const pdfDir = path.resolve(__dirname, "../public/pdfs");
if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
}

function buildHtml(item: (typeof portfolio)[number]): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${item.title} — Youssef Mohey</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Inter', sans-serif;
    background: #FBF6EC;
    color: #211E1B;
    padding: 60px 72px;
    line-height: 1.7;
  }
  .header {
    border-bottom: 2px solid #3F5A46;
    padding-bottom: 24px;
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .brand { font-family: 'Fraunces', serif; font-size: 28px; font-weight: 600; color: #211E1B; }
  .byline { font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.1em; }
  .category {
    display: inline-block;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #C1392B;
    margin-bottom: 16px;
    font-weight: 600;
  }
  .title {
    font-family: 'Fraunces', serif;
    font-size: 36px;
    font-weight: 600;
    line-height: 1.15;
    margin-bottom: 20px;
    color: #211E1B;
  }
  .meta {
    display: flex;
    gap: 24px;
    margin-bottom: 32px;
    font-size: 11px;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .excerpt {
    font-family: 'Fraunces', serif;
    font-size: 18px;
    color: #3F5A46;
    line-height: 1.5;
    margin-bottom: 40px;
    padding-left: 20px;
    border-left: 3px solid #C1392B;
  }
  .content {
    font-size: 14px;
    color: #444;
    line-height: 1.8;
    max-width: 720px;
  }
  .content p { margin-bottom: 16px; }
  .footer {
    margin-top: 48px;
    padding-top: 24px;
    border-top: 1px solid #E8E2D8;
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
</style>
</head>
<body>
  <div class="header">
    <span class="brand">Youssef Mohey</span>
    <span class="byline">Content Writer for Startups</span>
  </div>
  <span class="category">${item.category === "BLOG" ? "Blog & SEO Content" : item.category === "COPY" ? "Landing Page Copy" : item.category === "EMAIL" ? "Email & Lifecycle" : "Case Study"}</span>
  <h1 class="title">${item.title}</h1>
  <div class="meta">
    <span>Client: ${item.client}</span>
    <span>Industry: ${item.industry}</span>
  </div>
  <div class="excerpt">${item.excerpt}</div>
  <div class="content">
    <p>${item.content}</p>
  </div>
  <div class="footer">
    <span>youssefmohey.vercel.app</span>
    <span>moktarmoha17@gmail.com</span>
  </div>
</body>
</html>`;
}

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  for (const item of portfolio) {
    const html = buildHtml(item);
    const page = await context.newPage();
    await page.setContent(html, { waitUntil: "networkidle" });
    await page.pdf({
      path: path.join(pdfDir, `${item.id}.pdf`),
      format: "A4",
      margin: { top: "0", bottom: "0", left: "0", right: "0" },
      printBackground: true,
    });
    console.log(`✓ Generated ${item.id}.pdf`);
    await page.close();
  }

  await browser.close();
  console.log("\nAll PDFs generated successfully.");
}

main().catch(console.error);
