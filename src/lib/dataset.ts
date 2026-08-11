/**
 * Fake News Detection — training corpus.
 *
 * This is a compact, human-readable version of the classic Kaggle
 * "Fake and Real News Dataset" (True.csv / Fake.csv) format:
 *
 *   text,label      label = 0 -> REAL, 1 -> FAKE
 *
 * The full research dataset (~44,898 rows) is used by the Python training
 * pipeline in /python. This in-browser corpus is a stratified sample that
 * keeps the same vocabulary characteristics so the JavaScript model used by
 * the live demo behaves like the scikit-learn model.
 */

export type Label = 0 | 1; // 0 = REAL, 1 = FAKE

export interface NewsSample {
  text: string;
  label: Label;
}

const REAL: string[] = [
  "The finance ministry said the new tax framework will be implemented from the next fiscal year after consultation with state governments.",
  "Officials confirmed that the central bank kept the benchmark interest rate unchanged, citing stable inflation in the last quarter.",
  "The health department reported a gradual decline in seasonal influenza cases across twelve districts this month.",
  "Parliament passed the amendment bill on Tuesday with 274 votes in favour and 191 against, according to official records.",
  "Researchers at the university published a peer reviewed study on solar cell efficiency in the journal Nature Energy.",
  "The election commission announced the polling schedule for five states, with counting scheduled for the first week of March.",
  "The company reported quarterly revenue of 4.2 billion dollars, slightly above analyst expectations, in its earnings statement.",
  "Meteorologists issued a heavy rainfall warning for coastal districts over the next forty eight hours.",
  "The supreme court has reserved its verdict in the land acquisition case after hearing arguments from both sides.",
  "The transport ministry released draft guidelines for electric vehicle charging infrastructure on national highways.",
  "According to the labour bureau, the unemployment rate declined marginally to 6.8 percent in the last survey period.",
  "The space agency confirmed a successful launch of the communication satellite from the southern launch complex.",
  "The education board extended the deadline for examination form submission by one week following technical issues.",
  "Municipal authorities began a drive to repair damaged roads before the monsoon season, an official statement said.",
  "The world health organisation released updated guidance on antibiotic use in primary healthcare settings.",
  "The trade deficit narrowed in October as exports of engineering goods rose compared with the same month last year.",
  "Police arrested three suspects in connection with a bank fraud case and recovered documents during the search.",
  "The state cabinet approved a budget allocation for upgrading district hospitals and community health centres.",
  "A committee of experts submitted its report on data protection to the ministry of information technology.",
  "The football association confirmed the fixture list for the upcoming season after a meeting with club representatives.",
  "The stock index closed 0.6 percent higher, led by gains in banking and information technology shares.",
  "The railway board said additional trains will run during the festival season to manage passenger demand.",
  "Scientists recorded a small but measurable rise in average sea surface temperature during the last decade.",
  "The city administration launched an online portal for property tax payments to reduce queues at counters.",
  "The foreign minister met his counterpart to discuss trade cooperation and visa facilitation measures.",
  "The audit report noted procedural delays in the implementation of the rural housing scheme in three districts.",
  "The regulator fined a telecom operator for failing to meet call drop quality benchmarks in two service areas.",
  "A new metro line section opened for public service after safety clearance from the commissioner of rail safety.",
  "The agriculture department advised farmers to delay sowing by a week because of a forecast dry spell.",
  "The company announced a recall of a specific battery batch after internal testing identified a manufacturing defect.",
  "The census office said field enumeration will begin in April and conclude within eight weeks.",
  "The court granted bail to the accused on the condition that he surrender his passport to the investigating agency.",
  "University researchers developed a low cost water filter prototype and published the design specifications.",
  "The environment ministry notified new emission standards for thermal power plants effective from next year.",
  "Air quality in the capital improved to the moderate category after two days of light rainfall.",
  "The insurance regulator asked companies to simplify policy documents and disclose exclusions clearly.",
  "The state government signed a memorandum of understanding with an industry body for skill training programmes.",
  "Officials said the vaccination drive covered 82 percent of the eligible population in the district.",
  "The bank reduced its home loan interest rate by fifteen basis points following the policy review.",
  "A parliamentary standing committee sought a status report on pending infrastructure projects.",
  "The tourism board reported a rise in domestic visitor numbers compared with the previous year.",
  "The disaster management authority conducted a mock drill involving fire services and medical teams.",
  "The ministry clarified that the subsidy scheme will continue with the existing eligibility criteria.",
  "Engineers completed structural repairs on the bridge, which reopened to traffic on Monday morning.",
  "The commission published data showing an increase in voter registration among first time voters.",
  "The company said it will invest in a new manufacturing facility, creating an estimated twelve hundred jobs.",
  "Doctors advised residents to stay hydrated as the heatwave continued across the northern plains.",
  "The report found that literacy rates improved in rural areas over the last five years.",
  "The city council approved the annual budget after a debate lasting nearly six hours.",
  "Authorities restored electricity supply to affected areas within twelve hours of the storm.",
];

