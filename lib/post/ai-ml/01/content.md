## AI/ML Basics #1 : කෘතිම බුද්ධියේ ඉතිහාසය සහ විකාශනය 🤖🌐

අද වන විට ලෝකයම උඩුයටිකුරු කරමින් පවතින ප්‍රධානතම මාතෘකාව තමයි **Artificial Intelligence (AI)** හෙවත් **කෘතිම බුද්ධිය** කියන්නේ. සරලවම කිව්වොත්, AI කියන්නේ මිනිස් මොළයකින් සිදු කරන තර්ක කිරීම, ගැටලු විසඳීම, ඉගෙන ගැනීම සහ රටාවන් හඳුනාගැනීම වැනි බුද්ධිමය කාර්යයන් පරිගණක වැඩසටහන් හෝ යන්ත්‍ර හරහා සිදු කිරීමට ඉඩ සලසා දෙන තාක්ෂණයයි.

මෙය හුදෙක් රොබෝවරුන්ට පමණක් සීමා වූවක් නොවන අතර, ඔබ අද පාවිච්චි කරන Facebook, YouTube වල සිට ChatGPT සහ ස්වයංක්‍රීයව ධාවනය වන මෝටර් රථ දක්වා AI විහිදී තිබෙනවා. ඔබ YouTube හි video නරඹන විට ඊළඟට නිර්දේශ කරන video ද, Google Maps හරහා ගමන් මාර්ගය ලබා දෙන්නේ ද, Instagram හි ඔබේ රුචිකත්වයට ගැළපෙන දේ feed ලෙස දකින්නේ ද — මේ සියල්ල AI හි කාර්යයන්.

---

## AI හි ආරම්භය සහ මුල් අවධිය ⏳

කෘතිම බුද්ධිය පිළිබඳ සංකල්පය **1950 දශකයේ** තරම් ඈත අතීතයකට දිව යන්නක්. මෙහි සැබෑ පියා ලෙස සැලකෙන්නේ **ඇලන් ටියුරින් (Alan Turing)** නැමැති ගණිතඥයායි. ඔහු 1950 දී _"Can machines think?"_ (යන්ත්‍ර වලට සිතිය හැකිද?) යනුවෙන් ප්‍රශ්න කරමින් **'Turing Test'** එක හඳුන්වා දුන්නා.

### Turing Test යනු කුමක්ද?

Turing Test හි සරල අදහස නම් — යන්ත්‍රයක් මිනිසෙකු සමඟ text හරහා සංවාදයකදී, ඒ මිනිසාට ඒ ඉදිරිපිට ඇත්තේ යන්ත්‍රයක්ද නැතිනම් මිනිසෙක්ද කියා හඳුනාගත නොහැකි නම්, ඒ යන්ත්‍රය "සිතිය හැකි" ලෙස සලකන්නට පුළුවන් බවයි. 2014 දී **Eugene Goostman** නැමති chatbot එකක් ඉතිහාසයේ පළමු වතාවට Turing Test pass කළා යැයි ප්‍රකාශ කෙරුණා.

### Dartmouth Conference — AI හි නිල ජනන දිනය

**1956 දී** පවත්වන ලද **Dartmouth Conference** එකේදී **ජෝන් මැකාති (John McCarthy)** ඇතුළු ප්‍රමුඛ ශාස්ත්‍රඥයන් පිරිසක් විසින් _"Artificial Intelligence"_ යන නාමය නිල වශයෙන් ලෝකයට හඳුන්වා දුන්නා. ඒ නිසා 1956 AI හි නිල ඉපදීමේ වසර ලෙස සලකනු ලැබෙනවා.

ඒ යුගයේ AI researchers ලා ඉතා ශුභාශාවාදී ලෙස සිතුවා — **10 සිට 20 වසරකින්** AI මිනිස් මොළයට සමාන වේ යැයි. කෙසේ වෙතත්, ඒ සිහිනය ඉටු කරගැනීම ඊට කිහිපගුනයක් කාලයක් ගත වූ නිසා AI Winter ලෙස හඳුන්වන කාල සීමා ද ඇති විය.

