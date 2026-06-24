export interface Article {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  summary: string;
  body: string;
  questions?: string[];
}

export const ARTICLES: Article[] = [
  // ── EXISTING ──────────────────────────────────────────────────────────────
  {
    id: "pcos",
    title: "PCOS",
    subtitle: "Polycystic Ovary Syndrome",
    tag: "Hormonal",
    summary: "A hormonal condition affecting how the ovaries work, often involving irregular periods and elevated androgens.",
    body: `PCOS is one of the most common hormonal conditions in people with ovaries, affecting roughly 1 in 10. Despite its name, you do not need to have cysts to have PCOS.

The condition involves a disruption in the way the ovaries produce and release eggs, often linked to elevated levels of androgens (sometimes called male hormones) and insulin resistance.

Common signs include irregular or absent periods, acne, excess facial or body hair, thinning hair on the scalp, and difficulty conceiving. Weight changes can also play a role, though PCOS affects people of all body types.

There is no single cause. Genetics, insulin levels, and inflammation all appear to contribute. Diagnosis typically involves a combination of blood tests, ultrasound, and a review of symptoms.

Management focuses on the specific symptoms that matter most to you. This might include lifestyle changes that support insulin sensitivity, hormonal contraception to regulate cycles, or other medications. Many people with PCOS live full, healthy lives with the right support.

If you suspect PCOS, a gynaecologist or endocrinologist can guide you through testing and options.`,
    questions: [
      "Could my symptoms suggest PCOS?",
      "What tests would help clarify my situation?",
      "How is PCOS managed for my specific pattern of symptoms?",
    ],
  },
  {
    id: "endo",
    title: "Endometriosis",
    subtitle: "Chronic Inflammatory Condition",
    tag: "Inflammatory",
    summary: "Tissue similar to the uterine lining grows outside the uterus, causing pain, inflammation, and sometimes fertility challenges.",
    body: `Endometriosis occurs when tissue similar to the lining of the uterus grows in other locations, most commonly the ovaries, fallopian tubes, and the tissue lining the pelvis. Unlike the uterine lining, this tissue has no way to leave the body, leading to inflammation, scarring, and pain.

It affects an estimated 1 in 10 people with a uterus, yet diagnosis is often delayed by years because symptoms vary widely and are frequently dismissed.

Pain is the most reported symptom, particularly during periods, ovulation, sex, or bowel movements. Some people also experience heavy bleeding, fatigue, bloating, and digestive symptoms. Others have endometriosis with very little pain at all.

The cause is not fully understood. Hormones, immune function, and genetics all appear to play a role.

Diagnosis typically requires laparoscopic surgery, though imaging can sometimes support clinical assessment. Treatment options range from pain management and hormonal therapies to surgical removal of lesions.

Living with endometriosis is deeply personal. Finding a specialist who listens is one of the most important steps you can take.`,
    questions: [
      "Could my pain pattern suggest endometriosis?",
      "What is the process for getting a diagnosis?",
      "What treatment options would suit my situation?",
    ],
  },
  {
    id: "perimenopause",
    title: "Perimenopause",
    subtitle: "The Transition Phase",
    tag: "Life Stage",
    summary: "The years leading up to menopause, marked by fluctuating hormones and changes in the menstrual cycle.",
    body: `Perimenopause is the transitional phase before menopause, during which oestrogen and progesterone levels begin to fluctuate and gradually decline. It can begin as early as the mid-thirties, though it most commonly starts in the forties.

This phase can last anywhere from a few months to over a decade. Periods may become irregular, longer, shorter, heavier, or lighter, before eventually stopping altogether. Menopause is confirmed when a full year has passed without a period.

Symptoms vary greatly between individuals. Hot flushes, night sweats, sleep disruption, mood changes, brain fog, vaginal dryness, and changes in libido are all commonly reported. Some people move through perimenopause with minimal symptoms; others find it significantly impacts daily life.

These changes are driven by hormonal shifts that affect many systems in the body beyond reproduction, including bone density, cardiovascular health, and cognitive function.

Support options include lifestyle adjustments, non-hormonal therapies, and hormone replacement therapy (HRT), which has been shown to be effective and safe for many people. Speaking with a menopause-informed healthcare provider is the best starting point.

Perimenopause is not a decline. It is a transition. Understanding what is happening can make a meaningful difference.`,
    questions: [
      "Could my symptoms be perimenopause?",
      "What support options suit my situation?",
      "How will this transition affect my long-term health?",
    ],
  },
  {
    id: "thyroid",
    title: "Thyroid & Cycles",
    subtitle: "Hormonal Interconnection",
    tag: "Hormonal",
    summary: "Thyroid function is deeply linked to menstrual health. An underactive or overactive thyroid can disrupt cycles and overall wellbeing.",
    body: `The thyroid gland produces hormones that regulate metabolism, energy, temperature, and mood. It also interacts closely with the hormones that govern the menstrual cycle, which is why thyroid conditions so often affect periods.

Hypothyroidism (underactive thyroid) is more common in people assigned female at birth and can cause heavy, frequent, or irregular periods, fatigue, weight gain, hair thinning, brain fog, and feeling cold. It may also affect fertility.

Hyperthyroidism (overactive thyroid) can cause lighter or absent periods, a rapid heartbeat, anxiety, weight loss, and heat sensitivity.

Autoimmune thyroid conditions, Hashimoto's (the most common cause of hypothyroidism) and Graves' disease (the most common cause of hyperthyroidism), affect women far more often than men.

A simple blood test measuring TSH (thyroid-stimulating hormone) and sometimes T3 and T4 can reveal how your thyroid is functioning. If you have unexplained cycle changes alongside fatigue or mood symptoms, thyroid function is worth checking.

Many people feel significantly better once thyroid levels are optimised.`,
    questions: [
      "Could my cycle or energy changes be related to my thyroid?",
      "Is a thyroid blood test appropriate for me?",
      "How would thyroid issues typically be managed?",
    ],
  },
  {
    id: "pms",
    title: "PMS & PMDD",
    subtitle: "Premenstrual Conditions",
    tag: "Mood & Cycle",
    summary: "Premenstrual syndrome and its more severe form PMDD involve physical and emotional symptoms in the days before a period.",
    body: `Premenstrual syndrome (PMS) refers to a cluster of physical and emotional symptoms that occur in the luteal phase, typically the week or two before a period. Bloating, breast tenderness, headaches, fatigue, irritability, and mood shifts are among the most common experiences.

For many people, PMS is manageable. For others, symptoms are severe enough to disrupt work, relationships, and daily life. When that is the case, the condition may be premenstrual dysphoric disorder (PMDD).

PMDD is a recognised mood disorder characterised by significant emotional symptoms, including intense sadness, anxiety, anger, or hopelessness, that appear cyclically in the luteal phase and resolve within a few days of the period starting. It affects around 3 to 8 percent of people with cycles.

The cause is thought to involve heightened sensitivity to normal hormonal fluctuations rather than abnormal hormone levels. Serotonin pathways appear to play a role.

Tracking symptoms across cycles is a valuable diagnostic tool. If your mood and physical symptoms follow a clear pattern tied to your cycle, that information is important to share with a doctor.

Options for managing PMS and PMDD include lifestyle changes (exercise, sleep, reducing caffeine and alcohol), nutritional support, hormonal therapies, and in some cases targeted treatments shown to be effective for PMDD.

You deserve to be taken seriously. Cycle-related mood disruption is not a personality trait. It is a physiological condition.`,
    questions: [
      "Could my symptoms meet the pattern of PMS or PMDD?",
      "How is PMDD distinguished from other mood conditions?",
      "What support options are available to me?",
    ],
  },
  {
    id: "adenomyosis",
    title: "Adenomyosis",
    subtitle: "Uterine Condition",
    tag: "Inflammatory",
    summary: "When the uterine lining grows into the muscular wall of the uterus, causing heavy, painful periods and an enlarged uterus.",
    body: `Adenomyosis occurs when the tissue that normally lines the uterus (the endometrium) grows into the muscular wall of the uterus (the myometrium). Each month, this misplaced tissue responds to hormonal changes just as it would normally — thickening, breaking down, and bleeding — but with nowhere for the blood to go.

This leads to an enlarged, tender uterus and is associated with heavy, prolonged, and painful periods. Cramping can be severe, and some people experience pain during sex or a feeling of pelvic pressure or fullness.

Adenomyosis is more commonly diagnosed in people who have given birth or are in their thirties and forties, though it can affect younger people too. It often co-exists with endometriosis.

Diagnosis has traditionally required surgery or pathology after a hysterectomy, but MRI and specialist ultrasound can now identify adenomyosis with reasonable accuracy.

Management depends on symptom severity and personal circumstances. Options include pain relief, hormonal therapies, and for those who have completed their families, surgical options may provide definitive relief.

If your periods have become progressively heavier and more painful, adenomyosis is worth raising with a gynaecologist.`,
    questions: [
      "Could adenomyosis explain my heavy or painful periods?",
      "What imaging would help assess this?",
      "What management options fit my situation?",
    ],
  },
  {
    id: "contraception",
    title: "Contraception",
    subtitle: "Understanding Your Options",
    tag: "Choices",
    summary: "An overview of hormonal and non-hormonal contraceptive options and how they interact with your cycle and hormones.",
    body: `Contraception is not one-size-fits-all. The right method depends on your health history, lifestyle, relationship with your cycle, and whether you want the option to conceive in the near future.

Hormonal methods work by preventing ovulation, thickening cervical mucus, or thinning the uterine lining, depending on the method. They suppress the natural hormonal cycle, which some people find helpful and others find affects their mood, libido, or sense of self. Both responses are valid.

Non-hormonal methods include the copper IUD, condoms, and fertility awareness-based methods. The copper IUD is highly effective and does not affect hormone levels, though it can make periods heavier.

Fertility awareness methods involve tracking cycle signs to identify fertile and infertile days. When practised carefully, they can be effective, but they require consistency.

The best contraceptive method is one that works for your body and your life. It is always reasonable to try something, find it does not suit you, and explore other options.`,
    questions: [
      "Which options suit my health history and goals?",
      "How might each option affect my cycle and mood?",
      "What are the trade-offs I should weigh?",
    ],
  },
  {
    id: "fertility",
    title: "Fertility Awareness",
    subtitle: "Understanding Your Cycle",
    tag: "Cycle Knowledge",
    summary: "Fertility awareness involves learning to identify the fertile window in your cycle through observable signs and tracking.",
    body: `Fertility awareness is the practice of understanding your own cycle well enough to identify when you are and are not fertile. It is both a method of contraception and a powerful tool for those trying to conceive or simply wanting to understand their body better.

The core principle is that fertility is not constant throughout the cycle. In a typical cycle, ovulation occurs once, and the egg is viable for around 12 to 24 hours. However, sperm can survive in fertile cervical mucus for up to five days, meaning the fertile window is roughly six days long.

Observable signs that shift across the cycle include basal body temperature (BBT), which rises slightly after ovulation and remains elevated until the next period; cervical mucus, which becomes clearer, stretchier, and more abundant approaching ovulation; and cervical position, which changes throughout the cycle.

Whether you are using fertility awareness to avoid pregnancy, achieve pregnancy, or simply understand your hormonal rhythms, it is one of the most empowering things you can learn about your own body.`,
    questions: [
      "Can fertility signs reliably indicate my fertile window?",
      "How reliable is this approach for my goals?",
      "What can interfere with accurate tracking?",
    ],
  },

  // ── HORMONAL ──────────────────────────────────────────────────────────────
  {
    id: "insulin-resistance",
    title: "Insulin Resistance",
    subtitle: "Blood Sugar & Hormones",
    tag: "Hormonal",
    summary: "When the body responds less effectively to insulin, blood sugar regulation becomes harder and hormones can shift. This is closely linked to PCOS and perimenopause.",
    body: `When the body responds less effectively to insulin, blood sugar regulation becomes harder and hormones can shift. This is closely linked to PCOS and can also become more common during perimenopause.

Insulin resistance does not always cause obvious symptoms. Some people notice fatigue after meals, difficulty managing weight, skin changes such as darkening around the neck or underarms, or irregular cycles. These can be easy to attribute to other things, which is why it is often missed.

Recognising it early opens the door to supportive lifestyle and medical options. Diet, movement, sleep, and stress management all play a meaningful role in how the body responds to insulin. Some people benefit from additional medical support alongside these changes.`,
    questions: [
      "Could my symptoms be related to insulin resistance?",
      "Would blood sugar or insulin testing be helpful for me?",
      "What changes could support my metabolic health?",
    ],
  },
  {
    id: "cortisol",
    title: "Cortisol & Stress",
    subtitle: "The Stress Hormone Connection",
    tag: "Hormonal",
    summary: "When stress is ongoing, elevated cortisol can interact with estrogen, progesterone, and thyroid hormones, affecting cycles, sleep, and energy.",
    body: `Cortisol is the body's main stress hormone, released by the adrenal glands in response to perceived threat or demand. In short bursts, it is useful. When stress is ongoing, the picture changes.

Elevated cortisol over time can interact with estrogen, progesterone, and thyroid hormones, sometimes affecting cycle regularity, sleep quality, and energy. It can suppress ovulation, worsen PMS, and contribute to fatigue that feels out of proportion to how much rest you are getting.

Understanding this connection helps put physical symptoms in context. It also supports a gentler relationship with stress management, not as a luxury, but as something that directly influences hormonal health.`,
    questions: [
      "Could chronic stress be affecting my cycle or symptoms?",
      "Are there ways to assess how stress is influencing my health?",
      "What support exists for stress-related hormonal changes?",
    ],
  },
  {
    id: "estrogen-dominance",
    title: "Estrogen Dominance",
    subtitle: "Hormonal Imbalance",
    tag: "Hormonal",
    summary: "A relative imbalance where estrogen is high compared to progesterone, often discussed in relation to heavy periods, breast tenderness, and mood changes.",
    body: `Estrogen dominance describes a relative imbalance where estrogen is high compared to progesterone. It is often discussed in relation to heavy or painful periods, breast tenderness, and mood changes, particularly in the premenstrual phase.

It is worth noting that this is a useful lens for conversations with a clinician rather than a formal diagnosis on its own. Estrogen levels alone do not tell the whole story, as the balance between estrogen and progesterone across the cycle matters more.

Factors that can contribute include stress, gut health, body weight, and certain environmental exposures. Understanding this balance can inform both lifestyle approaches and conversations with your healthcare provider about testing and support.`,
    questions: [
      "Could an imbalance between estrogen and progesterone explain my symptoms?",
      "Would hormone testing add useful information in my case?",
      "How is this typically assessed and supported?",
    ],
  },
  {
    id: "low-progesterone",
    title: "Low Progesterone",
    subtitle: "Luteal Phase Hormones",
    tag: "Hormonal",
    summary: "Progesterone rises after ovulation and supports the second half of the cycle. Lower levels may connect to spotting, short cycles, or difficulty in early pregnancy.",
    body: `Progesterone rises after ovulation and helps prepare the body for a possible pregnancy, supporting the uterine lining and contributing to the characteristic shift in temperature and mood that marks the luteal phase.

Lower levels are sometimes connected to shorter cycles, spotting before a period, premenstrual symptoms that feel more intense, or difficulty maintaining early pregnancy. They can also contribute to a sense of anxiety or poor sleep in the second half of the cycle.

A clinician can help interpret whether this is relevant for you, as timing matters. Progesterone needs to be measured at the right point in the cycle to be meaningful.`,
    questions: [
      "Could low progesterone be relevant to my cycle pattern?",
      "When in my cycle would testing be most informative?",
      "What options exist if levels are low?",
    ],
  },
  {
    id: "androgens",
    title: "Androgens & Testosterone",
    subtitle: "Hormones in Women",
    tag: "Hormonal",
    summary: "Women produce androgens including testosterone, which play a role in energy, libido, and muscle health. Higher than typical levels can contribute to acne, unwanted hair, or irregular cycles.",
    body: `Women produce androgens, including testosterone, in smaller amounts than men, and they play an important role in energy, libido, muscle health, and overall vitality. These are not exclusively male hormones.

Higher than typical levels of androgens can contribute to acne, unwanted hair growth on the face or body, thinning hair on the scalp, or irregular cycles, often in connection with PCOS, though other causes exist.

Balanced androgen levels matter for overall wellbeing. Testing can help clarify whether levels are playing a role in your symptoms, and there are various approaches to support this balance depending on the underlying cause.`,
    questions: [
      "Could elevated androgens explain my skin or hair changes?",
      "What testing helps clarify this?",
      "How are androgen-related symptoms usually supported?",
    ],
  },
  {
    id: "prolactin",
    title: "Prolactin",
    subtitle: "Hyperprolactinemia",
    tag: "Hormonal",
    summary: "Raised prolactin levels outside of pregnancy can affect cycles and ovulation, causing missed periods or unexpected milk production. This is straightforward to check and important not to overlook.",
    body: `Prolactin is a hormone best known for its role in supporting breastfeeding. Outside of pregnancy and breastfeeding, it is present in small amounts and plays a supporting role in various hormonal processes.

Raised levels, a condition called hyperprolactinemia, can interfere with the hormones that regulate ovulation, sometimes causing missed or irregular periods, or unexpected milk production from the nipples.

Causes include certain medications, stress, thyroid conditions, and less commonly a small growth on the pituitary gland. This is straightforward to check with a blood test and important not to overlook when periods are disrupted without another clear cause.`,
    questions: [
      "Could a prolactin imbalance be affecting my cycle?",
      "Is a blood test appropriate here?",
      "What are the next steps if levels are high?",
    ],
  },
  {
    id: "hashimotos",
    title: "Hashimoto's Thyroiditis",
    subtitle: "Autoimmune Thyroid Condition",
    tag: "Hormonal",
    summary: "An autoimmune condition where the immune system gradually affects the thyroid, often leading to an underactive thyroid. Common in women and very manageable once identified.",
    body: `Hashimoto's thyroiditis is an autoimmune condition where the immune system gradually affects the thyroid gland, often leading to an underactive thyroid over time. It is the most common cause of hypothyroidism.

Because thyroid function is closely tied to the menstrual cycle, it can influence periods, energy, mood, weight, hair, and temperature regulation. Many of these symptoms develop slowly and are easy to attribute to stress or lifestyle.

It is common in women, affecting them far more often than men, and is very manageable once identified. Monitoring thyroid antibodies alongside TSH gives a more complete picture. Many people live well with this condition once it is recognised and appropriately supported.`,
    questions: [
      "Could an autoimmune thyroid condition explain how I feel?",
      "Should antibody testing be part of my thyroid check?",
      "How will this be monitored over time?",
    ],
  },
  {
    id: "hormonal-acne",
    title: "Hormonal Acne",
    subtitle: "Skin & the Cycle",
    tag: "Hormonal",
    summary: "Acne that flares with the cycle, especially along the jaw and chin, is often linked to hormonal shifts rather than skincare alone. Understanding the pattern helps target the right support.",
    body: `Acne that flares with the cycle, especially along the jaw, chin, and lower cheeks, is often linked to hormonal shifts rather than skincare alone. This pattern reflects the skin's response to changing hormone levels, particularly in the days before a period.

It can be connected to elevated androgens, the rise in progesterone during the luteal phase, or underlying conditions like PCOS. Stress and sleep can also amplify the hormonal signals that trigger breakouts.

Understanding the hormonal pattern helps target the right support. Skincare routines matter, but if breakouts follow a consistent cycle pattern, it is worth exploring the underlying hormonal picture with a clinician.`,
    questions: [
      "Could my acne be hormonally driven?",
      "Is it worth exploring an underlying hormonal cause?",
      "What approaches address hormonal skin changes?",
    ],
  },
  {
    id: "hair-changes",
    title: "Hair Thinning & Hirsutism",
    subtitle: "Hormonal Hair Changes",
    tag: "Hormonal",
    summary: "Changes in hair, whether thinning on the scalp or increased growth on the face and body, can reflect hormonal shifts and are worth raising even if they feel cosmetic.",
    body: `Changes in hair, whether thinning on the scalp or increased growth on the face and body, can reflect shifts in hormones such as androgens or thyroid hormones. These changes can feel distressing and are sometimes dismissed as cosmetic, but they are a real signal worth investigating.

Scalp thinning in women is often linked to androgens, thyroid changes, nutritional deficiencies, or postpartum shifts. Increased facial or body hair growth (hirsutism) is commonly associated with elevated androgens, which can occur in PCOS or other hormonal conditions.

These changes are common and often treatable once the cause is understood. A clinician can help identify whether hormonal testing is the right starting point.`,
    questions: [
      "Could a hormonal cause explain my hair changes?",
      "What tests help identify the reason?",
      "What options exist to support this?",
    ],
  },

  // ── METABOLIC & WELLBEING ─────────────────────────────────────────────────
  {
    id: "bone-health",
    title: "Bone Health",
    subtitle: "Estrogen & Osteoporosis",
    tag: "Metabolic & Wellbeing",
    summary: "Estrogen helps protect bone strength, making bone health especially important around and after menopause. Early awareness allows for protective steps well before problems appear.",
    body: `Estrogen helps protect bone strength, which is why bone health becomes especially important around and after menopause. Lower estrogen levels can gradually reduce bone density, raising the risk of fractures over time, a condition known as osteoporosis.

Bone loss can begin in the years before menopause and progress silently without symptoms. This is why awareness and preventive action matter well before any sign of fragility appears.

Calcium, vitamin D, weight-bearing exercise, and lifestyle factors all play a protective role. Screening with a bone density scan (DEXA) can provide a useful baseline at the right time. The conversation is worth having before problems arise.`,
    questions: [
      "When should I think about a bone density check?",
      "What lifestyle factors most support my bones?",
      "Do my hormones affect my bone health risk?",
    ],
  },
  {
    id: "iron-anemia",
    title: "Iron & Anaemia",
    subtitle: "Heavy Periods & Iron Stores",
    tag: "Metabolic & Wellbeing",
    summary: "Heavy or frequent periods can lower the body's iron stores, sometimes leading to anaemia with symptoms like fatigue, breathlessness, or pale skin. This is simple to check and very treatable.",
    body: `Heavy or frequent periods can lower the body's iron stores, sometimes leading to anaemia with symptoms like fatigue, breathlessness, difficulty concentrating, or pale skin. This is one of the most common and overlooked effects of heavy menstrual bleeding.

Fatigue from low iron can feel similar to many other things, such as a busy life, poor sleep, or stress, which is why it is easy to miss. A simple blood test measuring ferritin (stored iron) alongside a standard iron level gives a clearer picture.

Addressing the underlying cause of heavy bleeding, when present, is as important as replenishing iron stores. Both deserve attention, and support is readily available.`,
    questions: [
      "Could my periods be affecting my iron levels?",
      "Would an iron or ferritin test be useful?",
      "How can I support healthy iron levels?",
    ],
  },
  {
    id: "gut-hormones",
    title: "Gut Health & Hormones",
    subtitle: "The Gut-Hormone Connection",
    tag: "Metabolic & Wellbeing",
    summary: "The gut plays a role in processing and balancing hormones, including estrogen. An imbalanced gut environment may influence how hormones are cleared from the body.",
    body: `The gut plays a role in processing and balancing hormones, including estrogen. A collection of gut bacteria known as the estrobolome is involved in how estrogen is metabolised and cleared from the body. When this balance shifts, it may influence how hormones circulate.

An imbalanced gut environment may also affect mood, as a significant proportion of serotonin is produced in the gut, which connects digestive health to emotional experience across the cycle.

This is an emerging and evolving area of research. It does not mean every digestive symptom has a hormonal cause, but it does support a holistic view of health in which digestion, hormones, and mood are interconnected.`,
    questions: [
      "Could gut health be influencing my hormonal symptoms?",
      "Are there evidence-based steps that support this connection?",
      "When should digestive symptoms be investigated further?",
    ],
  },
  {
    id: "sleep-hormones",
    title: "Sleep & Hormonal Rhythm",
    subtitle: "Rest & the Cycle",
    tag: "Metabolic & Wellbeing",
    summary: "Sleep and hormones influence each other closely. Poor sleep can worsen mood and hormonal symptoms, and the cycle itself can disrupt rest at different phases.",
    body: `Sleep and hormones influence each other closely, with the cycle, perimenopause, and stress all affecting rest. The luteal phase, when progesterone peaks and then drops before a period, can disrupt sleep quality. Night sweats during perimenopause are another common disruptor.

Poor sleep, in turn, can worsen mood, increase cortisol, affect appetite hormones, and amplify hormonal symptoms, creating a feedback loop that is hard to break without addressing both sides.

Recognising the link between the cycle and sleep is a useful first step. It can help reframe disrupted rest as something with a physiological cause, and open the door to targeted support.`,
    questions: [
      "Could my sleep issues be hormonally related?",
      "What can help when hormones disrupt my sleep?",
      "When is it worth investigating sleep more formally?",
    ],
  },
  {
    id: "nutrition-hormones",
    title: "Nutrition for Hormonal Health",
    subtitle: "Food & the Cycle",
    tag: "Metabolic & Wellbeing",
    summary: "What we eat provides the building blocks for hormones and influences blood sugar, energy, and mood across the cycle. Small sustainable changes tend to matter more than strict rules.",
    body: `What we eat provides the building blocks for hormones and influences blood sugar, energy, and mood across the cycle. There is no single perfect diet, but patterns of eating that support blood sugar stability and gut health tend to support hormonal balance.

Protein, healthy fats, fibre, and micronutrients like magnesium, zinc, and B vitamins are all involved in hormone production and metabolism. Nutritional deficiencies, which are more common than often recognised, can contribute to fatigue, mood changes, and cycle disruption.

Small, sustainable changes tend to matter more than strict rules or elimination diets. Working with a dietitian who understands hormonal health can help translate this into something practical for your life.`,
    questions: [
      "Are there nutritional changes that would help my specific situation?",
      "Should I see a dietitian with experience in hormonal health?",
      "Could any deficiencies be affecting how I feel?",
    ],
  },
  {
    id: "movement-cycle",
    title: "Movement & the Cycle",
    subtitle: "Exercise Across Phases",
    tag: "Metabolic & Wellbeing",
    summary: "Exercise supports hormonal health, mood, and metabolic balance, and energy levels naturally shift across the cycle. Adapting movement to each phase can make it more sustainable.",
    body: `Exercise supports hormonal health, mood, and metabolic balance, and it is one of the most consistently supported lifestyle factors in women's health research. But energy levels can naturally shift across the cycle, and what feels possible in the follicular phase may feel very different during menstruation or the late luteal phase.

Adapting movement to how you feel in each phase can make it more sustainable, and can reduce the guilt that comes from not always being able to maintain the same intensity. Some phases suit high-energy workouts; others suit gentler movement or rest.

Gentle consistency often serves the body better than intensity alone. There is no single right approach, as what matters is finding movement that you can maintain without working against how your body is feeling.`,
    questions: [
      "How can I exercise in a way that supports my hormones?",
      "Is there a reason my energy changes so much across my cycle?",
      "Are there limits I should be aware of for my situation?",
    ],
  },

  // ── CYCLE KNOWLEDGE ───────────────────────────────────────────────────────
  {
    id: "cycle-phases",
    title: "Your Cycle Phases",
    subtitle: "The Four Phases Explained",
    tag: "Cycle Knowledge",
    summary: "The menstrual cycle moves through four distinct phases, each shaped by changing hormones that affect energy, mood, and the body. Knowing them helps make sense of your own rhythm.",
    body: `The menstrual cycle moves through four distinct phases, each shaped by changing hormones that affect energy, mood, focus, and the body. Most people are aware of their period, but the rest of the cycle is equally important.

The menstrual phase marks the shedding of the uterine lining. As it ends, the follicular phase begins, bringing rising estrogen that supports energy, focus, and a sense of renewal. Ovulation, the release of an egg, sits at the peak of this rising energy. The luteal phase follows, with progesterone rising to prepare the body for a potential pregnancy, often bringing a quieter, more inward quality.

Understanding these rhythms helps make sense of patterns in mood, energy, and focus that might otherwise feel random. It is the foundation of cycle awareness.`,
    questions: [
      "Is my cycle length and pattern within a typical range?",
      "What variation is normal from cycle to cycle?",
      "When should changes in my cycle be checked?",
    ],
  },
  {
    id: "ovulation",
    title: "Ovulation Explained",
    subtitle: "The Heart of the Cycle",
    tag: "Cycle Knowledge",
    summary: "Ovulation is the release of an egg from the ovary, driven by a hormonal surge at the midpoint of the cycle. Recognising its signs supports both fertility awareness and cycle understanding.",
    body: `Ovulation is the release of an egg from the ovary and sits at the heart of the menstrual cycle. It is driven by a surge in luteinising hormone (LH) around the midpoint of the cycle, and it is the moment the cycle builds toward from its beginning.

The egg is viable for around 12 to 24 hours after release, though sperm can survive in fertile cervical mucus for up to five days, making the window around ovulation significant for fertility.

Signs of ovulation include a shift in cervical mucus to a clearer, stretchier consistency, a slight rise in basal body temperature after the event, and for some people a mild one-sided pelvic ache. Recognising these signs supports both conception and general body awareness.`,
    questions: [
      "How can I tell whether I am ovulating?",
      "Is irregular ovulation something to investigate?",
      "What can affect ovulation in my case?",
    ],
  },
  {
    id: "luteal-phase",
    title: "The Luteal Phase",
    subtitle: "Progesterone & the Second Half",
    tag: "Cycle Knowledge",
    summary: "The luteal phase runs from ovulation to your next period, when progesterone rises. Its length and quality can influence premenstrual symptoms and early pregnancy.",
    body: `The luteal phase is the time between ovulation and your next period, typically lasting around 12 to 16 days. During this phase, progesterone rises, preparing the uterine lining for a potential pregnancy and bringing a characteristic shift in how many people feel, often calmer, more inward, or more sensitive.

If conception does not occur, progesterone drops at the end of the luteal phase, triggering the onset of a period. This drop is also associated with premenstrual symptoms for many people.

A luteal phase shorter than 10 days, or one with significant mood or physical symptoms, may be worth discussing with a clinician. These patterns can sometimes indicate hormonal imbalances that are addressable.`,
    questions: [
      "Could my luteal phase length be affecting my symptoms?",
      "Is this relevant if I am trying to conceive?",
      "How is this usually assessed?",
    ],
  },
  {
    id: "cervical-mucus",
    title: "Cervical Mucus",
    subtitle: "Fertility Signs",
    tag: "Cycle Knowledge",
    summary: "Cervical mucus changes across the cycle and is one of the body's natural fertility signals, a practical, low-cost window into hormonal shifts.",
    body: `Cervical mucus changes across the cycle in response to shifting hormone levels, and these changes are one of the body's natural fertility signals. After a period, many people notice little to no mucus, followed by a drier phase. As estrogen rises approaching ovulation, mucus becomes more abundant, clearer, and stretchy, often compared to raw egg white.

After ovulation, under the influence of progesterone, mucus typically becomes thicker and less apparent. The transition back to a drier phase signals that the fertile window has passed.

Learning to observe these changes is a practical, low-cost way to understand the cycle. It supports both fertility awareness methods and a general understanding of where you are in your cycle day to day.`,
    questions: [
      "Are my cervical mucus patterns typical?",
      "Can these signs reliably indicate my fertile window?",
      "What changes in discharge should I have checked?",
    ],
  },
  {
    id: "bbt",
    title: "Basal Body Temperature",
    subtitle: "Tracking Ovulation",
    tag: "Cycle Knowledge",
    summary: "Your resting temperature shifts slightly after ovulation due to progesterone. Tracking it over time can confirm whether and when ovulation occurred.",
    body: `Basal body temperature (BBT) is your resting temperature taken first thing in the morning before any activity. It shifts slightly, usually 0.2 to 0.5 degrees Celsius, after ovulation, due to the thermogenic effect of progesterone.

Tracking BBT over several cycles builds a pattern that can confirm whether ovulation is occurring and give a retrospective sense of when it happened. On its own, it cannot predict ovulation in advance, as it confirms it after the fact.

Combined with observations of cervical mucus and cycle length, BBT adds a useful layer to cycle awareness. It requires consistency, the same time each morning before getting up, but it is a simple tool that costs nothing.`,
    questions: [
      "Can temperature tracking confirm my ovulation?",
      "How reliable is this method for my goals?",
      "What can interfere with accurate readings?",
    ],
  },
  {
    id: "irregular-periods",
    title: "Irregular Periods",
    subtitle: "Cycle Variation",
    tag: "Cycle Knowledge",
    summary: "Cycles that vary widely in length or timing are common and can have many causes. Occasional irregularity is often normal, but persistent patterns deserve attention.",
    body: `Cycles that vary widely in length or timing are common and can have many causes, from stress and sleep disruption to thyroid function, PCOS, or significant weight changes. Occasional irregularity over the course of a year is often within the range of normal.

A regular cycle is generally considered one that arrives within a consistent window, even if that window is 26 days for one person and 35 for another. What matters more than hitting a specific number is consistency for you over time.

Persistent irregularity, meaning cycles that are consistently unpredictable, very short, very long, or that have changed noticeably, is worth discussing with a clinician. Tracking gives valuable data to bring to that conversation.`,
    questions: [
      "Is my level of irregularity something to investigate?",
      "What underlying causes are worth ruling out?",
      "What tracking information would help you most?",
    ],
  },
  {
    id: "amenorrhea",
    title: "Missing Periods",
    subtitle: "Amenorrhea",
    tag: "Cycle Knowledge",
    summary: "A missing period when not pregnant can result from stress, weight changes, intense exercise, or hormonal conditions. Several missed cycles is worth exploring.",
    body: `A missing period when not pregnant can result from a range of causes. Stress, significant weight changes, intense exercise, nutritional deficiency, and hormonal conditions such as PCOS or thyroid imbalance can all disrupt the signals that trigger a period.

Occasional absence can occur without a serious underlying cause. But several missed cycles, a condition called secondary amenorrhea, is worth exploring, both to understand the cause and because a sustained absence of periods can affect bone health, among other things.

The cause guides the right support. A clinician will typically start with a review of lifestyle factors and a targeted set of blood tests to narrow down the likely explanation.`,
    questions: [
      "What could be causing my missed periods?",
      "Which tests help identify the reason?",
      "When does this become important to address?",
    ],
  },
  {
    id: "heavy-periods",
    title: "Heavy Periods",
    subtitle: "Menorrhagia",
    tag: "Cycle Knowledge",
    summary: "Bleeding that soaks through protection quickly, lasts a long time, or includes large clots can affect iron levels and sometimes signals underlying conditions. You do not have to accept it as normal.",
    body: `Bleeding that soaks through protection quickly, lasts a long time, or regularly includes large clots is considered heavy and is more than just inconvenient. It can significantly affect daily life, disrupt sleep, and over time reduce iron stores, leading to fatigue and anaemia.

Heavy periods are common but not something to simply accept. They can be a sign of underlying conditions such as fibroids, adenomyosis, a thyroid imbalance, or a bleeding disorder. They can also occur without an identifiable structural cause.

Effective management options exist. A clinician can help investigate the cause and discuss approaches that range from tracking and nutritional support to hormonal or procedural options, depending on what is driving the bleeding.`,
    questions: [
      "Is my bleeding heavier than it should be?",
      "Could a condition like fibroids be involved?",
      "What options exist to manage heavy bleeding?",
    ],
  },
  {
    id: "painful-periods",
    title: "Painful Periods",
    subtitle: "Dysmenorrhoea",
    tag: "Cycle Knowledge",
    summary: "Period pain that interferes with daily life goes beyond typical discomfort and deserves attention. Severe pain can be linked to conditions such as endometriosis or adenomyosis.",
    body: `Period pain that interferes with daily life goes beyond typical discomfort and deserves attention. Some cramping is a normal part of menstruation, caused by prostaglandins that help the uterus contract. But pain that stops you functioning, that sends you to bed, keeps you from work, or requires you to plan around it every month, is a reason to seek support.

Severe period pain can be linked to conditions such as endometriosis, adenomyosis, or fibroids. It can also occur without an identifiable structural cause, a condition known as primary dysmenorrhoea.

Normalising severe pain delays diagnosis and treatment. Pain that stops you functioning is information, not weakness, and it is worth raising directly with a healthcare provider.`,
    questions: [
      "Is my period pain within a normal range?",
      "Could an underlying condition be causing it?",
      "What approaches help manage cycle pain?",
    ],
  },
  {
    id: "spotting",
    title: "Spotting Between Periods",
    subtitle: "Intermenstrual Bleeding",
    tag: "Cycle Knowledge",
    summary: "Light bleeding between periods can have many causes including ovulation, hormonal shifts, or contraception. A new or persistent pattern is worth checking.",
    body: `Light bleeding between periods, or spotting, can have many causes, including ovulation, hormonal shifts, contraception, or changes in the cervix. Occasional spotting, particularly around the middle of the cycle, is often harmless.

A new or persistent pattern of spotting is worth checking. This is especially true for spotting after sex, spotting that occurs regularly outside of ovulation, or any bleeding that appears after menopause. Context and timing help a clinician interpret what may be driving it.

In most cases the cause is benign and straightforward to assess. But because some of the less common causes are important to rule out, it is always reasonable to raise a new pattern with your healthcare provider rather than wait to see if it resolves.`,
    questions: [
      "Is this spotting something to be concerned about?",
      "Could it relate to my contraception or hormones?",
      "When should spotting be investigated further?",
    ],
  },

  // ── STRUCTURAL & INFLAMMATORY ─────────────────────────────────────────────
  {
    id: "fibroids",
    title: "Uterine Fibroids",
    subtitle: "Non-Cancerous Uterine Growths",
    tag: "Inflammatory",
    summary: "Fibroids are non-cancerous growths in or around the uterus, very common from the thirties onward. Many cause no symptoms, but some lead to heavy periods or pelvic pressure.",
    body: `Fibroids are non-cancerous growths in or around the uterus that are very common, particularly from the thirties onward. Estimates suggest the majority of people with a uterus will have fibroids at some point, though many never know because they cause no symptoms.

Some fibroids, depending on their size and location, can cause heavy or prolonged periods, pelvic pressure or fullness, frequent urination, or discomfort during sex. They are influenced by estrogen and progesterone, which is why they often shrink after menopause.

Diagnosis is typically confirmed with ultrasound. Management depends on symptoms and personal circumstances, and ranges from monitoring to hormonal support to procedural options. They are not a cancer risk.`,
    questions: [
      "Could fibroids explain my symptoms?",
      "What imaging helps confirm this?",
      "What options are available if fibroids are causing problems?",
    ],
  },
  {
    id: "ovarian-cysts",
    title: "Ovarian Cysts",
    subtitle: "Fluid-Filled Ovarian Sacs",
    tag: "Inflammatory",
    summary: "Most ovarian cysts are harmless and resolve on their own. Some can cause pain or pressure, particularly if they grow or rupture. Understanding which cysts need monitoring brings reassurance.",
    body: `Ovarian cysts are fluid-filled sacs that form on or in the ovaries. Most arise as part of the normal ovulation process, called functional cysts, and resolve on their own within one to three menstrual cycles without any treatment.

Some cysts can cause pain or pressure, particularly if they grow larger or rupture. Sudden, severe one-sided pelvic pain can indicate a ruptured or twisted cyst and warrants prompt medical attention.

Other types of cysts, including those associated with endometriosis (endometriomas) or PCOS, may require more active management. An ultrasound is typically the first step to understanding what type of cyst is present and whether it needs monitoring or intervention.`,
    questions: [
      "Is my cyst the type that needs monitoring?",
      "What symptoms should prompt me to seek care?",
      "How are cysts usually followed over time?",
    ],
  },
  {
    id: "pid",
    title: "Pelvic Inflammatory Disease",
    subtitle: "Reproductive Tract Infection",
    tag: "Inflammatory",
    summary: "PID is an infection of the reproductive organs, often arising from untreated infections that spread upward. Early treatment matters because it can affect long-term fertility.",
    body: `Pelvic inflammatory disease (PID) is an infection of the reproductive organs, including the uterus, fallopian tubes, and ovaries, that most commonly develops when a sexually transmitted infection travels upward from the vagina or cervix.

Symptoms can include pelvic pain, unusual discharge, pain during sex, fever, or pain when urinating. Some people have mild or no symptoms, which is why it can be missed.

Early treatment matters because untreated PID can cause scarring of the fallopian tubes, affecting long-term fertility and increasing the risk of ectopic pregnancy. Treatment is usually straightforward when caught early. Regular STI testing is one of the most effective ways to prevent PID from developing.`,
    questions: [
      "Could my symptoms suggest a pelvic infection?",
      "What testing is appropriate?",
      "How can I protect my long-term reproductive health?",
    ],
  },
  {
    id: "interstitial-cystitis",
    title: "Interstitial Cystitis",
    subtitle: "Bladder Pain Syndrome",
    tag: "Inflammatory",
    summary: "A chronic condition causing bladder pressure and pelvic pain without infection. More common in women and often mistaken for recurrent urinary tract infections.",
    body: `Interstitial cystitis, also called bladder pain syndrome, is a chronic condition causing bladder pressure, pelvic pain, and urinary urgency or frequency without a bacterial infection to explain it. It is significantly more common in women than men.

It is often mistaken for recurrent urinary tract infections, and many people spend years cycling through treatments for infections before the correct diagnosis is reached. The key distinction is that symptoms persist when urine cultures come back clear.

The cause is not fully understood, and it varies between individuals. Management is tailored to the person and may involve pelvic floor physiotherapy, dietary adjustments, and specialist support. Recognising it helps direct care toward the right practitioners.`,
    questions: [
      "Could my bladder symptoms be interstitial cystitis?",
      "How is this distinguished from infections?",
      "Which specialists can help manage it?",
    ],
  },
  {
    id: "pelvic-floor",
    title: "Pelvic Floor Health",
    subtitle: "Muscles That Matter",
    tag: "Inflammatory",
    summary: "The pelvic floor supports the bladder, bowel, and reproductive organs. When these muscles are too weak or too tense, it can lead to leakage, pressure, or discomfort.",
    body: `The pelvic floor is a group of muscles and connective tissue forming the base of the pelvis, supporting the bladder, bowel, and reproductive organs. Like any muscle group, these can be too weak, too tense, or uncoordinated, all of which can cause problems.

Weakness can contribute to leakage when coughing, sneezing, or exercising, or a sense of heaviness or pressure. Tension, which is less commonly discussed, can lead to pain during sex, pelvic discomfort, or difficulty with bladder and bowel function.

Pelvic floor health is supportable at any life stage, and specialised physiotherapy with a pelvic floor physiotherapist is the most evidence-based approach. It is worth knowing that generic exercises are not always appropriate and that an assessment first is valuable.`,
    questions: [
      "Could my symptoms relate to my pelvic floor?",
      "Would pelvic floor physiotherapy help me?",
      "What can I do to support these muscles?",
    ],
  },
  {
    id: "vulvodynia",
    title: "Vulvodynia",
    subtitle: "Chronic Vulvar Pain",
    tag: "Inflammatory",
    summary: "Ongoing pain or discomfort around the vulva without an obvious cause. More common than often recognised, real, and deserving of understanding and care.",
    body: `Vulvodynia is ongoing pain, burning, or discomfort around the vulva that persists for three months or more without an identifiable infection or skin condition to explain it. It is more common than often recognised, affecting a significant number of people at some point in their lives.

It can affect daily comfort, intimate relationships, and quality of life in ways that are significant and deserving of proper support. Because there is no visible cause, it is sometimes dismissed or misattributed to anxiety or sensitivity, but it is a real condition with physiological underpinnings, often involving nerve or muscle factors.

Specialist care may include pelvic floor physiotherapy, pain management approaches, and input from a vulvar specialist. Finding a clinician who takes this condition seriously is an important first step.`,
    questions: [
      "Could my discomfort be vulvodynia?",
      "Which specialists understand this condition?",
      "What approaches help manage the pain?",
    ],
  },

  // ── LIFE STAGE ────────────────────────────────────────────────────────────
  {
    id: "puberty",
    title: "Puberty & First Periods",
    subtitle: "Early Cycle Years",
    tag: "Life Stage",
    summary: "Puberty marks the start of hormonal cycles, and first periods can be irregular as the body finds its rhythm. Understanding what is typical reduces worry during these early years.",
    body: `Puberty marks the start of hormonal cycles, and the first few years of menstruation are often characterised by irregularity as the body establishes its hormonal rhythm. It can take two to three years for cycles to become more consistent.

During this time, cycles may be longer or shorter than average, periods may be heavier or lighter from one to the next, and skipped cycles are not uncommon. This is part of the normal developmental process, not a sign that something is wrong.

Body awareness established early can be a lifelong asset. Learning what a typical cycle looks and feels like, and what falls outside that range, provides a foundation for recognising changes and advocating for oneself in healthcare settings.`,
    questions: [
      "Is this level of irregularity normal in the early years?",
      "When should early cycle concerns be checked?",
      "What is helpful to track at this stage?",
    ],
  },
  {
    id: "pregnancy-hormones",
    title: "Pregnancy & Hormones",
    subtitle: "Hormonal Changes in Pregnancy",
    tag: "Life Stage",
    summary: "Pregnancy brings dramatic hormonal shifts that affect nearly every system in the body. Knowing what is expected helps distinguish normal changes from those worth raising.",
    body: `Pregnancy brings dramatic hormonal shifts that affect nearly every system in the body. Human chorionic gonadotropin (hCG), estrogen, and progesterone all rise significantly in the first trimester, supporting the pregnancy and driving many of the physical changes experienced early on.

These hormones are responsible for nausea, fatigue, breast tenderness, and mood changes that are common in early pregnancy. As the placenta takes over hormone production in the second trimester, symptoms often ease.

Knowing what is expected helps distinguish normal hormonal effects from symptoms worth raising. Open communication with a midwife or obstetrician throughout pregnancy provides the most personalised guidance.`,
    questions: [
      "Which symptoms are expected and which should I report?",
      "How will my hormones change across pregnancy?",
      "What support is available for difficult symptoms?",
    ],
  },
  {
    id: "postpartum",
    title: "Postpartum Hormones",
    subtitle: "After Birth",
    tag: "Life Stage",
    summary: "After birth, hormone levels drop sharply. This adjustment is significant and can contribute to postpartum mood changes. Understanding it helps new parents seek support without self-blame.",
    body: `After birth, the dramatic hormonal support of pregnancy drops sharply, as estrogen and progesterone levels fall rapidly in the days following delivery. This is one of the most significant hormonal shifts a body can experience, and it happens at a time when sleep deprivation and a major life transition compound the effect.

The resulting adjustment can affect mood, energy, and emotional resilience. The "baby blues," a period of tearfulness and emotional sensitivity in the first week or two, is very common and connected to this hormonal shift. For some, mood changes are more significant and persist, warranting closer support.

Postnatal depression and anxiety are common, treatable, and not a reflection of parental capability or love. Recognising the biological component can help people seek support without self-blame.`,
    questions: [
      "Are my mood or energy changes within a typical range?",
      "When should postpartum mood symptoms be addressed?",
      "How long does hormonal recovery usually take?",
    ],
  },
  {
    id: "breastfeeding-cycle",
    title: "Breastfeeding & Your Cycle",
    subtitle: "Hormones During Lactation",
    tag: "Life Stage",
    summary: "Breastfeeding influences hormones in ways that can delay the return of regular cycles. This is normal and varies widely between individuals.",
    body: `Breastfeeding influences hormones in ways that can delay the return of regular cycles. Prolactin, the hormone that supports milk production, suppresses the hormonal signals that trigger ovulation. The more frequently breastfeeding occurs, the stronger this effect tends to be.

The timing of when periods return varies widely. Some people see their cycle return within a few months of giving birth; others, particularly those breastfeeding exclusively, may not for a year or more. Both experiences are within the range of normal.

It is important to know that ovulation can occur before the first postpartum period, meaning fertility can return before any obvious sign. For those who wish to avoid pregnancy, contraceptive options suited to the breastfeeding period are worth discussing early.`,
    questions: [
      "When might my cycle return while breastfeeding?",
      "How does breastfeeding affect my fertility?",
      "What is normal for cycles during this time?",
    ],
  },
  {
    id: "menopause",
    title: "Menopause",
    subtitle: "End of Reproductive Cycles",
    tag: "Life Stage",
    summary: "Menopause is confirmed twelve months after your last period and marks a natural hormonal transition, with many supportive options available for the changes it brings.",
    body: `Menopause is confirmed twelve months after your last period and marks the end of reproductive cycles. The average age of menopause is around 51, though it can occur earlier or later.

The shift in hormones, particularly the decline in estrogen, can bring changes in temperature regulation, sleep, mood, memory, and vaginal and urinary health, among others. The extent of symptoms varies enormously between individuals.

It is a natural transition, not a medical condition, but that does not mean it should be endured without support. A range of options exists, from lifestyle adjustments to hormone therapy, and the conversation with a menopause-informed healthcare provider is increasingly evidence-based and nuanced.`,
    questions: [
      "Which of my symptoms are linked to menopause?",
      "What options exist to support this transition?",
      "How will this affect my longer-term health?",
    ],
  },
  {
    id: "postmenopause",
    title: "Postmenopause & Long-Term Health",
    subtitle: "Life After Menopause",
    tag: "Life Stage",
    summary: "After menopause, lower estrogen levels influence bone, heart, and tissue health over the long term. This is an important time for preventive care and ongoing wellbeing.",
    body: `After menopause, lower estrogen levels influence several systems in the body over the long term. Bone density, cardiovascular health, and the health of vaginal and urinary tissues are among the areas that benefit from attention in the postmenopausal years.

This stage is an important time for preventive care, including appropriate screening, attention to lifestyle factors, and conversations with a healthcare provider about what is right for you individually.

Many people thrive in postmenopause. Awareness of the relevant health considerations allows for informed, proactive choices rather than reactive responses to problems. Staying connected to healthcare during this stage, even when feeling well, supports the best long-term outcomes.`,
    questions: [
      "What screenings matter most for me now?",
      "How can I protect my bone and heart health?",
      "What symptoms in this stage should I still report?",
    ],
  },
  {
    id: "egg-health",
    title: "Ovarian Reserve",
    subtitle: "Egg Health & Fertility",
    tag: "Life Stage",
    summary: "Ovarian reserve refers to the number of eggs remaining, which naturally declines with age. Testing offers a snapshot that can be helpful for family planning conversations.",
    body: `Ovarian reserve refers to the number and quality of eggs remaining in the ovaries, which naturally declines with age. Understanding this can be helpful for people thinking about the timing of pregnancy or considering fertility preservation options.

Testing, most commonly a blood test measuring AMH (anti-Müllerian hormone), sometimes alongside a follicle count on ultrasound, offers a snapshot of ovarian reserve at a given point in time. It does not predict whether pregnancy will be achieved, and it should be interpreted alongside other factors.

A clinician with experience in reproductive medicine can help contextualise results and connect them to personal goals. Numbers alone rarely tell the whole story, and individual variation is significant.`,
    questions: [
      "Would ovarian reserve testing be useful for me?",
      "How should I interpret these results?",
      "How does this fit with my family planning goals?",
    ],
  },

  // ── MOOD & CYCLE ──────────────────────────────────────────────────────────
  {
    id: "pmdd",
    title: "PMDD",
    subtitle: "Premenstrual Dysphoric Disorder",
    tag: "Mood & Cycle",
    summary: "PMDD is a severe form of premenstrual symptoms where mood changes significantly disrupt daily life before a period. It is a recognised condition that responds to targeted support.",
    body: `PMDD is a severe form of premenstrual symptoms where mood changes, including intense sadness, anxiety, anger, or a sense of hopelessness, significantly disrupt daily life in the days before a period, then resolve when menstruation begins.

It is a recognised condition, not simply intense PMS, and the distinction matters because it shapes the support that is available and appropriate. The cyclical pattern is key: symptoms tied consistently to the luteal phase and lifting with the period are a diagnostic signal.

Naming it is often a relief for those who experience it. Effective support exists, and many people find significant improvement with the right approach. A clinician can help confirm the pattern and discuss the options.`,
    questions: [
      "Could my symptoms meet the pattern of PMDD?",
      "How is PMDD distinguished from PMS?",
      "What support options exist?",
    ],
  },
  {
    id: "menstrual-migraines",
    title: "Menstrual Migraines",
    subtitle: "Hormonal Headaches",
    tag: "Mood & Cycle",
    summary: "Some people experience migraines that follow a clear pattern around their period, linked to the drop in estrogen. Recognising the hormonal trigger helps target prevention.",
    body: `Some people experience migraines that follow a clear pattern around their period, linked to the drop in estrogen that occurs in the days before menstruation begins. These can be more intense and longer-lasting than migraines at other times of the cycle, and they can be harder to treat with standard approaches.

Recognising the hormonal trigger is an important step. Keeping a headache diary alongside a cycle tracker can reveal the pattern and give a clinician useful information for prevention planning.

The hormonal nature of these migraines also has implications for certain contraceptive options, which is worth discussing directly with a doctor who can weigh the factors specific to your situation.`,
    questions: [
      "Could my migraines be hormonally triggered?",
      "Does this pattern affect my contraception options?",
      "What approaches help prevent cycle-linked migraines?",
    ],
  },
  {
    id: "hormones-mental-health",
    title: "Hormones & Mental Wellbeing",
    subtitle: "The Mind-Hormone Link",
    tag: "Mood & Cycle",
    summary: "Hormonal shifts across the cycle, postpartum, and perimenopause can influence mood, anxiety, and emotional resilience. These connections are real and increasingly recognised in research.",
    body: `Hormonal shifts across the cycle, postpartum, and perimenopause can influence mood, anxiety, and emotional resilience. These connections are real and increasingly recognised in research, though they have historically been underestimated or dismissed.

Estrogen and progesterone both interact with neurotransmitters including serotonin, dopamine, and GABA, which play central roles in mood regulation. When these hormones fluctuate, so can emotional experience, sometimes in ways that feel significant and difficult to explain.

Understanding the hormonal contribution does not mean mental health challenges are simply hormonal and need no further support. It means that taking the full picture into account, considering hormonal, psychological, and social factors, leads to the most effective and compassionate care.`,
    questions: [
      "Could hormonal changes be affecting my mood?",
      "How can I tell what is hormonal versus other causes?",
      "What support brings together hormonal and mental health care?",
    ],
  },

  // ── CHOICES ───────────────────────────────────────────────────────────────
  {
    id: "hormonal-vs-nonhormonal",
    title: "Hormonal vs Non-Hormonal",
    subtitle: "Contraceptive Approaches",
    tag: "Choices",
    summary: "There is a wide spectrum of contraceptive and management options. Knowing the categories helps you have an informed conversation about what suits your health and goals.",
    body: `There is a wide spectrum of contraceptive and management options, both hormonal and non-hormonal, each with different mechanisms and effects on the body. Understanding the broad categories is a useful starting point for making an informed choice.

Hormonal methods work by using synthetic forms of estrogen, progesterone, or both to influence the cycle. Non-hormonal methods work through physical or chemical barriers, or through copper in the case of the copper IUD.

The right choice depends on your health history, goals, how you want your cycle to behave, and personal preferences. There is no universally superior option. A clinician can help map the available choices to your specific situation and priorities.`,
    questions: [
      "Which options suit my health history and goals?",
      "How might each affect my cycle and symptoms?",
      "What are the trade-offs I should weigh?",
    ],
  },
  {
    id: "iuds",
    title: "IUDs Explained",
    subtitle: "Intrauterine Devices",
    tag: "Choices",
    summary: "IUDs are long-acting devices placed in the uterus, available in hormonal and non-hormonal forms. Understanding the types helps clarify which might fit your needs.",
    body: `Intrauterine devices (IUDs) are small, long-acting devices placed in the uterus by a healthcare provider. They are among the most effective forms of contraception and, once in place, require no daily action.

Hormonal IUDs release a low dose of progestogen locally, which thickens cervical mucus and thins the uterine lining. They typically result in lighter periods or no periods at all, which many people find beneficial. The copper IUD contains no hormones and works through the copper's effect on sperm. It tends to make periods heavier, particularly in the first few months.

Both types are long-acting and fully reversible. The experience of insertion varies between individuals. A detailed conversation with a clinician can help clarify which type suits your circumstances.`,
    questions: [
      "Which type of IUD might suit me?",
      "How could each affect my periods?",
      "What should I expect during and after placement?",
    ],
  },
  {
    id: "coming-off-bc",
    title: "Coming Off Hormonal Birth Control",
    subtitle: "Post-Pill Transition",
    tag: "Choices",
    summary: "When stopping hormonal contraception, the body needs time to resume its own cycle. Experiences vary widely, and knowing what to expect makes the transition smoother.",
    body: `When stopping hormonal contraception, the body needs time to resume its own hormonal cycle, and experiences during this transition vary widely. For some people, cycles return quickly and feel similar to before. For others, there is a period of irregularity as the body reestablishes its own rhythm.

Some people notice changes in skin, mood, libido, or cycle characteristics during this adjustment. These are not necessarily a sign that the contraceptive was masking something, as they can simply reflect the body recalibrating.

It is worth tracking cycles during this time to build a picture of what is normal for you without hormonal influence. If cycles do not return within a few months, it is reasonable to discuss this with a clinician.`,
    questions: [
      "What changes might I notice after stopping?",
      "How long does it usually take for cycles to return?",
      "What is helpful to track during this time?",
    ],
  },
  {
    id: "hrt",
    title: "Hormone Therapy in Menopause",
    subtitle: "HRT Explained",
    tag: "Choices",
    summary: "Menopausal hormone therapy is one option for managing significant menopause symptoms. Suitability depends on individual health factors, and the evidence has evolved significantly in recent years.",
    body: `Menopausal hormone therapy (MHT, sometimes called HRT) involves taking hormones to supplement those the body is no longer producing in the same amounts. It is one of the most effective options for managing significant menopause symptoms such as hot flushes, night sweats, sleep disruption, and vaginal changes.

The conversation around hormone therapy has evolved substantially, with more nuanced evidence emerging in recent years about who it suits, how it is best taken, and its risk profile. For many people, the benefits outweigh the risks, particularly when started earlier in the menopause transition.

Suitability is individual and depends on health history, symptom severity, and personal preferences. A menopause-informed healthcare provider is the most valuable resource for making this decision.`,
    questions: [
      "Could hormone therapy be appropriate for me?",
      "What benefits and risks apply to my situation?",
      "What alternatives are worth considering?",
    ],
  },
  {
    id: "egg-freezing",
    title: "Egg Freezing",
    subtitle: "Fertility Preservation",
    tag: "Choices",
    summary: "Egg freezing allows eggs to be stored for potential future use. Success depends on factors including age at freezing, and understanding the realistic picture supports informed decisions.",
    body: `Egg freezing (oocyte cryopreservation) involves stimulating the ovaries to produce multiple eggs, retrieving them, and freezing them for potential future use. Interest has grown significantly as people increasingly consider later family planning.

Success rates depend meaningfully on age at the time of freezing, as eggs frozen at a younger age typically have a better chance of resulting in a successful pregnancy when used. It is important to approach the process with realistic expectations about what it can and cannot guarantee.

The process involves hormone injections over a period of around two weeks, followed by an egg retrieval procedure. Costs, clinic quality, and individual factors all matter. A reproductive specialist can provide a personalised picture based on current ovarian reserve and goals.`,
    questions: [
      "Is egg freezing relevant for my situation?",
      "How does my age affect the outlook?",
      "What does the process involve?",
    ],
  },
  {
    id: "fertility-support",
    title: "Fertility Support",
    subtitle: "When & Where to Seek Help",
    tag: "Choices",
    summary: "A range of support exists for those facing difficulty conceiving. Knowing when to seek help and what the pathway looks like reduces uncertainty.",
    body: `A range of support exists for those facing difficulty conceiving, from cycle tracking and lifestyle optimisation through to medical assessment and assisted reproductive options. Knowing when to seek help and what the pathway looks like can reduce the uncertainty that often surrounds this experience.

General guidance suggests seeking assessment after 12 months of unprotected sex if under 35, or after 6 months if over 35, though earlier conversations are appropriate if there are known factors such as irregular cycles, a previous diagnosis, or concerns about one partner's reproductive health.

Initial assessments typically include cycle monitoring, blood tests, and a semen analysis if applicable. A fertility specialist can advise on the most relevant next steps based on individual circumstances.`,
    questions: [
      "At what point should I seek fertility support?",
      "What initial assessments are usually done?",
      "What does the typical pathway look like?",
    ],
  },

  // ── SCREENING & PREVENTION ────────────────────────────────────────────────
  {
    id: "cervical-screening",
    title: "Cervical Screening & HPV",
    subtitle: "Prevention & Early Detection",
    tag: "Screening & Prevention",
    summary: "Regular cervical screening helps detect early changes long before they become serious. It is one of the most effective preventive tools in women's health.",
    body: `Regular cervical screening (smear test or Pap test) helps detect early changes in cervical cells that, if left unaddressed, could develop into cancer over time. It is closely linked to human papillomavirus (HPV), which is involved in the vast majority of cervical cancers.

Screening intervals and methods vary by country, but the principle is the same: detecting changes early, when they are most straightforward to manage, significantly reduces risk. HPV vaccination, where offered, provides important additional protection.

It is worth keeping up to date with screening invitations, even if it has been some time since the last one. A clinician can advise on the current recommended schedule based on previous results and age.`,
    questions: [
      "When is my next cervical screening due?",
      "What does my result mean for me?",
      "How does HPV factor into my screening?",
    ],
  },
  {
    id: "breast-awareness",
    title: "Breast Awareness",
    subtitle: "Knowing Your Normal",
    tag: "Screening & Prevention",
    summary: "Knowing what is normal for your own body helps you notice changes early. Breast tissue can change across the cycle and life stages, so familiarity matters most.",
    body: `Breast awareness means knowing what is normal for your own body so that changes stand out. Breast tissue changes naturally across the menstrual cycle, and many people notice tenderness or lumpiness in the days before a period, which is normal. It is familiarity with your individual normal that matters, rather than a rigid self-examination routine.

Changes worth reporting include a new lump or thickening, changes in size or shape, skin changes such as dimpling or puckering, nipple changes, or an unusual discharge. Most breast changes are benign, but timely assessment brings either reassurance or early action.

Formal screening programmes vary by country and age. A clinician can advise on when to begin and what the process involves.`,
    questions: [
      "What changes should prompt me to seek advice?",
      "When should I begin formal screening?",
      "How do normal cycle changes differ from concerning ones?",
    ],
  },
  {
    id: "gynaecological-cancers",
    title: "Gynaecological Cancers",
    subtitle: "Awareness & Early Signs",
    tag: "Screening & Prevention",
    summary: "Awareness of early signs of gynaecological cancers supports timely care. Most symptoms are also caused by benign conditions, so awareness encourages calm and prompt action.",
    body: `Gynaecological cancers affect the reproductive organs, including the cervix, uterus, ovaries, vulva, and vagina. Awareness of early signs supports timely care, and importantly, most symptoms that could raise concern are caused by benign conditions rather than cancer.

Symptoms that are worth reporting include unusual bleeding (between periods, after sex, or after menopause), persistent pelvic pain or bloating, changes in urinary or bowel habits that are new and persist, or changes to the vulva. None of these symptoms alone confirms cancer, but they deserve assessment.

The goal of awareness is calm, prompt action, not alarm. Many gynaecological cancers are highly treatable when caught early, and the most effective tool is not ignoring something that persists.`,
    questions: [
      "Which symptoms should always be checked?",
      "What screening applies to my age and history?",
      "How do I balance awareness without unnecessary worry?",
    ],
  },

  // ── EMERGING TOPICS ───────────────────────────────────────────────────────
  {
    id: "long-covid-cycle",
    title: "Long COVID & Your Cycle",
    subtitle: "Emerging Research",
    tag: "Emerging Topics",
    summary: "Research increasingly links Long COVID with changes in menstrual cycles and symptoms. This is an evolving area where awareness helps validate experiences that might otherwise be dismissed.",
    body: `Research increasingly links Long COVID and related post-viral conditions with changes in menstrual cycles and symptoms. Reports include heavier periods, more painful periods, cycle irregularity, and worsened premenstrual symptoms following COVID-19 infection, both in the acute phase and as part of ongoing Long COVID.

The mechanisms are still being studied. Immune activation, hormonal disruption, and the effects of systemic inflammation on the hypothalamic-pituitary-ovarian axis are among the hypotheses being explored.

This is an evolving area, and clinical guidance is still developing. Awareness helps validate symptoms that might otherwise be dismissed, and keeping a record of cycle changes alongside other symptoms provides useful information for healthcare conversations.`,
    questions: [
      "Could my cycle changes relate to a recent illness?",
      "What is currently understood about this link?",
      "How should new or unusual symptoms be assessed?",
    ],
  },
  {
    id: "pcos-subtypes",
    title: "PCOS: Not One Condition",
    subtitle: "Subtypes & Individuality",
    tag: "Emerging Topics",
    summary: "PCOS can present in different ways. Recognising these differences helps tailor support to the individual and explains why no single approach fits everyone.",
    body: `PCOS can present in quite different ways between individuals, and there is increasing recognition in research that it is better understood as a spectrum than a single condition. Some people experience more metabolic features, such as insulin resistance and weight changes; others have a more hormonal or cycle-related presentation; others have fewer obvious features but elevated androgens on testing.

Recognising these differences matters because it shapes which investigations are most useful, which lifestyle changes are most relevant, and which medical options are most appropriate. A support plan that works well for one person may not suit another.

Understanding your own pattern, with the help of a clinician who takes an individualised approach, leads to more targeted and effective management.`,
    questions: [
      "Which features of PCOS apply most to me?",
      "How does this shape my support options?",
      "What testing clarifies my particular pattern?",
    ],
  },
  {
    id: "diagnosis-gap",
    title: "The Diagnosis Gap",
    subtitle: "Advocating for Yourself",
    tag: "Emerging Topics",
    summary: "Many women's health conditions take years to diagnose, leaving symptoms unexplained for too long. Knowing this helps you advocate for yourself and seek second opinions when needed.",
    body: `Many women's health conditions take years to diagnose. Endometriosis averages around eight years from symptom onset to diagnosis. PCOS is frequently missed or misattributed. Conditions like adenomyosis and interstitial cystitis are routinely dismissed for years before being identified.

This diagnostic delay is not random. It reflects historical underrepresentation of women in medical research, a tendency to normalise pain and cycle disruption, and systemic gaps in training and referral pathways. It is a documented problem, and knowing about it is itself a form of protection.

Your experience of your own body is valid evidence. If you feel your symptoms have been dismissed, seeking a second opinion or asking for a referral to a specialist is a reasonable and legitimate step.`,
    questions: [
      "I have had these symptoms for a long time — what could explain them?",
      "What conditions are worth ruling out?",
      "If we are unsure, what are the next steps?",
    ],
  },
];