const FAKE: string[] = [
  "SHOCKING: Scientists CONFIRM drinking this common kitchen liquid cures cancer in just 3 days! Doctors are furious!!!",
  "BREAKING!!! Government secretly planning to ban all cash from midnight — share before they delete this post!",
  "You won't BELIEVE what this celebrity said about the president — the media is hiding the full video!",
  "Miracle herb discovered in the Himalayas reverses ageing overnight, big pharma wants it banned!!!",
  "EXPOSED: Secret documents prove the moon landing was filmed in a studio, insider finally reveals all!",
  "URGENT: New law means your bank account will be frozen tomorrow unless you forward this message now!",
  "Man cures diabetes in 7 days using this one weird trick that doctors don't want you to know!!!",
  "Famous actor found ALIVE after being declared dead — the truth they refuse to tell you!",
  "WARNING! 5G towers are secretly controlling your mind, whistleblower leaks classified files!!!",
  "This vegetable found in every home removes 100 percent of body toxins instantly, share with everyone!",
  "LEAKED: Election results were changed by a secret algorithm, source inside says total fraud!",
  "Government to give free 50000 rupees to every citizen — click the link and register before midnight!",
  "Aliens contacted world leaders last night and the news channels were ordered to stay silent!",
  "Doctors STUNNED as grandmother cures blindness with a homemade paste, hospitals hate her!!!",
  "BREAKING: Famous billionaire announces he will delete all bank loans of everyone who shares this!",
  "Drinking hot water with lemon at 4 am kills the virus completely, forwarded from a top hospital!",
  "SECRET plan revealed! Schools will be closed forever starting next month, teachers in panic!!!",
  "This banned video proves the earth is actually flat — watch before it is removed in 24 hours!",
  "Insider claims the vaccine contains microchips to track every citizen, full proof inside!!!",
  "Woman lost 30 kilos in two weeks eating only this fruit — nutritionists are speechless!",
  "URGENT ALERT: Salt supply contaminated nationwide, do not buy salt, forwarded as received!!!",
  "Celebrity secretly funding a shadow government, whistleblower documents finally leaked online!",
  "AMAZING: Man builds car that runs on water, oil companies immediately shut down his factory!",
  "Your phone is listening and selling your dreams — the shocking truth nobody will report!",
  "Massive earthquake predicted for next Tuesday by a secret scientist, authorities silent!!!",
  "Miracle cure for baldness found in onion water, dermatologists left in complete shock!",
  "BREAKING: All currency notes will be invalid from Friday, government hiding the announcement!",
  "Man survives 40 days without food using ancient technique that science cannot explain!!!",
  "The government is putting chemicals in the water supply to control the population, proof leaked!",
  "SHOCKING VIDEO: Politician caught admitting the entire pandemic was planned years ago!",
  "This one spoon of turmeric at night unblocks all heart arteries, surgery no longer needed!",
  "Top secret file reveals that all famous singers are clones created in an underground lab!!!",
  "Free laptops for every student announced — fill this form immediately, only 100 left!",
  "Doctors hate him! Local man reverses kidney failure with a two rupee home remedy!!!",
  "The news channels are hiding this: a massive asteroid will hit the earth this month!",
  "URGENT: Do not answer calls from this number, it will hack your bank account instantly!!!",
  "Ancient scripture predicted today's events exactly, scholars are terrified to speak about it!",
  "Government employee leaks that all pensions will be cancelled without any official notice!",
  "This magic device cuts your electricity bill by 90 percent, power companies want it banned!",
  "Famous doctor arrested for revealing that hospitals fake reports to earn more money!!!",
  "Breaking news: schools will now teach children mind control techniques, parents outraged!",
  "Man wins lottery 12 times using a secret formula, the government has now banned it!",
  "Eating this every morning makes you immune to every disease forever, proven by nobody!!!",
  "Leaked audio proves the entire economy will collapse next Monday, withdraw your money now!",
  "Shocking discovery: humans can live 200 years but the truth is being suppressed worldwide!",
  "Viral message: army has taken over the capital tonight, all news channels ordered to stay quiet!",
  "Miracle water from a village well cures every illness, thousands are queuing since morning!!!",
  "Exclusive: robot president secretly replaced the real one in 2019, insider photographs leaked!",
  "This app pays you 5000 rupees daily just for watching videos, share before the link expires!",
  "The truth they hide: chocolate is actually better than exercise, says a study nobody can find!",
];

export const DATASET: NewsSample[] = [
  ...REAL.map((text) => ({ text, label: 0 as Label })),
  ...FAKE.map((text) => ({ text, label: 1 as Label })),
];

export const DATASET_INFO = {
  name: "Fake and Real News Dataset (sampled)",
  source: "Kaggle — clmentbisaillon/fake-and-real-news-dataset",
  fullRows: 44898,
  demoRows: DATASET.length,
  columns: ["title", "text", "subject", "date", "label"],
  classes: ["REAL (0)", "FAKE (1)"],
  split: "80% training / 20% testing (stratified, random_state = 42)",
};