---

## Machine Learning — AI හි නව ක්‍රාන්තිය 🧠

**1980 දශකයේදී Machine Learning** සංකල්පය කරළියට පැමිණීමත් සමඟ AI නව මාවතකට අවතීර්ණ වුණා. Traditional AI හි ගැටළුව වූයේ programmer ලාට සෑම නිර්ණය ක්‍රියාවලියක්ම සවිස්තරාත්මකව code කරන්නට සිදු වූ බවයි.

### Traditional Programming vs Machine Learning

| ලක්ෂණය | Traditional Programming | Machine Learning |
|--------|------------------------|-----------------|
| ක්‍රමය | Input + Rules → Output | Input + Output → Rules |
| නිදසුන | if/else logic | Data වලින් ඉගෙනීම |
| නම්‍යශීලිතාව | අඩු | ඉහළ |
| Data ප්‍රමාණය | කුඩා | විශාල |

Machine Learning හිදී සිදු වූයේ **Data ලබා දෙන්නා, Algorithm ලා තනිවම Pattern හඳුනා ගන්නා** — ප්‍රතිඵලය ලෙස ඉතා නිවැරදි predictions සහ decisions ගන්නා ක්‍රමවේදය බිහිවීමයි.

### Machine Learning හි ප්‍රධාන ක්‍රම

**1. Supervised Learning (ගුරු-ශිෂ්‍ය ඉගෙනීම)**

ලේබල් කළ data භාවිතා කර ඉගෙන ගනී. නිදසුන: spam email හඳුනා ගැනීම — spam / not spam ලෙස ලේබල් කළ emails data ලෙස ලබා දෙනවා.

**2. Unsupervised Learning (ස්වාධීන ඉගෙනීම)**

ලේබල් නොකළ data වලින් patterns හඳුනා ගනී. නිදසුන: customers segmentation — ගනුදෙනුකාරයන් ස්වභාවිකව groups ලෙස categorize කිරීම.

**3. Reinforcement Learning (ත්‍යාග ඉගෙනීම)**

Trial & error හරහා reward ලබා ගැනීමෙන් ඉගෙන ගනී. නිදසුන: AlphaGo — ලෝකයේ හොඳම Go chess player ලා පරාජය කළ AI.

---

## Deep Learning සහ Neural Networks — Human Brain ප්‍රේරණය 🌐

**2010 වසරෙන් පසු** ආ **Deep Learning** සහ **Neural Networks** නිසා AI හි ක්ෂිතිජය සම්පූර්ණයෙන්ම විශාල විය. Neural Network කියන්නේ ඇත්ත මිනිස් මොළයේ ඇති neuron ජාලය (nerve cell ජාලය) inspired කරගෙන සෑදූ computational model එකකි.

### Neural Network ක්‍රියාකාරිත්වය

```
Input Layer → Hidden Layers → Output Layer
   [data]    →   [pattern]  →  [prediction]
```

- **Input Layer** — Raw data (රූප, text, ශබ්ද) ලබා ගනී
- **Hidden Layers** — Complex patterns ඉගෙන ගනී
- **Output Layer** — Final prediction / decision දෙයි

Deep Learning network ලා Image Recognition හි **95%+ accuracy** ලබා ගැනීමට, human voice transcription සහ language translation කිරීමට සමත් විය. Google Brain project, Facebook AI Research, Microsoft Research — ලොව ප්‍රමුඛ tech giants Deep Learning research ලෙස ආයෝජනය කළා.

---

## AI හි ප්‍රධාන Milestones — Timeline 📅

### 1950 — Alan Turing & Turing Test
_"Computing Machinery and Intelligence"_ paper publish.

### 1956 — Dartmouth Conference
"Artificial Intelligence" නම ලෝකයට හඳුන්වා දීම.

