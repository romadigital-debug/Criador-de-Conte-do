import { useState, useRef, useCallback } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');`;

const styles = `
  ${FONTS}
  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  :root {
    --bg: #0a0a0f;
    --surface: #13131a;
    --surface2: #1c1c26;
    --border: #2a2a3a;
    --accent: #f0c93a;
    --accent2: #e8834a;
    --text: #f0efe8;
    --muted: #7a7a9a;
    --success: #4ade80;
    --danger: #f87171;
  }

  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; }

  .app {
    min-height: 100vh;
    background: var(--bg);
    display: flex;
    flex-direction: column;
  }

  /* HEADER */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 32px;
    border-bottom: 1px solid var(--border);
    background: var(--surface);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 20px;
    letter-spacing: -0.5px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .logo-dot { width: 8px; height: 8px; background: var(--accent); border-radius: 50%; display: inline-block; }
  .logo span { color: var(--accent); }

  /* TABS */
  .tabs {
    display: flex;
    gap: 2px;
    background: var(--bg);
    padding: 6px;
    border-radius: 10px;
  }
  .tab {
    padding: 8px 16px;
    border-radius: 7px;
    border: none;
    background: transparent;
    color: var(--muted);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  .tab.active {
    background: var(--surface2);
    color: var(--text);
    box-shadow: 0 0 0 1px var(--border);
  }
  .tab:hover:not(.active) { color: var(--text); }

  /* API KEY BANNER */
  .api-banner {
    background: linear-gradient(135deg, #1a1206, #1c1008);
    border: 1px solid #3a2a06;
    border-radius: 10px;
    padding: 14px 18px;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }
  .api-banner-icon { font-size: 20px; }
  .api-banner-text { flex: 1; font-size: 13px; color: #c9a84c; line-height: 1.5; }
  .api-banner-text strong { color: var(--accent); }
  .api-input-row { display: flex; gap: 8px; margin-top: 8px; }
  .api-input {
    flex: 1;
    background: #0f0d06;
    border: 1px solid #3a2a06;
    border-radius: 7px;
    padding: 8px 12px;
    color: var(--accent);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    outline: none;
  }
  .api-input:focus { border-color: var(--accent); }
  .api-save-btn {
    padding: 8px 16px;
    background: var(--accent);
    color: #000;
    border: none;
    border-radius: 7px;
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
  }

  /* LAYOUT */
  .main { display: flex; flex: 1; overflow: hidden; }
  .sidebar {
    width: 280px;
    min-width: 280px;
    border-right: 1px solid var(--border);
    background: var(--surface);
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .content { flex: 1; overflow-y: auto; padding: 28px 32px; }

  /* SIDEBAR MENU */
  .sidebar-section { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; color: var(--muted); text-transform: uppercase; padding: 12px 8px 6px; }
  .sidebar-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    color: var(--muted);
    transition: all 0.15s;
    border: 1px solid transparent;
  }
  .sidebar-item:hover { background: var(--surface2); color: var(--text); }
  .sidebar-item.active { background: var(--surface2); color: var(--text); border-color: var(--border); }
  .sidebar-item .icon { font-size: 16px; width: 20px; text-align: center; }
  .sidebar-badge {
    margin-left: auto;
    background: var(--accent);
    color: #000;
    font-size: 10px;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 20px;
  }

  /* SECTION HEADER */
  .section-header { margin-bottom: 24px; }
  .section-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 22px;
    letter-spacing: -0.5px;
    margin-bottom: 6px;
  }
  .section-subtitle { font-size: 14px; color: var(--muted); line-height: 1.5; }

  /* CARDS / FORMS */
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 16px;
  }
  .card-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .field { margin-bottom: 14px; }
  .label { font-size: 12px; font-weight: 500; color: var(--muted); margin-bottom: 6px; display: block; letter-spacing: 0.3px; }
  .input, .textarea, .select {
    width: 100%;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 10px 12px;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color 0.15s;
  }
  .input:focus, .textarea:focus, .select:focus { border-color: var(--accent); }
  .textarea { resize: vertical; min-height: 80px; }
  .select { appearance: none; cursor: pointer; }

  /* CHIPS */
  .chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; }
  .chip {
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    border: 1px solid var(--border);
    background: var(--surface2);
    color: var(--muted);
    cursor: pointer;
    transition: all 0.15s;
  }
  .chip.selected { background: var(--accent); color: #000; border-color: var(--accent); }
  .chip:hover:not(.selected) { border-color: var(--muted); color: var(--text); }

  /* BUTTONS */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
  }
  .btn-primary { background: var(--accent); color: #000; font-weight: 700; }
  .btn-primary:hover { background: #f5d655; transform: translateY(-1px); }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .btn-secondary { background: var(--surface2); color: var(--text); border: 1px solid var(--border); }
  .btn-secondary:hover { border-color: var(--muted); }
  .btn-danger { background: transparent; color: var(--danger); border: 1px solid var(--danger); }
  .btn-lg { padding: 14px 28px; font-size: 15px; }
  .btn-sm { padding: 6px 12px; font-size: 12px; }

  /* GRID */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }

  /* PERSONA CARDS */
  .persona-card {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 14px;
    position: relative;
  }
  .persona-name {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 4px;
  }
  .persona-detail { font-size: 12px; color: var(--muted); line-height: 1.5; }
  .persona-delete {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    color: var(--muted);
    cursor: pointer;
    font-size: 14px;
  }
  .persona-delete:hover { color: var(--danger); }

  /* LINE EDITORIAL TAGS */
  .editorial-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    margin: 4px;
    border: 1px solid;
  }

  /* CREATOR - SLIDES PREVIEW */
  .creator-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
  
  .format-selector { display: flex; gap: 10px; margin-bottom: 20px; }
  .format-btn {
    flex: 1;
    padding: 12px;
    border-radius: 10px;
    border: 2px solid var(--border);
    background: var(--surface2);
    color: var(--muted);
    cursor: pointer;
    text-align: center;
    transition: all 0.15s;
    font-family: 'DM Sans', sans-serif;
  }
  .format-btn.active { border-color: var(--accent); color: var(--accent); background: #1a1506; }
  .format-icon { font-size: 22px; margin-bottom: 4px; }
  .format-label { font-size: 12px; font-weight: 600; }

  /* SLIDE PREVIEW */
  .slide-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    position: sticky;
    top: 20px;
  }

  .slide-preview {
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    position: relative;
  }
  .slide-carousel {
    width: 280px;
    height: 280px;
  }
  .slide-story {
    width: 200px;
    height: 356px;
  }
  .slide-inner {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 24px;
    position: relative;
    text-align: center;
  }
  .slide-number {
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 11px;
    font-weight: 700;
    opacity: 0.6;
    font-family: 'Syne', sans-serif;
  }
  .slide-title-text {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 18px;
    line-height: 1.25;
    margin-bottom: 10px;
  }
  .slide-body-text {
    font-size: 12px;
    line-height: 1.6;
    opacity: 0.85;
  }
  .slide-cta-text {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 1.3;
  }

  .slide-nav { display: flex; gap: 8px; align-items: center; }
  .slide-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--border);
    cursor: pointer;
    transition: all 0.15s;
  }
  .slide-dot.active { background: var(--accent); width: 18px; border-radius: 3px; }

  .slide-arrows { display: flex; gap: 8px; }
  .slide-arrow {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 14px;
  }
  .slide-arrow:hover { border-color: var(--accent); color: var(--accent); }

  /* PALETTE */
  .palette { display: flex; gap: 8px; flex-wrap: wrap; }
  .palette-option {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.15s;
  }
  .palette-option.selected { border-color: var(--text); transform: scale(1.1); }

  /* GENERATED SLIDES LIST */
  .slides-list { display: flex; flex-direction: column; gap: 10px; }
  .slide-item {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px 14px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  .slide-item-num {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    background: var(--accent);
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 12px;
    font-family: 'Syne', sans-serif;
    flex-shrink: 0;
  }
  .slide-item-content { flex: 1; }
  .slide-item-title { font-weight: 600; font-size: 13px; margin-bottom: 4px; }
  .slide-item-body { font-size: 12px; color: var(--muted); line-height: 1.5; }
  .slide-item-edit {
    background: none;
    border: 1px solid var(--border);
    color: var(--muted);
    border-radius: 6px;
    padding: 4px 10px;
    font-size: 11px;
    cursor: pointer;
  }
  .slide-item-edit:hover { border-color: var(--accent); color: var(--accent); }

  /* LOADING */
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px;
    gap: 16px;
    color: var(--muted);
  }
  .spinner {
    width: 36px;
    height: 36px;
    border: 3px solid var(--border);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* EMPTY STATE */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px;
    gap: 12px;
    color: var(--muted);
    text-align: center;
    border: 2px dashed var(--border);
    border-radius: 12px;
  }
  .empty-icon { font-size: 36px; }
  .empty-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 16px; color: var(--text); }
  .empty-desc { font-size: 13px; max-width: 260px; line-height: 1.5; }

  /* TOAST */
  .toast {
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px 18px;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    z-index: 999;
    animation: slideIn 0.3s ease;
  }
  @keyframes slideIn { from { transform: translateX(100px); opacity: 0; } to { transform: none; opacity: 1; } }
  .toast.success { border-color: var(--success); }
  .toast.error { border-color: var(--danger); }

  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

  /* IMAGE PREVIEW */
  .img-preview {
    width: 100%;
    height: 120px;
    border-radius: 8px;
    object-fit: cover;
    margin-top: 8px;
    border: 1px solid var(--border);
  }
  .img-loading {
    width: 100%;
    height: 120px;
    border-radius: 8px;
    background: var(--surface2);
    border: 1px dashed var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--muted);
    font-size: 12px;
    margin-top: 8px;
  }

  .divider { height: 1px; background: var(--border); margin: 16px 0; }

  .tag {
    display: inline-block;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
    background: var(--surface2);
    border: 1px solid var(--border);
    color: var(--muted);
  }

  .progress-bar {
    height: 3px;
    background: var(--border);
    border-radius: 2px;
    overflow: hidden;
    margin: 8px 0;
  }
  .progress-fill {
    height: 100%;
    background: var(--accent);
    border-radius: 2px;
    transition: width 0.3s;
  }
`;

