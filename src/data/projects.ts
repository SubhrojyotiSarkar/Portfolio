import type { Project } from '../types'

/**
 * Project configuration — the single place to manage projects.
 *
 * LINKS
 *   `links.github` / `links.demo`: add a real URL and the matching button
 *   appears on the card and detail page. Leave `undefined` to hide it.
 *
 * CONTENT
 *   Everything below is written from the resume. Sections that the resume
 *   does not cover are left as empty arrays marked `TODO`. Empty sections
 *   are hidden on the detail page, so filling one in is all it takes to
 *   make it appear.
 *
 * ORDER
 *   Projects render in array order. The entry with `flagship: true` gets
 *   the large showcase treatment on the home page.
 */
export const projects: Project[] = [
  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'hybrid-search-rag',
    title: 'Hybrid-Search RAG with Citation Verification',
    category: 'AI Engineering · Flagship',
    tagline: 'Document Q&A that cites every claim and refuses to guess.',
    summary:
      'A PDF question-answering system that combines BM25 sparse retrieval and FAISS dense retrieval through Reciprocal Rank Fusion, reranks with a cross-encoder, and cites every claim to its exact document, page and passage. An independent LLM verifier checks each citation, unsupported claims are removed, and the system abstains when the documents do not contain the answer.',
    tech: ['Python', 'FastAPI', 'FAISS', 'BM25', 'Sentence Transformers', 'Gemini API', 'Docker'],
    highlights: [
      'Hybrid BM25 + FAISS retrieval fused with Reciprocal Rank Fusion, then cross-encoder reranking',
      'Exact document, page and passage citations for every claim',
      'Independent LLM citation verifier with evidence quotes validated in code',
      'Abstains instead of answering when the documents lack the answer',
    ],
    metrics: [
      { value: '268', label: 'automated tests' },
      { value: 'BM25 + FAISS', label: 'hybrid retrieval' },
      { value: 'Human-labelled', label: 'evaluation set' },
    ],
    links: {
      github: 'https://github.com/SubhrojyotiSarkar/hybrid-search-rag-citation-verification',
      demo: undefined, // TODO: add live demo URL if deployed
    },
    flagship: true,
    detail: {
      overview: [
        'A question-answering system over PDF documents, built around one constraint: every statement in an answer must be traceable to a specific passage in the source material.',
        'Retrieval combines lexical (BM25) and semantic (FAISS) search, fuses both result lists with Reciprocal Rank Fusion and reranks the candidates with a cross-encoder. The generated answer cites document, page and passage for each claim, and a separate verification step checks those citations before anything is returned.',
      ],
      problem: [
        'Language models answering questions over documents can produce fluent statements that the documents do not support, and a citation alone does not prove the cited passage says what the answer claims.',
        'The goal was a system whose answers can be checked: claims tied to exact passages, citations verified independently, and an explicit abstention when the documents do not contain the answer rather than a plausible guess.',
      ],
      features: [
        'Hybrid retrieval: BM25 sparse retrieval and FAISS dense retrieval over Sentence Transformer embeddings',
        'Reciprocal Rank Fusion to merge the two ranked lists',
        'Cross-encoder reranking of fused candidates',
        'Answer generation with the Gemini API, citing exact document, page and passage',
        'Independent LLM citation verifier; its evidence quotes are validated programmatically',
        'Unsupported claims are removed from the final answer',
        'Abstention when the documents lack a relevant answer',
        'Role-based authentication',
        'Containerised deployment with Docker',
      ],
      architecture: {
        summary: [
          'The pipeline runs two retrievers in parallel. BM25 rewards exact term overlap, which matters for names, codes and terminology; dense retrieval with FAISS captures paraphrases and semantic similarity. Neither is reliable alone, so their rankings are merged with Reciprocal Rank Fusion, which combines lists by rank position rather than by raw scores that are not comparable across retrievers.',
          'A cross-encoder then rescores the fused candidates by reading the query and each passage together, which is slower than embedding similarity but considerably more precise. Only the reranked passages reach the language model.',
          'The generated answer is not returned directly. A separate LLM pass checks each cited claim against its passage, and the evidence quotes it produces are validated in code against the source text. Claims that fail are dropped; if nothing survives, the system abstains.',
        ],
        diagrams: [
          {
            title: 'Retrieval & verification pipeline',
            caption: 'From user query to a verified, cited answer.',
            stages: [
              [{ id: 'query', label: 'User Query' }],
              {
                label: 'parallel',
                nodes: [
                  { id: 'bm25', label: 'BM25 Retrieval', detail: 'Sparse · lexical match' },
                  { id: 'faiss', label: 'FAISS Retrieval', detail: 'Dense · semantic match' },
                ],
              },
              [{ id: 'rrf', label: 'Reciprocal Rank Fusion', detail: 'Merge ranked lists' }],
              [{ id: 'rerank', label: 'Cross-Encoder Reranking', detail: 'Query–passage scoring' }],
              [{ id: 'llm', label: 'LLM Answer Generation', detail: 'Gemini · cited claims' }],
              [{ id: 'verify', label: 'Citation Verification', detail: 'Independent LLM + code checks' }],
              [{ id: 'answer', label: 'Final Answer', detail: 'Verified claims or abstention' }],
            ],
          },
        ],
      },
      implementation: [
        {
          title: 'Retrieval',
          body: 'Documents are chunked and indexed twice: in a BM25 index for sparse retrieval and in a FAISS index of Sentence Transformer embeddings for dense retrieval. Chunking is table-aware, and the BM25 IDF computation was corrected after evaluation exposed retrieval problems.',
        },
        {
          title: 'Fusion and reranking',
          body: 'Reciprocal Rank Fusion merges the BM25 and FAISS rankings into a single candidate list, which a cross-encoder reranks before generation.',
        },
        {
          title: 'Grounded generation',
          body: 'The Gemini API generates the answer from the reranked passages, attaching an exact document, page and passage citation to each claim.',
        },
        {
          title: 'Citation verification',
          body: 'An independent LLM verifier reviews every cited claim and returns evidence quotes. Those quotes are validated programmatically against the source passages, so the verifier itself is not taken on trust. Unsupported claims are removed, and the system abstains when the documents lack the answer.',
        },
        {
          title: 'Serving and deployment',
          body: 'The system is exposed through FastAPI with role-based login and ships as a Docker deployment.',
        },
      ],
      challenges: [
        {
          title: 'Trusting the verifier',
          body: 'An LLM checking another LLM can make the same kind of mistake. Validating the verifier’s evidence quotes in code adds a deterministic check that the quoted evidence actually exists in the cited source.',
        },
        {
          title: 'Knowing when not to answer',
          body: 'A system optimised to always answer will eventually invent one. Removing unsupported claims and abstaining when nothing survives verification trades coverage for reliability.',
        },
        {
          title: 'Retrieval quality on real documents',
          body: 'The human-labelled evaluation framework surfaced retrieval failures that led to two concrete fixes: table-aware chunking and a corrected BM25 IDF.',
        },
      ],
      testing: [
        'A human-labelled evaluation framework used to measure retrieval and guide fixes such as table-aware chunking and the corrected BM25 IDF.',
        '268 automated tests.',
        // TODO: add evaluation metrics (e.g. retrieval recall, citation precision) once you want to publish them.
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'ai-resume-screener',
    title: 'AI Resume Screener and Job Matcher',
    category: 'Full-Stack · Machine Learning',
    tagline: 'Ranked, explainable candidate shortlists for recruiters.',
    summary:
      'A full-stack recruitment application where recruiters post jobs, upload resumes and view candidates ranked by match score. A FastAPI matching service combines sentence embeddings, TF-IDF and skill matching, and every shortlist explains which skills each candidate matched and which are missing.',
    tech: ['React', 'Node.js', 'Express.js', 'FastAPI', 'Python', 'scikit-learn', 'PostgreSQL', 'MongoDB', 'Docker'],
    highlights: [
      'React + Node.js/Express application for job posting, resume upload and ranking',
      'FastAPI matching service: sentence embeddings, TF-IDF and skill matching',
      'Explainable shortlists showing matched and missing skills per candidate',
      'JWT authentication, Docker Compose and 150+ automated tests',
    ],
    metrics: [
      { value: '150+', label: 'automated tests' },
      { value: '3', label: 'matching signals' },
    ],
    links: {
      github: 'https://github.com/SubhrojyotiSarkar/ai-resume-screener',
      demo: undefined, // TODO: add live demo URL if deployed
    },
    flagship: false,
    detail: {
      overview: [
        'A recruitment platform that automates resume screening. Recruiters post jobs and upload resumes; the system ranks candidates by match score and produces shortlists that explain the ranking.',
        'The product is split into a React frontend, a Node.js/Express application server and a dedicated FastAPI service for matching, with PostgreSQL and MongoDB for storage and Docker Compose tying the services together.',
      ],
      problem: [
        'Keyword-based screening misses candidates who describe the right experience in different words, and a bare score gives a recruiter no reason to trust a ranking.',
        'The aim was to rank candidates using semantic similarity as well as exact terms, and to make each result explainable through the specific skills a candidate matched or lacked.',
      ],
      features: [
        'Recruiters can post jobs and upload resumes',
        'Candidates ranked by match score for each job',
        'Explainable shortlists listing matched and missing skills per candidate',
        'Semantic matching that surfaces relevant candidates keyword search scored low',
        'JWT authentication',
        'Containerised with Docker Compose',
      ],
      architecture: {
        summary: [
          'The React client is backed by a Node.js/Express application server and a separate Python service built with FastAPI that handles matching, keeping the ML workload apart from the web application. PostgreSQL and MongoDB provide persistence, and Docker Compose runs the whole stack together.',
          'The matching service scores each resume against a job using three complementary signals: sentence embeddings for semantic similarity, TF-IDF for term-level relevance, and skill matching to identify which required skills are present or missing. The skill comparison is what makes each shortlist explainable.',
        ],
        diagrams: [
          {
            title: 'Application architecture',
            caption: 'Services orchestrated with Docker Compose.',
            stages: [
              [{ id: 'client', label: 'React Client', detail: 'Recruiter interface' }],
              {
                label: 'services',
                nodes: [
                  { id: 'api', label: 'Node.js / Express', detail: 'Jobs, uploads · JWT auth' },
                  { id: 'matcher', label: 'FastAPI Matching Service', detail: 'Python · scikit-learn' },
                ],
              },
              {
                label: 'data stores',
                nodes: [
                  { id: 'pg', label: 'PostgreSQL' },
                  { id: 'mongo', label: 'MongoDB' },
                ],
              },
            ],
          },
          {
            title: 'Resume-matching pipeline',
            caption: 'Three signals combine into a ranked, explainable shortlist.',
            stages: [
              [{ id: 'input', label: 'Job + Resumes' }],
              {
                label: 'matching signals',
                nodes: [
                  { id: 'embed', label: 'Sentence Embeddings', detail: 'Semantic similarity' },
                  { id: 'tfidf', label: 'TF-IDF', detail: 'Term relevance' },
                  { id: 'skills', label: 'Skill Matching', detail: 'Matched / missing' },
                ],
              },
              [{ id: 'score', label: 'Match Score', detail: 'Per candidate' }],
              [{ id: 'shortlist', label: 'Ranked Shortlist', detail: 'With skill explanations' }],
            ],
          },
        ],
      },
      implementation: [
        {
          title: 'Web application',
          body: 'A React frontend and a Node.js/Express backend handle job posting, resume uploads and the ranked candidate views, secured with JWT authentication.',
        },
        {
          title: 'Matching service',
          body: 'A Python FastAPI service computes match scores using sentence embeddings, TF-IDF (scikit-learn) and skill matching, and returns the matched and missing skills that explain each score.',
        },
        {
          title: 'Data and infrastructure',
          body: 'PostgreSQL and MongoDB store application data, and Docker Compose runs the frontend, backend, matching service and databases as one stack.',
        },
      ],
      challenges: [
        {
          title: 'Beyond keyword matching',
          body: 'Exact-term matching scored some relevant candidates low. Adding sentence-embedding similarity alongside TF-IDF surfaces candidates who describe relevant experience in different words.',
        },
        {
          title: 'Making rankings explainable',
          body: 'A single score is hard to act on. Reporting matched and missing skills per candidate gives recruiters a concrete reason behind every position in the shortlist.',
        },
      ],
      testing: ['150+ automated tests across the application.'],
    },
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'skimlit',
    title: 'SkimLit — Research Paper Classifier',
    category: 'NLP · Deep Learning',
    tagline: 'Structure for dense medical abstracts.',
    summary:
      'An NLP tool that classifies the parts of a medical research abstract as Objective, Methods, Results or Conclusion, making abstracts faster to read and interpret. Built with TensorFlow and a BERT-based Transformer architecture.',
    tech: ['TensorFlow', 'BERT', 'Transformers'],
    highlights: [
      'Classifies abstract text into Objective, Methods, Results and Conclusion',
      'BERT-based Transformer architecture implemented in TensorFlow',
      'Aimed at improving readability of medical research abstracts',
    ],
    metrics: [{ value: '4', label: 'abstract section classes' }],
    links: {
      github: undefined, // TODO: add repository URL
      demo: undefined, // TODO: add live demo URL if deployed
    },
    flagship: false,
    detail: {
      overview: [
        'SkimLit takes a medical research abstract and labels its parts by role (Objective, Methods, Results or Conclusion) so a reader can skim to the part they need.',
        'The classifier is built with TensorFlow on a BERT-based Transformer architecture.',
      ],
      problem: [
        'Medical abstracts are often published as a single dense block of text. Readers scanning many papers need to find the methods or the results quickly, and unstructured abstracts make that slow.',
        'Framed as a text-classification task, each part of the abstract is assigned one of four section labels, producing a structured version of the abstract.',
      ],
      features: [
        'Four-way classification: Objective, Methods, Results, Conclusion',
        'Transformer-based (BERT) text representation',
        'Implemented in TensorFlow',
      ],
      architecture: {
        summary: [
          'Abstract text is encoded with a BERT-based Transformer, whose contextual representations capture the meaning of each word in relation to the surrounding text. A classification layer on top predicts which of the four section labels the text belongs to.',
          // TODO: describe the exact model variant, input handling and any additional features used.
        ],
        diagrams: [
          {
            title: 'Classification pipeline',
            stages: [
              [{ id: 'abstract', label: 'Medical Abstract' }],
              [{ id: 'encoder', label: 'BERT-based Encoder', detail: 'TensorFlow' }],
              [{ id: 'classifier', label: 'Classification Layer' }],
              {
                label: 'predicted label · one of',
                nodes: [
                  { id: 'objective', label: 'Objective' },
                  { id: 'methods', label: 'Methods' },
                  { id: 'results', label: 'Results' },
                  { id: 'conclusion', label: 'Conclusion' },
                ],
              },
            ],
          },
        ],
      },
      // TODO: add implementation details (dataset, preprocessing, training setup).
      implementation: [],
      // TODO: add engineering challenges you faced.
      challenges: [],
      // TODO: add evaluation results (e.g. accuracy / F1 on a held-out set).
      testing: [],
    },
  },
]

export const getProjectBySlug = (slug: string | undefined): Project | undefined =>
  projects.find((project) => project.slug === slug)