### 1966 — ELIZA Chatbot
MIT හිදී Joseph Weizenbaum නිර්මාණය කළ ලෝකයේ ප්‍රථම chatbot.

### 1997 — Deep Blue Chess Champion
IBM හි Deep Blue, world chess champion Garry Kasparov ව පරාජය කළා.

### 2011 — IBM Watson on Jeopardy
Watson AI, Jeopardy! quiz show ජය ගත්තා.

### 2012 — AlexNet & Deep Learning Revolution
ImageNet competition හිදී Deep Learning model AlexNet ලොවම හිරිවැටුවා.

### 2016 — AlphaGo vs Lee Sedol
DeepMind හි AlphaGo, Go game champion Lee Sedol ව 4-1 ලෙස පරාජය කළා.

### 2017 — Transformer Architecture
Google Brain "Attention Is All You Need" paper — ChatGPT ඇතුළු modern AI සඳහා foundation.

### 2022 — ChatGPT Launch
OpenAI හි ChatGPT launch වී, දින 5 කින් users 1 million. AI mass adoption ආරම්භය.

### 2024–2025 — Agentic AI & Multimodal AI
AI agents, video/image/code generation — AI everyday life හි කොටසක් බවට.

---

## AI vs ML vs Deep Learning — වෙනස කුමක්ද? 🤔

මෙම terms 3 ක් ඉතා සමීපව සම්බන්ධ නමුත් ඒවා ඇත්ත වශයෙන්ම hierarchical ලෙස පවතී:

```
Artificial Intelligence (AI)
  └── Machine Learning (ML)
        └── Deep Learning (DL)
```

- **AI** = පුළුල්ම umbrella term — machines intelligent behavior show කිරීම
- **ML** = AI හි subset — data වලින් ඉගෙන ගන්නා algorithms
- **Deep Learning** = ML හි subset — neural networks using complex patterns

---

## AI හි ප්‍රධාන ශාඛා 🌿

### 1. Natural Language Processing (NLP)
භාෂාව හඳුනා ගැනීම සහ generate කිරීම. නිදසුන: ChatGPT, Google Translate, Siri.

### 2. Computer Vision
රූප සහ video හඳුනා ගැනීම. නිදසුන: Face ID, medical image analysis, self-driving cars.

### 3. Robotics
Physical world සමඟ interact කරන AI robots. නිදසුන: Boston Dynamics robots, Amazon warehouse robots.

### 4. Expert Systems
Domain-specific knowledge base. නිදසුන: Medical diagnosis AI, legal advisory systems.

### 5. Generative AI
New content create කිරීම. නිදසුන: DALL·E (images), Suno (music), Runway (video).

---

## AI ශ්‍රේණිගත කිරීම — Narrow vs General vs Super AI

### Narrow AI (Weak AI) — **අද ඇත්ත**
නිශ්චිත කාර්යයක් සඳහා පමණක් design කළ AI. ChatGPT, image recognition, spam filters — ඒවා සියල්ල Narrow AI.

### General AI (AGI) — **අනාගත ඉලක්කය**
ඕනෑම බුද්ධිමය කාර්යයක් මිනිසෙකු මෙන් කළ හැකි AI. OpenAI, Google DeepMind, Anthropic — ඒ ඉලක්කය සොයා කඩිනමින් ඉදිරියට යයි.

### Super AI (ASI) — **දූරස්ථ අනාගතය**
සෑම ක්ෂේත්‍රයකදීම සෑම මිනිසෙකුටම වඩා intelligent AI. ඒ දවස ළඟ ද දුර ද — ශාස්ත්‍රඥයන් අතර debate ය.

---

## AI Ethics — 윤리ය සහ අපේ වගකීම 💡

AI ශීඝ්‍රයෙන් දියුණු වීමත් සමඟ ගැටළු කිහිපයක් ද මතු වෙනවා:

