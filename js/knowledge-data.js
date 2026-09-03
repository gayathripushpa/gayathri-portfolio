/* ============================================================
   knowledge-data.js
   Content for the "AI Engineering Knowledge" cards on the AI
   Portfolio page. Kept as a separate data file so each concept's
   text lives in exactly one place instead of being duplicated in
   the HTML — edit the array below to update a card's content.

   This file also renders the cards and wires up their click-to-
   expand behavior directly (rather than depending on main.js),
   because it runs after main.js has already finished wiring up
   the cards that existed at that point in the page.
   ============================================================ */

const AI_KNOWLEDGE = [
  {
    title: 'LLMs',
    what: 'Large language models — neural networks trained on huge amounts of text to predict and generate language.',
    why: 'They are the core engine behind almost every modern AI product, from chatbots to coding assistants.',
    how: 'A transformer-based model predicts the next token repeatedly, guided by patterns learned during training.',
    useCase: 'Drafting status reports, summarizing documents, answering stakeholder questions.',
    understanding: 'Learning / Exploration'
  },
  {
    title: 'Transformers',
    what: 'The neural network architecture behind modern LLMs, built around the attention mechanism.',
    why: 'Attention lets a model weigh which words in a sentence matter most to each other, which is what makes long, coherent text generation possible.',
    how: 'Input text is turned into vectors; self-attention layers let every token "look at" every other token before producing an output.',
    useCase: 'Understanding transformers helps explain why LLMs sometimes lose track of long documents (context window limits).',
    understanding: 'Learning / Exploration'
  },
  {
    title: 'Prompt Engineering',
    what: 'The practice of structuring instructions, context, and examples to get reliable output from a model.',
    why: 'The same model can perform very differently depending on how a task is framed — this is often the fastest lever for quality.',
    how: 'Frameworks like CO-STAR (Context, Objective, Style, Tone, Audience, Response) and chain-of-thought prompting add structure to a request.',
    useCase: 'Getting consistent, structured output when auto-drafting requirement documents or status reports.',
    understanding: 'Learning / Exploration'
  },
  {
    title: 'Embeddings',
    what: 'Numerical vector representations of text that capture meaning, not just keywords.',
    why: 'They let a system compare "closeness in meaning" between pieces of text — the foundation of semantic search.',
    how: 'An embedding model converts text into a vector; texts with similar meaning end up close together in that vector space.',
    useCase: 'Powering search across project documentation, so a query and a relevant document don\u2019t need to share exact words.',
    understanding: 'Learning / Exploration'
  },
  {
    title: 'Vector Databases',
    what: 'Databases purpose-built to store and search embeddings efficiently at scale.',
    why: 'Searching millions of embeddings for the closest matches needs specialized indexing, not a standard SQL query.',
    how: 'Vectors are indexed using approximate nearest-neighbor algorithms so similarity search stays fast as data grows.',
    useCase: 'Storing embedded project documents for a RAG-based knowledge assistant.',
    understanding: 'Learning / Exploration'
  },
  {
    title: 'RAG',
    what: 'Retrieval-Augmented Generation — grounding an LLM\u2019s answer in retrieved external documents rather than memory alone.',
    why: 'It reduces hallucination and lets a model answer using current, organization-specific information it was never trained on.',
    how: 'A query is embedded, matched against a vector database, and the top results are added to the prompt as context before generation.',
    useCase: 'A project knowledge assistant that answers questions using a project\u2019s own documentation, with citations.',
    understanding: 'Learning / Exploration'
  },
  {
    title: 'Knowledge Graphs',
    what: 'Structured networks of entities and their relationships (e.g. "Project X" \u2014 depends on \u2014 "Vendor Y").',
    why: 'They capture relationships that plain text retrieval misses, useful for multi-hop or relationship-heavy questions.',
    how: 'Entities become nodes and relationships become edges, often queried alongside or instead of vector search.',
    useCase: 'Mapping dependencies between projects, vendors, and stakeholders for more structured risk analysis.',
    understanding: 'Learning / Exploration'
  },
  {
    title: 'Tool Calling',
    what: 'A model\u2019s ability to invoke an external function or API rather than only generating text.',
    why: 'It turns an LLM from a text generator into something that can actually take action or fetch live data.',
    how: 'The model is given a schema describing available tools; it outputs a structured call, the application executes it, and returns the result.',
    useCase: 'An agent that pulls live ticket status from a project tracker before drafting a status report.',
    understanding: 'Learning / Exploration'
  },
  {
    title: 'Function Calling',
    what: 'A specific, structured form of tool calling where the model returns arguments matching a defined function signature.',
    why: 'Structured output makes model responses reliably machine-readable, not just human-readable text.',
    how: 'A JSON schema defines expected parameters; the model fills them in based on the conversation.',
    useCase: 'Extracting action items from a meeting transcript into a structured owner/due-date format.',
    understanding: 'Learning / Exploration'
  },
  {
    title: 'AI Agents',
    what: 'Systems where an LLM reasons about a goal, decides on steps, and uses tools to carry them out.',
    why: 'They extend an LLM from answering one question to completing a multi-step task with some autonomy.',
    how: 'An agent loop repeats: observe the current state, decide the next action, execute it (often via a tool), and check the result.',
    useCase: 'A meeting-follow-up agent that extracts, assigns, and files action items without manual re-entry.',
    understanding: 'Learning / Exploration'
  },
  {
    title: 'Agent Loops',
    what: 'The repeated reason \u2192 act \u2192 observe cycle that lets an agent work through a multi-step task.',
    why: 'Understanding the loop is key to debugging why an agent stalls, loops, or goes off track.',
    how: 'Each cycle feeds the result of the last action back into the model\u2019s context before it decides the next step.',
    useCase: 'Diagnosing why an automated workflow agent gets stuck re-attempting the same failed step.',
    understanding: 'Learning / Exploration'
  },
  {
    title: 'Memory',
    what: 'How an agent retains relevant information across steps or sessions, beyond a single prompt.',
    why: 'Without memory, an agent re-explains context every time, which is slow and can lose important details.',
    how: 'Short-term memory lives in the context window; longer-term memory is often stored externally and retrieved as needed (similar to RAG).',
    useCase: 'An assistant that remembers a project\u2019s key decisions across multiple sessions instead of starting from zero each time.',
    understanding: 'Learning / Exploration'
  },
  {
    title: 'Evaluation',
    what: 'Systematic testing of whether an AI system\u2019s outputs are accurate, useful, and safe.',
    why: 'Without evaluation, quality issues only surface after they\u2019ve already reached real users.',
    how: 'Test sets, human review, and automated scoring are used to check outputs against expected behavior before and after deployment.',
    useCase: 'Checking that an AI-drafted status report captures the right facts before it reaches a client.',
    understanding: 'Learning / Exploration'
  },
  {
    title: 'Guardrails',
    what: 'Constraints placed around an AI system to keep its behavior within safe, intended boundaries.',
    why: 'LLMs can produce unexpected or incorrect output; guardrails catch or prevent the worst cases.',
    how: 'Input/output filtering, validation rules, and human-in-the-loop checkpoints for high-stakes actions.',
    useCase: 'Requiring human approval before an agent sends an external client-facing email.',
    understanding: 'Learning / Exploration'
  },
  {
    title: 'AI Governance',
    what: 'The policies, processes, and accountability structures that govern how AI is used within an organization.',
    why: 'Enterprise AI adoption needs clear ownership, risk review, and compliance — not just working technology.',
    how: 'Defining who approves AI use cases, how risk is assessed, and how systems are monitored after launch.',
    useCase: 'Setting an approval process before an AI-drafted report can be sent externally without review.',
    understanding: 'Learning / Exploration'
  },
  {
    title: 'Responsible AI',
    what: 'Designing and deploying AI systems with fairness, transparency, privacy, and accountability in mind.',
    why: 'Project delivery increasingly means delivering AI features responsibly, not just functionally.',
    how: 'Considering data privacy, bias, explainability, and user consent as part of solution design, not an afterthought.',
    useCase: 'Making sure a project knowledge assistant doesn\u2019t surface sensitive data to the wrong audience.',
    understanding: 'Learning / Exploration'
  }
];

function renderKnowledgeCards() {
  const grid = document.getElementById('knowledge-grid');
  if (!grid) return;

  const markup = AI_KNOWLEDGE.map((item) => `
    <div class="knowledge-card" data-knowledge-card>
      <div class="knowledge-card__title">
        <span>${item.title}</span>
        <span class="knowledge-card__plus" aria-hidden="true">+</span>
      </div>
      <div class="knowledge-card__body">
        <div class="knowledge-card__body-inner">
          <div><h5>What it is</h5><p>${item.what}</p></div>
          <div><h5>Why it matters</h5><p>${item.why}</p></div>
          <div><h5>How it works</h5><p>${item.how}</p></div>
          <div><h5>Enterprise use case</h5><p>${item.useCase}</p></div>
          <div><h5>My understanding</h5><p>${item.understanding}</p></div>
        </div>
      </div>
    </div>
  `).join('');

  grid.innerHTML = markup;

  // Wire up click-to-expand directly here, since these cards are
  // created after main.js's initKnowledgeCards() already ran.
  grid.querySelectorAll('[data-knowledge-card]').forEach((card) => {
    card.addEventListener('click', () => card.classList.toggle('is-open'));
  });
}

document.addEventListener('DOMContentLoaded', renderKnowledgeCards);