const PALETTES = [
  { id: "dark-gold", bg: "#0a0a0f", text: "#f0efe8", accent: "#f0c93a", name: "Dark Gold" },
  { id: "midnight", bg: "#0d1117", text: "#e6edf3", accent: "#58a6ff", name: "Midnight Blue" },
  { id: "forest", bg: "#0d1f17", text: "#d4f0e4", accent: "#4ade80", name: "Forest" },
  { id: "sunset", bg: "#1a0f0a", text: "#faebd7", accent: "#fb923c", name: "Sunset" },
  { id: "rose", bg: "#1a0d12", text: "#fce7ef", accent: "#f472b6", name: "Rose" },
  { id: "clean", bg: "#ffffff", text: "#111111", accent: "#6366f1", name: "Clean" },
];

const OBJECTIVES = ["Awareness", "Engajamento", "Geração de Leads", "Conversão", "Retenção", "Tráfego"];
const EDITORIAL_LINES = [
  { id: "edu", label: "✏️ Educativo", color: "#3b82f6" },
  { id: "ins", label: "⚡ Inspiracional", color: "#f59e0b" },
  { id: "bts", label: "🎬 Bastidores", color: "#8b5cf6" },
  { id: "sel", label: "💰 Venda", color: "#10b981" },
  { id: "ent", label: "😄 Entretenimento", color: "#ef4444" },
  { id: "soc", label: "🔥 Prova Social", color: "#06b6d4" },
];
const TONES = ["Direto e objetivo", "Empático e próximo", "Autoridade e expertise", "Descontraído e humano", "Urgente e persuasivo"];