- **Bias** — AI training data ලෙස historical bias ද ඇතුළත් නම්, AI ද biased outputs දෙයි
- **Privacy** — ඔබේ data AI training සඳහා භාවිතා වේද? Who owns it?
- **Job Displacement** — Automation නිසා රැකියා ක්ෂේත්‍ර කෙරෙහි බලපෑම
- **Deepfakes** — Fake video/audio නිර්මාණය — political/social threats
- **Autonomous Weapons** — AI-powered weapons — ethical dilemmas

ජාත්‍යන්තරව EU AI Act, UNESCO AI Ethics framework, ඇතුළු ප්‍රතිපත්ති frameworks ස්ථාපිත වෙමින් ඇත.

---

## ශ්‍රී ලාංකිකයන්ට AI ගේ ඉදිරිය 🇱🇰

ශ්‍රී ලංකාව ද AI revolution ගෙන් ඉවත් නැහැ. Finance, healthcare, agriculture, education ක්ෂේත්‍රවල AI adoption ශීඝ්‍රයෙන් ඉහළ යයි.

- **Upwork, Fiverr** — AI-related freelance jobs ඉහළ demand
- **Local startups** — AI-powered solutions develop කිරීම
- **University programs** — AI/ML related degrees, short courses ලැබෙනවා
- **Government initiatives** — Digital Economy Policy සමඟ AI adoption

AI literacy — ඒ කියන්නේ AI use කළ හැකි වීමත්, AI ක්‍රියා කරන ආකාරය ඉගෙන ගැනීමත් — 21st century හි ඉතා අත්‍යවශ්‍ය skill set.

---

## AI Tools ඔබ අද භාවිතා කළ හැකිය 🛠️

ආරම්භකයෙකු ලෙස ඔබට explore කළ හැකි tools:

- **ChatGPT / Claude / Gemini** — Language AI assistants
- **Midjourney / DALL·E** — AI image generation  
- **GitHub Copilot** — AI code writing assistant
- **Canva AI** — Design assistance
- **Perplexity** — AI-powered research search
- **Suno** — AI music generation

> **ඉඟිය:** AI tools _භාවිතා කිරීමෙන්_ ඉගෙනීම ආරම්භ කරන්න — theory ට පෙර practice. ChatGPT සමඟ Sinhala ලෙස කතා කළ හැකිය, questions ඇසිය හැකිය.

---

## සාරාංශය 📝

| කාල සීමාව | සිදු වූ දේ |
|-----------|-----------|
| 1950s | Alan Turing, Turing Test |
| 1956 | AI නිල ලෙස named, Dartmouth |
| 1980s | Machine Learning emergence |
| 1990s | Statistical ML, Deep Blue |
| 2010s | Deep Learning explosion |
| 2022+ | Generative AI, ChatGPT era |

AI කියන්නේ **Science Fiction** නොවේ — **Daily Reality**. ඔබ AI ගැන ඉගෙන ගැනීමෙන් ඔබේ ක්ෂේත්‍රය ඕනෑ කුමක් වුවත්, ඒ knowledge අනිවාර්යයෙන්ම ඔබේ career සහ daily life හි ප්‍රයෝජනවත් වේ.

---

## ඊළඟ ලිපිය 👇

**AI/ML Basics #2** ලිපියෙන් ඉගෙන ගන්නා දේ:
- Machine Learning algorithms ගැන ගැඹුරු කිමිදීමක්
- Linear Regression, Decision Trees, K-Means Clustering
- Python code examples සිංහල explanations සමඟ

---

> **ℹ️** මෙවැනි වැදගත් තාක්ෂණික තොරතුරු සරල සිංහලෙන් දැනගන්න අපේ **WhatsApp Channel** එකට අදම එකතු වෙන්න 👇
> [WhatsApp Channel එකට Join වෙන්න →](/link/whatsapp)

`#hasithaSandakelum #ArtificialIntelligence #TechInSinhala #AIHistory #FutureTech #MachineLearning`
