---
id: "01"
category: "ai-ml"
title: "කෘතිම බුද්ධිය — හැඳින්වීම සහ මූලික සංකල්ප"
titleEn: "Artificial Intelligence — Introduction and Basic Concepts"
description: "AI සහ Machine Learning ගැන සිංහලෙන් මූලික හැඳින්වීමක්."
descriptionEn: "A basic introduction to AI and Machine Learning in Sinhala."
date: "2025-07-15"
tags: ["ai", "machine-learning", "introduction"]
readingTime: 8
coverImage: ""
---

## කෘතිම බුද්ධිය (AI) යනු කුමක්ද?

**කෘතිම බුද්ධිය (Artificial Intelligence)** යනු මිනිස් බුද්ධිය අවශ්‍ය කාර්යයන් සිදු කළ හැකි පරිගණක පද්ධති නිර්මාණය කිරීමයි.

## Machine Learning යනු කුමක්ද?

**Machine Learning (ML)** යනු AI හි උප කොටසකි. එහිදී පරිගණක පැහැදිලිව program නොකර දත්ත වලින් ඉගෙන ගනී.

## Deep Learning

**Deep Learning** යනු ML හි තවත් උප කොටසකි. එය මිනිස් මොළයේ neural networks වලින් ආභාෂය ලබා ඇත.

## AI වර්ග

1. **Narrow AI** — එක් කාර්යයක් සඳහා පමණක් (ChatGPT, Image generators)
2. **General AI** — මිනිසෙකුට කළ හැකි ඕනෑම කාර්යයක් (තවම සාක්ෂාත් කර නැත)
3. **Super AI** — මිනිස් බුද්ධිය ඉක්මවා යාම (න්‍යායාත්මක)

## Machine Learning වර්ග

### Supervised Learning

Labeled data භාවිතා කර training:

```python
from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)
```

### Unsupervised Learning

Unlabeled data වලින් patterns සොයා ගැනීම:

```python
from sklearn.cluster import KMeans
kmeans = KMeans(n_clusters=3)
kmeans.fit(data)
labels = kmeans.predict(data)
```

### Reinforcement Learning

Trial and error මගින් ඉගෙනීම (ගේම්, robotics).

> **ඉඟිය:** Machine Learning ව්‍යාපෘතියක් ආරම්භ කිරීමට හොඳම තැන Kaggle datasets ය.

## සාරාංශය

- AI යනු බුද්ධිය අවශ්‍ය කාර්යයන් ස්වයංක්‍රීය කිරීමයි
- ML යනු දත්ත වලින් ඉගෙන ගැනීමේ ක්‍රමයයි
- Supervised, Unsupervised, Reinforcement Learning යනු ප්‍රධාන වර්ග තුනයි