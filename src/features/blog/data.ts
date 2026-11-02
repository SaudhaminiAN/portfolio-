import { BlogPost } from './types';

export const MEDIUM_PROFILE_URL = 'https://medium.com/@saudhaminiupdated';
export const MEDIUM_RSS_API_URL =
  'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@saudhaminiupdated';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'internal-intelligence-2a52c0370f0e',
    title: 'Why the Future Belongs to Organizations That Can Think!',
    subtitle: 'Internal Intelligence: From AI Adoption to Intelligence Architecture',
    category: 'AI Architecture',
    date: 'Jan 7, 2026',
    readTime: '6 min read',
    mediumUrl: 'https://medium.com/@saudhaminiupdated/internal-intelligence-2a52c0370f0e',
    coverImage: '/assets/images/medium_01_intelligence.jpg',
    summary:
      'Moving beyond superficial AI tool adoption to designing systemic Internal Intelligence Architecture—where proprietary context, human judgment, and autonomous AI workflows form a permanent strategic moat.',
    content: [
      'Early enterprise AI adoption focused almost exclusively on isolated efficiency gains—asking how fast a model can generate text or code, or how many routine tasks can be stripped from existing workflows. However, plugging external models into legacy processes does not make an organization inherently smarter; it merely makes it faster at executing standard operations.',
      'True differentiation in the intelligence era comes from transitioning from AI adoption to Intelligence Architecture: the deliberate structural design of how human expertise, institutional context, operational workflows, and AI systems interconnect around a core purpose.',
      'As foundational language models become universally accessible commodities, rented models alone cannot serve as a competitive moat. What competitors cannot replicate is an organization’s internal intelligence layer—its accumulated decision-making patterns, domain telemetry, retrieval pipelines, and continuous feedback loops.',
      'Organizations that "think" treat AI not as an external utility, but as an integrated cognitive architecture where human judgment and machine reasoning continuously amplify one another.',
    ],
    tags: ['AI', 'Deep Learning', 'Internal Intelligence', 'Data Science', 'Machine Learning'],
  },
  {
    id: 'understanding-overfitting-and-underfitting-b80d678fb258',
    title: 'Understanding Overfitting and Underfitting in Machine Learning',
    subtitle: 'Breaking down bias-variance trade-offs, generalization traps, and regularization strategies for resilient ML models.',
    category: 'Machine Learning',
    date: 'Jun 8, 2024',
    readTime: '5 min read',
    mediumUrl:
      'https://medium.com/@saudhaminiupdated/understanding-overfitting-and-underfitting-in-machine-learning-b80d678fb258',
    coverImage: '/assets/images/medium_02_overfitting.png',
    summary:
      'A practical guide to diagnosing and resolving the two fundamental pitfalls of machine learning model generalization—overfitting noise versus underfitting structural complexity.',
    content: [
      'When building machine learning systems, two major obstacles consistently threaten real-world model reliability: overfitting and underfitting. Understanding how to diagnose and balance these forces is essential for deploying predictive models that generalize to unseen production data.',
      'Overfitting occurs when a model gets too comfortable with its training dataset—memorizing not just the underlying signal, but also random noise and statistical outliers. Like a student who memorizes practice test answers verbatim, an overfitted model achieves near-perfect training metrics but fails dramatically on new inputs.',
      'Underfitting happens on the opposite end of the spectrum when a model is too simplistic to capture the underlying relationships in the data. An underfitted model performs poorly on both training and validation splits because it lacks sufficient representational capacity.',
      'Achieving optimal generalization requires disciplined cross-validation, feature engineering, L1/L2 regularization, dropout layers, and early stopping heuristics that keep the model anchored to true domain patterns.',
    ],
    tags: ['Data Science', 'Overfitting', 'Data Analytics', 'Machine Learning', 'Deep Learning'],
  },
  {
    id: 'discovering-transfer-learning-3ca86a01216c',
    title: 'Discovering Transfer Learning: A Beginner’s Adventure',
    subtitle: 'How pre-trained foundation representations accelerate deep learning across computer vision and NLP domains.',
    category: 'Deep Learning',
    date: 'Mar 10, 2024',
    readTime: '5 min read',
    mediumUrl:
      'https://medium.com/@saudhaminiupdated/discovering-transfer-learning-a-beginners-adventure-3ca86a01216c',
    coverImage: '/assets/images/medium_03_transfer.jpg',
    summary:
      'Exploring how transfer learning leverages pre-trained neural network weights to deliver higher accuracy with significantly smaller datasets and reduced compute overhead.',
    content: [
      'Imagine if learning a new complex skill didn’t require starting from zero, but instead built directly upon structured knowledge already mastered. That is the core principle behind transfer learning in modern artificial intelligence.',
      'In deep learning workflows, transfer learning involves taking a foundation model trained on a massive benchmark corpus and fine-tuning its upper representation layers to solve a specialized target task. Rather than re-learning edges, textures, or syntax from scratch, the model transfers general representations to the new domain.',
      'This approach delivers three major engineering advantages: drastically reduced training compute time, superior generalization on small or domain-specific datasets, and faster iteration cycles from prototype to production.',
      'Careful layer freezing, learning-rate scheduling, and domain alignment ensure that fine-tuned models adapt cleanly to specialized tasks without catastrophic forgetting or overfitting.',
    ],
    tags: ['Deep Learning', 'Transfer Learning', 'Machine Learning', 'Data Analytics', 'Data Science'],
  },
  {
    id: 'mastering-text-classification-naive-bayes-b096980a4030',
    title: 'Beyond the Basics: Mastering Text Classification using Naive Bayes',
    subtitle: 'Unraveling Bayesian probabilistic reasoning and high-dimensional NLP classification with practical implementation.',
    category: 'NLP & Classification',
    date: 'Nov 18, 2023',
    readTime: '6 min read',
    mediumUrl:
      'https://medium.com/@saudhaminiupdated/beyond-the-basics-mastering-text-classification-using-naive-bayes-b096980a4030',
    coverImage: '/assets/images/medium_04_naivebayes.jpg',
    summary:
      'An architectural and mathematical deep-dive into the Naive Bayes classifier, conditional independence, and high-speed natural language document and spam classification.',
    content: [
      'The Naive Bayes algorithm stands as a foundational pillar in machine learning and natural language processing, celebrated for its mathematical elegance, speed, and effectiveness across high-dimensional text datasets.',
      'Rooted in Bayes’ theorem, the classifier updates the posterior probability of a target class given observed token features: P(Y|X) = P(X|Y)P(Y) / P(X). By assuming conditional independence among features given the class label, the computation scales linearly with vocabulary size.',
      'This efficiency makes Naive Bayes an indispensable baseline and real-time workhorse for document categorization, sentiment analysis, automated ticket routing, and spam filtering pipelines.',
      'Combined with TF-IDF vectorization and Laplace smoothing to handle unseen vocabulary tokens, Naive Bayes delivers remarkably competitive precision and recall at a fraction of the latency of heavier architectures.',
    ],
    tags: ['Naive Bayes', 'NLP', 'Text Classification', 'Machine Learning', 'Data Science'],
  },
];