export default function App() {
  const [page, setPage] = useState("strategy");
  const [apiKey, setApiKey] = useState("");
  const [apiKeySaved, setApiKeySaved] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [toast, setToast] = useState(null);

  // Strategy state
  const [brandName, setBrandName] = useState("");
  const [brandDesc, setBrandDesc] = useState("");
  const [personas, setPersonas] = useState([]);
  const [newPersona, setNewPersona] = useState({ name: "", age: "", pains: "", desires: "", language: "" });
  const [editorialLines, setEditorialLines] = useState([]);
  const [narratives, setNarratives] = useState("");
  const [toneVoice, setToneVoice] = useState("");

  // Creator state
  const [format, setFormat] = useState("carousel");
  const [topic, setTopic] = useState("");
  const [objective, setObjective] = useState("");
  const [selectedEditorial, setSelectedEditorial] = useState("");
  const [palette, setPalette] = useState("dark-gold");
  const [numSlides, setNumSlides] = useState(5);
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(null);
  const [slideImages, setSlideImages] = useState({});

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const saveApiKey = () => {
    if (!apiKeyInput.trim()) return;
    setApiKey(apiKeyInput.trim());
    setApiKeySaved(true);
    showToast("✅ Chave de API salva com sucesso!");
  };

  const addPersona = () => {
    if (!newPersona.name) return;
    setPersonas([...personas, { ...newPersona, id: Date.now() }]);
    setNewPersona({ name: "", age: "", pains: "", desires: "", language: "" });
    showToast("Persona adicionada!");
  };

  const removePersona = (id) => setPersonas(personas.filter(p => p.id !== id));

  const toggleEditorial = (id) => {
    setEditorialLines(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  const currentPalette = PALETTES.find(p => p.id === palette) || PALETTES[0];

  const generateContent = async () => {
    if (!apiKey) { showToast("⚠️ Insira sua chave de API Gemini primeiro", "error"); return; }
    if (!topic) { showToast("⚠️ Defina o tema do post", "error"); return; }
    setGenerating(true);
    setSlides([]);
    setSlideImages({});
    setCurrentSlide(0);

    const personaCtx = personas.length > 0
      ? `Personas do público: ${personas.map(p => `${p.name} (${p.age}), dores: ${p.pains}, desejos: ${p.desires}, linguagem: ${p.language}`).join(" | ")}`
      : "";

    const editorialCtx = selectedEditorial
      ? `Linha editorial: ${EDITORIAL_LINES.find(e => e.id === selectedEditorial)?.label}`
      : "";

    const narrativesCtx = narratives ? `Narrativas recorrentes: ${narratives}` : "";
    const toneCtx = toneVoice ? `Tom de voz: ${toneVoice}` : "";
    const brandCtx = brandName ? `Marca: ${brandName}. ${brandDesc}` : "";

    const formatDesc = format === "carousel"
      ? `carrossel do Instagram (${numSlides} slides quadrados 1:1). Slide 1 = gancho impactante. Slides 2 a ${numSlides - 1} = conteúdo. Slide ${numSlides} = CTA.`
      : `sequência de stories do Instagram (${numSlides} stories verticais 9:16). Story 1 = gancho. Stories 2 a ${numSlides - 1} = conteúdo rápido e dinâmico. Story ${numSlides} = CTA/enquete.`;

    const prompt = `Você é um especialista em conteúdo para Instagram no nicho de Marketing & Negócios.

${brandCtx}
${personaCtx}
${editorialCtx}
${narrativesCtx}
${toneCtx}
Objetivo do post: ${objective || "engajamento"}
Tema: ${topic}
Formato: ${formatDesc}

Crie o conteúdo completo para cada slide/story. Responda APENAS com JSON válido, sem markdown, sem backticks:

{
  "slides": [
    {
      "type": "hook|content|cta",
      "title": "título curto e impactante (máx 8 palavras)",
      "body": "texto do corpo (máx 30 palavras)",
      "imagePrompt": "prompt em inglês para gerar imagem de fundo (descritivo, visual, profissional, sem texto)"
    }
  ]
}`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await res.json();
      const text = data.content?.map(c => c.text || "").join("") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setSlides(parsed.slides || []);
      showToast(`🎉 ${parsed.slides?.length} slides gerados!`);
    } catch (e) {
      showToast("Erro ao gerar conteúdo. Verifique sua chave de API.", "error");
    }
    setGenerating(false);
  };

  const generateImage = async (slideIndex) => {
    if (!apiKey) { showToast("⚠️ Chave de API necessária para gerar imagens", "error"); return; }
    const slide = slides[slideIndex];
    if (!slide) return;
    setGeneratingImage(slideIndex);

    const imagePrompt = `${slide.imagePrompt}. Style: modern, professional, dark moody atmosphere, high contrast, cinematic lighting. No text overlays.`;

    try {
      const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=" + apiKey, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: imagePrompt }] }],
          generationConfig: { responseModalities: ["IMAGE", "TEXT"] }
        })
      });
      const data = await res.json();
      const imgPart = data.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
      if (imgPart?.inlineData) {
        const src = `data:${imgPart.inlineData.mimeType};base64,${imgPart.inlineData.data}`;
        setSlideImages(prev => ({ ...prev, [slideIndex]: src }));
        showToast("🖼️ Imagem gerada!");
      } else {
        showToast("Não foi possível gerar a imagem. Verifique sua chave Gemini.", "error");
      }
    } catch (e) {
      showToast("Erro ao gerar imagem com Gemini.", "error");
    }
    setGeneratingImage(null);
  };

  const updateSlide = (index, field, value) => {
    setSlides(prev => prev.map((s, i) => i === index ? { ...s, [field]: value } : s));
  };

  const pal = currentPalette;
  const currentSlideData = slides[currentSlide];

  const renderStrategy = () => (
    <div>
      <div className="section-header">
        <div className="section-title">Estratégia de Conteúdo</div>
        <div className="section-subtitle">Configure sua marca, público e diretrizes editoriais para personalizar toda a geração de conteúdo.</div>
      </div>

      <div className="card">
        <div className="card-title">🏢 Identidade da Marca</div>
        <div className="grid-2">
          <div className="field">
            <label className="label">Nome da marca / perfil</label>
            <input className="input" value={brandName} onChange={e => setBrandName(e.target.value)} placeholder="Ex: João Silva | Marketing Digital" />
          </div>
          <div className="field">
            <label className="label">Tom de voz</label>
            <select className="select" value={toneVoice} onChange={e => setToneVoice(e.target.value)}>
              <option value="">Selecionar tom</option>
              {TONES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="field">
          <label className="label">Descrição / posicionamento</label>
          <textarea className="textarea" value={brandDesc} onChange={e => setBrandDesc(e.target.value)} placeholder="O que você faz, para quem, qual sua proposta de valor..." style={{ minHeight: 60 }} />
        </div>
      </div>

      <div className="card">
        <div className="card-title">👥 Personas do Público</div>
        {personas.length > 0 && (
          <div className="grid-2" style={{ marginBottom: 14 }}>
            {personas.map(p => (
              <div className="persona-card" key={p.id}>
                <button className="persona-delete" onClick={() => removePersona(p.id)}>✕</button>
                <div className="persona-name">{p.name}</div>
                {p.age && <div className="persona-detail">📅 {p.age} anos</div>}
                {p.pains && <div className="persona-detail">😣 {p.pains}</div>}
                {p.desires && <div className="persona-detail">✨ {p.desires}</div>}
                {p.language && <div className="persona-detail">💬 {p.language}</div>}
              </div>
            ))}
          </div>
        )}
        <div className="grid-2">
          <div className="field">
            <label className="label">Nome da persona</label>
            <input className="input" value={newPersona.name} onChange={e => setNewPersona({ ...newPersona, name: e.target.value })} placeholder="Ex: Empreendedor Bruno" />
          </div>
          <div className="field">
            <label className="label">Faixa etária</label>
            <input className="input" value={newPersona.age} onChange={e => setNewPersona({ ...newPersona, age: e.target.value })} placeholder="Ex: 28-40" />
          </div>
        </div>
        <div className="field">
          <label className="label">Principais dores</label>
          <input className="input" value={newPersona.pains} onChange={e => setNewPersona({ ...newPersona, pains: e.target.value })} placeholder="Ex: Não sabe como escalar, tem medo de investir em tráfego..." />
        </div>
        <div className="field">
          <label className="label">Desejos e objetivos</label>
          <input className="input" value={newPersona.desires} onChange={e => setNewPersona({ ...newPersona, desires: e.target.value })} placeholder="Ex: Quer ter um negócio previsível, viver de renda digital..." />
        </div>
        <div className="field">
          <label className="label">Linguagem que usa</label>
          <input className="input" value={newPersona.language} onChange={e => setNewPersona({ ...newPersona, language: e.target.value })} placeholder="Ex: Direto, sem enrolação, valoriza resultados práticos..." />
        </div>
        <button className="btn btn-secondary" onClick={addPersona}>+ Adicionar Persona</button>
      </div>

      <div className="card">
        <div className="card-title">📋 Linhas Editoriais</div>
        <div className="chips">
          {EDITORIAL_LINES.map(e => (
            <div
              key={e.id}
              className="chip"
              style={editorialLines.includes(e.id) ? { background: e.color, color: "#fff", borderColor: e.color } : {}}
              onClick={() => toggleEditorial(e.id)}
            >
              {e.label}
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title">🧵 Narrativas Recorrentes</div>
        <div className="field">
          <label className="label">Frameworks e narrativas que funcionam pra você</label>
          <textarea className="textarea" value={narratives} onChange={e => setNarratives(e.target.value)} placeholder="Ex: Sempre começo com uma historia pessoal de fracasso → virada → resultado. Uso muito o formato 'o que ninguém te conta sobre X'..." />
        </div>
      </div>

      <button className="btn btn-primary btn-lg" onClick={() => { setPage("creator"); showToast("Estratégia salva! Agora crie seu conteúdo."); }}>
        Salvar e ir para Criação →
      </button>
    </div>
  );

  const renderCreator = () => (
    <div>
      <div className="section-header">
        <div className="section-title">Criar Conteúdo</div>
        <div className="section-subtitle">Gere carrosseis e stories com IA, personalizados com sua estratégia.</div>
      </div>

      <div className="creator-layout">
        {/* LEFT: Controls */}
        <div>
          <div className="format-selector">
            {[
              { id: "carousel", icon: "◻️", label: "Carrossel" },
              { id: "stories", icon: "📱", label: "Stories" }
            ].map(f => (
              <button key={f.id} className={`format-btn ${format === f.id ? "active" : ""}`} onClick={() => setFormat(f.id)}>
                <div className="format-icon">{f.icon}</div>
                <div className="format-label">{f.label}</div>
              </button>
            ))}
          </div>

          <div className="card">
            <div className="card-title">📝 Briefing do Post</div>
            <div className="field">
              <label className="label">Tema / assunto</label>
              <textarea className="textarea" value={topic} onChange={e => setTopic(e.target.value)} placeholder="Ex: Como dobrar o faturamento em 90 dias usando Instagram orgânico..." style={{ minHeight: 60 }} />
            </div>
            <div className="grid-2">
              <div className="field">
                <label className="label">Objetivo</label>
                <select className="select" value={objective} onChange={e => setObjective(e.target.value)}>
                  <option value="">Selecionar</option>
                  {OBJECTIVES.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div className="field">
                <label className="label">Linha editorial</label>
                <select className="select" value={selectedEditorial} onChange={e => setSelectedEditorial(e.target.value)}>
                  <option value="">Selecionar</option>
                  {EDITORIAL_LINES.filter(e => editorialLines.includes(e.id) || true).map(e => (
                    <option key={e.id} value={e.id}>{e.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="field">
              <label className="label">Número de slides: {numSlides}</label>
              <input type="range" min="3" max="10" value={numSlides} onChange={e => setNumSlides(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--accent)" }} />
            </div>
          </div>

          <div className="card">
            <div className="card-title">🎨 Paleta de Cores</div>
            <div className="palette">
              {PALETTES.map(p => (
                <div
                  key={p.id}
                  className={`palette-option ${palette === p.id ? "selected" : ""}`}
                  style={{ background: `linear-gradient(135deg, ${p.bg}, ${p.accent})` }}
                  onClick={() => setPalette(p.id)}
                  title={p.name}
                />
              ))}
            </div>
          </div>

          <button
            className="btn btn-primary btn-lg"
            onClick={generateContent}
            disabled={generating}
            style={{ width: "100%", justifyContent: "center" }}
          >
            {generating ? <><span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> Gerando...</> : "✨ Gerar com IA"}
          </button>
        </div>

        {/* RIGHT: Preview */}
        <div className="slide-container">
          <div
            className={`slide-preview ${format === "carousel" ? "slide-carousel" : "slide-story"}`}
            style={{
              background: currentSlideData && slideImages[currentSlide]
                ? `url(${slideImages[currentSlide]}) center/cover`
                : `linear-gradient(135deg, ${pal.bg}, ${pal.bg}dd)`,
              border: `2px solid ${pal.accent}22`
            }}
          >
            {currentSlideData && slideImages[currentSlide] && (
              <div style={{ position: "absolute", inset: 0, background: `${pal.bg}99`, borderRadius: 14 }} />
            )}
            <div className="slide-inner" style={{ position: "relative", zIndex: 1 }}>
              {generating && !currentSlideData ? (
                <div style={{ color: pal.accent, fontSize: 13 }}>Gerando...</div>
              ) : currentSlideData ? (
                <>
                  <div className="slide-number" style={{ color: pal.accent }}>{currentSlide + 1}/{slides.length}</div>
                  {currentSlideData.type === "cta" ? (
                    <div className="slide-cta-text" style={{ color: pal.text }}>{currentSlideData.title}</div>
                  ) : (
                    <>
                      <div className="slide-title-text" style={{ color: pal.text, marginBottom: 8 }}>{currentSlideData.title}</div>
                      <div className="slide-body-text" style={{ color: pal.text }}>{currentSlideData.body}</div>
                    </>
                  )}
                  {currentSlideData.type === "hook" && (
                    <div style={{
                      position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
                      background: pal.accent, color: "#000", borderRadius: 20, padding: "3px 10px",
                      fontSize: 10, fontWeight: 700
                    }}>ARRASTA →</div>
                  )}
                </>
              ) : (
                <div style={{ color: pal.muted || "#666", fontSize: 12, textAlign: "center" }}>
                  Preencha o briefing e gere seu conteúdo
                </div>
              )}
            </div>
          </div>

          {slides.length > 0 && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button className="slide-arrow" onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}>←</button>
                <div className="slide-nav">
                  {slides.map((_, i) => (
                    <div key={i} className={`slide-dot ${i === currentSlide ? "active" : ""}`} onClick={() => setCurrentSlide(i)} />
                  ))}
                </div>
                <button className="slide-arrow" onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}>→</button>
              </div>

              {currentSlideData && (
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => generateImage(currentSlide)}
                  disabled={generatingImage === currentSlide}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  {generatingImage === currentSlide
                    ? <><span className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} /> Gerando imagem...</>
                    : slideImages[currentSlide] ? "🔄 Regerar imagem" : "🖼️ Gerar imagem com Gemini"
                  }
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Slides list */}
      {slides.length > 0 && (
        <div className="card" style={{ marginTop: 24 }}>
          <div className="card-title" style={{ justifyContent: "space-between" }}>
            <span>📑 Todos os slides</span>
            <span className="tag">{slides.length} slides</span>
          </div>
          <div className="slides-list">
            {slides.map((s, i) => (
              <div className="slide-item" key={i} onClick={() => setCurrentSlide(i)} style={{ cursor: "pointer" }}>
                <div className="slide-item-num">{i + 1}</div>
                <div className="slide-item-content">
                  <div className="slide-item-title">{s.title}</div>
                  <div className="slide-item-body">{s.body}</div>
                  {s.imagePrompt && (
                    <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4, fontStyle: "italic" }}>
                      🖼 {s.imagePrompt.slice(0, 80)}...
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <button className="slide-item-edit" onClick={e => { e.stopPropagation(); setCurrentSlide(i); }}>
                    Ver
                  </button>
                  {!slideImages[i] && (
                    <button
                      className="slide-item-edit"
                      onClick={e => { e.stopPropagation(); generateImage(i); }}
                      disabled={generatingImage !== null}
                      style={{ fontSize: 10 }}
                    >
                      {generatingImage === i ? "..." : "Img"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderHelp = () => (
    <div>
      <div className="section-header">
        <div className="section-title">Guia de Uso</div>
        <div className="section-subtitle">Como configurar e usar o Social Content Studio ao máximo.</div>
      </div>
      <div className="card">
        <div className="card-title">🔑 Como obter sua chave de API Gemini</div>
        {[
          "Acesse aistudio.google.com",
          'Clique em "Get API Key" no menu lateral',
          'Clique em "Create API key" e selecione um projeto',
          'Copie a chave gerada (começa com "AIza...")',
          "Cole no campo de API Key no topo desta ferramenta",
        ].map((step, i) => (
          <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: "var(--accent)", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, flexShrink: 0 }}>{i + 1}</div>
            <div style={{ fontSize: 13, paddingTop: 4 }}>{step}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-title">🗺️ Módulos planejados</div>
        {[
          { name: "✅ Estratégia", desc: "Personas, linhas editoriais, narrativas — disponível agora", done: true },
          { name: "✅ Criação de conteúdo", desc: "Geração de carrossel e stories com IA — disponível agora", done: true },
          { name: "✅ Imagens com Gemini", desc: "Geração de imagens de fundo para cada slide — disponível agora", done: true },
          { name: "🔜 Agendamento Instagram", desc: "Conexão com Meta Graph API para publicar direto no Instagram", done: false },
          { name: "🔜 Análise de métricas", desc: "Dashboard com score de cumprimento de objetivo por post", done: false },
          { name: "🔜 Exportação avançada", desc: "Download de slides como PNG prontos para postar", done: false },
        ].map((m, i) => (
          <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
            <div style={{ fontSize: 18, flexShrink: 0 }}>{m.done ? "✅" : "⏳"}</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{m.name}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{m.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const menuItems = [
    { id: "strategy", icon: "🎯", label: "Estratégia" },
    { id: "creator", icon: "✨", label: "Criar Conteúdo" },
    { id: "help", icon: "📖", label: "Guia de Uso" },
  ];

  return (
    <div className="app">
      <style>{styles}</style>

      <div className="header">
        <div className="logo">
          <span className="logo-dot" />
          Social Content <span>Studio</span>
        </div>
        <div className="tabs">
          {menuItems.map(m => (
            <button key={m.id} className={`tab ${page === m.id ? "active" : ""}`} onClick={() => setPage(m.id)}>
              {m.icon} {m.label}
            </button>
          ))}
        </div>
        <div style={{ fontSize: 12, color: apiKeySaved ? "var(--success)" : "var(--muted)" }}>
          {apiKeySaved ? "✅ API Gemini conectada" : "⚠️ API não configurada"}
        </div>
      </div>

      <div className="main">
        <div className="content">
          {!apiKeySaved && (
            <div className="api-banner">
              <div className="api-banner-icon">🔑</div>
              <div className="api-banner-text">
                <strong>Configure sua chave de API Gemini</strong> para gerar conteúdo e imagens com IA.<br />
                Obtenha gratuitamente em <strong>aistudio.google.com</strong>
                <div className="api-input-row">
                  <input
                    className="api-input"
                    type="password"
                    placeholder="AIza..."
                    value={apiKeyInput}
                    onChange={e => setApiKeyInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && saveApiKey()}
                  />
                  <button className="api-save-btn" onClick={saveApiKey}>Salvar</button>
                </div>
              </div>
            </div>
          )}

          {page === "strategy" && renderStrategy()}
          {page === "creator" && renderCreator()}
          {page === "help" && renderHelp()}
        </div>
      </div>

      {toast && (
        <div className={`toast ${toast.type}`}>
          <span>{toast.msg}</span>
        </div>
      )}
    </div>
  );
}
